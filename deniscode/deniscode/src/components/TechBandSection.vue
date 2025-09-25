<!-- ============================ TechBandSection.vue ============================
     Full-bleed (100vw) com conteúdo alinhado ao grid do site.
     Ajuste: mais respiro (padding vertical + altura do trilho + gaps maiores).
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
const logos = [
  { name: 'Vue.js',       slug: 'vuedotjs' },
  { name: 'React',        slug: 'react' },
  { name: 'Tailwind CSS', slug: 'tailwindcss' },
  { name: 'Node.js',      slug: 'nodedotjs' },
  { name: 'Vite',         slug: 'vite' },
  { name: 'TypeScript',   slug: 'typescript' },
  // { name: 'AWS',       slug: 'amazonaws' }, // removido
  { name: 'Google Cloud', slug: 'googlecloud' }
]
const loop = computed(() => [...logos, ...logos]) // 200% → anima -50%
/* ==== [FIM] Logos (Simple Icons – monocromático) ========================== */

/* ==== [INÍCIO] Pausar marquee fora do viewport e via teclado ============== */
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
/* ==== [FIM] Pausar marquee fora do viewport e via teclado ================= */
</script>

<template>
  <!-- ==== [INÍCIO] Section full-bleed ===================================== -->
  <section id="tech-band" ref="root" class="techband">
    <div class="band">
      <!-- conteúdo alinhado ao grid do site -->
      <div class="band-content mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <!-- Kicker -->
        <div class="band-head">
          <p class="band-kicker">{{ dict.kicker }}</p>
        </div>

        <!-- Fades colados às bordas do conteúdo -->
        <div class="fade fade-left"></div>
        <div class="fade fade-right"></div>

        <!-- ===== Marquee (1 linha) ======================================= -->
        <div
          class="marquee group select-none"
          :class="{ 'is-paused': isPaused }"
          :aria-label="dict.aria.techRegion"
          role="region"
          tabindex="0"
          :aria-pressed="isPaused ? 'true' : 'false'"
          @keydown.space.prevent="isPaused = !isPaused"
        >
          <ul
            class="loop loop-l flex items-center gap-10 sm:gap-12 will-change-transform z-10"
            :aria-label="dict.aria.techRow1"
            aria-live="off"
          >
            <li v-for="(it, idx) in loop" :key="'l1-' + idx + it.slug" class="shrink-0">
              <!-- Light -->
              <img
                :src="`https://cdn.simpleicons.org/${it.slug}/FFFFFF`"
                :alt="it.name"
                class="logo-img dark:hidden"
                loading="lazy"
                decoding="async"
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
                onerror="this.style.display='none'"
              />
              <!-- Dark -->
              <img
                :src="`https://cdn.simpleicons.org/${it.slug}/D4D4D8`"
                :alt="it.name"
                class="logo-img hidden dark:inline"
                loading="lazy"
                decoding="async"
                crossorigin="anonymous"
                referrerpolicy="no-referrer"
                onerror="this.style.display='none'"
              />
            </li>
          </ul>
        </div>
        <!-- ===== /Marquee ================================================= -->
      </div>
    </div>
  </section>
  <!-- ==== [FIM] Section full-bleed ======================================= -->
</template>

<style scoped>
/* ==== [INÍCIO] Variáveis / tamanhos (com “respiro”) ======================= */
.techband{
  --band-bg-light: #131313;
  --band-fg-light: #ffffff;
  --band-bg-dark:  #0b1020;
  --band-fg-dark:  #e5e7eb;

  /* --radius: 1.1rem; */

  /* ⚙️ respiro vertical da FAIXA (externo ao conteúdo) */
  --outer-py: 1.75rem;       /* antes 1rem → mais respiro */

  /* ⚙️ trilho e logo (um pouco maiores) */
  --marquee-h: 6rem;         /* antes 5rem */
  --logo-h:    4.5rem;       /* antes 4rem (~72px) */
}
/* ==== [FIM] Variáveis / tamanhos ========================================== */

