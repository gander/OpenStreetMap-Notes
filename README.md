# OSM Notes

A frontend-only Vue 3 application for precise GPS coordinate selection using OpenStreetMap with crosshair targeting system. Features multimedia note-taking capabilities with voice recording, photo capture, and text notes, all linked to specific GPS coordinates.

## Features

- **🎯 Crosshair Targeting**: Precise coordinate selection with visual crosshair overlay
- **🗺️ OpenStreetMap Integration**: Free, open-source mapping with Leaflet
- **📍 GPS Geolocation**: Browser-based location detection and positioning
- **🎙️ Voice Notes**: Record audio notes that get transcribed to text via external API
- **📸 Photo Notes**: Capture or select photos that get processed to text via OCR
- **📝 Text Notes**: Manual text input with full editing capabilities
- **🏷️ OSM Tags**: Automatic OSM tag generation from notes via external API
- **💾 Local Storage**: Notes persist across browser sessions until exported
- **📊 Event Logging**: Comprehensive activity tracking with toggleable panel
- **📱 Mobile Responsive**: Optimized for mobile devices and touch interactions

## Technology Stack

- **Vue 3** with Composition API
- **TypeScript 5.8** for type safety
- **Vite 6** for fast development and optimized builds
- **Leaflet** for interactive mapping
- **VueUse 13** for composable utilities
- **Vitest 3.2** for unit testing with TDD approach
- **Bun 1.2** runtime support

## Quick Start

### Prerequisites

- Node.js 20+ or Bun 1.2+
- Modern browser with geolocation support

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd gps-coordinate-selector

# Install dependencies
npm install
# or
bun install

# Start development server
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5000`

### Building for Production

```bash
# Build for production
npm run build
# or
bun run build

# Preview production build
npm run preview
# or
bun run preview
```

## Usage

### Basic Operation

1. **Select Coordinates**: Move the map to position the crosshair over your desired location
2. **Add Notes**: Click on a location to create different types of notes:
   - **Audio**: Record voice notes that get transcribed
   - **Photo**: Take new photos or select from gallery for OCR processing
   - **Text**: Type notes directly with your keyboard
3. **Manage Notes**: Edit, reorder, or delete notes as needed
4. **Generate Tags**: Process notes to generate OSM tags automatically
5. **Export Data**: Save all data (coordinates + notes + tags) to external storage

### External API Integration

The application integrates with external APIs for:

- **Media-to-Text Conversion** (Endpoint #1): Converts audio and images to text
- **OSM Tag Generation** (Endpoint #2): Generates OSM tags from note content
- **Data Storage/Retrieval** (Endpoint #3): Saves and loads coordinate data

### Pin System

- **🟢 Green Pins**: Locally created notes (editable)
- **🔴 Red Pins**: Server-saved notes (read-only)

## Screenshots

### Version 0.1.3 - Configuration Panel
*Latest release featuring complete API endpoint configuration*

![OSM Notes v0.1.3 - Main Interface](docs/screenshots/v0.1.3-main-interface.png)
*Main application interface with OpenLayers map, crosshair targeting, and multimedia note-taking capabilities*

![OSM Notes v0.1.3 - Configuration Panel](docs/screenshots/v0.1.3-config-panel.png)
*Configuration panel for API endpoints, application settings, and debug tools*

![OSM Notes v0.1.3 - Note Creation](docs/screenshots/v0.1.3-note-panel.png)
*Multimedia note creation panel with text, audio recording, and photo capture options*

### Version 0.1.2 - Note-Taking System
*Multimedia note-taking capabilities with pin system*

![OSM Notes v0.1.2 - Map with Pins](docs/screenshots/v0.1.2-map-pins.png)
*OpenLayers map showing green pins (local notes) and red pins (server notes)*

### Version 0.1.1 - Core Functionality
*Initial OpenStreetMap integration with GPS targeting*

![OSM Notes v0.1.1 - GPS Targeting](docs/screenshots/v0.1.1-gps-targeting.png)
*Crosshair targeting system with GPS location and coordinate display*

### Evolution Overview
- **v0.1.1**: Basic coordinate selection and GPS targeting
- **v0.1.2**: Added multimedia note-taking and pin system  
- **v0.1.3**: Configuration panel with API endpoint management

## Testing

```bash
# Run tests
npm run test
# or
bun run test

# Run tests with UI
npm run test:ui
# or
bun run test:ui

# Run tests once
npm run test:run
# or
bun run test:run
```

## Linting

```bash
# Check code style
npm run lint
# or
bun run lint

# Fix linting issues
npm run lint:fix
# or
bun run lint:fix

# Type checking
npm run type-check
# or
bun run type-check
```

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

Required browser features:
- Geolocation API
- MediaRecorder API (for audio recording)
- Camera API (for photo capture)
- File API (for gallery selection)

## Privacy & Data

- All note data is stored locally until explicitly exported
- GPS coordinates are only used for positioning, not transmitted automatically
- Media files are sent to external APIs only when user initiates transcription
- No tracking or analytics are implemented

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

Adam Gąsowski

## Version

Current version: 0.1.1

**Version Management**: This project follows semantic versioning and increments version numbers with each code update. The current version is displayed in the application title bar.

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.