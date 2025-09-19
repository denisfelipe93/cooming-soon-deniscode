// src/composables/useLocale.js
import { ref, watch } from 'vue'

const _locale = ref('en')
let inited = false

function init() {
  if (inited) return
  inited = true
  try {
    const saved = localStorage.getItem('locale')
    _locale.value = saved === 'pt' ? 'pt' : 'en'
  } catch {}
  applyHtmlLang(_locale.value)
}

function applyHtmlLang(code) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', code === 'en' ? 'en' : 'pt-BR')
  }
}

watch(_locale, (val) => {
  try { localStorage.setItem('locale', val) } catch {}
  applyHtmlLang(val)
})

export function useLocale() {
  init()
  const setLocale = (code) => { _locale.value = code === 'pt' ? 'pt' : 'en' }
  return { locale: _locale, setLocale }
}
