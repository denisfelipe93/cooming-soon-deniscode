<!-- src/components/PolicyModal.vue -->
<script setup lang="ts">
import { computed, ref, watch, onMounted } from 'vue'
import UiModal from '@/components/UiModal.vue'
import { usePolicyModal } from '@/composables/usePolicyModal'
import { useLocale } from '@/composables/useLocale'
import MarkdownIt from 'markdown-it'

// ✅ importa os 4 arquivos .md como string
import privacyPtRaw from '@/policies/privacy.pt.md?raw'
import privacyEnRaw from '@/policies/privacy.en.md?raw'
import termsPtRaw   from '@/policies/terms.pt.md?raw'
import termsEnRaw   from '@/policies/terms.en.md?raw'

const md = new MarkdownIt({ html: false, linkify: true, breaks: false })

const { open, kind } = usePolicyModal()
const { locale } = useLocale()

const html = ref<string>('Carregando…')
const meta = ref<{ version?: string; updated?: string }>({})

const title = computed(() =>
  kind.value === 'privacy'
    ? (locale.value === 'pt' ? 'Política de Privacidade' : 'Privacy Policy')
    : (locale.value === 'pt' ? 'Termos de Uso' : 'Terms of Use')
)

// mapa dos documentos já importados
const DOCS: Record<'privacy' | 'terms', Record<'pt' | 'en', string>> = {
  privacy: { pt: privacyPtRaw, en: privacyEnRaw },
  terms:   { pt: termsPtRaw,   en: termsEnRaw   }
}

/**
 * Parser simples de front-matter do tipo:
 * ---
 * version: "1.0"
 * updated: "2025-10-02"
 * ---
 * (Ignora qualquer outra chave; valores com ou sem aspas)
 */
function parseFrontMatter(raw: string): { data: Record<string,string>, content: string } {
  if (!raw.startsWith('---')) return { data: {}, content: raw }
  // encontra o próximo delimitador --- na linha
  const end = raw.indexOf('\n---', 3)
  if (end === -1) return { data: {}, content: raw }

  const headerBlock = raw.slice(3, end).trim()           // remove '---' inicial
  const restStart = end + '\n---'.length
  const after = raw.slice(restStart).replace(/^\r?\n/, '') // pula quebra de linha após ---
  const data: Record<string, string> = {}

  headerBlock.split(/\r?\n/).forEach(line => {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!m) return
    let val = m[2].trim()
    // tira aspas se houver
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    data[m[1]] = val
  })

  return { data, content: after }
}

function renderCurrent() {
  const lang: 'pt' | 'en' = locale.value === 'pt' ? 'pt' : 'en'
  const raw = DOCS[kind.value]?.[lang]
  if (!raw) {
    html.value = lang === 'pt' ? 'Documento não encontrado.' : 'Document not found.'
    meta.value = {}
    return
  }

  const parsed = parseFrontMatter(raw)
  meta.value = {
    version: parsed.data['version'],
    updated: parsed.data['updated']
  }
  html.value = md.render(parsed.content)
}

onMounted(() => { if (open.value) renderCurrent() })
watch([open, kind, () => locale.value], () => { if (open.value) renderCurrent() })
</script>

<template>
  <UiModal v-model="open" :title="title" width="max-w-3xl">
    <div
      v-if="meta.version || meta.updated"
      class="not-prose mb-3 text-xs text-neutral-600 dark:text-neutral-400"
    >
      <span v-if="meta.version" class="mr-3">
        {{ locale === 'pt' ? 'Versão:' : 'Version:' }} {{ meta.version }}
      </span>
      <span v-if="meta.updated">
        {{ locale === 'pt' ? 'Atualizado em:' : 'Updated on:' }} {{ meta.updated }}
      </span>
    </div>
    <div v-html="html" />
  </UiModal>
</template>
