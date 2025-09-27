// src/composables/useTheme.ts
import { ref, onMounted } from 'vue'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'theme'

export function useTheme() {
  const isDark = ref<boolean>(false)

  const setClass = (dark: boolean) => {
    const root = document.documentElement
    dark ? root.classList.add('dark') : root.classList.remove('dark')
  }

  const apply = (dark: boolean) => {
    setClass(dark)
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    isDark.value = dark
  }

  const toggle = () => apply(!isDark.value)

  const detectPreferred = (): Theme => {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null
    if (saved === 'light' || saved === 'dark') return saved
    const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)')?.matches
    return prefersDark ? 'dark' : 'light'
  }

  onMounted(() => {
    const theme = detectPreferred()
    apply(theme === 'dark')
  })

  return { isDark, apply, toggle }
}

