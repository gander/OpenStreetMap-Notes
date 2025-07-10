<template>
  <div class="map-container">
    <!-- OpenLayers Map -->
    <ol-map
      :loadTilesWhileAnimating="true"
      :loadTilesWhileInteracting="true"
      style="height: 100%"
      @moveend="handleMapMove"
      @click="handleMapClick"
    >
      <ol-view
        ref="view"
        :center="center"
        :zoom="zoom"
        :projection="projection"
      />

      <!-- OpenStreetMap Layer -->
      <ol-tile-layer>
        <ol-source-osm />
      </ol-tile-layer>

      <!-- GPS Location Marker -->
      <ol-vector-layer v-if="userLocation">
        <ol-source-vector>
          <ol-feature>
            <ol-geom-point :coordinates="userLocation" />
            <ol-style>
              <ol-style-circle :radius="8">
                <ol-style-fill color="blue" />
                <ol-style-stroke color="white" :width="2" />
              </ol-style-circle>
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>

      <!-- Note Pins -->
      <ol-vector-layer>
        <ol-source-vector>
          <ol-feature 
            v-for="note in notes" 
            :key="note.id"
            @click="handlePinClick(note)"
          >
            <ol-geom-point :coordinates="transform([note.coordinates.lng, note.coordinates.lat], 'EPSG:4326', 'EPSG:3857')" />
            <ol-style>
              <ol-style-circle :radius="12">
                <ol-style-fill :color="note.type === 'local' ? '#28a745' : '#dc3545'" />
                <ol-style-stroke color="white" :width="2" />
              </ol-style-circle>
              <ol-style-text :text="'📍'" :font="'16px sans-serif'" />
            </ol-style>
          </ol-feature>
        </ol-source-vector>
      </ol-vector-layer>
    </ol-map>
    
    <!-- Map Controls -->
    <div class="map-controls">
      <button 
        @click="locateUser" 
        class="btn btn--primary btn--round"
        :disabled="isLocating"
        :title="isLocating ? 'Locating...' : 'Find my location'"
      >
        <i :class="isLocating ? 'fas fa-spinner fa-spin' : 'fas fa-location-arrow'"></i>
      </button>
    </div>

    <!-- Location Status -->
    <div v-if="locationStatus" class="location-status" :class="`location-status--${locationStatus.type}`">
      <i :class="getStatusIcon(locationStatus.type)"></i>
      {{ locationStatus.message }}
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useGeolocation } from '../composables/useGeolocation'
import { transform } from 'ol/proj'

export default {
  name: 'MapContainer',
  props: {
    notes: {
      type: Array,
      default: () => []
    }
  },
  emits: ['coordinates-changed', 'location-found', 'location-error', 'map-event', 'pin-clicked'],
  setup(props, { emit }) {
    const view = ref(null)
    const isLocating = ref(false)
    const locationStatus = ref(null)
    const userLocation = ref(null)

    // Map configuration
    const center = ref([0, 0]) // Will be updated when location is found
    const zoom = ref(2)
    const projection = ref('EPSG:3857')

    const { getCurrentPosition } = useGeolocation()

    const handleMapMove = (event) => {
      if (view.value) {
        const center = view.value.getCenter()
        const [lng, lat] = transform(center, 'EPSG:3857', 'EPSG:4326')
        
        emit('coordinates-changed', {
          lat: lat,
          lng: lng,
          accuracy: null
        })
        emit('map-event', { type: 'map_moved', message: `Map moved to ${lat.toFixed(6)}, ${lng.toFixed(6)}` })
      }
    }

    const handleMapClick = (event) => {
      const [lng, lat] = transform(event.coordinate, 'EPSG:3857', 'EPSG:4326')
      
      emit('map-event', { type: 'map_clicked', message: `Map clicked at ${lat.toFixed(6)}, ${lng.toFixed(6)}` })
      
      // Update coordinates for crosshair
      emit('coordinates-changed', {
        lat: lat,
        lng: lng,
        accuracy: null
      })
    }

    const handlePinClick = (note) => {
      emit('pin-clicked', note)
      emit('map-event', { type: 'pin_clicked', message: `Clicked ${note.type} note pin` })
    }

    const locateUser = async () => {
      if (isLocating.value) return

      isLocating.value = true
      locationStatus.value = { type: 'info', message: 'Locating...' }

      try {
        const position = await getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        })

        const { latitude, longitude, accuracy } = position.coords

        // Convert to Web Mercator projection for OpenLayers
        const transformedCoords = transform([longitude, latitude], 'EPSG:4326', 'EPSG:3857')
        
        // Update map center and zoom
        center.value = transformedCoords
        zoom.value = 16
        userLocation.value = transformedCoords

        locationStatus.value = { 
          type: 'success', 
          message: `Location found (±${Math.round(accuracy)}m accuracy)` 
        }

        emit('location-found', {
          lat: latitude,
          lng: longitude,
          accuracy: accuracy
        })

        emit('coordinates-changed', {
          lat: latitude,
          lng: longitude,
          accuracy: accuracy
        })

        emit('map-event', { type: 'gps_location', message: `GPS location: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}` })

        // Clear status after 3 seconds
        setTimeout(() => {
          locationStatus.value = null
        }, 3000)

      } catch (error) {
        let errorMessage = 'Location access denied or unavailable'
        
        switch (error.code) {
          case 1:
            errorMessage = 'Location access denied by user'
            break
          case 2:
            errorMessage = 'Location unavailable'
            break
          case 3:
            errorMessage = 'Location request timed out'
            break
          default:
            errorMessage = error.message || 'Unknown location error'
        }

        locationStatus.value = { type: 'error', message: errorMessage }
        
        emit('location-error', { 
          code: error.code, 
          message: errorMessage 
        })

        // Clear status after 5 seconds
        setTimeout(() => {
          locationStatus.value = null
        }, 5000)
      } finally {
        isLocating.value = false
      }
    }

    const getStatusIcon = (type) => {
      switch (type) {
        case 'success':
          return 'fas fa-check-circle'
        case 'error':
          return 'fas fa-exclamation-circle'
        case 'info':
        default:
          return 'fas fa-info-circle'
      }
    }

    // Initialize with default location (London)
    center.value = transform([-0.09, 51.505], 'EPSG:4326', 'EPSG:3857')
    zoom.value = 13

    return {
      view,
      center,
      zoom,
      projection,
      userLocation,
      isLocating,
      locationStatus,
      handleMapMove,
      handleMapClick,
      handlePinClick,
      locateUser,
      getStatusIcon,
      transform
    }
  }
}
</script>
