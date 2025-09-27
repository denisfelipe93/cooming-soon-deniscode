// src/composables/useLocale.ts
import { ref, computed } from 'vue'
import pt from '@/copy/pt'
import en from '@/copy/en' // novo arquivo
type Locale = 'pt' | 'en'
const STORAGE_KEY = 'locale'

const locale = ref<Locale>(
  (localStorage.getItem(STORAGE_KEY) as Locale) || 'pt'
)

const dictionaries = { pt, en }

export function useLocale() {
  const setLocale = (next: Locale) => {
    locale.value = next
    localStorage.setItem(STORAGE_KEY, next)
  }

  const toggleLocale = () => setLocale(locale.value === 'pt' ? 'en' : 'pt')

  // Retorna o dicionário atual
  const t = computed(() => dictionaries[locale.value])

  return { locale, setLocale, toggleLocale, t }
}
