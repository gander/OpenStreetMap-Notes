#!/bin/bash

# OSM Notes Build Script
# This script ensures the project is built correctly for deployment

set -e  # Exit on error

echo "Starting OSM Notes build process..."

# Clean previous build
if [ -d "dist" ]; then
    echo "Cleaning previous build..."
    rm -rf dist
fi

# Run the build
echo "Building with Vite..."
vite build

# Verify build output
if [ ! -f "dist/index.html" ]; then
    echo "Error: Build failed - index.html not found in dist directory"
    exit 1
fi

if [ ! -d "dist/assets" ]; then
    echo "Error: Build failed - assets directory not found in dist"
    exit 1
fi

echo "Build completed successfully!"
echo "Build output:"
ls -la dist/
echo ""
echo "index.html content preview:"
head -20 dist/index.html

echo ""
echo "Build ready for deployment!"