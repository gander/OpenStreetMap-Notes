import { ref, reactive } from 'vue'

export function useEventLogger() {
  const events = ref([])
  const maxEvents = 100 // Maximum number of events to keep

  const logEvent = (type, message, additionalData = {}) => {
    const event = {
      id: Date.now() + Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: Date.now(),
      ...additionalData
    }

    events.value.push(event)

    // Keep only the latest maxEvents
    if (events.value.length > maxEvents) {
      events.value = events.value.slice(-maxEvents)
    }

    // Also log to console for debugging
    console.log(`[${type.toUpperCase()}] ${message}`, additionalData)
  }

  const clearEvents = () => {
    events.value = []
    logEvent('system', 'Event log cleared')
  }

  const getEventsByType = (type) => {
    return events.value.filter(event => event.type === type)
  }

  const getEventsInTimeRange = (startTime, endTime) => {
    return events.value.filter(event => 
      event.timestamp >= startTime && event.timestamp <= endTime
    )
  }

  const exportEvents = () => {
    const exportData = {
      exportDate: new Date().toISOString(),
      totalEvents: events.value.length,
      events: events.value
    }
    
    return JSON.stringify(exportData, null, 2)
  }

  return {
    events,
    logEvent,
    clearEvents,
    getEventsByType,
    getEventsInTimeRange,
    exportEvents
  }
}
