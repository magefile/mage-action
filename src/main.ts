import * as installer from './installer';
import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function run(silent?: boolean) {
  try {
    const version = core.getInput('version') || 'latest';
    const args = core.getInput('args');
    const mage = await installer.getMage(version);

    console.log('🏃 Running Mage...');
    await exec.exec(`${mage} ${args}`, undefined, {
      silent: silent
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
