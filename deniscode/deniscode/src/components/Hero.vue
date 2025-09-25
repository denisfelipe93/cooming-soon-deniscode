<script setup>
/* ===================== SCRIPT (i18n local) ===================== */
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale.js'

const messages = {
  en: {
    brand: 'deniscode',
    nav: { solutions: 'Solutions', pricing: 'Pricing', about: 'About' },
    hero: {
      title: 'We build exactly what you need to bring your business to life.',
      subtitle: 'Got an idea? Talk to us—let’s take it from paper to the web. We’ve got this.'
    },
    ctaHero: 'Start building',
    ctaNav: 'Contact',
    ariaToggleLang: 'Switch language to Portuguese'
  },
  pt: {
    brand: 'deniscode',
    nav: { solutions: 'Soluções', pricing: 'Preços', about: 'Sobre' },
    hero: {
      title: 'Desevolvemos o que você precisa para dar vida ao seu negócio',
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
  <!-- ===================== HERO ===================== -->
  <section id="home" class="relative isolate z-[10] max-[690px]:overflow-x-clip">
    <div class="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-14 pb-24 md:pb-32">
      <div class="hero-copy max-w-xl mt-[clamp(2rem,14vh,10rem)]">
        <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900 dark:text-zinc-50 max-w-[18ch]">
          {{ dict.hero.title }}
        </h1>

        <p class="mt-4 md:mt-6 text-base md:text-xl text-zinc-600 dark:text-zinc-400 max-w-[60ch]">
          {{ dict.hero.subtitle }}
        </p>

        <div class="mt-6 md:mt-8">
          <a
            href="#start"
            class="inline-flex items-center rounded-xl px-6 py-3
                   text-sm md:text-base font-semibold
                   bg-[#4c2b89] text-white shadow-lg hover:opacity-95 transition
                   dark:bg-white dark:text-zinc-900
                   w-auto"
          >
            {{ dict.ctaHero }}
          </a>
        </div>
      </div>
    </div>

    <!-- mockup (corte interno; WebP + fallback PNG) -->
    <div class="laptop">
      <!-- LIGHT -->
      <picture class="dark:hidden">
        <source srcset="@/assets/laptop-lightmode.webp" type="image/webp" />
        <img src="@/assets/laptop-lightmode.webp" alt="" class="laptop-img" loading="eager" decoding="async" />
      </picture>

      <!-- DARK -->
      <picture class="hidden dark:block">
        <source srcset="@/assets/laptop-darkmode.webp" type="image/webp" />
        <img src="@/assets/laptop-darkmode.webp" alt="" class="laptop-img" loading="eager" decoding="async" />
      </picture>
    </div>
  </section>
</template>

<style scoped>
/* ===================== DESKTOP (BASE) ===================== */
.laptop{
  position:absolute; right:0; top:15vh; z-index:10;
  pointer-events:none; user-select:none;
  width:min(58vw,1200px);
  height:min(110dvh,1100px);
  overflow:hidden;
}
/* o <picture> deve ocupar a moldura toda */
.laptop > picture{ position:absolute; inset:0; }

.laptop-img{
  position:absolute; top:50%; right:0;
  height:125%; width:auto; max-width:none;
  --tx: 37%; /* deslocamento lateral base */
  transform: translate(var(--tx), -50%);
}

/* ===== Degradê: diminui e empurra até 720px ===== */
@media (max-width: 1670px){ .laptop-img{ --tx: 38%; } }
@media (max-width: 1536px){ .laptop-img{ --tx: 42%; height:128%; } }
@media (max-width: 1440px){ .laptop-img{ --tx: 46%; height:124%; } }
@media (max-width: 1366px){
  .laptop{ height:min(100svh,1050px); }
  .laptop-img{ --tx: 50%; height:120%; }
}
@media (max-width: 1280px){
  .laptop{ width:min(56vw,980px); }
  .laptop-img{ --tx: 52%; height:118%; }
}
@media (max-width: 1180px){
  .laptop{ width:min(54vw,920px); }
  .laptop-img{ --tx: 54%; height:116%; }
}
@media (max-width: 1100px){
  .laptop{ width:min(52vw,880px); }
  .laptop-img{ --tx: 56%; height:114%; }
}
@media (max-width: 1024px){
  .laptop{ width:min(50vw,840px); }
  .laptop-img{ --tx: 58%; height:112%; }
}
@media (max-width: 920px){
  .laptop{ width:min(48vw,800px); }
  .laptop-img{ --tx: 60%; height:110%; }
}
@media (max-width: 820px){
  .laptop{ width:min(46vw,760px); }
  .laptop-img{ --tx: 62%; height:108%; }
}
@media (max-width: 760px){
  .laptop{ width:min(44vw,720px); }
  .laptop-img{ --tx: 64%; height:106%; }
}
@media (max-width: 690px){
  .laptop{ width:min(42vw,640px); }
  .laptop-img{ --tx: 66%; height:104%; }
}

@media (max-width: 640px){
   #home{
    min-height: 85svh;                  /* usa svh p/ evitar barra de URL “comer” altura */
    padding-bottom: clamp(2rem, 8vh, 3.5rem);
  }

  .laptop{
    position: absolute;
    top: auto;
    right: 0;                     /* <<< sem valor negativo! mantém a moldura dentro */
    bottom: -18vh;                  /* ajuste fino: ↑ sobe / ↓ desce o conjunto */
    width:  clamp(360px, 92vw, 600px);
    height: clamp(340px, 50vh, 520px); /* janela alta = não corta topo/base */
    overflow: hidden;             /* corta o que “vaza” da imagem (apenas direita) */
    z-index: 50;                  /* acima do CTA se precisar */
    pointer-events: none;
  }
  .hero-copy{
    /* ↓ mexa neste valor para subir/descer o bloco de texto no mobile “normal” */
    margin-top: clamp(0.5rem, 6vh, 1.25rem);
    z-index: 60; /* garante acima do mockup */
  }

  /* garante que o <picture> ocupe a moldura toda */
  .laptop > picture{ position:absolute; inset:0; }

  /* Imagem: empurra PARA A DIREITA (o corte fica só no lado direito) */
  .laptop-img{
    position: absolute;
    right: 0;
    top: 50%;
    bottom: auto;
    height: 120%;                 /* zoom (150–165% funciona bem) */
    transform: translate(50%, -50%); /* ↑ aumente 22% → 24–28% p/ ver mais “código” à esquerda */
  }
}

@media (max-width: 444px){
  .laptop-img{
    height: 120%;                 /* zoom (150–165% funciona bem) */
    transform: translate(56%, -50%)
  }
}  

</style>
