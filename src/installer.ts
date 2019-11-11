import * as tc from '@actions/tool-cache';
import * as download from 'download';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import * as restm from 'typed-rest-client/RestClient';

let osPlat: string = os.platform();
let osArch: string = os.arch();

export async function getMage(version: string): Promise<string> {
  const selected = await determineVersion(version);
  if (selected) {
    version = selected;
  }

  console.log(`✅ Mage version found: ${version}`);
  const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'mage-'));
  const fileName = getFileName(version);
  const downloadUrl = util.format('https://github.com/magefile/mage/releases/download/v%s/%s', version, fileName);

  console.log(`⬇️ Downloading ${downloadUrl}...`);
  await download.default(downloadUrl, tmpdir, {filename: fileName});

  console.log('📦 Extracting Mage...');
  let extPath: string = tmpdir;
  if (osPlat == 'win32') {
    extPath = await tc.extractZip(`${tmpdir}/${fileName}`);
  } else {
    extPath = await tc.extractTar(`${tmpdir}/${fileName}`);
  }

  return path.join(extPath, osPlat == 'win32' ? 'mage.exe' : 'mage');
}

function getFileName(version: string): string {
  const platform: string = osPlat == 'win32' ? 'Windows' : osPlat == 'darwin' ? 'macOS' : 'Linux';
  const arch: string = osArch == 'x64' ? '64bit' : '32bit';
  const ext: string = osPlat == 'win32' ? 'zip' : 'tar.gz';
  return util.format('mage_%s_%s-%s.%s', version, platform, arch, ext);
}

interface GitHubRelease {
  tag_name: string;
}

async function determineVersion(version: string): Promise<string> {
  let rest: restm.RestClient = new restm.RestClient('ghaction-mage', 'https://github.com', undefined, {
    headers: {
      Accept: 'application/json'
    }
  });

  if (version !== 'latest') {
    version = `v${version}`;
  }

  let res: restm.IRestResponse<GitHubRelease> = await rest.get<GitHubRelease>(`/magefile/mage/releases/${version}`);
  if (res.statusCode != 200 || res.result === null) {
    throw new Error(`Cannot find Mage ${version} release (http ${res.statusCode})`);
  }

  return res.result.tag_name.replace(/^v/, '');
}
