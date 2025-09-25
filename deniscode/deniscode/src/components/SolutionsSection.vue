<!-- ============================ SolutionsSection.vue ============================
     Seção “O que entregamos”.
     Use junto com TechBandSection.vue (que vem ANTES, logo abaixo do Hero).
=============================================================================== -->

<script setup>
// ==== [INÍCIO] Imports & i18n =================================================
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale.js'
// ==== [FIM] Imports & i18n ====================================================

// ==== [INÍCIO] Mensagens (PT/EN) ==============================================
const messages = {
  en: {
    pillarTitle: 'What we deliver',
    pillarSubtitle:
      'We deliver solutions and know-how from development through deployment, focused on performance and results. No templates — everything is hand-coded.',
    cta: 'Request a proposal',
    pillars: [
      { id: 'sites', title: 'Websites & Landing Pages', desc: 'Fast, responsive, and SEO-ready sites built with modern stacks (Vue/React) and clean architecture.' },
      { id: 'uiux',  title: 'UI/UX & Design Systems',   desc: 'From wireframes to polished interfaces. Consistent components, accessible colors, and usable flows.' },
      { id: 'perf',  title: 'Performance & SEO',        desc: 'Core Web Vitals first. Code splitting, image strategy, metadata, and structured data.' },
      { id: 'cloud', title: 'Cloud & Infrastructure',    desc: 'Deploys, CDN, CI/CD, observability, and security on AWS/GCP/Vercel/Netlify with best practices.' },
      { id: 'support', title: 'Care & Iteration',       desc: 'Roadmaps, A/B tests, analytics, and continuous improvements guided by real usage.' }
    ]
  },
  pt: {
    pillarTitle: 'O que entregamos',
    pillarSubtitle:
      'Entregamos soluções e experiência desde o desenvolvimento ao deploy, com foco em performance e resultados.',
    cta: 'Solicitar proposta',
    pillars: [
      { id: 'sites',  title: 'Websites & Landing Pages', desc: 'Sites rápidos, responsivos e prontos para SEO com stacks modernos (Vue/React) e arquitetura limpa.' },
      { id: 'uiux',   title: 'UI/UX & Design System',    desc: 'Do wireframe à interface final. Componentes consistentes, cores acessíveis e fluxos realmente usáveis.' },
      { id: 'perf',   title: 'Performance & SEO',         desc: 'Core Web Vitals em 1º lugar. Code splitting, imagens otimizadas, metadata e dados estruturados.' },
      { id: 'cloud',  title: 'Cloud & Infraestrutura',    desc: 'Deploys, CDN, CI/CD, observabilidade e segurança em AWS/GCP/Vercel/Netlify com boas práticas.' },
      { id: 'support', title: 'Suporte & Iteração',       desc: 'Roadmaps, testes A/B, analytics e melhorias contínuas guiadas por uso real.' }
    ]
  }
}
const { locale } = useLocale()
const dict = computed(() => messages[locale.value])
// ==== [FIM] Mensagens (PT/EN) =================================================
</script>

<template>
  <!-- ==== [INÍCIO] Solutions (padrão container) ============================ -->
  <section
    id="solutions"
    class="solutions relative isolate bg-white dark:bg-zinc-950"
    aria-labelledby="solutions-title"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="py-12 sm:py-16 lg:py-20">
        <div class="max-w-2xl">
          <h3 id="solutions-title" class="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {{ dict.pillarTitle }}
          </h3>
          <p class="mt-2 text-zinc-600 dark:text-zinc-400">
            {{ dict.pillarSubtitle }}
          </p>
        </div>

        <!-- Grid de cards -->
        <div
          class="mt-8 sm:mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 auto-rows-fr"
          role="list"
          aria-label="Pilares de entrega"
        >
          <article
            v-for="p in dict.pillars"
            :key="p.id"
            role="listitem"
            class="group h-full rounded-2xl border border-zinc-200/80 dark:border-white/10
                   bg-white/80 dark:bg-white/[0.04] backdrop-blur
                   shadow-[0_1px_0_0_rgba(0,0,0,0.03)] hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]
                   transition-all duration-300 will-change-transform focus-within:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]
                   hover:-translate-y-0.5 focus-within:-translate-y-0.5"
          >
            <div class="p-5 sm:p-6 h-full flex flex-col">
              <!-- Ícone/losango -->
              <div
                class="h-9 w-9 rounded-xl bg-[#BD93F9]/15 dark:bg-[#BD93F9]/20
                       border border-[#BD93F9]/30 flex items-center justify-center mb-4
                       transition-transform duration-300 group-hover:rotate-6"
                aria-hidden="true"
              >
                <div class="h-2.5 w-2.5 rounded-[6px] rotate-45 bg-[#BD93F9]"></div>
              </div>

              <h4 class="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {{ p.title }}
              </h4>
              <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {{ p.desc }}
              </p>

              <!-- Espaçador + linha sutil para organização visual -->
              <div class="mt-4 sm:mt-6 border-t border-zinc-200/70 dark:border-white/10"></div>

              <!-- CTA secundária por card (opcional futuro) -->
              <div class="mt-3">
                <a
                  href="#contact"
                  class="inline-flex items-center text-sm font-medium text-zinc-700 dark:text-zinc-200
                         rounded-lg outline-none ring-offset-2 ring-offset-white dark:ring-offset-zinc-950
                         focus-visible:ring-2 focus-visible:ring-[#4c2b89]"
                >
                  {{ locale === 'pt' ? 'Falar sobre isso' : 'Discuss this' }}
                  <svg class="ml-1 h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 10H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clip-rule="evenodd"/>
                  </svg>
                </a>
              </div>
            </div>
          </article>
        </div>

        <!-- CTA principal -->
        <div class="mt-10">
          <a
            href="#contact"
            class="inline-flex items-center rounded-xl px-5 py-3 text-sm font-semibold
                   bg-[#4c2b89] text-white shadow-lg hover:opacity-95 transition
                   outline-none ring-offset-2 ring-offset-white dark:ring-offset-zinc-950
                   focus-visible:ring-2 focus-visible:ring-[#4c2b89]"
          >
            {{ dict.cta }}
          </a>
        </div>
      </div>
    </div>
  </section>
  <!-- ==== [FIM] Solutions (padrão container) ================================ -->
</template>

<style scoped>
/* Espaçamento vertical controlado pela classe utilitária no wrapper (py-*) */
/* Ajustes de motion para acessibilidade */
@media (prefers-reduced-motion: reduce) {
  .group:hover,
  .group:focus-within {
    transform: none !important;
    box-shadow: none !important;
  }
}
</style>
