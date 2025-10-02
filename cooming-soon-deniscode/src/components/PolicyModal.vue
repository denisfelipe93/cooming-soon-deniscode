<!-- src/components/PolicyModal.vue -->
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import UiModal from '@/components/UiModal.vue'
import { usePolicyModal } from '@/composables/usePolicyModal'
import { useLocale } from '@/composables/useLocale'

import MarkdownIt from 'markdown-it'
import matter from 'gray-matter'

const md = new MarkdownIt({ html: false, linkify: true, breaks: false })

const { open, kind } = usePolicyModal()
const { locale } = useLocale()

const html = ref<string>('Carregando…')
const title = computed(() =>
  kind.value === 'privacy'
    ? (locale.value === 'pt' ? 'Política de Privacidade' : 'Privacy Policy')
    : (locale.value === 'pt' ? 'Termos de Uso' : 'Terms of Use')
)

async function load() {
  const lang = locale.value === 'pt' ? 'pt' : 'en'
  const file = kind.value === 'privacy'
    ? `@/policies/privacy.${lang}.md?raw`
    : `@/policies/terms.${lang}.md?raw`

  try {
    // Vite embala ?raw como { default: string }
    const rawModule = await import(/* @vite-ignore */ file)
    const raw = (rawModule as { default: string }).default

    const parsed = matter(raw)           // front-matter + conteúdo
    html.value = md.render(parsed.content)
  } catch (e) {
    html.value = lang === 'pt'
      ? 'Não foi possível carregar o documento.'
      : 'Could not load the document.'
  }
}

onMounted(load)
watch([open, kind, () => locale.value], () => { if (open.value) load() })
</script>

<template>
  <UiModal v-model="open" :title="title" width="max-w-3xl">
    <div v-html="html" />
  </UiModal>
</template>
