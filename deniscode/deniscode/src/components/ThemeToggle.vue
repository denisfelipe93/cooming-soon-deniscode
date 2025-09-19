<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'
import { useLocale } from '@/composables/useLocale.js'

const { isDark, toggle } = useTheme()
const { locale } = useLocale()

const ariaTitle = computed(() =>
  locale.value === 'pt'
    ? (isDark.value ? 'Mudar para tema claro' : 'Mudar para tema escuro')
    : (isDark.value ? 'Switch to light mode' : 'Switch to dark mode')
)
</script>

<template>
  <button
    class="theme-btn"
    role="switch"
    :aria-checked="isDark"
    :data-dark="isDark"
    :title="ariaTitle"
    @click="toggle"
    @keydown.enter.prevent="toggle"
    @keydown.space.prevent="toggle"
  >
    <span class="icon-wrap" aria-hidden="true">
      <!-- Sun -->
      <svg class="ico sun" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
          <circle cx="12" cy="12" r="4"/>
          <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2
                   M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41
                   M17.66 6.34l1.41-1.41 M6.34 17.66l-1.41 1.41"/>
        </g>
      </svg>

      <!-- Moon -->
      <svg class="ico moon" viewBox="0 0 24 24">
        <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke">
          <path d="M21 12.79A9 9 0 1 1 11.21 3
                   7 7 0 0 0 21 12.79z"/>
        </g>
      </svg>
    </span>
  </button>
</template>

<style scoped>
.theme-btn{
  --size: 32px;

  /* base state (muda via [data-dark]) */
  --fg: #1f2937;      /* cor dos ícones */
  --bg: transparent;  /* fundo do botão */
  --bor: #d3d6dc;     /* borda */

  /* preview inverso no hover (só botão, não troca o tema) */
  --fg-hover: #e5e7eb;
  --bg-hover: #2f3136;
  --bor-hover: #e6e8ec;

  position: relative;
  width: var(--size);
  height: var(--size);
  display: inline-block;          /* wrapper absoluto cuida do centro */
  border-radius: 9999px;
  border: 1px solid var(--bor);
  background: var(--bg);
  color: var(--fg);
  transition: border-color .2s ease, color .2s ease, background-color .2s ease;
  outline: none;
}
.theme-btn:focus-visible{ box-shadow: 0 0 0 3px rgba(99,102,241,.35); }

/* estados */
.theme-btn[data-dark="false"]{
  --fg:#1f2937; --bg:transparent; --bor:#d3d6dc;
  --fg-hover:#e5e7eb; --bg-hover:#2f3136; --bor-hover:#e6e8ec;
}
.theme-btn[data-dark="true"]{
  --fg:#e5e7eb; --bg:transparent; --bor:#3f434a;
  --fg-hover:#1f2937; --bg-hover:#e9eaee; --bor-hover:#cdd0d6;
}

/* preview no hover */
.theme-btn:hover{ background:var(--bg-hover); color:var(--fg-hover); border-color:var(--bor-hover); }

/* ===== centro absoluto dos ícones ===== */
.icon-wrap{
  position:absolute;
  inset:0;
  display:block;
  /* caixa exata do ícone */
  width: 18px;
  height: 18px;
  left:50%;
  top:50%;
  transform: translate(-50%, -50%); /* centro matemático */
  pointer-events: none;
}

/* svg sempre ocupando 100% da caixinha */
.ico{
  position:absolute;
  inset:0;
  width:100%;
  height:100%;
  display:block;
  transition: opacity .18s ease;
  transform: translateZ(0); /* força compositor, evita jiggle */
}

/* visibilidade por estado (sem trocar no hover) */
.theme-btn[data-dark="false"] .sun{ opacity: 1; }
.theme-btn[data-dark="false"] .moon{ opacity: 0; }
.theme-btn[data-dark="true"]  .sun{ opacity: 0; }
.theme-btn[data-dark="true"]  .moon{ opacity: 1; }

/* acessibilidade: reduz animações */
@media (prefers-reduced-motion: reduce) {
  .theme-btn, .ico { transition: none !important; }
}
</style>
