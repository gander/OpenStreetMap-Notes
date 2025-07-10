# Changelog - OSM Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Version Management**: This project follows semantic versioning and increments version numbers with each code update as requested.

## [0.1.1] - 2025-07-10

### Changed
- **Project Name**: Simplified to "OSM Notes" (from "GPS Coordinate Selector")
- **Version Display**: Added version number in application title bar
- **Documentation**: Updated README and replit.md to use clean project name
- **Versioning Policy**: Established automatic version incrementing with each code change

### Technical
- **Git Integration**: Set up version control with proper commit structure
- **Build Process**: Automatic builds to dist directory on code changes

## [0.1.0] - 2025-07-10

### Added

#### Core Application
- **Vue 3 Application**: Complete frontend application structure with Composition API
- **OpenStreetMap Integration**: Leaflet-based mapping with OSM tiles
- **Crosshair Targeting System**: Precise coordinate selection with visual overlay
- **GPS Geolocation**: Browser-based location detection and positioning

#### Navigation & Controls
- **Interactive Map**: Pan, zoom, and click-to-position functionality
- **Location Button**: Find current GPS position with accuracy display
- **Responsive Design**: Mobile-optimized interface with touch support

#### Coordinate System
- **Real-time Coordinate Display**: Live lat/lng updates as map moves
- **Coordinate Copying**: Copy individual or both coordinates to clipboard
- **Accuracy Display**: GPS accuracy radius and measurement

#### Event Logging
- **Toggleable Event Panel**: Comprehensive activity tracking
- **Event Categories**: GPS, coordinates, map, UI, system, and error events
- **Auto-scroll Logging**: Real-time event updates with timestamps
- **Event Management**: Clear logs functionality

#### Development Environment
- **Vite 6 Build System**: Fast development server and optimized production builds
- **TypeScript 5.8**: Type safety and modern JavaScript features
- **Testing Setup**: Vitest 3.2 with Vue Test Utils for TDD approach
- **Code Quality**: ESLint configuration with Vue and TypeScript rules

#### Documentation
- **Comprehensive README**: Setup instructions, features, and usage guide
- **MIT License**: Open source license with Adam Gąsowski rights
- **Privacy Policy**: Detailed privacy and data handling documentation
- **Project Architecture**: Technical documentation in replit.md

#### Browser Support
- **Cross-browser Compatibility**: Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Progressive Enhancement**: Graceful degradation for unsupported features
- **Accessibility**: ARIA labels, keyboard navigation, and screen reader support

#### Build System
- **Automatic Building**: Code changes trigger automatic builds to `dist` directory
- **Production Optimization**: Terser minification and code splitting enabled
- **Asset Organization**: Separate bundles for vendor, maps, and application code
- **Development Workflow**: Hot reload during development, optimized builds for production

### Technical Details

#### Dependencies
- Vue 3.5.17 (frontend framework)
- Leaflet 1.9.4 (mapping library)
- Vite 6.3.5 (build tool)
- @vueuse/core 13.0.0 (composable utilities)
- TypeScript 5.8.0 (type system)
- Vitest 3.2.0 (testing framework)
- Terser (JavaScript minification)

#### Architecture
- **Composables Pattern**: Reusable logic with useGeolocation and useEventLogger
- **Component Structure**: Modular Vue components for map, crosshair, coordinates, and events
- **CSS Architecture**: Custom CSS with mobile-responsive design patterns
- **Build Optimization**: Code splitting with vendor and maps chunks

#### Performance
- **Lazy Loading**: Component-based code splitting for faster initial load
- **Asset Optimization**: Minified CSS and JavaScript for production
- **Memory Management**: Efficient event handling and cleanup
- **Mobile Performance**: Touch-optimized interactions and responsive layout

### Initial Configuration

#### Server Settings
- Development server: `0.0.0.0:5000`
- Production build: `dist` directory with asset optimization
- Hot module replacement: Enabled for development

#### Code Standards
- ESLint rules for Vue 3 and TypeScript
- Accessibility-first development approach
- Mobile-responsive design principles
- Progressive web app foundation

---

**Note**: This is the initial release establishing the foundation for the GPS coordinate selector application. Future versions will add multimedia note-taking capabilities, external API integration, and data persistence features.