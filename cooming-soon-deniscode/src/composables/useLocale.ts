import { ref } from 'vue'
type Locale = 'pt' | 'en'
const store = ref<Locale>((localStorage.getItem('locale') as Locale) || 'pt')
export function useLocale() {
  const locale = store
  const toggleLocale = () => {
    locale.value = locale.value === 'pt' ? 'en' : 'pt'
    localStorage.setItem('locale', locale.value)
  }
  return { locale, toggleLocale }
}
