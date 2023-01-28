import {Octokit} from '@octokit/action';

const octokit = new Octokit();

export interface GitHubRelease {
  id: number;
  tag_name: string;
}

export const getRelease = async (version: string): Promise<GitHubRelease | null> => {
  const octokitRelease = await getOctokitRelease(version);
  return octokitRelease.data;
};

const getOctokitRelease = (version: string) => {
  if (version === 'latest') {
    return octokit.repos.getLatestRelease({
      owner: 'magefile',
      repo: 'mage'
    });
  }
  return octokit.repos.getReleaseByTag({
    owner: 'magefile',
    repo: 'mage',
    tag: version
  });
};
