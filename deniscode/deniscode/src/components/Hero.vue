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
  <!-- fundo na seção para cobrir toda a largura e evitar borda branca -->
  <section id="home" class="relative bg-[#0A0D12] dark:bg-[#0A0D12]">
    <!-- pb-48 no mobile cria “piso” pro mockup absoluto -->
    <div class="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-48 sm:pb-24 md:pb-32">
      <div class="hero-inner">
        <div class="hero-copy max-w-xl mt-[clamp(2rem,14vh,10rem)]">
          <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-50 md:text-zinc-900 dark:text-zinc-50 max-w-[18ch]">
            {{ dict.hero.title }}
          </h1>

          <p class="mt-4 md:mt-6 text-base md:text-xl text-zinc-400 md:text-zinc-600 dark:text-zinc-400 max-w-[60ch]">
            {{ dict.hero.subtitle }}
          </p>

          <div class="mt-6 md:mt-8">
            <a
              href="#start"
              class="hero-cta inline-flex items-center rounded-xl px-6 py-3
                     text-sm md:text-base font-semibold
                     bg-[#BD93F9] text-white shadow-lg hover:opacity-95 transition
                     dark:bg-white dark:text-zinc-900 w-auto">
              {{ dict.ctaHero }}
            </a>
          </div>
        </div>

        <!-- mockup -->
        <div class="laptop">
          <img src="@/assets/laptop-lightmode.png" alt="" class="laptop-img dark:hidden" loading="eager" decoding="async" />
          <img src="@/assets/laptop-darkmode.png"  alt="" class="laptop-img hidden dark:block" loading="eager" decoding="async" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* =============== Desktop base (1ª versão restaurada) =============== */
.laptop{
  position:absolute; right:0; top:15vh; z-index:10;
  pointer-events:none; user-select:none;
  width:min(58vw,1200px); height:min(110dvh,1100px);
  overflow:hidden; /* corte interno */
}
.laptop-img{
  position:absolute; top:50%; right:0;
  height:130%; width:auto; max-width:none;
  transform: translate(40%, -50%); /* alinhamento original */
}

/* Desktop mais estreito: empurrar à direita quando a viewport reduz */
@media (max-width: 1670px){ .laptop-img{ transform: translate(44%, -50%); } }
@media (max-width: 1536px){ .laptop-img{ transform: translate(48%, -50%); height:128%; } }
@media (max-width: 1440px){ .laptop-img{ transform: translate(52%, -50%); height:124%; } }
@media (max-width: 1366px){
  .laptop{ height:min(100svh,1050px); }
  .laptop-img{ transform: translate(56%, -50%); height:120%; }
}
@media (max-width: 1280px){
  .laptop{ width:min(56vw,980px); }
  .laptop-img{ transform: translate(60%, -50%); height:118%; }
}

/* Desktop mais largo que 1280: continue acompanhando p/ a DIREITA */
@media (min-width: 1536px){ .laptop-img{ transform: translate(42%, -50%); } }
@media (min-width: 1720px){ .laptop-img{ transform: translate(44%, -50%); } }
@media (min-width: 1920px){ .laptop-img{ transform: translate(46%, -50%); } }
@media (min-width: 2200px){ .laptop-img{ transform: translate(50%, -50%); } }

/* ================= Mobile (≤ 600 px) =================
   Mockup absoluto no canto inferior-direito + corte (metadinha), z-index alto. */
@media (max-width: 600px){
  .hero-copy{ margin-top: clamp(1rem, 8vh, 2.5rem); }
  .hero-cta{ align-self:flex-start; }

  .laptop{
    position:absolute;
    right: -10vw;
    bottom: 4vh;                       /* ↓ desce um pouco */
    width: clamp(320px, 92vw, 520px);
    height: clamp(160px, 24vh, 210px);  /* janela de corte controla “metade” */
    overflow:hidden;
    z-index: 50;                        /* ↑ por cima de qualquer overlay */
    pointer-events:none;
  }
  .laptop-img{
    position:absolute; top:50%; right:0;
    height: 158%;
    width:auto; max-width:none;
    transform: translate(36%, -50%);    /* metade esquerda visível */
  }
}

/* Ajustes finos por aparelho (opcional) */
@media (max-width: 430px){ .laptop-img{ transform: translate(38%, -50%); } }
@media (max-width: 360px){ .laptop-img{ transform: translate(42%, -50%); } }
</style>
