import { ref } from 'vue'

export function useGeolocation() {
  const isSupported = ref('geolocation' in navigator)
  const isLoading = ref(false)
  const error = ref(null)

  const getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
      if (!isSupported.value) {
        const geoError = new Error('Geolocation is not supported by this browser')
        geoError.code = 0
        reject(geoError)
        return
      }

      isLoading.value = true
      error.value = null

      const defaultOptions = {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000
      }

      const finalOptions = { ...defaultOptions, ...options }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          isLoading.value = false
          resolve(position)
        },
        (err) => {
          isLoading.value = false
          error.value = err
          reject(err)
        },
        finalOptions
      )
    })
  }

  const watchPosition = (callback, options = {}) => {
    if (!isSupported.value) {
      const geoError = new Error('Geolocation is not supported by this browser')
      geoError.code = 0
      error.value = geoError
      return null
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 15000,
      maximumAge: 60000
    }

    const finalOptions = { ...defaultOptions, ...options }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        error.value = null
        callback(position)
      },
      (err) => {
        error.value = err
        callback(null, err)
      },
      finalOptions
    )

    return watchId
  }

  const clearWatch = (watchId) => {
    if (watchId && isSupported.value) {
      navigator.geolocation.clearWatch(watchId)
    }
  }

  return {
    isSupported,
    isLoading,
    error,
    getCurrentPosition,
    watchPosition,
    clearWatch
  }
}
