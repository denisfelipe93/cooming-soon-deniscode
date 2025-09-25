<!-- src/components/SolutionsSection.vue -->
<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale.js'

const messages = {
  en: {
    title: 'Solutions',
    kicker: 'Technologies we use',
    pillarTitle: 'What we deliver',
    pillarSubtitle: 'Design + engineering focused on outcomes',
    cta: 'Request a proposal',
    aria: {
      techRegion: 'Technology carousel',
      techRow1: 'Technology carousel row 1',
      techRow2: 'Technology carousel row 2'
    },
    pillars: [
      {
        id: 'sites',
        title: 'Websites & Landing Pages',
        desc: 'Fast, responsive, and SEO-ready sites built with modern stacks (Vue/React) and clean architecture.'
      },
      {
        id: 'uiux',
        title: 'UI/UX & Design Systems',
        desc: 'From wireframes to polished interfaces. Consistent components, accessible colors, and usable flows.'
      },
      {
        id: 'ecom',
        title: 'Stores & Payments',
        desc: 'Checkout flows, integrations, and scalable catalogs—focused on conversion and performance.'
      },
      {
        id: 'perf',
        title: 'Performance & SEO',
        desc: 'Lighthouse and Core Web Vitals first. Code splitting, image strategy, metadata, and structured data.'
      },
      {
        id: 'cloud',
        title: 'Cloud & Infrastructure',
        desc: 'Deploys, CDN, CI/CD, observability and security on AWS/GCP/Vercel/Netlify aligned with best practices.'
      },
      {
        id: 'support',
        title: 'Care & Iteration',
        desc: 'Roadmaps, A/B tests, analytics, and continuous improvements guided by real usage and results.'
      }
    ]
  },
  pt: {
    title: 'Soluções',
    kicker: 'Tecnologias que utilizamos',
    pillarTitle: 'O que entregamos',
    pillarSubtitle: 'Design + engenharia focados em resultado',
    cta: 'Solicitar proposta',
    aria: {
      techRegion: 'Carrossel de tecnologias',
      techRow1: 'Carrossel de tecnologias linha 1',
      techRow2: 'Carrossel de tecnologias linha 2'
    },
    pillars: [
      {
        id: 'sites',
        title: 'Websites & Landing Pages',
        desc: 'Sites rápidos, responsivos e prontos para SEO com stacks modernos (Vue/React) e arquitetura limpa.'
      },
      {
        id: 'uiux',
        title: 'UI/UX & Design System',
        desc: 'Do wireframe à interface final. Componentes consistentes, cores acessíveis e fluxos realmente usáveis.'
      },
      {
        id: 'ecom',
        title: 'Lojas & Pagamentos',
        desc: 'Checkout, integrações e catálogos escaláveis—foco em conversão e performance.'
      },
      {
        id: 'perf',
        title: 'Performance & SEO',
        desc: 'Lighthouse e Core Web Vitals em 1º lugar. Code splitting, imagens otimizadas, metadata e dados estruturados.'
      },
      {
        id: 'cloud',
        title: 'Cloud & Infraestrutura',
        desc: 'Deploys, CDN, CI/CD, observabilidade e segurança em AWS/GCP/Vercel/Netlify com boas práticas.'
      },
      {
        id: 'support',
        title: 'Suporte & Iteração',
        desc: 'Roadmaps, testes A/B, analytics e melhorias contínuas guiadas por uso real e resultados.'
      }
    ]
  }
}

const { locale } = useLocale()
const dict = computed(() => messages[locale.value])

/** ====== Ticker (labels ou logos) ======
 * Para usar logos, adicione imgSrc: '@/assets/tech/vue.svg' (exemplo)
 * e opcionalmente alt. Quando houver imgSrc, o <img> aparece; senão, renderiza label.
 */
const items = [
  { label: 'Vue' },
  { label: 'React' },
  { label: 'TypeScript' },
  { label: 'Tailwind CSS' },
  { label: 'UI/UX' },
  { label: 'SEO' },
  { label: 'Node.js' },
  { label: 'Vite' },
  { label: 'AWS' },
  { label: 'GCP' }
]

// duplico para 200% de largura; a animação desliza 50%
const loop = computed(() => [...items, ...items])

// pausa a animação quando a section sai do viewport
const root = ref(null)
const isPaused = ref(false)
let cleanup = null

function mountIO () {
  if (!root.value) return
  const io = new IntersectionObserver(([entry]) => {
    isPaused.value = !entry.isIntersecting
  }, { threshold: 0.2 })
  io.observe(root.value)
  return () => io.disconnect()
}

onMounted(() => { cleanup = mountIO() })
onUnmounted(() => { if (cleanup) cleanup() })
</script>

