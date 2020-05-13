import * as installer from './installer';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

async function run(): Promise<void> {
  try {
    const version = core.getInput('version') || 'latest';
    const args = core.getInput('args');
    const workdir = core.getInput('workdir') || '.';
    const mage = await installer.getMage(version);

    if (workdir && workdir !== '.') {
      core.info(`📂 Using ${workdir} as working directory...`);
      process.chdir(workdir);
    }

    core.info('🏃 Running Mage...');
    await exec.exec(`${mage} ${args}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
