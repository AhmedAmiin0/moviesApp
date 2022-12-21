
import App from './App.vue'
import { createPinia } from 'pinia'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import router from '@/router/routes'
import { plugin, defaultConfig } from '@formkit/vue'


const pinia = createPinia()
const app = createApp(App)
app.use(router)

registerPlugins(app)
app.use(pinia)
app.use(plugin, defaultConfig)
app.mount('#app')
