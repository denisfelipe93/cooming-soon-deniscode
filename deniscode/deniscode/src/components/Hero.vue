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
    ctaHero: 'Start building',
    ctaNav: 'Contact',
    ariaToggleLang: 'Switch language to Portuguese'
  },
  pt: {
    brand: 'deniscode',
    nav: { solutions: 'Soluções', pricing: 'Preços', about: 'Sobre' },
    hero: {
      title: 'Desenhamos o que você precisa para dar vida ao seu negócio',
      subtitle: 'Tem uma ideia? Fale com a gente para sair do papel e ganhar vida no mundo online.'
    },
    ctaHero: 'Comece agora',
    ctaNav: 'Contato',
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

      <ul class="hidden sm:flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-300">
        <li><a href="#solutions" class="hover:text-zinc-900 dark:hover:text-white px-1">{{ dict.nav.solutions }}</a></li>
        <li><a href="#pricing"   class="hover:text-zinc-900 dark:hover:text-white px-1">{{ dict.nav.pricing }}</a></li>
        <li><a href="#about"     class="hover:text-zinc-900 dark:hover:text-white px-1">{{ dict.nav.about }}</a></li>
      </ul>

      <div class="flex items-center gap-3">
        <a href="#contact"
           class="inline-flex items-center rounded-xl px-5 py-2.5 text-sm font-semibold
                  bg-[#BD93F9] text-white shadow-sm hover:opacity-95 transition
                  dark:bg-white dark:text-zinc-900">
          {{ dict.ctaNav }}
        </a>

        <button @click="toggleLocale"
                :aria-label="dict.ariaToggleLang"
                class="inline-flex items-center justify-center w-9 h-9 rounded-full border
                       border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
          <span v-if="locale === 'en'">🇧🇷</span>
          <span v-else>🇺🇸</span>
        </button>

        <ThemeToggle />
      </div>
    </nav>
  </header>

  <!-- HERO -->
  <section class="relative">
    <!-- texto -->
    <div class="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pb-32">
      <div class="max-w-xl">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50 max-w-[18ch]">
          {{ dict.hero.title }}
        </h1>
        <p class="mt-6 text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-[60ch]">
          {{ dict.hero.subtitle }}
        </p>
        <div class="mt-8">
          <a href="#start"
             class="inline-flex items-center rounded-xl px-6 py-3 text-sm font-semibold
                    bg-[#BD93F9] text-white shadow-lg hover:opacity-95 transition
                    dark:bg-white dark:text-zinc-900">
            {{ dict.ctaHero }}
          </a>
        </div>
      </div>
    </div>

    <!-- VIEWPORT do laptop: à direita, mostra a metade ESQUERDA -->
    <div class="laptop">
      <img src="@/assets/laptop-lightmode.png" alt="" class="laptop-img dark:hidden" loading="eager" decoding="async" />
      <img src="@/assets/laptop-darkmode.png"  alt="" class="laptop-img hidden dark:block" loading="eager" decoding="async" />
    </div>
  </section>
</template>

<style scoped>
/* Viewport colado à direita (recorta o que sobra) */
.laptop{
  position: absolute;
  right: 0;
  top: 15vh;                   /* ↑ sobe/desce (28–36vh) */
  z-index: 10;
  pointer-events: none;
  user-select: none;

  /* largura controla o “quanto” aparece (metade aprox) */
  width: min(58vw, 1200px);     /* antes 52vw/1000px */

  /* altura generosa p/ caber o laptop inteiro */
  height: min(110dvh, 1100px);   /*antes min(95dvh, 900px) */

  overflow: hidden;
  border-top-left-radius:0; /* 1.5rem;*/
  border-bottom-left-radius: 0; /* 1.5rem;*/
  box-shadow: none;/*0 25px 60px -20px rgba(0,0,0,.45);*/
}

/* IMG ancorada na direita; agora cabendo pela ALTURA do viewport */
.laptop-img{
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);  /* → traz a metade ESQUERDA pra dentro */
  height: 130%;                      /* ✅ encaixa pela ALTURA */
  width: auto;                       /* ✅ respeita proporção */
  max-width: none;
  /* NÃO defina display aqui (deixe o Tailwind controlar hidden/dark:hidden) */
}

/* ajustes responsivos finos (opcional) */
/* @media (min-width: 768px){ .laptop{ top: 15vh; } }
@media (min-width:1024px){ .laptop{ top: 15vh; } } */
</style>
