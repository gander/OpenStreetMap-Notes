# OSM Notes

## Overview

This is a Vue.js-based GPS coordinate selector application for OpenStreetMap note-taking that allows users to interact with maps and select coordinates. The application uses OpenLayers for mapping functionality, provides geolocation services, and includes comprehensive multimedia note-taking capabilities with external API integration for transcription and OSM tag generation. Features include configurable API endpoints, local storage, and a pin system for notes.

## User Preferences

Preferred communication style: Simple, everyday language.
Project approach: Starting from version 0.1.0, increment version with each code update. Update CHANGELOG.md for every change.
Version management: Always update version number in App.vue header AND index.html title when making changes and maintain comprehensive CHANGELOG.md. Keep all version numbers synchronized across App.vue, index.html, and package.json.
Build automation: Build dist directory with every code change using Auto Build workflow.
Change tracking: Update version + changelog + build dist for every single code modification.
Testing methodology: Test-Driven Development (TDD) with unit tests from the start.
All content language: English (documentation, UI, UX, generated content).
Author: Adam Gąsowski.
License: MIT.

## System Architecture

### Frontend Architecture
- **Framework**: Vue 3 with Composition API and TypeScript 5.8
- **Build Tool**: Vite 6 for fast development and optimized builds
- **Map Library**: OpenLayers (vue3-openlayers) for interactive mapping functionality with precise coordinate selection
- **Styling**: Custom CSS with responsive design patterns
- **State Management**: Vue's built-in reactivity with composables pattern
- **Testing**: Vitest 3.2 with TDD approach and Vue Test Utils
- **Runtime**: Node.js 20+ with Bun 1.2 support
- **Utils**: VueUse 13 for enhanced composables

### Key Design Decisions
1. **Vue 3 with Composition API**: Chosen for better code organization and reusability through composables
2. **Vite 6 Build System**: Selected for fast development server and optimized production builds with code splitting
3. **OpenLayers Maps**: Chosen over MapLibre GL for superior precision in coordinate selection and GPS integration
4. **Composables Pattern**: Used for reusable logic like geolocation, event logging, and multimedia handling
5. **TypeScript Integration**: Full type safety for better development experience and error prevention
6. **TDD Methodology**: Test-driven development from project start with comprehensive unit testing

### Multimedia Note-Taking System
- **Audio Recording**: Browser MediaRecorder API for voice notes
- **Photo Capture**: Camera API for new photos and File API for gallery selection
- **Text Input**: Manual keyboard input with full editing capabilities
- **External API Integration**: Three-endpoint system for media processing and data storage

### External API Integration
1. **Media-to-Text API (Endpoint #1)**: Converts audio/images + coordinates to text transcription
2. **OSM Tag Generation API (Endpoint #2)**: Processes notes + coordinates to generate OSM tags
3. **Data Storage API (Endpoint #3)**: Bidirectional storage (GET/POST) for coordinate data with notes and tags

### n8n Workflow Integration (Added: July 10, 2025)
- **n8n 1.101.1 Compatibility**: Complete workflow files for import into n8n instance
- **AI Agent Node Usage**: All AI processing uses OpenAI GPT-4o through AI Agent Node
- **HTTP Request Node Integration**: External storage communication via HTTP Request Node
- **Workflow Files**: Ready-to-import JSON files in `/n8n-workflows/` directory
  - `media-to-text-workflow.json`: Audio/image transcription endpoint
  - `osm-tag-generation-workflow.json`: OSM tag generation endpoint  
  - `data-storage-workflow.json`: Data storage GET/POST endpoints
- **Credentials Required**: OpenAI API key and external storage API authentication

### Data Persistence Strategy
- **Local Storage**: Browser localStorage/IndexedDB for draft notes and coordinates
- **Session Persistence**: Data survives browser restarts until explicitly exported or deleted
- **Pin System**: Green pins (local/editable) vs Red pins (server-saved/read-only)
- **Viewport Loading**: Automatic retrieval of existing notes for visible map area

## Key Components

### Core Application
- **App.vue**: Main application component with note-taking and configuration management
- **main.js**: Application entry point that mounts the Vue app with OpenLayers integration

### UI Components
- **MapContainer.vue**: OpenLayers map with GPS location and note pins
- **NotePanel.vue**: Multimedia note creation (text, audio, photos)
- **ConfigPanel.vue**: API endpoint configuration and application settings
- **Crosshair.vue**: Precise coordinate targeting overlay
- **EventLogger.vue**: Debug logging panel

### Composables (Reusable Logic)
- **useGeolocation.js**: Handles browser geolocation API with error handling and loading states
- **useEventLogger.js**: Provides event logging functionality with filtering and export capabilities

### Styling
- **main.css**: Global styles with CSS reset, responsive design, and component styling

## Data Flow

1. **User Interaction**: Users interact with the map interface to select coordinates
2. **Geolocation Services**: Browser geolocation API is used to get user's current position
3. **Event Logging**: All user interactions and system events are logged for debugging and analytics
4. **Map Updates**: OpenLayers handles map rendering and coordinate selection with crosshair targeting

## External Dependencies

### Core Dependencies
- **Vue 3.5.17**: Main frontend framework
- **OpenLayers**: Interactive map library with vue3-openlayers integration
- **Vite 6.3.5**: Build tool and development server
- **@vitejs/plugin-vue 5.2.4**: Vue support for Vite

### CDN Resources
- **Font Awesome 6.4.0**: Icon library from CDN

## Deployment Strategy

### Development
- **Server Configuration**: Vite dev server runs on host 0.0.0.0, port 5000 with strict port enforcement
- **Hot Module Replacement**: Enabled through Vite for fast development

### Production Build (Updated: July 10, 2025)
- **Build Command**: `vite build` (verified working)
- **Output Directory**: `dist` folder with complete index.html and assets
- **Asset Organization**: 14 optimized files in `assets` directory
- **Code Splitting**: 
  - `vendor` chunk for Vue core (58.34 kB)
  - `maps` chunk for OpenLayers library (1.8 MB)
  - Main application chunk (23.92 kB)
- **Build Process**: Successfully transforms 495 modules in ~24 seconds
- **Minification**: Terser used for JavaScript minification
- **Optimization**: Dependencies pre-bundled for faster loading

### Deployment Configuration (Fixed: July 10, 2025)
- **Deployment Target**: Static
- **Public Directory**: `dist`
- **Required Build Command**: `vite build`
- **Build Script**: Created `build.sh` for manual builds with verification
- **Asset Verification**: Confirmed index.html (714 bytes) and all assets properly generated

### Configuration Features
- **Vue Options API**: Disabled for smaller bundle size
- **Vue DevTools**: Disabled in production
- **OpenLayers Optimization**: Pre-bundled for better performance

## Technical Notes

- The application is designed as a single-page application (SPA)
- Geolocation functionality includes comprehensive error handling and loading states
- Event logging system supports filtering, time-based queries, and data export
- Build configuration optimizes for both development speed and production performance
- No backend or database integration currently present - this is a client-side only application