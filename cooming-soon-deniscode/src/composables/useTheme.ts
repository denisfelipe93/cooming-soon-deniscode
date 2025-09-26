import { ref, onMounted } from 'vue'
export function useTheme() {
  const isDark = ref(false)
  const apply = (dark: boolean) => {
    const root = document.documentElement
    dark ? root.classList.add('dark') : root.classList.remove('dark')
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    isDark.value = dark
  }
  const toggle = () => apply(!isDark.value)
  onMounted(() => { isDark.value = document.documentElement.classList.contains('dark') })
  return { isDark, apply, toggle }
}
