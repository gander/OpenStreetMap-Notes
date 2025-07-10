<template>
  <div class="coordinate-display">
    <div class="coordinate-display__content">
      <h3 class="coordinate-display__title">
        <i class="fas fa-crosshairs"></i>
        Current Coordinates
      </h3>
      
      <div v-if="coordinates.lat && coordinates.lng" class="coordinate-display__values">
        <div class="coordinate-item">
          <label class="coordinate-item__label">Latitude:</label>
          <div class="coordinate-item__value">
            <span class="coordinate-item__number">{{ formatCoordinate(coordinates.lat) }}</span>
            <button 
              @click="copyToClipboard(coordinates.lat)" 
              class="btn btn--small btn--icon"
              title="Copy latitude"
            >
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <div class="coordinate-item">
          <label class="coordinate-item__label">Longitude:</label>
          <div class="coordinate-item__value">
            <span class="coordinate-item__number">{{ formatCoordinate(coordinates.lng) }}</span>
            <button 
              @click="copyToClipboard(coordinates.lng)" 
              class="btn btn--small btn--icon"
              title="Copy longitude"
            >
              <i class="fas fa-copy"></i>
            </button>
          </div>
        </div>
        
        <div v-if="coordinates.accuracy" class="coordinate-item">
          <label class="coordinate-item__label">Accuracy:</label>
          <div class="coordinate-item__value">
            <span class="coordinate-item__number">±{{ Math.round(coordinates.accuracy) }}m</span>
          </div>
        </div>
        
        <div class="coordinate-display__actions">
          <button @click="copyBothCoordinates" class="btn btn--primary">
            <i class="fas fa-copy"></i>
            Copy Both Coordinates
          </button>
          <button @click="copyAsString" class="btn btn--secondary">
            <i class="fas fa-link"></i>
            Copy as String
          </button>
        </div>
      </div>
      
      <div v-else class="coordinate-display__empty">
        <i class="fas fa-location-arrow"></i>
        <p>Move the map to select coordinates</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CoordinateDisplay',
  props: {
    coordinates: {
      type: Object,
      required: true
    }
  },
  emits: ['copy-coordinates'],
  setup(props, { emit }) {
    const copySuccess = ref(false)

    const formatCoordinate = (coord) => {
      return coord ? coord.toFixed(6) : '0.000000'
    }

    const copyToClipboard = async (value) => {
      try {
        await navigator.clipboard.writeText(value.toString())
        showCopySuccess()
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        // Fallback for older browsers
        fallbackCopy(value.toString())
      }
    }

    const copyBothCoordinates = async () => {
      if (!props.coordinates.lat || !props.coordinates.lng) return

      const coordString = `${formatCoordinate(props.coordinates.lat)}, ${formatCoordinate(props.coordinates.lng)}`
      
      try {
        await navigator.clipboard.writeText(coordString)
        showCopySuccess()
        emit('copy-coordinates', props.coordinates)
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        fallbackCopy(coordString)
      }
    }

    const copyAsString = async () => {
      if (!props.coordinates.lat || !props.coordinates.lng) return

      const coordString = `lat: ${formatCoordinate(props.coordinates.lat)}, lng: ${formatCoordinate(props.coordinates.lng)}`
      
      try {
        await navigator.clipboard.writeText(coordString)
        showCopySuccess()
        emit('copy-coordinates', props.coordinates)
      } catch (error) {
        console.error('Failed to copy to clipboard:', error)
        fallbackCopy(coordString)
      }
    }

    const fallbackCopy = (text) => {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      try {
        document.execCommand('copy')
        showCopySuccess()
      } catch (error) {
        console.error('Fallback copy failed:', error)
      }
      
      document.body.removeChild(textArea)
    }

    const showCopySuccess = () => {
      copySuccess.value = true
      setTimeout(() => {
        copySuccess.value = false
      }, 2000)
    }

    return {
      copySuccess,
      formatCoordinate,
      copyToClipboard,
      copyBothCoordinates,
      copyAsString
    }
  }
}
</script>

<style scoped>
.coordinate-display {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin: 16px;
  overflow: hidden;
}

.coordinate-display__content {
  padding: 20px;
}

.coordinate-display__title {
  margin: 0 0 16px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.coordinate-display__values {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.coordinate-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.coordinate-item__label {
  font-weight: 500;
  color: #495057;
  min-width: 80px;
}

.coordinate-item__value {
  display: flex;
  align-items: center;
  gap: 8px;
}

.coordinate-item__number {
  font-family: 'Courier New', monospace;
  font-weight: 600;
  color: #2c3e50;
  font-size: 14px;
  background: white;
  padding: 4px 8px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
}

.coordinate-display__actions {
  display: flex;
  gap: 8px;
  margin-top: 16px;
  flex-wrap: wrap;
}

.coordinate-display__empty {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.coordinate-display__empty i {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.coordinate-display__empty p {
  margin: 0;
  font-size: 14px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .coordinate-display {
    margin: 12px;
  }
  
  .coordinate-display__content {
    padding: 16px;
  }
  
  .coordinate-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .coordinate-item__value {
    width: 100%;
    justify-content: space-between;
  }
  
  .coordinate-display__actions {
    flex-direction: column;
  }
  
  .coordinate-display__actions .btn {
    width: 100%;
  }
}
</style>
