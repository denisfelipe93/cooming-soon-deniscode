<!-- src/components/SolutionsSection.vue -->
<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale.js'

const messages = {
  en: {
    title: 'Solutions',
    kicker: 'Technologies we use',
  },
  pt: {
    title: 'Soluções',
    kicker: 'Tecnologias que utilizamos',
  },
}

const { locale } = useLocale()
const dict = computed(() => messages[locale.value])

// Itens do carrossel: se quiser trocar texto por logo, adicione imgSrc (SVG/PNG/WebP)
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
  { label: 'GCP' },
]

// Duplico pra criar loop contínuo
const track = [...items, ...items]
</script>

<template>
  <section
    id="solutions"
    class="solutions relative isolate border-t border-zinc-200/70 dark:border-white/10
           bg-white dark:bg-zinc-950"
  >
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- cabeçalho mínimo -->
      <div class="pt-6 sm:pt-10">
        <p class="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          {{ dict.kicker }}
        </p>
        <h2 class="mt-2 text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {{ dict.title }}
        </h2>
      </div>

      <!-- marquee / carrossel de logos -->
      <div
        class="marquee group relative mt-6 sm:mt-8 select-none"
        aria-label="Carrossel de tecnologias"
        role="region"
      >
        <!-- fade nas bordas -->
        <div class="pointer-events-none absolute inset-y-0 left-0 w-12 sm:w-24 z-10
                    bg-gradient-to-r from-white dark:from-zinc-950 to-transparent"></div>
        <div class="pointer-events-none absolute inset-y-0 right-0 w-12 sm:w-24 z-10
                    bg-gradient-to-l from-white dark:from-zinc-950 to-transparent"></div>

        <ul class="track flex items-center gap-4 sm:gap-6 will-change-transform"
            aria-live="off">
          <li v-for="(it, idx) in track" :key="idx"
              class="shrink-0 rounded-2xl border border-zinc-200 dark:border-white/10
                     bg-white/80 dark:bg-white/5 backdrop-blur
                     px-4 py-2 sm:px-6 sm:py-3
                     text-sm sm:text-base font-semibold
                     text-zinc-700 dark:text-zinc-200
                     shadow-[0_1px_0_0_rgba(0,0,0,0.02)]">
            <!-- Se quiser imagem: 
                 <img :src="it.imgSrc" :alt="it.label" class="h-6 w-auto" />
            -->
            {{ it.label }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Espaço superior no mobile para “encaixar” com a base do laptop vazando do hero */
.solutions{
  /* ajuste fino: diminua para encostar mais nas bordas do laptop */
  --pt-mobile: 24vh; /* entre 18vh e 30vh costuma ficar bom com bottom:-35vh no hero */
  padding-top: 1.25rem; /* default desktop */
  padding-bottom: 2.5rem;
}
@media (max-width: 640px){
  .solutions{ padding-top: var(--pt-mobile); }
}

/* ===== Marquee ===== */
.marquee{
  overflow: hidden;
}
.track{
  animation: marquee 22s linear infinite;
}
.group:hover .track{ animation-play-state: paused; }

@media (prefers-reduced-motion: reduce){
  .track{ animation: none; }
}

@keyframes marquee{
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
</style>
