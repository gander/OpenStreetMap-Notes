# Changelog - OSM Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

**Version Management**: This project follows semantic versioning and increments version numbers with each code update as requested.

## [0.1.6] - 2025-07-10

### Fixed
- **Event Logger Panel Display**: Fixed event logger panel to show properly when Event Log button is clicked
- **Event Type Icons**: Added missing icon mappings for 'note' and 'config' event types
- **Event Type Styling**: Added visual styling for 'note' and 'config' event types with distinct colors

### Added
- **Initial Test Events**: Added startup events to ensure event logger has content to display
- **Console Debugging**: Added console logging to help verify event logger state

### Technical Details
- Added 'note' event type with yellow color scheme (#ffc107)
- Added 'config' event type with green color scheme (#20c997)
- Enhanced event icon mapping for better visual feedback
- Added test events on application mount to verify functionality

## [0.1.5] - 2025-07-10

### Fixed
- **Event Logger Display Issue**: Fixed EventLogger component emits declaration causing display problems
- **Event Log Button Functionality**: Event Log button in header now properly shows/hides the event logger popup

### Technical Details
- Removed unused 'close' emit from EventLogger component
- EventLogger now displays correctly when showEventLogger state is toggled

## [0.1.4] - 2025-07-10

### Added
- **Event Log Button**: Added dedicated "Event Log" button to main header next to Config button
- **Persistent Event Logger**: Event logger popup now stays open when activated (removed close/hide functionality)

### Changed
- **Event Logger Position**: Event logger popup now appears above settings panel with higher z-index (3000)
- **Header Controls**: Event Log button moved from Config panel to main header for better accessibility
- **Event Logger UI**: Removed close button to prevent accidental hiding as requested

### Removed
- **Event Logger Toggle**: Removed "Show/Hide Event Log" button from Config panel Debug Tools section
- **Event Logger Close Function**: Removed ability to close event logger popup once opened

### Technical Details
- Enhanced z-index hierarchy: Event Logger (3000) > Config Panel (2000)
- Simplified event logger component by removing close emit functionality
- Updated ConfigPanel component to remove event logger related props and methods

## [0.1.3] - 2025-07-10

### Added
- **Configuration Panel**: Complete API endpoint configuration system
  - Media-to-Text API endpoint for audio/image transcription
  - OSM Tag Generation API endpoint for automated tagging  
  - Data Storage API endpoint for bidirectional data sync
- **Application Settings**: Toggle switches for auto-save, server notes loading, GPS accuracy
- **Debug Tools**: Event log toggle, configuration export, reset to defaults
- **Local Storage**: Configuration persistence across browser sessions

### Changed
- **Header Button**: Replaced "Events" with "Config" button for better UX
- **Panel System**: Improved modal system for configuration management

### Technical Details
- Enhanced composables pattern for configuration management
- Local storage integration for settings persistence
- Improved component architecture with ConfigPanel.vue

## [0.1.2] - 2025-07-10

### Added
- **Multimedia Note System**: Complete note-taking functionality
  - Text notes with rich textarea input
  - Audio recording with MediaRecorder API
  - Photo capture from camera or gallery selection
- **Pin System on Map**: Visual representation of notes
  - Green pins for local (unsaved) notes
  - Red pins for server-saved notes
  - Click interaction for pin management
- **Local Storage**: Notes persistence in browser localStorage
- **Note Management**: Save, edit, and organize location-based notes

### Changed
- **Map Library**: Migrated from Leaflet to OpenLayers for better precision
- **Architecture**: Implemented proper note storage composables
- **Data Flow**: Enhanced coordinate selection and note creation workflow

### Removed
- **Coordinate Copying**: Removed unauthorized coordinate copying functionality
- **Event Log Clearing**: Removed prohibited log clearing capabilities

### Technical Details
- Vue 3 with OpenLayers integration via vue3-openlayers
- MediaRecorder API for audio capture
- File API for photo handling
- Reactive note storage system with composables

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