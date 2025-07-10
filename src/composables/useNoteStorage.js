import { ref, reactive } from 'vue'

const localNotes = ref([])
const serverNotes = ref([])

export function useNoteStorage() {
  const saveLocalNote = (noteData) => {
    const note = {
      id: generateId(),
      ...noteData,
      type: 'local',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    localNotes.value.push(note)
    saveToLocalStorage()
    
    return note
  }
  
  const loadFromLocalStorage = () => {
    try {
      const stored = localStorage.getItem('osm-notes-local')
      if (stored) {
        localNotes.value = JSON.parse(stored)
      }
    } catch (error) {
      console.error('Error loading notes from localStorage:', error)
    }
  }
  
  const saveToLocalStorage = () => {
    try {
      localStorage.setItem('osm-notes-local', JSON.stringify(localNotes.value))
    } catch (error) {
      console.error('Error saving notes to localStorage:', error)
    }
  }
  
  const deleteLocalNote = (noteId) => {
    const index = localNotes.value.findIndex(note => note.id === noteId)
    if (index !== -1) {
      localNotes.value.splice(index, 1)
      saveToLocalStorage()
    }
  }
  
  const updateLocalNote = (noteId, updates) => {
    const note = localNotes.value.find(note => note.id === noteId)
    if (note) {
      Object.assign(note, updates, { updatedAt: new Date().toISOString() })
      saveToLocalStorage()
    }
  }
  
  const getNotesInBounds = (bounds) => {
    // Get notes within map viewport
    const allNotes = [...localNotes.value, ...serverNotes.value]
    
    return allNotes.filter(note => {
      const lat = note.coordinates.lat
      const lng = note.coordinates.lng
      
      return lat >= bounds.south && 
             lat <= bounds.north && 
             lng >= bounds.west && 
             lng <= bounds.east
    })
  }
  
  const generateId = () => {
    return 'note_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
  }
  
  // Initialize from localStorage
  loadFromLocalStorage()
  
  return {
    localNotes,
    serverNotes,
    saveLocalNote,
    deleteLocalNote,
    updateLocalNote,
    getNotesInBounds,
    loadFromLocalStorage,
    saveToLocalStorage
  }
}