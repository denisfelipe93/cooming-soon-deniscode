<script setup>
import { ref, computed, onMounted } from 'vue'

const messages = {
  en: {
    brand: 'deniscode',
    nav: { solutions: 'Solutions', pricing: 'Pricing', about: 'About', contact: 'Contact' },
    hero: {
      title: 'We design what you need to bring your business to life',
      subtitle: 'Got an idea? Talk to us—let’s take it from paper to the web.'
    },
    cta: 'Start building',
    ariaToggle: 'Switch language to Portuguese'
  },
  pt: {
    brand: 'deniscode',
    nav: { solutions: 'Soluções', pricing: 'Preços', about: 'Sobre', contact: 'Contato' },
    hero: {
      title: 'Desenhamos o que você precisa para dar vida ao seu negócio',
      subtitle: 'Tem uma ideia? Fale com a gente para sair do papel e ganhar vida no mundo online.'
    },
    cta: 'Comece agora',
    ariaToggle: 'Mudar idioma para inglês'
  }
}

const locale = ref(localStorage.getItem('locale') === 'pt' ? 'pt' : 'en')
const dict = computed(() => messages[locale.value])

function toggleLocale() {
  locale.value = locale.value === 'en' ? 'pt' : 'en'
  localStorage.setItem('locale', locale.value)
  document.documentElement.setAttribute('lang', locale.value === 'en' ? 'en' : 'pt-BR')
}

onMounted(() => {
  document.documentElement.setAttribute('lang', locale.value === 'en' ? 'en' : 'pt-BR')
})
</script>

<template>
  <header class="relative">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <a href="/" class="text-xl font-semibold tracking-tight text-zinc-100"> {{ dict.brand }} </a>

      <ul class="hidden sm:flex items-center gap-6 text-sm text-zinc-400">
        <li><a href="#solutions" class="hover:text-zinc-100">{{ dict.nav.solutions }}</a></li>
        <li><a href="#pricing" class="hover:text-zinc-100">{{ dict.nav.pricing }}</a></li>
        <li><a href="#about" class="hover:text-zinc-100">{{ dict.nav.about }}</a></li>
        <li class="mx-1 h-5 w-px bg-zinc-700/60" aria-hidden="true"></li>
        <li><a href="#contact" class="hover:text-zinc-100">{{ dict.nav.contact }}</a></li>
      </ul>

      <div class="flex items-center gap-3">
        <a
          href="#start"
          class="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold
                 bg-[#BD93F9] text-white shadow-sm hover:opacity-95 transition"
        >
          {{ dict.cta }}
        </a>
        <button
          @click="toggleLocale"
          :aria-label="dict.ariaToggle"
          class="inline-flex items-center justify-center w-9 h-9 rounded-full border
                 border-white/15 hover:bg-white/5 transition"
          title="Switch language / Trocar idioma"
        >
          <span v-if="locale === 'en'">🇧🇷</span>
          <span v-else>🇺🇸</span>
        </button>
      </div>
    </nav>
  </header>

  <!-- HERO -->
  <section class="relative overflow-hidden">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-24 grid md:grid-cols-2 gap-16 items-center">
      <!-- ESQUERDA -->
      <div class="max-w-xl">
        <h1 class="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-50 max-w-[16ch]">
          {{ dict.hero.title }}
        </h1>
        <p class="mt-6 text-lg md:text-xl text-zinc-400 max-w-[60ch]">
          {{ dict.hero.subtitle }}
        </p>
        <div class="mt-10">
          <a
            href="#start"
            class="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold
                   bg-[#BD93F9] text-white shadow-lg hover:opacity-95 transition"
          >
            {{ dict.cta }}
          </a>
        </div>
      </div>

      <!-- DIREITA -->
      <div class="relative md:justify-self-end">
        <!-- Dark -->
        <img
          src="@/assets/laptop-darkmode.png"
          alt="Laptop with code — dark theme"
          class="hidden dark:block w-full max-w-[560px] md:max-w-[620px] rounded-2xl shadow-2xl ring-1 ring-white/10
                 motion-safe:animate-reveal-x md:mt-0 mt-10"
          loading="lazy" decoding="async"
        />
        <!-- Light -->
        <img
          src="@/assets/laptop-lightmode.png"
          alt="Laptop with code — light theme"
          class="block dark:hidden w-full max-w-[560px] md:max-w-[620px] rounded-2xl shadow-2xl ring-1 ring-black/5
                 motion-safe:animate-reveal-x md:mt-0 mt-10"
          loading="lazy" decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* animação já está no tailwind.config; nada aqui por enquanto */
</style>
