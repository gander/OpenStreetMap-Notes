# OSM Notes - n8n Workflows

These workflow files for n8n 1.101.1 provide API endpoint support for the OSM Notes application.

## Workflow Files

### 1. media-to-text-workflow.json
**Endpoint**: POST `/media-to-text`

Converts audio files and images to text using AI Agent Node (OpenAI).

**Request body**:
```json
{
  "media": {
    "type": "audio|image", 
    "data": "base64_encoded_data_or_url"
  },
  "coordinates": {
    "lat": 50.0647,
    "lng": 19.9450
  }
}
```

**Response**:
```json
{
  "success": true,
  "transcription": "Audio transcription or image description",
  "coordinates": { "lat": 50.0647, "lng": 19.9450 },
  "media_type": "audio",
  "timestamp": "2025-07-10T01:30:00.000Z"
}
```

### 2. osm-tag-generation-workflow.json
**Endpoint**: POST `/generate-osm-tags`

Generates OpenStreetMap tags based on note content using AI Agent Node.

**Request body**:
```json
{
  "note_text": "Restaurant serving pizza on main street",
  "coordinates": {
    "lat": 50.0647,
    "lng": 19.9450
  }
}
```

**Response**:
```json
{
  "success": true,
  "tags": {
    "amenity": "restaurant",
    "cuisine": "pizza",
    "name": "Pizza Restaurant"
  },
  "confidence": 0.95,
  "reasoning": "Identified restaurant serving pizza",
  "coordinates": { "lat": 50.0647, "lng": 19.9450 },
  "timestamp": "2025-07-10T01:30:00.000Z"
}
```

### 3. data-storage-workflow.json
**Endpoints**: 
- GET `/notes` - retrieving notes
- POST `/notes` - saving notes

Uses HTTP Request Node to communicate with external data storage service.

**GET Request**:
```
GET /notes?bbox=19.9,50.0,20.0,50.1&limit=100
```

**GET Response**:
```json
{
  "success": true,
  "notes": [
    {
      "id": "note_123",
      "type": "server",
      "coordinates": { "lat": 50.0647, "lng": 19.9450 },
      "note_text": "Note text content",
      "osm_tags": { "amenity": "restaurant" },
      "timestamp": "2025-07-10T01:30:00.000Z"
    }
  ],
  "count": 1
}
```

**POST Request**:
```json
{
  "coordinates": { "lat": 50.0647, "lng": 19.9450 },
  "note_text": "New note content",
  "osm_tags": { "amenity": "shop" },
  "media_data": {},
  "external_api_url": "https://your-api.com/notes"
}
```

## Configuration

### Required credentials in n8n:

1. **OpenAI Credentials** (ID: `openai-credentials`)
   - API Key for OpenAI GPT-4o

2. **External API Authentication** (ID: `external-api-auth`) 
   - HTTP Header Auth for external storage service
   - Example: `Authorization: Bearer YOUR_API_TOKEN`

### Importing workflows:

1. Open n8n
2. Go to Workflows → Import from file
3. Select each JSON file
4. Configure credentials
5. Activate workflow

### Testing endpoints:

Each workflow generates a webhook URL that can be used in the application:
- `https://your-n8n-instance.com/webhook/media-to-text`
- `https://your-n8n-instance.com/webhook/generate-osm-tags` 
- `https://your-n8n-instance.com/webhook/notes`

## Integration with OSM Notes Application

In file `src/components/ConfigPanel.vue` set:

```javascript
{
  mediaToTextEndpoint: 'https://your-n8n-instance.com/webhook/media-to-text',
  osmTagEndpoint: 'https://your-n8n-instance.com/webhook/generate-osm-tags',
  dataStorageEndpoint: 'https://your-n8n-instance.com/webhook/notes'
}
```

## AI Agent Node Functions

### Media to Text:
- Audio transcription to text
- Image analysis and content description
- Text recognition in photos
- Geographic context (coordinates)

### OSM Tag Generation:
- Note content analysis
- Automatic OSM tag generation
- Tag validation and cleaning
- Confidence assessment of predictions

## Error Handling

All workflows include:
- AI API error handling
- Input data validation
- Structured error responses
- Debug logging

## n8n Version

Workflows are compatible with n8n 1.101.1 and use:
- Webhook Node (v1)
- OpenAI Node (v1) jako AI Agent Node
- HTTP Request Node (v4.2)
- Code Node (v2)
- Respond to Webhook Node (v1)