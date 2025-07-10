# OSM Notes - n8n Workflows

Te pliki workflow dla n8n 1.101.1 zapewniają obsługę endpointów API dla aplikacji OSM Notes.

## Pliki workflow

### 1. media-to-text-workflow.json
**Endpoint**: POST `/media-to-text`

Konwertuje pliki audio i obrazy na tekst przy użyciu AI Agent Node (OpenAI).

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
  "transcription": "Transkrypcja audio lub opis obrazu",
  "coordinates": { "lat": 50.0647, "lng": 19.9450 },
  "media_type": "audio",
  "timestamp": "2025-07-10T01:30:00.000Z"
}
```

### 2. osm-tag-generation-workflow.json
**Endpoint**: POST `/generate-osm-tags`

Generuje tagi OpenStreetMap na podstawie treści notatki przy użyciu AI Agent Node.

**Request body**:
```json
{
  "note_text": "Restauracja serwująca pizzę przy głównej ulicy",
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
  "reasoning": "Zidentyfikowano restaurację serwującą pizzę",
  "coordinates": { "lat": 50.0647, "lng": 19.9450 },
  "timestamp": "2025-07-10T01:30:00.000Z"
}
```

### 3. data-storage-workflow.json
**Endpoints**: 
- GET `/notes` - pobieranie notatek
- POST `/notes` - zapisywanie notatek

Używa HTTP Request Node do komunikacji z zewnętrzną usługą przechowywania danych.

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
      "note_text": "Tekst notatki",
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
  "note_text": "Nowa notatka",
  "osm_tags": { "amenity": "shop" },
  "media_data": {},
  "external_api_url": "https://your-api.com/notes"
}
```

## Konfiguracja

### Wymagane credentials w n8n:

1. **OpenAI Credentials** (ID: `openai-credentials`)
   - API Key dla OpenAI GPT-4o

2. **External API Authentication** (ID: `external-api-auth`) 
   - HTTP Header Auth dla zewnętrznej usługi storage
   - Przykład: `Authorization: Bearer YOUR_API_TOKEN`

### Importowanie workflow:

1. Otwórz n8n
2. Idź do Workflows → Import from file
3. Wybierz każdy plik JSON
4. Skonfiguruj credentials
5. Aktywuj workflow

### Testowanie endpointów:

Każdy workflow generuje webhook URL który można wykorzystać w aplikacji:
- `https://your-n8n-instance.com/webhook/media-to-text`
- `https://your-n8n-instance.com/webhook/generate-osm-tags` 
- `https://your-n8n-instance.com/webhook/notes`

## Integracja z aplikacją OSM Notes

W pliku `src/components/ConfigPanel.vue` ustaw:

```javascript
{
  mediaToTextEndpoint: 'https://your-n8n-instance.com/webhook/media-to-text',
  osmTagEndpoint: 'https://your-n8n-instance.com/webhook/generate-osm-tags',
  dataStorageEndpoint: 'https://your-n8n-instance.com/webhook/notes'
}
```

## Funkcje AI Agent Node

### Media to Text:
- Transkrypcja audio do tekstu
- Analiza obrazów i opis zawartości
- Rozpoznawanie tekstu na zdjęciach
- Kontekst geograficzny (współrzędne)

### OSM Tag Generation:
- Analiza treści notatki
- Automatyczne generowanie tagów OSM
- Walidacja i czyszczenie tagów
- Ocena pewności predykcji

## Obsługa błędów

Wszystkie workflow zawierają:
- Obsługę błędów AI API
- Walidację danych wejściowych  
- Strukturalne odpowiedzi błędów
- Logowanie dla debugowania

## Wersja n8n

Workflow są kompatybilne z n8n 1.101.1 i wykorzystują:
- Webhook Node (v1)
- OpenAI Node (v1) jako AI Agent Node
- HTTP Request Node (v4.2)
- Code Node (v2)
- Respond to Webhook Node (v1)