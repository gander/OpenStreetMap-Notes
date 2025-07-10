import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

// OpenLayers Vue 3 integration
import OpenLayersMap from 'vue3-openlayers'
import 'vue3-openlayers/styles.css'

const app = createApp(App)
app.use(OpenLayersMap)
app.mount('#app')
