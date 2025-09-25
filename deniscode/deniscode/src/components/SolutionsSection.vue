<!-- ============================ SolutionsSection.vue ============================
     Seção “O que entregamos” (sem a faixa de tecnologias).
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
    pillarSubtitle: 'Design + engineering focused on outcomes',
    cta: 'Request a proposal',
    pillars: [
      { id: 'sites',   title: 'Websites & Landing Pages', desc: 'Fast, responsive, and SEO-ready sites built with modern stacks (Vue/React) and clean architecture.' },
      { id: 'uiux',    title: 'UI/UX & Design Systems',   desc: 'From wireframes to polished interfaces. Consistent components, accessible colors, and usable flows.' },
      { id: 'ecom',    title: 'Stores & Payments',        desc: 'Checkout flows, integrations, and scalable catalogs—focused on conversion and performance.' },
      { id: 'perf',    title: 'Performance & SEO',        desc: 'Lighthouse and Core Web Vitals first. Code splitting, image strategy, metadata, and structured data.' },
      { id: 'cloud',   title: 'Cloud & Infrastructure',   desc: 'Deploys, CDN, CI/CD, observability and security on AWS/GCP/Vercel/Netlify aligned with best practices.' },
      { id: 'support', title: 'Care & Iteration',         desc: 'Roadmaps, A/B tests, analytics, and continuous improvements guided by real usage and results.' }
    ]
  },
  pt: {
    pillarTitle: 'O que entregamos',
    pillarSubtitle: 'Design + engenharia focados em resultado',
    cta: 'Solicitar proposta',
    pillars: [
      { id: 'sites',   title: 'Websites & Landing Pages', desc: 'Sites rápidos, responsivos e prontos para SEO com stacks modernos (Vue/React) e arquitetura limpa.' },
      { id: 'uiux',    title: 'UI/UX & Design System',    desc: 'Do wireframe à interface final. Componentes consistentes, cores acessíveis e fluxos realmente usáveis.' },
      { id: 'ecom',    title: 'Lojas & Pagamentos',       desc: 'Checkout, integrações e catálogos escaláveis—foco em conversão e performance.' },
      { id: 'perf',    title: 'Performance & SEO',        desc: 'Lighthouse e Core Web Vitals em 1º lugar. Code splitting, imagens otimizadas, metadata e dados estruturados.' },
      { id: 'cloud',   title: 'Cloud & Infraestrutura',   desc: 'Deploys, CDN, CI/CD, observabilidade e segurança em AWS/GCP/Vercel/Netlify com boas práticas.' },
      { id: 'support', title: 'Suporte & Iteração',       desc: 'Roadmaps, testes A/B, analytics e melhorias contínuas guiadas por uso real e resultados.' }
    ]
  }
}
const { locale } = useLocale()
const dict = computed(() => messages[locale.value])
// ==== [FIM] Mensagens (PT/EN) =================================================
</script>

<template>
  <!-- ==== [INÍCIO] Solutions (padrão container) ============================ -->
  <section id="solutions" class="solutions relative isolate bg-white dark:bg-zinc-950">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="pt-8 sm:pt-12">
        <div class="max-w-2xl">
          <h3 class="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {{ dict.pillarTitle }}
          </h3>
          <p class="mt-2 text-zinc-600 dark:text-zinc-400">
            {{ dict.pillarSubtitle }}
          </p>
        </div>

        <div class="mt-6 sm:mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <article
            v-for="p in dict.pillars"
            :key="p.id"
            class="rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur
                   shadow-[0_1px_0_0_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.1)]
                   transition-all duration-300"
          >
            <div class="p-5 sm:p-6">
              <div class="h-9 w-9 rounded-xl bg-[#BD93F9]/15 dark:bg-[#BD93F9]/20 border border-[#BD93F9]/30 flex items-center justify-center mb-4">
                <div class="h-2.5 w-2.5 rounded-[6px] rotate-45 bg-[#BD93F9]"></div>
              </div>

              <h4 class="text-base md:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                {{ p.title }}
              </h4>
              <p class="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {{ p.desc }}
              </p>
            </div>
          </article>
        </div>

        <div class="mt-8">
          <a
            href="#contact"
            class="inline-flex items-center rounded-xl px-5 py-3 text-sm font-semibold
                   bg-[#4c2b89] text-white shadow-lg hover:opacity-95 transition
                   dark:bg-white dark:text-zinc-900"
          >
            {{ locale === 'pt' ? 'Solicitar proposta' : 'Request a proposal' }}
          </a>
        </div>
      </div>
    </div>
  </section>
  <!-- ==== [FIM] Solutions (padrão container) ================================ -->
</template>

<style scoped>
/* espaçamentos comuns */
.solutions{ padding-bottom: 2.5rem; }
</style>
