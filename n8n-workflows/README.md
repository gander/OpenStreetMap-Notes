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
   - API Key for OpenAI GPT-4o or compatible API

2. **External API Authentication** (ID: `external-api-auth`) 
   - HTTP Header Auth for external storage service
   - Example: `Authorization: Bearer YOUR_API_TOKEN`

### Getting API Keys

#### OpenAI API Key
1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Navigate to "API Keys" section
4. Click "Create new secret key"
5. Copy the generated key (starts with `sk-`)
6. Add billing information and set usage limits as needed

#### Perplexity API Key (OpenAI-compatible)
1. Visit [Perplexity AI API](https://www.perplexity.ai/settings/api)
2. Sign in or create an account
3. Navigate to API settings
4. Generate new API key
5. Copy the key (starts with `pplx-`)
6. Use OpenAI-compatible endpoint: `https://api.perplexity.ai/`

#### Other OpenAI-Compatible APIs

**Anthropic Claude (via OpenAI compatibility layer)**
- Get API key from [Anthropic Console](https://console.anthropic.com/)
- Use with OpenAI-compatible wrappers

**Azure OpenAI Service**
- Set up through [Azure Portal](https://portal.azure.com/)
- Deploy GPT models in your Azure subscription
- Use Azure-specific endpoints and authentication

**Local Models (Ollama, LM Studio)**
- Install [Ollama](https://ollama.ai/) or [LM Studio](https://lmstudio.ai/)
- Run local models with OpenAI-compatible APIs
- No API key required for local deployment

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

### Configuration Panel Setup

Once your n8n workflows are active, configure the OSM Notes application by clicking the **Config** button in the application header. Fill in the following fields:

#### API Endpoint Configuration:

**1. Media-to-Text API Endpoint**
- **Field Label**: "Media to Text API"
- **Value**: `https://your-n8n-instance.com/webhook/media-to-text`
- **Description**: Converts audio recordings and images to text using AI

**2. OSM Tag Generation API Endpoint**
- **Field Label**: "OSM Tag Generation API" 
- **Value**: `https://your-n8n-instance.com/webhook/generate-osm-tags`
- **Description**: Generates OpenStreetMap tags from note content

**3. Data Storage API Endpoint**
- **Field Label**: "Data Storage API"
- **Value**: `https://your-n8n-instance.com/webhook/notes`
- **Description**: Stores and retrieves notes from external service

#### Configuration Steps:

1. **Open Configuration Panel**
   - Click the "Config" button in the top-right header of the OSM Notes application
   - The configuration panel will slide out from the right side

2. **Enter n8n Webhook URLs**
   - Copy the webhook URLs from your active n8n workflows
   - Paste each URL into the corresponding API endpoint field
   - Ensure URLs include `/webhook/` path and correct endpoint names

3. **Test Configuration**
   - Click "Save Configuration" to apply settings
   - Test each endpoint by creating notes with different media types
   - Verify AI responses and data storage functionality

4. **Troubleshooting**
   - Check n8n workflow execution logs if endpoints fail
   - Verify webhook URLs are accessible and workflows are active
   - Ensure API credentials are properly configured in n8n

#### Example Configuration:
```
Media to Text API: https://n8n.yourcompany.com/webhook/media-to-text
OSM Tag Generation API: https://n8n.yourcompany.com/webhook/generate-osm-tags  
Data Storage API: https://n8n.yourcompany.com/webhook/notes
```

**Note**: Replace `n8n.yourcompany.com` with your actual n8n instance domain. The configuration persists in browser local storage.

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

## Recommended AI Models

### For Media-to-Text Workflow:
- **OpenAI GPT-4o** (Recommended) - Best multimodal capabilities for audio/image processing
- **OpenAI GPT-4 Turbo with Vision** - Good alternative for image analysis
- **Perplexity Sonar Large** - Cost-effective option with good transcription
- **Claude 3.5 Sonnet** - Excellent for detailed image analysis

### For OSM Tag Generation:
- **OpenAI GPT-4o** - Best understanding of geographic context and OSM standards
- **OpenAI GPT-4 Turbo** - Reliable for structured tag generation
- **Perplexity Sonar Large** - Good knowledge of mapping standards
- **Claude 3.5 Sonnet** - Strong analytical capabilities for location context

## Suggested Prompts

### Media-to-Text Prompt (Optimized):
```
You are an expert transcription and geographic analysis AI specializing in OpenStreetMap data collection.

TASK: Convert the provided media to accurate text for OSM note-taking.

FOR AUDIO: Provide exact transcription focusing on:
- Location descriptions and landmark names
- Business names, addresses, and amenities
- Infrastructure observations (roads, buildings, facilities)
- Accessibility features and public services

FOR IMAGES: Analyze and describe focusing on:
- Visible text (signs, addresses, business names)
- Architectural features and building types
- Transportation infrastructure
- Natural features and land use
- Notable landmarks or points of interest

CONTEXT: 
- Coordinates: {{ $json.coordinates?.lat }}, {{ $json.coordinates?.lng }}
- This data will be used for OpenStreetMap contributions
- Focus on factual, observable details
- Use standard terminology for geographic features

OUTPUT FORMAT: Clear, structured text suitable for OSM notes.
```

### OSM Tag Generation Prompt (Optimized):
```
You are an OpenStreetMap tagging expert with comprehensive knowledge of OSM data standards and taxonomies.

TASK: Generate appropriate OSM tags based on the note content and coordinates.

INPUT:
- Note content: {{ $json.note_text }}
- Coordinates: {{ $json.coordinates?.lat }}, {{ $json.coordinates?.lng }}

INSTRUCTIONS:
1. Analyze the note content for mappable features
2. Apply standard OSM tags following the OSM Wiki taxonomy
3. Prioritize well-established tags over experimental ones
4. Consider the geographic context and local conventions
5. Assign confidence scores based on information clarity

REQUIRED OUTPUT FORMAT (JSON):
{
  "tags": {
    "primary_key": "primary_value",
    "additional_key": "additional_value"
  },
  "confidence": 0.XX,
  "reasoning": "Brief explanation of tag choices and mapping rationale"
}

COMMON TAG CATEGORIES:
- amenity: restaurants, shops, services, healthcare, education
- highway: roads, paths, cycling infrastructure
- building: residential, commercial, industrial types
- natural: water bodies, vegetation, terrain features
- tourism: attractions, accommodations, information
- public_transport: stops, stations, routes

VALIDATION: Ensure all tags follow OSM standards and are suitable for the described feature type.
```

### Advanced Configuration Tips:

**Model Parameters:**
- Temperature: 0.1-0.3 (for consistent, factual outputs)
- Max Tokens: 1000-2000 (depending on expected response length)
- Top P: 0.9-1.0 (for comprehensive coverage)

**API Endpoint Configuration:**
- OpenAI: `https://api.openai.com/v1/chat/completions`
- Perplexity: `https://api.perplexity.ai/chat/completions`
- Azure OpenAI: `https://YOUR_RESOURCE.openai.azure.com/openai/deployments/YOUR_DEPLOYMENT/chat/completions?api-version=2024-02-15-preview`

**Cost Optimization:**
- Use GPT-4o for complex multimodal tasks
- Use GPT-4 Turbo for text-only OSM tag generation
- Consider Perplexity for cost-effective processing
- Implement request batching where possible

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