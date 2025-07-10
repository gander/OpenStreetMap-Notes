<template>
  <div class="config-panel" v-if="isVisible">
    <div class="config-panel__header">
      <h3>
        <i class="fas fa-cog"></i>
        Configuration
      </h3>
      <button @click="$emit('close')" class="btn btn--small btn--secondary">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="config-panel__content">
      <!-- API Endpoints Section -->
      <div class="config-section">
        <h4 class="section-title">
          <i class="fas fa-link"></i>
          External API Endpoints
        </h4>
        
        <!-- Media-to-Text API -->
        <div class="config-field">
          <label class="config-label">
            Media-to-Text API (Endpoint #1)
            <span class="label-description">Converts audio/images + coordinates to text transcription</span>
          </label>
          <input 
            v-model="config.mediaToTextEndpoint" 
            type="url"
            placeholder="https://api.example.com/media-to-text"
            class="config-input"
          >
        </div>
        
        <!-- OSM Tag Generation API -->
        <div class="config-field">
          <label class="config-label">
            OSM Tag Generation API (Endpoint #2)
            <span class="label-description">Processes notes + coordinates to generate OSM tags</span>
          </label>
          <input 
            v-model="config.osmTagEndpoint" 
            type="url"
            placeholder="https://api.example.com/osm-tags"
            class="config-input"
          >
        </div>
        
        <!-- Data Storage API -->
        <div class="config-field">
          <label class="config-label">
            Data Storage API (Endpoint #3)
            <span class="label-description">Bidirectional storage (GET/POST) for coordinate data with notes and tags</span>
          </label>
          <input 
            v-model="config.dataStorageEndpoint" 
            type="url"
            placeholder="https://api.example.com/data-storage"
            class="config-input"
          >
        </div>
      </div>
      
      <!-- Application Settings -->
      <div class="config-section">
        <h4 class="section-title">
          <i class="fas fa-sliders-h"></i>
          Application Settings
        </h4>
        
        <div class="config-field">
          <label class="config-label">
            Auto-save notes locally
          </label>
          <div class="toggle-switch">
            <input 
              type="checkbox" 
              id="autoSave"
              v-model="config.autoSaveLocal"
              class="toggle-input"
            >
            <label for="autoSave" class="toggle-label"></label>
          </div>
        </div>
        
        <div class="config-field">
          <label class="config-label">
            Load server notes in viewport
          </label>
          <div class="toggle-switch">
            <input 
              type="checkbox" 
              id="loadServerNotes"
              v-model="config.loadServerNotes"
              class="toggle-input"
            >
            <label for="loadServerNotes" class="toggle-label"></label>
          </div>
        </div>
        
        <div class="config-field">
          <label class="config-label">
            GPS high accuracy mode
          </label>
          <div class="toggle-switch">
            <input 
              type="checkbox" 
              id="highAccuracy"
              v-model="config.gpsHighAccuracy"
              class="toggle-input"
            >
            <label for="highAccuracy" class="toggle-label"></label>
          </div>
        </div>
      </div>
      
      <!-- Debug Section -->
      <div class="config-section">
        <h4 class="section-title">
          <i class="fas fa-bug"></i>
          Debug Tools
        </h4>
        
        <div class="config-field">
          <button @click="toggleEventLogger" class="btn btn--secondary btn--full-width">
            <i class="fas fa-list"></i>
            {{ showEventLogger ? 'Hide' : 'Show' }} Event Log
          </button>
        </div>
        
        <div class="config-field">
          <button @click="exportConfig" class="btn btn--secondary btn--full-width">
            <i class="fas fa-download"></i>
            Export Configuration
          </button>
        </div>
        
        <div class="config-field">
          <button @click="resetConfig" class="btn btn--danger btn--full-width">
            <i class="fas fa-undo"></i>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
    
    <div class="config-panel__footer">
      <button @click="saveConfig" class="btn btn--primary">
        <i class="fas fa-save"></i>
        Save Configuration
      </button>
      <button @click="$emit('close')" class="btn btn--secondary">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { ref, reactive, watch } from 'vue'

export default {
  name: 'ConfigPanel',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    showEventLogger: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close', 'save-config', 'toggle-event-logger'],
  setup(props, { emit }) {
    const config = reactive({
      mediaToTextEndpoint: '',
      osmTagEndpoint: '',
      dataStorageEndpoint: '',
      autoSaveLocal: true,
      loadServerNotes: true,
      gpsHighAccuracy: true
    })
    
    const loadConfig = () => {
      try {
        const saved = localStorage.getItem('osm-notes-config')
        if (saved) {
          const savedConfig = JSON.parse(saved)
          Object.assign(config, savedConfig)
        }
      } catch (error) {
        console.error('Error loading configuration:', error)
      }
    }
    
    const saveConfig = () => {
      try {
        localStorage.setItem('osm-notes-config', JSON.stringify(config))
        emit('save-config', { ...config })
        emit('close')
      } catch (error) {
        console.error('Error saving configuration:', error)
        alert('Failed to save configuration')
      }
    }
    
    const exportConfig = () => {
      const configData = JSON.stringify(config, null, 2)
      const blob = new Blob([configData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      
      const a = document.createElement('a')
      a.href = url
      a.download = 'osm-notes-config.json'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
    
    const resetConfig = () => {
      if (confirm('Are you sure you want to reset all settings to defaults?')) {
        config.mediaToTextEndpoint = ''
        config.osmTagEndpoint = ''
        config.dataStorageEndpoint = ''
        config.autoSaveLocal = true
        config.loadServerNotes = true
        config.gpsHighAccuracy = true
      }
    }
    
    const toggleEventLogger = () => {
      emit('toggle-event-logger')
    }
    
    // Load configuration when component becomes visible
    watch(() => props.isVisible, (newValue) => {
      if (newValue) {
        loadConfig()
      }
    })
    
    // Load initial configuration
    loadConfig()
    
    return {
      config,
      saveConfig,
      exportConfig,
      resetConfig,
      toggleEventLogger
    }
  }
}
</script>

<style scoped>
.config-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.config-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.config-panel__header h3 {
  margin: 0;
  font-size: 18px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.config-panel__content {
  padding: 20px;
}

.config-section {
  margin-bottom: 32px;
}

.config-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}

.config-field {
  margin-bottom: 20px;
}

.config-label {
  display: block;
  font-weight: 500;
  color: #333;
  margin-bottom: 6px;
  font-size: 14px;
}

.label-description {
  display: block;
  font-weight: normal;
  color: #666;
  font-size: 12px;
  margin-top: 2px;
}

.config-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
}

.config-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.toggle-switch {
  position: relative;
  display: inline-block;
}

.toggle-input {
  display: none;
}

.toggle-label {
  display: block;
  width: 48px;
  height: 24px;
  background: #ccc;
  border-radius: 24px;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
}

.toggle-label::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.toggle-input:checked + .toggle-label {
  background: #007bff;
}

.toggle-input:checked + .toggle-label::after {
  transform: translateX(24px);
}

.btn--full-width {
  width: 100%;
  justify-content: center;
}

.btn--danger {
  background: #dc3545;
}

.btn--danger:hover {
  background: #c82333;
}

.config-panel__footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  background: #f8f9fa;
  border-radius: 0 0 8px 8px;
}

@media (max-width: 768px) {
  .config-panel {
    width: 95%;
    max-height: 95vh;
  }
  
  .config-panel__header,
  .config-panel__content,
  .config-panel__footer {
    padding: 12px 16px;
  }
  
  .config-panel__footer {
    flex-direction: column;
  }
}
</style>