[![GitHub release](https://img.shields.io/github/release/crazy-max/ghaction-mage.svg?style=flat-square)](https://github.com/crazy-max/ghaction-mage/releases/latest)
[![GitHub marketplace](https://img.shields.io/badge/marketplace-mage--action-blue?logo=github&style=flat-square)](https://github.com/marketplace/actions/mage-action)
[![Release workflow](https://github.com/crazy-max/ghaction-mage/workflows/release/badge.svg)](https://github.com/crazy-max/ghaction-mage/actions)
[![Test workflow](https://github.com/crazy-max/ghaction-mage/workflows/test/badge.svg)](https://github.com/crazy-max/ghaction-mage/actions)
[![Support me on Patreon](https://img.shields.io/badge/donate-patreon-f96854.svg?logo=patreon&style=flat-square)](https://www.patreon.com/crazymax) 
[![Paypal Donate](https://img.shields.io/badge/donate-paypal-00457c.svg?logo=paypal&style=flat-square)](https://www.paypal.me/crazyws)

## ✨ About

GitHub Action for [Mage](https://magefile.org/), a Make/rake-like build tool using Go.

> **:warning: Note:** To use this action, you must have access to the [GitHub Actions](https://github.com/features/actions) feature. GitHub Actions are currently only available in public beta. You can [apply for the GitHub Actions beta here](https://github.com/features/actions/signup/).

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
        uses: actions/checkout@master
      -
        name: Set up Go
        uses: actions/setup-go@master
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

All kinds of contributions are welcome :raised_hands:!<br />
The most basic way to show your support is to star :star2: the project, or to raise issues :speech_balloon:<br />
But we're not gonna lie to each other, I'd rather you buy me a beer or two :beers:!

[![Support me on Patreon](.res/patreon.png)](https://www.patreon.com/crazymax) 
[![Paypal Donate](.res/paypal.png)](https://www.paypal.me/crazyws)

## 📝 License

MIT. See `LICENSE` for more details.
