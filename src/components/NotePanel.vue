<template>
  <div class="note-panel" v-if="isVisible">
    <div class="note-panel__header">
      <h3>
        <i class="fas fa-sticky-note"></i>
        New Note at {{ coordinates.lat?.toFixed(6) }}, {{ coordinates.lng?.toFixed(6) }}
      </h3>
      <button @click="$emit('close')" class="btn btn--small btn--secondary">
        <i class="fas fa-times"></i>
      </button>
    </div>
    
    <div class="note-panel__content">
      <!-- Text Note -->
      <div class="note-section">
        <label class="note-label">
          <i class="fas fa-edit"></i>
          Text Note
        </label>
        <textarea 
          v-model="textNote" 
          placeholder="Enter your note here..."
          class="note-textarea"
          rows="4"
        ></textarea>
      </div>
      
      <!-- Audio Recording -->
      <div class="note-section">
        <label class="note-label">
          <i class="fas fa-microphone"></i>
          Audio Recording
        </label>
        <div class="audio-controls">
          <button 
            @click="toggleRecording" 
            :class="['btn', isRecording ? 'btn--danger' : 'btn--primary']"
            :disabled="isProcessing"
          >
            <i :class="isRecording ? 'fas fa-stop' : 'fas fa-microphone'"></i>
            {{ isRecording ? 'Stop Recording' : 'Start Recording' }}
          </button>
          <span v-if="recordingDuration > 0" class="recording-duration">
            {{ formatDuration(recordingDuration) }}
          </span>
        </div>
        <audio v-if="audioUrl" :src="audioUrl" controls class="audio-player"></audio>
      </div>
      
      <!-- Photo Capture -->
      <div class="note-section">
        <label class="note-label">
          <i class="fas fa-camera"></i>
          Photo
        </label>
        <div class="photo-controls">
          <input 
            ref="fileInput"
            type="file" 
            accept="image/*" 
            capture="environment"
            @change="handleFileSelect"
            style="display: none;"
          >
          <button @click="openCamera" class="btn btn--primary">
            <i class="fas fa-camera"></i>
            Take Photo
          </button>
          <button @click="openGallery" class="btn btn--secondary">
            <i class="fas fa-images"></i>
            From Gallery
          </button>
        </div>
        <div v-if="photoUrl" class="photo-preview">
          <img :src="photoUrl" alt="Note photo" class="preview-image">
          <button @click="removePhoto" class="btn btn--small btn--danger remove-photo">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
    
    <div class="note-panel__footer">
      <button @click="saveNote" class="btn btn--primary" :disabled="!hasContent || isProcessing">
        <i class="fas fa-save"></i>
        Save Note
      </button>
      <button @click="$emit('close')" class="btn btn--secondary">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch, onUnmounted } from 'vue'

