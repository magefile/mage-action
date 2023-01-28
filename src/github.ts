import * as httpm from '@actions/http-client';

const RELEASE_API_ENDPOINT = 'https://api.github.com/repos/magefile/mage/releases';

export interface GitHubRelease {
  id: number;
  tag_name: string;
}

export const getRelease = async (version: string): Promise<GitHubRelease | null> => {
  const http: httpm.HttpClient = new httpm.HttpClient('mage-action');
  if (version === 'latest') {
    const url = `${RELEASE_API_ENDPOINT}/${version}`;
    return (await http.getJson<GitHubRelease>(url)).result;
  }
  const tagUrl = `${RELEASE_API_ENDPOINT}/tags/${version}`;
  return (await http.getJson<GitHubRelease>(tagUrl)).result;
};
