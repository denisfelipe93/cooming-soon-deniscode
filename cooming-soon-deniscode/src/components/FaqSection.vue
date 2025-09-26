<script setup lang="ts">
import { onMounted } from 'vue'

const faqs = [
  {
    q: 'Em quanto o site está em construção posso fazer um orçamento?',
    a: 'Sim. Deixe seu e-mail na newsletter e retornaremos o mais rápido possível para entender seu projeto e enviar uma proposta.'
  },
  {
    q: 'Em média quanto tempo o site fica pronto?',
    a: 'Depende do escopo e da complexidade. Após o briefing e a aprovação do orçamento, passamos um cronograma real. Como referência, projetos comuns levam de 14 a 30 dias úteis.'
  },
  {
    q: 'Quero apenas manutenção do meu site, é possível?',
    a: 'Sim. Se você já tem um site e precisa de melhorias, performance, correções ou consultoria, fazemos manutenção contínua ou pontual.'
  },
]

// Injetar JSON-LD no <head> para não poluir o template (evita “<” perdido)
onMounted(() => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.textContent = JSON.stringify(data)
  document.head.appendChild(el)
})
</script>

<template>
  <section class="mt-16 md:mt-20">
    <div class="mx-auto max-w-screen-md px-6">
      <h2 class="text-center text-2xl md:text-3xl font-semibold tracking-tight">
        Perguntas frequentes
      </h2>

      <div class="mt-6 space-y-3">
        <details
          v-for="(item, i) in faqs"
          :key="i"
          :open="i === 0"
          class="group rounded-2xl border border-black/5 dark:border-white/10
                 bg-white/60 dark:bg-white/5 backdrop-blur-[6px]
                 px-4 py-3 md:px-5 md:py-4"
        >
          <summary class="flex cursor-pointer items-center justify-between gap-4 text-left list-none select-none">
            <span class="text-base md:text-lg font-medium">{{ item.q }}</span>
            <span
              class="shrink-0 h-6 w-6 grid place-items-center rounded-lg
                     border border-black/10 dark:border-white/15
                     text-neutral-700 dark:text-neutral-200 transition
                     group-open:rotate-45"
              aria-hidden="true"
            >＋</span>
          </summary>

          <div class="mt-2 pr-1 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
            {{ item.a }}
          </div>

          <div v-if="i === 0" class="mt-3">
            <a href="#newsletter"
               class="inline-flex items-center gap-2 text-sm font-medium
                      text-brand-700 hover:brightness-[1.1] dark:text-brand-500">
              quero receber um contato
              <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.5 5H21v7.5h-2.25V8.56L6.06 21.25 2.75 17.94 15.44 5H13.5z"/>
              </svg>
            </a>
          </div>
        </details>
      </div>
    </div>
  </section>
</template>

<style scoped>
summary::-webkit-details-marker { display: none; }
summary { list-style: none; }
</style>