export default {
  name: 'NotePanel',
  props: {
    isVisible: {
      type: Boolean,
      default: false
    },
    coordinates: {
      type: Object,
      required: true
    }
  },
  emits: ['close', 'save-note'],
  setup(props, { emit }) {
    const textNote = ref('')
    const audioUrl = ref(null)
    const photoUrl = ref(null)
    const fileInput = ref(null)
    
    // Audio recording state
    const isRecording = ref(false)
    const isProcessing = ref(false)
    const recordingDuration = ref(0)
    const mediaRecorder = ref(null)
    const audioChunks = ref([])
    const recordingTimer = ref(null)
    
    const hasContent = computed(() => {
      return textNote.value.trim() || audioUrl.value || photoUrl.value
    })
    
    const toggleRecording = async () => {
      if (isRecording.value) {
        stopRecording()
      } else {
        await startRecording()
      }
    }
    
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        
        mediaRecorder.value = new MediaRecorder(stream)
        audioChunks.value = []
        
        mediaRecorder.value.ondataavailable = (event) => {
          audioChunks.value.push(event.data)
        }
        
        mediaRecorder.value.onstop = () => {
          const audioBlob = new Blob(audioChunks.value, { type: 'audio/wav' })
          audioUrl.value = URL.createObjectURL(audioBlob)
          
          // Stop all tracks to release microphone
          stream.getTracks().forEach(track => track.stop())
        }
        
        mediaRecorder.value.start()
        isRecording.value = true
        recordingDuration.value = 0
        
        recordingTimer.value = setInterval(() => {
          recordingDuration.value += 1
        }, 1000)
        
      } catch (error) {
        console.error('Error accessing microphone:', error)
        alert('Cannot access microphone. Please check permissions.')
      }
    }
    
    const stopRecording = () => {
      if (mediaRecorder.value && isRecording.value) {
        mediaRecorder.value.stop()
        isRecording.value = false
        
        if (recordingTimer.value) {
          clearInterval(recordingTimer.value)
          recordingTimer.value = null
        }
      }
    }
    
    const openCamera = () => {
      fileInput.value.setAttribute('capture', 'environment')
      fileInput.value.click()
    }
    
    const openGallery = () => {
      fileInput.value.removeAttribute('capture')
      fileInput.value.click()
    }
    
    const handleFileSelect = (event) => {
      const file = event.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          photoUrl.value = e.target.result
        }
        reader.readAsDataURL(file)
      }
    }
    
    const removePhoto = () => {
      photoUrl.value = null
      fileInput.value.value = ''
    }
    
    const formatDuration = (seconds) => {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    }
    
    const saveNote = () => {
      const noteData = {
        coordinates: props.coordinates,
        textNote: textNote.value,
        audioUrl: audioUrl.value,
        photoUrl: photoUrl.value,
        timestamp: new Date().toISOString()
      }
      
      emit('save-note', noteData)
      resetForm()
    }
    
    const resetForm = () => {
      textNote.value = ''
      audioUrl.value = null
      photoUrl.value = null
      recordingDuration.value = 0
      if (fileInput.value) {
        fileInput.value.value = ''
      }
    }
    
    // Clean up on unmount
    onUnmounted(() => {
      if (recordingTimer.value) {
        clearInterval(recordingTimer.value)
      }
      if (isRecording.value) {
        stopRecording()
      }
    })
    
    // Reset form when panel is hidden
    watch(() => props.isVisible, (newValue) => {
      if (!newValue) {
        resetForm()
      }
    })
    
    return {
      textNote,
      audioUrl,
      photoUrl,
      fileInput,
      isRecording,
      isProcessing,
      recordingDuration,
      hasContent,
      toggleRecording,
      openCamera,
      openGallery,
      handleFileSelect,
      removePhoto,
      formatDuration,
      saveNote
    }
  }
}
</script>

<style scoped>
.note-panel {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  border-radius: 8px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  z-index: 2000;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.note-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #eee;
  background: #f8f9fa;
  border-radius: 8px 8px 0 0;
}

.note-panel__header h3 {
  margin: 0;
  font-size: 16px;
  color: #333;
  display: flex;
  align-items: center;
  gap: 8px;
}

.note-panel__content {
  padding: 20px;
}

.note-section {
  margin-bottom: 24px;
}

.note-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: #333;
  margin-bottom: 8px;
  font-size: 14px;
}

.note-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-family: inherit;
  font-size: 14px;
  resize: vertical;
  min-height: 100px;
}

.note-textarea:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.audio-controls, .photo-controls {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.recording-duration {
  font-weight: 500;
  color: #dc3545;
  font-family: monospace;
}

.audio-player {
  width: 100%;
  margin-top: 12px;
}

.photo-preview {
  position: relative;
  margin-top: 12px;
}

.preview-image {
  width: 100%;
  max-width: 300px;
  border-radius: 6px;
  border: 1px solid #ddd;
}

.remove-photo {
  position: absolute;
  top: 8px;
  right: 8px;
}

.note-panel__footer {
  padding: 16px 20px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  background: #f8f9fa;
  border-radius: 0 0 8px 8px;
}

.btn--danger {
  background: #dc3545;
}

.btn--danger:hover {
  background: #c82333;
}

@media (max-width: 768px) {
  .note-panel {
    width: 95%;
    max-height: 95vh;
  }
  
  .note-panel__header,
  .note-panel__content,
  .note-panel__footer {
    padding: 12px 16px;
  }
  
  .audio-controls, .photo-controls {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>