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

The application runs on Replit with automatic setup. Access it through the Replit webview once the project starts.

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

The application integrates with three external APIs:

#### Endpoint #1: Media-to-Text Conversion
**Purpose**: Converts audio recordings and images to text
**Method**: POST
**Data Sent**:
```json
{
  "media": "base64_encoded_audio_or_image",
  "mediaType": "audio/webm" or "image/jpeg",
  "coordinates": {
    "latitude": 52.2297,
    "longitude": 21.0122
  },
  "timestamp": "2025-01-10T12:30:00Z"
}
```
**Expected Response**:
```json
{
  "success": true,
  "transcription": "Transcribed text from audio/OCR from image",
  "confidence": 0.95
}
```

#### Endpoint #2: OSM Tag Generation
**Purpose**: Generates OpenStreetMap tags from note content
**Method**: POST
**Data Sent**:
```json
{
  "noteText": "Restaurant with outdoor seating",
  "coordinates": {
    "latitude": 52.2297,
    "longitude": 21.0122
  },
  "context": "urban_area"
}
```
**Expected Response**:
```json
{
  "success": true,
  "tags": {
    "amenity": "restaurant",
    "outdoor_seating": "yes",
    "cuisine": "international"
  },
  "confidence": 0.88
}
```

#### Endpoint #3: Data Storage/Retrieval
**Purpose**: Bidirectional storage for coordinate data with notes and tags

**Save Data (POST)**:
```json
{
  "coordinates": {
    "latitude": 52.2297,
    "longitude": 21.0122
  },
  "notes": [
    {
      "type": "text",
      "content": "Restaurant description",
      "timestamp": "2025-01-10T12:30:00Z"
    }
  ],
  "osmTags": {
    "amenity": "restaurant"
  }
}
```

**Load Data (GET)**: Query parameters for viewport bounds
```
?minLat=52.2&maxLat=52.3&minLon=21.0&maxLon=21.1
```
**Expected Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "unique_id",
      "coordinates": {...},
      "notes": [...],
      "osmTags": {...}
    }
  ]
}

### Pin System

- **🟢 Green Pins**: Locally created notes (editable)
- **🔴 Red Pins**: Server-saved notes (read-only)



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

Current version: 0.1.3

See [CHANGELOG.md](CHANGELOG.md) for version history and updates.