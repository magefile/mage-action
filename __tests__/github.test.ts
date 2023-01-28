import {describe, expect, it} from '@jest/globals';
import * as github from '../src/github';

describe('github', () => {
  it('returns latest Mage GitHub release', async () => {
    const release = await github.getLatestRelease(process.env.GITHUB_TOKEN || '');
    expect(release).not.toBeNull();
    expect(release?.tag_name).not.toEqual('');
  });

  it('returns v1.8.0 Mage GitHub release', async () => {
    const release = await github.getReleaseTag('v1.8.0', process.env.GITHUB_TOKEN || '');
    expect(release).not.toBeNull();
    expect(release?.tag_name).toEqual('v1.8.0');
  });

  it('unknown release', async () => {
    await expect(github.getReleaseTag('foo', process.env.GITHUB_TOKEN || '')).rejects.toThrowError(
      new Error('Cannot get release foo: HttpError: Not Found')
    );
  });
});
