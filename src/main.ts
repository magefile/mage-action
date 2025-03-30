import * as path from 'path';
import * as installer from './installer';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run(): Promise<void> {
  try {
    const version = core.getInput('version') || 'latest';
    const args = core.getInput('args');
    const workdir = core.getInput('workdir') || process.env['GITHUB_WORKSPACE'] || '.';
    const installOnly = core.getBooleanInput('install-only');
    const cacheBinary = core.getBooleanInput('cache-binary');

    const mage = await installer.getMage(version, cacheBinary);

    if (installOnly) {
      const dir = path.dirname(mage);
      core.addPath(dir);
      core.debug(`Added ${dir} to PATH`);
      return;
    }

    core.info('Running Mage...');
    await exec.exec(`${mage} ${args}`, undefined, {
      cwd: workdir
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
