<template>
  <div class="event-logger">
    <div class="event-logger__header">
      <h3 class="event-logger__title">
        <i class="fas fa-list"></i>
        Event Log
      </h3>
      <div class="event-logger__controls">
        <!-- Controls removed - event log stays open -->
      </div>
    </div>
    
    <div class="event-logger__content" ref="logContent">
      <div 
        v-for="event in events" 
        :key="event.id"
        class="event-logger__item"
        :class="`event-logger__item--${event.type}`"
      >
        <div class="event-logger__item-header">
          <span class="event-logger__item-type">
            <i :class="getEventIcon(event.type)"></i>
            {{ event.type.toUpperCase() }}
          </span>
          <span class="event-logger__item-time">
            {{ formatTime(event.timestamp) }}
          </span>
        </div>
        <div class="event-logger__item-message">
          {{ event.message }}
        </div>
      </div>
      
      <div v-if="events.length === 0" class="event-logger__empty">
        <i class="fas fa-inbox"></i>
        <p>No events logged yet</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, nextTick } from 'vue'

export default {
  name: 'EventLogger',
  props: {
    events: {
      type: Array,
      required: true
    }
  },
  emits: ['close'],
  setup(props) {
    const logContent = ref(null)

    const getEventIcon = (type) => {
      const icons = {
        gps: 'fas fa-location-arrow',
        coordinates: 'fas fa-crosshairs',
        map: 'fas fa-map',
        ui: 'fas fa-mouse-pointer',
        system: 'fas fa-cog',
        error: 'fas fa-exclamation-triangle',
        map_initialized: 'fas fa-map',
        map_moved: 'fas fa-arrows-alt',
        map_zoomed: 'fas fa-search',
        map_clicked: 'fas fa-mouse-pointer'
      }
      return icons[type] || 'fas fa-circle'
    }

    const formatTime = (timestamp) => {
      return new Date(timestamp).toLocaleTimeString()
    }

    // Auto-scroll to bottom when new events are added
    watch(() => props.events.length, async () => {
      await nextTick()
      if (logContent.value) {
        logContent.value.scrollTop = logContent.value.scrollHeight
      }
    })

    return {
      logContent,
      getEventIcon,
      formatTime
    }
  }
}
</script>

<style scoped>
.event-logger {
  position: fixed;
  top: 80px;
  right: 20px;
  width: 350px;
  max-height: calc(100vh - 120px);
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 3000;
  display: flex;
  flex-direction: column;
}

.event-logger__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #e1e5e9;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.event-logger__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 8px;
}

.event-logger__controls {
  display: flex;
  gap: 8px;
}

.event-logger__content {
  flex: 1;
  overflow-y: auto;
  max-height: 400px;
  padding: 8px;
}

.event-logger__item {
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 6px;
  border-left: 4px solid;
  background: #f8f9fa;
}

.event-logger__item--gps {
  border-left-color: #28a745;
  background: #f8fff9;
}

.event-logger__item--coordinates {
  border-left-color: #007bff;
  background: #f0f8ff;
}

.event-logger__item--ui {
  border-left-color: #6f42c1;
  background: #f8f6ff;
}

.event-logger__item--system {
  border-left-color: #6c757d;
  background: #f8f9fa;
}

.event-logger__item--error {
  border-left-color: #dc3545;
  background: #fff5f5;
}

.event-logger__item--map,
.event-logger__item--map_initialized,
.event-logger__item--map_moved,
.event-logger__item--map_zoomed,
.event-logger__item--map_clicked {
  border-left-color: #17a2b8;
  background: #f0fdff;
}

.event-logger__item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.event-logger__item-type {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.event-logger__item-time {
  font-size: 11px;
  color: #6c757d;
  font-family: monospace;
}

.event-logger__item-message {
  font-size: 13px;
  color: #495057;
  line-height: 1.4;
}

.event-logger__empty {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
}

.event-logger__empty i {
  font-size: 32px;
  margin-bottom: 12px;
  opacity: 0.5;
}

.event-logger__empty p {
  margin: 0;
  font-size: 14px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .event-logger {
    position: fixed;
    top: 60px;
    left: 10px;
    right: 10px;
    width: auto;
    max-height: calc(100vh - 80px);
  }
}
</style>
