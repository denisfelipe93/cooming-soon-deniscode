import { ref, onMounted, onBeforeUnmount } from 'vue'

const isDark = ref(false)
let media, onChange

function apply(dark, persist = true) {
  isDark.value = !!dark
  document.documentElement.classList.toggle('dark', isDark.value)
  if (persist) localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

function toggle() { apply(!isDark.value) }

function clearPreference() {
  localStorage.removeItem('theme')
  const prefers = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  apply(!!prefers, false)
}

function init() {
  const saved = localStorage.getItem('theme')
  const prefers = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  apply(saved ? saved === 'dark' : !!prefers, false)

  media = window.matchMedia?.('(prefers-color-scheme: dark)')
  onChange = (e) => { if (!localStorage.getItem('theme')) apply(e.matches, false) }
  media?.addEventListener?.('change', onChange)
  return () => media?.removeEventListener?.('change', onChange)
}

export function useTheme() {
  let cleanup
  onMounted(() => { cleanup = init() })
  onBeforeUnmount(() => { cleanup?.() })
  return { isDark, toggle, apply, clearPreference }
}
