<!-- src/components/Navbar.vue -->
<script setup>
import { ref, computed } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import LangSwitcher from '@/components/LangSwitcher.vue'
import { useLocale } from '@/composables/useLocale.js'
import logo from '@/assets/dc.svg' // viewBox 448x272

const isOpen = ref(false)
const { locale } = useLocale()

const labels = {
  pt: { home: 'Início', projects: 'Projetos', about: 'Sobre', contact: 'Contato', aria: 'Navegação principal' },
  en: { home: 'Home',  projects: 'Projects', about: 'About',  contact: 'Contact',  aria: 'Main navigation' }
}
const t = computed(() => labels[locale.value])

const items = ['home', 'projects', 'about', 'contact']
const hrefs = { home: '#home', projects: '#projects', about: '#about', contact: '#contact' }
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 bg-white/85 dark:bg-zinc-900/70 backdrop-blur border-b border-zinc-200/70 dark:border-zinc-800/70">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between" :aria-label="t.aria">
      <!-- Logo: máscara com proporção correta + herda currentColor -->
      <a
        href="#home"
        class="flex items-center text-zinc-900 dark:text-white hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        aria-label="Home"
      >
        <span
          class="logo-mask"
          :style="{
            WebkitMaskImage: `url(${logo})`,
            maskImage: `url(${logo})`
          }"
          aria-hidden="true"
        />
      </a>

      <!-- Links (desktop) -->
      <ul class="hidden md:flex items-center gap-5" role="menubar">
        <li v-for="key in items" :key="key" role="none">
          <a
            :href="hrefs[key]"
            role="menuitem"
            class="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white transition-colors px-1"
          >
            {{ t[key] }}
          </a>
        </li>
      </ul>

      <!-- Direita: idioma + tema -->
      <div class="hidden md:flex items-center gap-4">
        <LangSwitcher />
        <ThemeToggle />
      </div>

      <!-- Botão mobile -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center rounded-lg border border-zinc-300 dark:border-zinc-700 p-2 text-zinc-800 dark:text-zinc-100"
        :aria-expanded="isOpen"
        aria-controls="mobile-menu"
        :aria-label="isOpen ? 'Close menu' : 'Open menu'"
        @click="isOpen = !isOpen"
      >
        <svg v-if="!isOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M4 8h16M4 16h16" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <!-- Drawer mobile -->
    <div id="mobile-menu" class="md:hidden" :class="isOpen ? 'block' : 'hidden'">
      <div class="space-y-2 py-3 px-4">
        <a
          v-for="key in items"
          :key="key"
          :href="hrefs[key]"
          class="block rounded-lg px-3 py-2 text-[15px] font-medium text-zinc-800 hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800/70"
          @click="isOpen=false"
        >{{ t[key] }}</a>

        <div class="border-t border-zinc-200 dark:border-zinc-800 my-2"></div>

        <div class="flex items-center justify-between">
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* mantém a proporção do SVG (448×272) e pinta com currentColor */
.logo-mask{
  display: inline-block;
  width: 32px;                 /* ajuste fino aqui (ex.: 28/30/32/36) */
  aspect-ratio: 448 / 272;     /* evita “quadrado” */
  background-color: currentColor;

  /* máscara */
  -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
  -webkit-mask-position: center;
          mask-position: center;
  -webkit-mask-size: contain;
          mask-size: contain;
}
</style>