/* ==== [INÍCIO] Faixa 100vw (gradiente + inner-shadow) ===================== */
.band{
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  border-radius: var(--radius);
  overflow: hidden;

  background: linear-gradient(180deg,
              color-mix(in oklab, var(--band-bg-light) 96%, black 4%) 0%,
              var(--band-bg-light) 100%);
  color: var(--band-fg-light);
  border: 1px solid color-mix(in oklab, var(--band-bg-light) 80%, black 20%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.06),
    inset 0 -1px 0 rgba(0,0,0,.12);

  padding-top: var(--outer-py);
  padding-bottom: var(--outer-py);

  transition: background-color .25s ease, color .25s ease, border-color .25s ease, box-shadow .25s ease;
}
:where(html.dark) .band{
  background: linear-gradient(180deg,
              color-mix(in oklab, var(--band-bg-dark) 96%, white 4%) 0%,
              var(--band-bg-dark) 100%);
  color: var(--band-fg-dark);
  border-color: color-mix(in oklab, var(--band-bg-dark) 80%, white 20%);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.05),
    inset 0 -1px 0 rgba(0,0,0,.25);
}
/* ==== [FIM] Faixa 100vw (gradiente + inner-shadow) ======================== */

/* ==== [INÍCIO] Kicker / espaçamento superior ============================== */
.band-head{ margin-bottom: .9rem; } /* antes .6rem */
.band-kicker{
  opacity: .68;
  text-transform: uppercase;
  letter-spacing: .2em;
  font-size: .78rem;
}
/* ==== [FIM] Kicker / espaçamento superior ================================= */

/* ==== [INÍCIO] Fades colados às bordas do conteúdo ======================== */
.band-content{ position: relative; }
.fade{
  position: absolute;
  height: var(--marquee-h);
  width: clamp(56px, 8vw, 128px); /* um pouco maiores */
  bottom: 0; z-index: 2; pointer-events: none; opacity: .12;
}
.fade-left  { left: 0;  background: linear-gradient(90deg, rgba(0,0,0,.35), rgba(0,0,0,0)); }
.fade-right { right: 0; background: linear-gradient(270deg, rgba(0,0,0,.35), rgba(0,0,0,0)); }
/* ==== [FIM] Fades colados às bordas do conteúdo =========================== */

/* ==== [INÍCIO] Marquee + Logos =========================================== */
.marquee{
  height: var(--marquee-h);
  display:flex; align-items:center; overflow:hidden;
  outline: none;
}
.logo-img{
  height: var(--logo-h);
  width: auto;
  transition: opacity .2s ease, transform .2s ease, filter .25s ease;
  opacity: .92; will-change: transform, opacity;
}
.group:hover .logo-img{ opacity: 1; }
.logo-img:hover { transform: translateY(-1px) scale(1.03); }

/* foco teclado: pausa/play */
.marquee:focus-visible{
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--band-fg-light) 20%, transparent),
              0 0 0 5px rgba(0,0,0,.2);
  border-radius: .5rem;
}
:where(html.dark) .marquee:focus-visible{
  box-shadow: 0 0 0 3px color-mix(in oklab, var(--band-fg-dark) 25%, transparent),
              0 0 0 5px rgba(255,255,255,.12);
}

/* animação */
.group:hover .loop{ animation-play-state: paused; }
.is-paused .loop{ animation-play-state: paused; }
.loop{ width:max-content; }
.loop-l{ animation: marquee-left var(--d1, 22s) linear infinite; }
@keyframes marquee-left{ 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

/* responsivo: mantém respiro, reduz sutilmente tamanho no mobile */
@media (max-width: 640px){
  .marquee{ height: 5rem; }
  .logo-img{ height: 3.75rem; }
}
@media (prefers-reduced-motion: reduce){
  .loop{ animation:none !important; }
  .marquee{ overflow-x:auto; -webkit-overflow-scrolling:touch; }
}
/* ==== [FIM] Marquee + Logos ============================================== */
</style>
