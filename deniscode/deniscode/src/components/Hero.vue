<!-- src/components/Hero.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import ThemeToggle from '@/components/ThemeToggle.vue'

const messages = {
  en: {
    brand: 'deniscode',
    nav: { solutions: 'Solutions', pricing: 'Pricing', about: 'About' },
    hero: {
      title: 'We design what you need to bring your business to life',
      subtitle: 'Got an idea? Talk to us—let’s take it from paper to the web.'
    },
    ctaHero: 'Start building',   // botão do HERO
    ctaNav: 'Contact',           // botão do NAVBAR
    ariaToggleLang: 'Switch language to Portuguese'
  },
  pt: {
    brand: 'deniscode',
    nav: { solutions: 'Soluções', pricing: 'Preços', about: 'Sobre' },
    hero: {
      title: 'Desenhamos o que você precisa para dar vida ao seu negócio',
      subtitle: 'Tem uma ideia? Fale com a gente para sair do papel e ganhar vida no mundo online.'
    },
    ctaHero: 'Comece agora',     // botão do HERO
    ctaNav: 'Contato',           // botão do NAVBAR
    ariaToggleLang: 'Mudar idioma para inglês'
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
  <!-- NAVBAR -->
  <header class="relative">
    <nav class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
      <a href="/" class="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
        deniscode
      </a>

      <!-- menu sem 'Contact' -->
      <ul class="hidden sm:flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300">
        <li><a href="#solutions" class="hover:text-zinc-900 dark:hover:text-white px-1">{{ dict.nav.solutions }}</a></li>
        <li><a href="#pricing"   class="hover:text-zinc-900 dark:hover:text-white px-1">{{ dict.nav.pricing }}</a></li>
        <li><a href="#about"     class="hover:text-zinc-900 dark:hover:text-white px-1">{{ dict.nav.about }}</a></li>
      </ul>

      <div class="flex items-center gap-3">
        <!-- CTA NAV: Contact/Contato (Dracula no light, branco no dark) -->
        <a
          href="#contact"
          class="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold
                 bg-[#BD93F9] text-white shadow-sm hover:opacity-95 transition
                 dark:bg-white dark:text-zinc-900"
        >
          {{ dict.ctaNav }}
        </a>

        <!-- idioma -->
        <button
          @click="toggleLocale"
          :aria-label="dict.ariaToggleLang"
          class="inline-flex items-center justify-center w-9 h-9 rounded-full border
                 border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
          title="Switch language / Trocar idioma"
        >
          <span v-if="locale === 'en'">🇧🇷</span>
          <span v-else>🇺🇸</span>
        </button>

        <!-- tema -->
        <ThemeToggle />
      </div>
    </nav>
  </header>

  <!-- HERO (sem overflow hidden, laptop pode “invadir” a próxima seção) -->
  <section class="relative">
    <!-- conteúdo do hero -->
    <div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pb-32">
      <div class="max-w-xl">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50 max-w-[18ch]">
          {{ dict.hero.title }}
        </h1>
        <p class="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-[60ch]">
          {{ dict.hero.subtitle }}
        </p>
        <div class="mt-8">
          <!-- CTA do HERO: Start building / Comece agora -->
          <a
            href="#start"
            class="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold
                   bg-[#BD93F9] text-white shadow-lg hover:opacity-95 transition
                   dark:bg-white dark:text-zinc-900"
          >
            {{ dict.ctaHero }}
          </a>
        </div>
      </div>
    </div>

    <!-- ARTE: laptop à direita, metade visível (ajuste fino nos comentários) -->
    <div
      aria-hidden="true"
      class="pointer-events-none select-none absolute right-0
             top-[26vh] md:top-[28vh] lg:top-[30vh]   <!-- ↓ mais baixo/alto: mude esses valores -->
             h-[80vh] md:h-[86vh] lg:h-[90vh]         <!-- altura do viewport -->
             w-[50vw] md:w-[52vw] lg:w-[54vw]         <!-- largura (controle do “metade”) -->
             z-0"
    >
      <div
        class="relative h-full overflow-hidden rounded-l-3xl shadow-2xl ring-1
               ring-black/5 dark:ring-white/10 motion-safe:animate-reveal-x"
      >
        <!-- LIGHT -->
        <img
          src="@/assets/laptop-lightmode.png"
          alt=""
          class="block dark:hidden absolute inset-0 h-full w-full
                 object-cover object-[80%_55%]"
          loading="eager" decoding="async"
        />
        <!-- DARK -->
        <img
          src="@/assets/laptop-darkmode.png"
          alt=""
          class="hidden dark:block absolute inset-0 h-full w-full
                 object-cover object-[80%_55%]"
          loading="eager" decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* animação vem do tailwind.config (keyframes reveal-x) */
</style>
