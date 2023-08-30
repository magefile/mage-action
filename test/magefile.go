//go:build mage

package main

import (
	"fmt"

	"github.com/magefile/mage/mg"
	"github.com/magefile/mage/sh"
)

// Build the app!
func Build() error {
	fmt.Println("⚙️ Go mod download")
	if err := sh.Run(mg.GoCmd(), "mod", "download"); err != nil {
		return err
	}

	fmt.Println("⚙️ Go build...")
	return sh.Run(mg.GoCmd(), "build", "-o", "mage-action", "-v")
}
