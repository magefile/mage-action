<p align="center">
  <img alt="Mage Logo" src="https://avatars2.githubusercontent.com/u/32144377?s=200&v=4" height="200" />
  <h3 align="center">Mage Action</h3>
  <p align="center"><a href="https://github.com/features/actions">GitHub Action</a> for Mage</p>
  <p align="center">
    <a href="https://github.com/magefile/mage-action/releases/latest"><img alt="GitHub release" src="https://img.shields.io/github/release/magefile/mage-action.svg?logo=github&style=flat-square"></a>
    <a href="https://github.com/marketplace/actions/mage-action"><img alt="GitHub marketplace" src="https://img.shields.io/badge/marketplace-mage--action-blue?logo=github&style=flat-square"></a>
    <a href="https://github.com/magefile/mage-action/actions?workflow=test"><img alt="Test workflow" src="https://img.shields.io/github/actions/workflow/status/magefile/mage-action/test.yml?branch=master&label=test&logo=github&style=flat-square"></a>
    <a href="https://codecov.io/gh/magefile/mage-action"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/magefile/mage-action?logo=codecov&style=flat-square"></a>
    <a href="https://github.com/sponsors/crazy-max"><img src="https://img.shields.io/badge/sponsor-crazy--max-181717.svg?logo=github&style=flat-square" alt="Become a sponsor"></a>
  </p>
</p>

___

![Mage Action](.github/mage-action.png)

* [Usage](#usage)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [Using on GHES](#using-on-ghes)
* [License](#license)

## Usage

```yaml
name: mage

on:
  pull_request:
  push:

jobs:
  mage:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v3
      -
        name: Set up Go
        uses: actions/setup-go@v3
        with:
          go-version: 1.14
      -
        name: Run Mage
        uses: magefile/mage-action@v2
        with:
          version: latest
          args: build
```

> For detailed instructions please follow GitHub Actions [workflow syntax](https://help.github.com/en/articles/workflow-syntax-for-github-actions#About-yaml-syntax-for-workflows).

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name      | Type   | Default  | Description                               |
|-----------|--------|----------|-------------------------------------------|
| `version` | String | `latest` | Mage version. Example: `v1.9.0`           |
| `args`    | String |          | Arguments to pass to Mage                 |
| `workdir` | String | `.`      | Working directory (below repository root) |

## Using on GHES

If you specify a version or `latest` of GoReleaser in your workflow, the
version will be downloaded from [GitHub Releases in `magefile/mage`](https://github.com/magefile/mage/releases)
repository. These calls to `magefile/mage` are made via unauthenticated
requests, which are limited to [60 requests per hour per IP](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting).

If more requests are made within the time frame, then you will start to see
rate-limit errors during downloading that looks like:

```
##[error]API rate limit exceeded for...
```

To get a higher rate limit, you can [generate a personal access token on github.com](https://github.com/settings/tokens/new)
and pass it as the `github_token` input for the action:

```yaml
uses: magefile/mage-action@v2
with:
  github_token: ${{ secrets.GH_DOTCOM_TOKEN }}
  version: v1.14.0
```

If the runner is not able to access `github.com`, it will take the default one
available on the GitHub Runner or runner's tool cache. See "[Setting up the
tool cache on self-hosted runners without internet
access](https://docs.github.com/en/enterprise-server@3.2/admin/github-actions/managing-access-to-actions-from-githubcom/setting-up-the-tool-cache-on-self-hosted-runners-without-internet-access)"
for more information.

## License

MIT. See `LICENSE` for more details.
