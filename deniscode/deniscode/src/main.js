// (antes de qualquer import)
try {
  const saved = localStorage.getItem('theme');
  const sys = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  document.documentElement.classList.toggle('dark', saved ? saved === 'dark' : sys);
} catch {}

// app
import { createApp } from 'vue'
import App from './App.vue'
import './main.css'
createApp(App).mount('#app')

