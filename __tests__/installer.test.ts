import {describe, expect, it} from '@jest/globals';
import * as fs from 'fs';
import * as installer from '../src/installer';

describe('getRelease', () => {
  it('returns latest Mage GitHub release', async () => {
    const release = await installer.getRelease('latest');
    expect(release).not.toBeNull();
    expect(release?.tag_name).not.toEqual('');
  });

  it('returns v1.8.0 Mage GitHub release', async () => {
    const release = await installer.getRelease('v1.8.0');
    expect(release).not.toBeNull();
    expect(release?.id).toEqual(14481575);
    expect(release?.tag_name).toEqual('v1.8.0');
    expect(release?.html_url).toEqual('https://github.com/magefile/mage/releases/tag/v1.8.0');
  });

  it('unknown release', async () => {
    await expect(installer.getRelease('foo')).rejects.toThrow(
      new Error(
        'Cannot find Mage release foo in https://raw.githubusercontent.com/magefile/mage-action/master/.github/mage-releases.json'
      )
    );
  });
});

describe('installer', () => {
  it('acquires v1.8.0 version of Mage', async () => {
    const mage = await installer.getMage('v1.8.0');
    expect(fs.existsSync(mage)).toBe(true);
  }, 100000);

  it('acquires v1.8.0 version of Mage from local cache', async () => {
    const mage = await installer.getMage('v1.8.0');
    expect(fs.existsSync(mage)).toBe(true);
  }, 100000);

  it('acquires latest version of Mage', async () => {
    const mage = await installer.getMage('latest');
    expect(fs.existsSync(mage)).toBe(true);
  }, 100000);
});
