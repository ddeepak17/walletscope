#!/bin/bash

echo "🔨 Building WalletScope Backend..."

# Install dependencies
npm install

# Build TypeScript
npm run build

echo "✅ Build complete!" 