#!/bin/bash
set -e

# Make vite executable
chmod +x node_modules/.bin/vite

# Run the build
npm run build

