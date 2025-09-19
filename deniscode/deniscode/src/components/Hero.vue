<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale.js'

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

const { locale } = useLocale()
const dict = computed(() => messages[locale.value])
</script>

<template>
  <section id="home" class="relative">
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

    <div class="laptop">
      <img src="@/assets/laptop-lightmode.png" alt="" class="laptop-img dark:hidden" loading="eager" decoding="async" />
      <img src="@/assets/laptop-darkmode.png"  alt="" class="laptop-img hidden dark:block" loading="eager" decoding="async" />
    </div>
  </section>
</template>

<style scoped>
.laptop{ position:absolute; right:0; top:15vh; z-index:10; pointer-events:none; user-select:none;
  width:min(58vw,1200px); height:min(110dvh,1100px); overflow:hidden; border-top-left-radius:0;
  border-bottom-left-radius:0; box-shadow:none; }
.laptop-img{ position:absolute; top:50%; right:0; transform:translate(40%,-50%); height:130%; width:auto; max-width:none; }
</style>
