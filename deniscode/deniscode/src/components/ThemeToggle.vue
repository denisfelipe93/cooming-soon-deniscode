<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'

const { isDark, toggle } = useTheme()

const ariaTitle = computed(() =>
  isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
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
    <!-- Sun -->
    <svg class="ico sun" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="4"/>
        <path d="M12 2v2 M12 20v2 M2 12h2 M20 12h2
                 M4.93 4.93l1.41 1.41 M17.66 17.66l1.41 1.41
                 M17.66 6.34l1.41-1.41 M6.34 17.66l-1.41 1.41"/>
      </g>
    </svg>

    <!-- Moon -->
    <svg class="ico moon" viewBox="0 0 24 24" aria-hidden="true">
      <g fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3
                 7 7 0 0 0 21 12.79z"/>
      </g>
    </svg>
  </button>
</template>

<style scoped>
.theme-btn{
  --size: 32px;

  /* valores padrão (serão sobrescritos por estado) */
  --fg: #1f2937;      /* cor dos ícones */
  --bg: transparent;  /* fundo padrão */
  --bor: #d3d6dc;     /* borda padrão */

  /* valores de PREVIEW (hover) — são definidos por estado logo abaixo */
  --fg-hover: #e5e7eb;
  --bg-hover: #2f3136;
  --bor-hover: #e6e8ec;

  width: var(--size);
  height: var(--size);
  display: inline-grid;
  place-items: center;
  border-radius: 9999px;
  border: 1px solid var(--bor);
  background: var(--bg);
  color: var(--fg);
  transition: border-color .2s ease, color .2s ease, background-color .2s ease;
  outline: none;
}
.theme-btn:focus-visible{ box-shadow: 0 0 0 3px rgba(99,102,241,.35); }

/* --- ESTADOS (definem as variáveis reais) --- */
/* LIGHT (isDark=false) → ícone sol; preview no hover é DARK */
.theme-btn[data-dark="false"]{
  --fg: #1f2937;      /* ícone escuro */
  --bg: transparent;
  --bor: #d3d6dc;

  --fg-hover: #e5e7eb;/* ícone branco */
  --bg-hover: #2f3136;/* fundo escuro */
  --bor-hover: #e6e8ec;
}
/* DARK (isDark=true) → ícone lua; preview no hover é LIGHT */
.theme-btn[data-dark="true"]{
  --fg: #e5e7eb;      /* ícone claro */
  --bg: transparent;
  --bor: #3f434a;

  --fg-hover: #1f2937;/* ícone escuro */
  --bg-hover: #e9eaee;/* fundo claro */
  --bor-hover: #cdd0d6;
}

/* aplica o preview só no hover (sem mudar o tema global) */
.theme-btn:hover{
  background: var(--bg-hover);
  color: var(--fg-hover);
  border-color: var(--bor-hover);
}

/* ícones: mesma célula, mesmo centro → nada “anda” ao trocar */
.ico{
  grid-area: 1/1;
  width: 18px; height: 18px;
  transform-origin: 50% 50%;
  transition: opacity .22s ease, transform .22s ease;
  display: block;
}

/* qual ícone aparece em cada estado (não muda no hover) */
.theme-btn[data-dark="false"] .sun{ opacity: 1; transform: scale(1) rotate(0deg); }
.theme-btn[data-dark="false"] .moon{ opacity: 0; transform: scale(.8) rotate(15deg); }
.theme-btn[data-dark="true"]  .sun{ opacity: 0; transform: scale(.8) rotate(-15deg); }
.theme-btn[data-dark="true"]  .moon{ opacity: 1; transform: scale(1) rotate(0deg); }
</style>
