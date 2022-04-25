import {describe, expect, it} from '@jest/globals';
import * as fs from 'fs';
import * as installer from '../src/installer';

describe('installer', () => {
  it('acquires v1.8.0 version of Mage', async () => {
    const mage = await installer.getMage('v1.8.0');
    expect(fs.existsSync(mage)).toBe(true);
  }, 100000);

  it('acquires latest version of Mage', async () => {
    const mage = await installer.getMage('latest');
    expect(fs.existsSync(mage)).toBe(true);
  }, 100000);
});
