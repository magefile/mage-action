[![GitHub release](https://img.shields.io/github/release/crazy-max/ghaction-mage.svg?style=flat-square)](https://github.com/crazy-max/ghaction-mage/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-mage--action-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/mage-action)
[![Release workflow](https://github.com/crazy-max/ghaction-mage/workflows/release/badge.svg)](https://github.com/crazy-max/ghaction-mage/actions?workflow=release)
[![Test workflow](https://github.com/crazy-max/ghaction-mage/workflows/test/badge.svg)](https://github.com/crazy-max/ghaction-mage/actions?workflow=test)
[![Become a sponsor](https://img.shields.io/badge/sponsor-crazy--max-181717.svg?logo=github&style=flat-square)](https://github.com/sponsors/crazy-max)
[![Paypal Donate](https://img.shields.io/badge/donate-paypal-00457c.svg?logo=paypal&style=flat-square)](https://www.paypal.me/crazyws)

## ✨ About

GitHub Action for [Mage](https://magefile.org/), a Make/rake-like build tool using Go.

If you are interested, [check out](https://git.io/Je09Y) my other :octocat: GitHub Actions!

## 🚀 Usage

Below is a simple snippet to use this action. A [live example](https://github.com/crazy-max/ghaction-mage/actions) is also available for this repository.

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
        uses: actions/checkout@v1
      -
        name: Set up Go
        uses: actions/setup-go@v1
      -
        name: Run Mage
        uses: crazy-max/ghaction-mage@v1
        with:
          version: latest
          args: -version
```

## 💅 Customizing

### inputs

Following inputs can be used as `step.with` keys

| Name          | Type    | Default   | Description                      |
|---------------|---------|-----------|----------------------------------|
| `version`     | String  | `latest`  | Mage version. Example: `1.9.0`   |
| `args`        | String  |           | Arguments to pass to Mage        |

## 🤝 How can I help ?

All kinds of contributions are welcome :raised_hands:! The most basic way to show your support is to star :star2: the project, or to raise issues :speech_balloon: You can also support this project by [**becoming a sponsor on GitHub**](https://github.com/sponsors/crazy-max) :clap: or by making a [Paypal donation](https://www.paypal.me/crazyws) to ensure this journey continues indefinitely! :rocket:

Thanks again for your support, it is much appreciated! :pray:

## 📝 License

MIT. See `LICENSE` for more details.
