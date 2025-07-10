# Automated Version Management

## Current Workflow

Based on user preferences, the following must happen with every code change:

1. **Version Update**: Increment version number in `src/App.vue` header
2. **Changelog Update**: Add entry to `CHANGELOG.md` with changes
3. **Build Dist**: Run `vite build` to update production files

## Current Version: v0.1.4

## Next Version: v0.1.5

## Implementation Notes

- User preferences require automatic version increment with each change
- CHANGELOG.md must be updated for every modification
- Build automation is handled by existing "Auto Build" workflow
- Version format: v0.1.x (increment patch number for each change)

## Process for Developer

When making any code change:

1. Edit code files
2. Update version in `src/App.vue` (v0.1.4 → v0.1.5)
3. Add entry to `CHANGELOG.md` 
4. Trigger build via Auto Build workflow

This ensures consistent versioning and documentation as requested.