
import App from './App.vue'
import { createPinia } from 'pinia'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import router from '@/router/routes'


const pinia = createPinia()
const app = createApp(App)
app.use(router)

registerPlugins(app)
app.use(pinia)
app.mount('#app')
