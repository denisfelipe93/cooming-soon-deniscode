import { createApp } from 'vue'
import App from './App.vue'
import './styles/tailwind.css'

// (opcional) aplicar dark antes do paint
const saved = localStorage.getItem('theme')
if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.documentElement.classList.add('dark')
}

createApp(App).mount('#app')
