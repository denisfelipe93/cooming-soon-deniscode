<!-- ============================ TechBandSection.vue ============================
     Full-bleed (100vw) com CONTEÚDO alinhado ao grid do site.
     Ajustes pedidos:
     - padding interno alinhado (max-w-7xl + px-4/sm:px-6/lg:px-8)
     - remove o título "Solutions" (fica só o kicker)
     - remove o logo AWS
=============================================================================== -->

<script setup>
/* ==== [INÍCIO] Imports & i18n ============================================= */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLocale } from '@/composables/useLocale.js'
/* ==== [FIM] Imports & i18n ================================================ */

/* ==== [INÍCIO] Mensagens (PT/EN) ========================================== */
const messages = {
  en: { kicker: 'Technologies we use', aria: { techRegion: 'Technology marquee', techRow1: 'Technology marquee row' } },
  pt: { kicker: 'Tecnologias que utilizamos', aria: { techRegion: 'Marquee de tecnologias', techRow1: 'Linha de logos' } }
}
const { locale } = useLocale()
const dict = computed(() => messages[locale.value])
/* ==== [FIM] Mensagens (PT/EN) ============================================= */

/* ==== [INÍCIO] Logos (Simple Icons – monocromático) ======================= */
/* Doc: https://cdn.simpleicons.org/<slug>/<HEX> */
const logos = [
  { name: 'Vue.js',       slug: 'vuedotjs' },
  { name: 'React',        slug: 'react' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Node.js',      slug: 'nodedotjs' },
  { name: 'Vite',         slug: 'vite' },
  { name: 'TypeScript',   slug: 'typescript' },
  // { name: 'AWS',       slug: 'amazonaws' },  // REMOVIDO conforme solicitado
  { name: 'Google Cloud', slug: 'googlecloud' }
]
const loop = computed(() => [...logos, ...logos]) // 200% → anima -50%
/* ==== [FIM] Logos (Simple Icons – monocromático) ========================== */

/* ==== [INÍCIO] Pausar marquee fora do viewport ============================ */
const root = ref(null)
const isPaused = ref(false)
let cleanup
function mountIO () {
  if (!root.value) return
  const io = new IntersectionObserver(([e]) => { isPaused.value = !e.isIntersecting }, { threshold: 0.15 })
  io.observe(root.value)
  return () => io.disconnect()
}
onMounted(() => { cleanup = mountIO() })
onUnmounted(() => { if (cleanup) cleanup() })
/* ==== [FIM] Pausar marquee fora do viewport =============================== */
</script>

<template>
  <!-- ==== [INÍCIO] Section full-bleed ===================================== -->
  <section id="tech-band" ref="root" class="techband">
    <!-- Fundo/contêiner full-bleed (100vw) -->
    <div class="band">
      <!-- ==== [INÍCIO] CONTEÚDO ALINHADO AO GRID ========================== -->
      <div class="band-content mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <!-- Cabeçalho (somente o kicker) -->
        <div class="band-head">
          <p class="band-kicker">{{ dict.kicker }}</p>
        </div>

        <!-- Fades colados ao início/fim do conteúdo alinhado -->
        <div class="fade fade-left"></div>
        <div class="fade fade-right"></div>

        <!-- ===== Marquee (1 linha) ======================================= -->
        <div
          class="marquee group select-none"
          :class="{ 'is-paused': isPaused }"
          :aria-label="dict.aria.techRegion"
          role="region"
        >
          <ul
            class="loop loop-l flex items-center gap-8 sm:gap-10 will-change-transform z-10"
            :aria-label="dict.aria.techRow1"
            aria-live="off"
          >
            <li v-for="(it, idx) in loop" :key="'l1-' + idx + it.slug" class="shrink-0">
              <!-- Light: logos brancos -->
              <img
                :src="`https://cdn.simpleicons.org/${it.slug}/FFFFFF`"
                :alt="it.name"
                class="logo-img dark:hidden"
                loading="lazy"
                decoding="async"
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              />
              <!-- Dark: logos cinza-claro -->
              <img
                :src="`https://cdn.simpleicons.org/${it.slug}/D4D4D8`"
                :alt="it.name"
                class="logo-img hidden dark:inline"
                loading="lazy"
                decoding="async"
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
              />
            </li>
          </ul>
        </div>
        <!-- ===== /Marquee ================================================= -->
      </div>
      <!-- ==== [FIM] CONTEÚDO ALINHADO AO GRID ============================= -->
    </div>
  </section>
  <!-- ==== [FIM] Section full-bleed ======================================= -->
</template>

<style scoped>
/* ==== [INÍCIO] Variáveis da faixa ========================================= */
.techband{
  --band-bg-light: #0f172a;
  --band-fg-light: #ffffff;
  --band-border-light: rgba(0,0,0,.12);

  --band-bg-dark: #0b1020;
  --band-fg-dark: #e5e7eb;
  --band-border-dark: rgba(255,255,255,.08);

  --radius: 1.1rem;

  /* alturas do trilho/logo */
  --marquee-h: 5rem;   /* altura do trilho */
  --logo-h: 4rem;      /* altura da logo (~64px) */
}
/* ==== [FIM] Variáveis da faixa ============================================ */

/* ==== [INÍCIO] Faixa 100vw (full-bleed) =================================== */
.band{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  background: var(--band-bg-light);
  color: var(--band-fg-light);
  border: 1px solid var(--band-border-light);
  border-radius: var(--radius);
  overflow: hidden;
  /* sem padding horizontal aqui: quem alinha é a .band-content */
  padding-top: 1rem;   /* padding vertical “de fora” da faixa */
  padding-bottom: 1rem;
}
:where(html.dark) .band{
  background: var(--band-bg-dark);
  color: var(--band-fg-dark);
  border-color: var(--band-border-dark);
}
/* ==== [FIM] Faixa 100vw (full-bleed) ====================================== */

/* ==== [INÍCIO] Cabeçalho/Texto dentro da faixa ============================ */
.band-head{ margin-bottom: .6rem; }
.band-kicker{
  opacity: .68;
  text-transform: uppercase;
  letter-spacing: .2em;
  font-size: .78rem;
}
/* ==== [FIM] Cabeçalho/Texto dentro da faixa =============================== */

/* ==== [INÍCIO] Fades nas bordas do CONTEÚDO =============================== */
/* Os fades estão DENTRO do band-content (que é relative), para alinhar
   exatamente com o padding do grid do site. */
.fade{
  position: absolute;
  height: var(--marquee-h);
  width: 12vw; max-width: 120px;
  bottom: 0.25rem; /* leve ajuste fino abaixo do kicker */
  z-index: 2;
  pointer-events: none;
  opacity: .12;
}
.fade-left  { left: 0;  background: linear-gradient(90deg, rgba(0,0,0,.35), rgba(0,0,0,0)); }
.fade-right { right: 0; background: linear-gradient(270deg, rgba(0,0,0,.35), rgba(0,0,0,0)); }
/* ==== [FIM] Fades nas bordas do CONTEÚDO ================================== */

/* ==== [INÍCIO] Logos / Marquee ============================================ */
.marquee{
  height: var(--marquee-h);
  display:flex; align-items:center; overflow:hidden;
}
.logo-img{
  height: var(--logo-h);
  width: auto;
  transition: opacity .2s ease, transform .2s ease;
  opacity: .96;
}
@media (max-width:480px){
  .logo-img{ height: 3.25rem; }
  .marquee { height: 4.25rem; }
}
.group:hover .logo-img{ opacity: 1; }

/* animação */
.group:hover .loop{ animation-play-state: paused; }
.is-paused .loop{ animation-play-state: paused; }
.loop{ width:max-content; }
.loop-l{ animation: marquee-left var(--d1, 22s) linear infinite; }
@keyframes marquee-left{ 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

@media (prefers-reduced-motion: reduce){
  .loop{ animation:none !important; }
  .marquee{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
}
/* ==== [FIM] Logos / Marquee =============================================== */
</style>
