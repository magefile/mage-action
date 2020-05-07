import fs = require('fs');
import * as installer from '../src/installer';

describe('installer', () => {
  it('acquires v1.8.0 version of Mage', async () => {
    const mage = await installer.getMage('v1.8.0');
    console.log(mage);
    expect(fs.existsSync(mage)).toBe(true);
  }, 100000);

  it('acquires latest version of Mage', async () => {
    const mage = await installer.getMage('latest');
    console.log(mage);
    expect(fs.existsSync(mage)).toBe(true);
  }, 100000);
});
