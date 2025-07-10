# OSM Notes Deployment Guide

## Build Process

The project uses Vite as the build tool and is configured for static deployment.

### Manual Build Commands

For manual building, use any of these commands:
```bash
# Option 1: Direct Vite command
vite build

# Option 2: Using the build script
./build.sh

# Option 3: Using npm (if build script is available)
npm run build
```

### Build Output

The build process generates:
- `dist/index.html` - Main HTML file
- `dist/assets/` - All bundled JS and CSS files
- Minified and optimized assets for production

### Deployment Configuration

Current deployment settings in `.replit`:
- **Deployment Target**: Static
- **Public Directory**: `dist`
- **Build Command**: `vite build` (needs to be configured)

### Required Build Command

For Replit Deployments to work automatically, the build command should be:
```
vite build
```

This will:
1. Clean and rebuild the `dist` directory
2. Bundle all Vue components and dependencies
3. Generate optimized assets with proper file naming
4. Create the production-ready `index.html`

### Verification

After building, verify these files exist:
- `dist/index.html`
- `dist/assets/` directory with JS and CSS files

### Troubleshooting

If deployment fails:
1. Run `vite build` manually to check for errors
2. Verify `dist/index.html` exists and contains proper asset references
3. Check that all dependencies are properly installed
4. Ensure the build process completes without errors