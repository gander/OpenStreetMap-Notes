<template>
  <div class="crosshair">
    <div class="crosshair__horizontal"></div>
    <div class="crosshair__vertical"></div>
    <div class="crosshair__center"></div>
  </div>
</template>

<script>
export default {
  name: 'Crosshair'
}
</script>

<style scoped>
.crosshair {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 1000;
  width: 40px;
  height: 40px;
}

.crosshair__horizontal,
.crosshair__vertical {
  position: absolute;
  background-color: #ff4444;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
}

.crosshair__horizontal {
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  transform: translateY(-50%);
}

.crosshair__vertical {
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  transform: translateX(-50%);
}

.crosshair__center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  border: 2px solid #ff4444;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.9);
  transform: translate(-50%, -50%);
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.8);
}

/* Animation for better visibility */
.crosshair__center {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.2);
    opacity: 0.8;
  }
}
</style>