<template>
  <section
    id="solutions"
    ref="root"
    class="solutions relative isolate border-t border-zinc-200/70 dark:border-white/10 bg-white dark:bg-zinc-950"
    style="--accent:#BD93F9; --pt-mobile:8vh;"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Cabeçalho mínimo -->
      <div class="pt-6 sm:pt-10">
        <p class="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {{ dict.kicker }}
        </p>
        <h2 class="mt-2 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {{ dict.title }}
        </h2>
      </div>

      <!-- ===== Parte 1: Ticker de tecnologias (duas linhas) ===== -->
      <div
        class="marquee group relative mt-6 sm:mt-8 select-none"
        :class="{ 'is-paused': isPaused }"
        :aria-label="dict.aria.techRegion"
        role="region"
      >
        <!-- fades nas bordas -->
        <div
          class="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-10
                 bg-gradient-to-r from-white dark:from-zinc-950 to-transparent">
        </div>
        <div
          class="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-10
                 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent">
        </div>

        <!-- Linha 1 (vai para a esquerda) -->
        <ul
          class="loop loop-l flex items-center gap-4 sm:gap-6 will-change-transform"
          :aria-label="dict.aria.techRow1"
          aria-live="off"
        >
          <li
            v-for="(it, idx) in loop"
            :key="'l1-' + idx + (it.label || it.alt)"
            class="pill shrink-0"
            :aria-hidden="idx >= loop.length / 2"
          >
            <template v-if="it.imgSrc">
              <img :src="it.imgSrc" :alt="it.alt || it.label" class="h-6 w-auto" />
            </template>
            <template v-else>
              {{ it.label }}
            </template>
          </li>
        </ul>

        <!-- Linha 2 (vai para a direita) -->
        <ul
          class="loop loop-r mt-3 sm:mt-4 flex items-center gap-4 sm:gap-6 will-change-transform"
          :aria-label="dict.aria.techRow2"
          aria-live="off"
        >
          <li
            v-for="(it, idx) in loop"
            :key="'l2-' + idx + (it.label || it.alt)"
            class="pill shrink-0"
            :aria-hidden="idx >= loop.length / 2"
          >
            <template v-if="it.imgSrc">
              <img :src="it.imgSrc" :alt="it.alt || it.label" class="h-6 w-auto" />
            </template>
            <template v-else>
              {{ it.label }}
            </template>
          </li>
        </ul>
      </div>

      <!-- ===== Parte 2: Grade de soluções ===== -->
      <div class="mt-10 sm:mt-14">
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
              <!-- Icone/Accent -->
              <div class="h-9 w-9 rounded-xl bg-[var(--accent)]/15 dark:bg-[var(--accent)]/20
                          border border-[var(--accent)]/30 flex items-center justify-center mb-4">
                <div class="h-2.5 w-2.5 rounded-[6px] rotate-45 bg-[var(--accent)]"></div>
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
                   bg-[var(--accent)] text-white shadow-lg hover:opacity-95 transition
                   dark:bg-white dark:text-zinc-900"
          >
            {{ dict.cta }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* ===== Espaçamento para “encaixar” o laptop do Hero no mobile ===== */
.solutions {
  padding-top: 1.25rem; /* desktop */
  padding-bottom: 2.5rem;
}
@media (max-width: 640px) {
  .solutions { padding-top: var(--pt-mobile, 24vh); }
}

/* ===== Pills (itens do ticker) ===== */
.pill {
  border-radius: 1rem;
  border: 1px solid color-mix(in oklab, #e4e4e7 90%, black 10%);
  background: color-mix(in oklab, white 85%, transparent);
  color: #3f3f46; /* zinc-700 */
  padding: .5rem .9rem;
  font-weight: 600;
  font-size: .95rem;
  box-shadow: 0 1px 0 rgba(0,0,0,.02);
}
:where(html.dark) .pill {
  border-color: color-mix(in oklab, white 12%, transparent);
  background: color-mix(in oklab, white 6%, transparent);
  color: #e4e4e7; /* zinc-200 */
}

/* ===== Ticker (duas linhas, direções opostas) ===== */
.marquee { overflow: hidden; }
.group:hover .loop { animation-play-state: paused; }
.is-paused .loop { animation-play-state: paused; }

.loop {
  width: max-content;
  /* Durações independentes por linha (ajuste fino) */
}
.loop-l { animation: marquee-left var(--d1, 22s) linear infinite; }
.loop-r { animation: marquee-right var(--d2, 28s) linear infinite; }

@keyframes marquee-left {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
@keyframes marquee-right {
  0%   { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}

/* Respeita preferências do usuário: sem animação => vira scroll horizontal */
@media (prefers-reduced-motion: reduce) {
  .loop { animation: none !important; }
  .marquee { overflow-x: auto; -webkit-overflow-scrolling: touch; }
}

/* Pequeno ajuste tipográfico nas pills */
@media (max-width: 480px) {
  .pill { font-size: .9rem; }
}
</style>