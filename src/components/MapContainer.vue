<template>
  <div class="map-container">
    <div ref="mapElement" class="map"></div>
    
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
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import L from 'leaflet'
import { useGeolocation } from '../composables/useGeolocation'

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

export default {
  name: 'MapContainer',
  emits: ['coordinates-changed', 'location-found', 'location-error', 'map-event'],
  setup(props, { emit }) {
    const mapElement = ref(null)
    const map = ref(null)
    const locationMarker = ref(null)
    const isLocating = ref(false)
    const locationStatus = ref(null)

    const { getCurrentPosition } = useGeolocation()

    const initializeMap = async () => {
      if (!mapElement.value) return

      // Initialize map with default coordinates (London)
      map.value = L.map(mapElement.value, {
        zoomControl: false,
        attributionControl: true
      }).setView([51.505, -0.09], 13)

      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(map.value)

      // Add zoom control to bottom right
      L.control.zoom({
        position: 'bottomright'
      }).addTo(map.value)

      // Add map event listeners
      map.value.on('moveend', handleMapMove)
      map.value.on('zoomend', handleMapZoom)
      map.value.on('click', handleMapClick)

      emit('map-event', { type: 'map_initialized', message: 'Map initialized successfully' })

      // Try to get initial GPS location
      await locateUser()
    }

    const handleMapMove = () => {
      const center = map.value.getCenter()
      emit('coordinates-changed', {
        lat: center.lat,
        lng: center.lng,
        accuracy: null
      })
      emit('map-event', { type: 'map_moved', message: `Map moved to ${center.lat.toFixed(6)}, ${center.lng.toFixed(6)}` })
    }

    const handleMapZoom = () => {
      const zoom = map.value.getZoom()
      emit('map-event', { type: 'map_zoomed', message: `Map zoom changed to ${zoom}` })
    }

    const handleMapClick = (e) => {
      map.value.setView([e.latlng.lat, e.latlng.lng])
      emit('map-event', { type: 'map_clicked', message: `Map clicked at ${e.latlng.lat.toFixed(6)}, ${e.latlng.lng.toFixed(6)}` })
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

        // Update map view
        map.value.setView([latitude, longitude], 16)

        // Remove existing location marker
        if (locationMarker.value) {
          map.value.removeLayer(locationMarker.value)
        }

        // Add location marker
        locationMarker.value = L.marker([latitude, longitude], {
          title: 'Your Location'
        }).addTo(map.value)

        // Add accuracy circle
        const accuracyCircle = L.circle([latitude, longitude], {
          radius: accuracy,
          color: '#3388ff',
          fillColor: '#3388ff',
          fillOpacity: 0.1,
          weight: 2
        }).addTo(map.value)

        locationMarker.value.accuracyCircle = accuracyCircle

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

    onMounted(async () => {
      await nextTick()
      await initializeMap()
    })

    onUnmounted(() => {
      if (map.value) {
        map.value.remove()
      }
    })

    return {
      mapElement,
      isLocating,
      locationStatus,
      locateUser,
      getStatusIcon
    }
  }
}
</script>
