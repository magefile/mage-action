import * as os from 'os';
import * as path from 'path';
import * as util from 'util';
import * as core from '@actions/core';
import * as httpm from '@actions/http-client';
import * as tc from '@actions/tool-cache';

const osPlat: string = os.platform();
const osArch: string = os.arch();

export interface GitHubRelease {
  id: number;
  tag_name: string;
  html_url: string;
  assets: Array<string>;
}

export const getRelease = async (version: string): Promise<GitHubRelease> => {
  const url = `https://raw.githubusercontent.com/magefile/mage-action/master/.github/mage-releases.json`;
  const http: httpm.HttpClient = new httpm.HttpClient('ghaction-setup-containerd');
  const resp: httpm.HttpClientResponse = await http.get(url);
  const body = await resp.readBody();
  const statusCode = resp.message.statusCode || 500;
  if (statusCode >= 400) {
    throw new Error(`Failed to get Mage release ${version} from ${url} with status code ${statusCode}: ${body}`);
  }
  const releases = <Record<string, GitHubRelease>>JSON.parse(body);
  if (!releases[version]) {
    throw new Error(`Cannot find Mage release ${version} in ${url}`);
  }
  return releases[version];
};

export async function getMage(version: string): Promise<string> {
  const release: GitHubRelease = await getRelease(version);
  const semver: string = release.tag_name.replace(/^v/, '');
  core.info(`Mage version found: ${release.tag_name}`);

  const filename: string = getFilename(semver);
  const downloadUrl: string = util.format(
    'https://github.com/magefile/mage/releases/download/%s/%s',
    release.tag_name,
    filename
  );

  core.info(`Downloading ${downloadUrl}...`);
  const downloadPath: string = await tc.downloadTool(downloadUrl);
  core.debug(`Downloaded to ${downloadPath}`);

  core.info('Extracting Mage...');
  let extPath: string;
  if (osPlat == 'win32') {
    extPath = await tc.extractZip(downloadPath);
  } else {
    extPath = await tc.extractTar(downloadPath);
  }
  core.debug(`Extracted to ${extPath}`);

  const cachePath: string = await tc.cacheDir(extPath, 'mage-action', semver);
  core.debug(`Cached to ${cachePath}`);

  const exePath: string = path.join(cachePath, osPlat == 'win32' ? 'mage.exe' : 'mage');
  core.debug(`Exe path is ${exePath}`);

  return exePath;
}

const getFilename = (semver: string): string => {
  const platform: string = osPlat == 'win32' ? 'Windows' : osPlat == 'darwin' ? 'macOS' : 'Linux';
  const arch: string = osArch == 'x64' ? '64bit' : osArch == 'arm64' ? 'ARM64' : '32bit';
  const ext: string = osPlat == 'win32' ? 'zip' : 'tar.gz';
  return util.format('mage_%s_%s-%s.%s', semver, platform, arch, ext);
};
