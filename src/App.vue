<template>
  <div class="app">
    <!-- Header -->
    <header class="header">
      <h1 class="header__title">
        <i class="fas fa-crosshairs"></i>
        OSM Notes v0.1.8
      </h1>
      <div class="header__controls">
        <button 
          @click="openNotePanel" 
          class="btn btn--primary"
          title="Add note at current coordinates"
          :disabled="!currentCoordinates.lat"
        >
          <i class="fas fa-sticky-note"></i>
          <span class="btn__text">Add Note</span>
        </button>
        

        
        <button 
          @click="openConfigPanel" 
          class="btn btn--secondary"
          title="Open configuration"
        >
          <i class="fas fa-cog"></i>
          <span class="btn__text">Config</span>
        </button>
      </div>
    </header>

    <!-- Main Content -->
    <main class="main">
      <!-- Map Container -->
      <div class="map-section">
        <MapContainer 
          :notes="allNotes"
          @coordinates-changed="handleCoordinatesChanged"
          @location-found="handleLocationFound"
          @location-error="handleLocationError"
          @map-event="logEvent"
          @pin-clicked="handlePinClick"
        />
        <Crosshair />
      </div>



      <!-- Note Panel -->
      <NotePanel 
        :is-visible="showNotePanel"
        :coordinates="currentCoordinates"
        @close="showNotePanel = false"
        @save-note="handleSaveNote"
      />

      <!-- Configuration Panel -->
      <ConfigPanel 
        :is-visible="showConfigPanel"
        @close="showConfigPanel = false"
        @save-config="handleSaveConfig"
      />


    </main>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import MapContainer from './components/MapContainer.vue'
import Crosshair from './components/Crosshair.vue'

import NotePanel from './components/NotePanel.vue'
import ConfigPanel from './components/ConfigPanel.vue'

import { useEventLogger } from './composables/useEventLogger'
import { useNoteStorage } from './composables/useNoteStorage'

export default {
  name: 'App',
  components: {
    MapContainer,
    Crosshair,
    NotePanel,
    ConfigPanel
  },
  setup() {

    const showNotePanel = ref(false)
    const showConfigPanel = ref(false)
    const currentCoordinates = ref({ lat: null, lng: null, accuracy: null })
    const appConfig = ref({
      mediaToTextEndpoint: '',
      osmTagEndpoint: '',
      dataStorageEndpoint: '',
      autoSaveLocal: true,
      loadServerNotes: true,
      gpsHighAccuracy: true
    })
    
    const { events, logEvent } = useEventLogger()
    const { localNotes, serverNotes, saveLocalNote } = useNoteStorage()
    
    const allNotes = computed(() => [...localNotes.value, ...serverNotes.value])



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

    const openNotePanel = () => {
      if (currentCoordinates.value.lat) {
        showNotePanel.value = true
        logEvent('ui', `Note panel opened for coordinates ${currentCoordinates.value.lat.toFixed(6)}, ${currentCoordinates.value.lng.toFixed(6)}`)
      }
    }

    const openConfigPanel = () => {
      showConfigPanel.value = true
      logEvent('ui', 'Configuration panel opened')
    }

    const handleSaveNote = (noteData) => {
      const savedNote = saveLocalNote(noteData)
      showNotePanel.value = false
      logEvent('note', `Local note saved with ID: ${savedNote.id}`)
    }

    const handlePinClick = (note) => {
      logEvent('ui', `Clicked on ${note.type} note pin: ${note.id}`)
      // TODO: Show note details or edit panel for the clicked note
    }

    const handleSaveConfig = (config) => {
      appConfig.value = { ...config }
      logEvent('config', 'Configuration saved with API endpoints updated')
    }

    onMounted(() => {
      logEvent('system', 'Application initialized with note-taking capabilities')
      // Add test events to verify event logger is working
      logEvent('system', 'Event logger system started')
      logEvent('ui', 'User interface loaded successfully')
      console.log('Current events:', events.value)
    })

    return {
      showNotePanel,
      showConfigPanel,
      currentCoordinates,
      allNotes,
      appConfig,
      openNotePanel,
      openConfigPanel,
      handleCoordinatesChanged,
      handleLocationFound,
      handleLocationError,
      handleSaveNote,
      handlePinClick,
      handleSaveConfig,
      logEvent
    }
  }
}
</script>
