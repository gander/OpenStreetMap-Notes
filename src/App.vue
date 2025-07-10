<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <h1 class="header__title">
        <i class="fas fa-crosshairs"></i>
        OSM Notes v0.1.0
      </h1>
      <div class="header__controls">
        <button 
          @click="toggleEventLogger" 
          class="btn btn--secondary"
          :class="{ 'btn--active': showEventLogger }"
        >
          <i class="fas fa-list"></i>
          <span class="btn__text">Events</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <!-- Map Container -->
      <div class="map-section">
        <MapContainer 
          @coordinates-changed="handleCoordinatesChanged"
          @location-found="handleLocationFound"
          @location-error="handleLocationError"
          @map-event="logEvent"
        />
        <Crosshair />
      </div>

      <!-- Coordinate Display -->
      <CoordinateDisplay 
        :coordinates="currentCoordinates"
        @copy-coordinates="handleCopyCoordinates"
      />

      <!-- Event Logger Panel -->
      <EventLogger 
        v-if="showEventLogger"
        :events="events"
        @close="showEventLogger = false"
        @clear-events="clearEvents"
      />
    </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import MapContainer from './components/MapContainer.vue'
import Crosshair from './components/Crosshair.vue'
import EventLogger from './components/EventLogger.vue'
import CoordinateDisplay from './components/CoordinateDisplay.vue'
import { useEventLogger } from './composables/useEventLogger'

export default {
  name: 'App',
  components: {
    MapContainer,
    Crosshair,
    EventLogger,
    CoordinateDisplay
  },
  setup() {
    const showEventLogger = ref(false)
    const currentCoordinates = ref({ lat: null, lng: null, accuracy: null })
    
    const { events, logEvent, clearEvents } = useEventLogger()

    const toggleEventLogger = () => {
      showEventLogger.value = !showEventLogger.value
      logEvent('ui', `Event logger ${showEventLogger.value ? 'opened' : 'closed'}`)
    }

    const handleCoordinatesChanged = (coords) => {
      currentCoordinates.value = coords
      logEvent('coordinates', `Crosshair positioned at ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`)
    }

    const handleLocationFound = (coords) => {
      logEvent('gps', `GPS location found: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)} (accuracy: ${coords.accuracy}m)`)
    }

    const handleLocationError = (error) => {
      logEvent('error', `GPS error: ${error.message}`)
    }

    const handleCopyCoordinates = (coords) => {
      logEvent('ui', `Coordinates copied to clipboard: ${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}`)
    }

    onMounted(() => {
      logEvent('system', 'Application initialized')
    })

    return {
      showEventLogger,
      currentCoordinates,
      events,
      toggleEventLogger,
      handleCoordinatesChanged,
      handleLocationFound,
      handleLocationError,
      handleCopyCoordinates,
      logEvent,
      clearEvents
    }
  }
}
</script>
