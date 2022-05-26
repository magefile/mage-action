<p align="center">
  <img alt="Mage Logo" src="https://avatars2.githubusercontent.com/u/32144377?s=200&v=4" height="200" />
  <h3 align="center">Mage Action</h3>
  <p align="center"><a href="https://github.com/features/actions">GitHub Action</a> for Mage</p>
  <p align="center">
    <a href="https://github.com/magefile/mage-action/releases/latest"><img alt="GitHub release" src="https://img.shields.io/github/release/magefile/mage-action.svg?logo=github&style=flat-square"></a>
    <a href="https://github.com/marketplace/actions/mage-action"><img alt="GitHub marketplace" src="https://img.shields.io/badge/marketplace-mage--action-blue?logo=github&style=flat-square"></a>
    <a href="https://github.com/magefile/mage-action/actions?workflow=test"><img alt="Test workflow" src="https://img.shields.io/github/workflow/status/magefile/mage-action/test?label=test&logo=github&style=flat-square"></a>
    <a href="https://codecov.io/gh/magefile/mage-action"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/magefile/mage-action?logo=codecov&style=flat-square"></a>
    <a href="https://github.com/sponsors/crazy-max"><img src="https://img.shields.io/badge/sponsor-crazy--max-181717.svg?logo=github&style=flat-square" alt="Become a sponsor"></a>
  </p>
</p>

___

![Mage Action](.github/mage-action.png)

* [Usage](#usage)
* [Customizing](#customizing)
  * [inputs](#inputs)
* [Keep up-to-date with GitHub Dependabot](#keep-up-to-date-with-github-dependabot)
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
        uses: magefile/mage-action@v1
        with:
          version: latest
          args: build
```

> For detailed instructions please follow GitHub Actions [workflow syntax](https://help.github.com/en/articles/workflow-syntax-for-github-actions#About-yaml-syntax-for-workflows).

## Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name          | Type    | Default   | Description                      |
|---------------|---------|-----------|----------------------------------|
| `version`     | String  | `latest`  | Mage version. Example: `v1.9.0`  |
| `args`        | String  |           | Arguments to pass to Mage        |
| `workdir`     | String  | `.`       | Working directory (below repository root) |

## Keep up-to-date with GitHub Dependabot

Since [Dependabot](https://docs.github.com/en/github/administering-a-repository/keeping-your-actions-up-to-date-with-github-dependabot)
has [native GitHub Actions support](https://docs.github.com/en/github/administering-a-repository/configuration-options-for-dependency-updates#package-ecosystem),
to enable it on your GitHub repo all you need to do is add the `.github/dependabot.yml` file:

```yaml
version: 2
updates:
  # Maintain dependencies for GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "daily"
```

## License

MIT. See `LICENSE` for more details.
