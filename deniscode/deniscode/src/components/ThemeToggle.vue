<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'
import { useLocale } from '@/composables/useLocale.js'

const { isDark, toggle } = useTheme()
const { locale } = useLocale()

const ariaTitle = computed(() => {
  const pt = isDark.value ? 'Mudar para tema claro' : 'Mudar para tema escuro'
  const en = isDark.value ? 'Switch to light mode' : 'Switch to dark mode'
  return locale.value === 'pt' ? pt : en
})
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
/* ===== base ===== */
.theme-btn{
  --size: 32px;

  /* estado base (LIGHT/DARK) → ajustados por data-dark abaixo */
  --fg: #1f2937;      /* cor dos ícones */
  --bg: transparent;  /* fundo do botão */
  --bor: #d3d6dc;     /* borda */

  /* preview no hover (tema oposto) */
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

/* tamanhos opcionais */
.theme-btn.sm{ --size: 28px; }
.theme-btn.lg{ --size: 36px; }

/* ===== estados (definem variáveis reais) ===== */
/* LIGHT (isDark=false) → sol visível; preview = DARK */
.theme-btn[data-dark="false"]{
  --fg: #1f2937;
  --bg: transparent;
  --bor: #d3d6dc;

  --fg-hover: #e5e7eb;
  --bg-hover: #2f3136;
  --bor-hover: #e6e8ec;
}

/* DARK (isDark=true) → lua visível; preview = LIGHT */
.theme-btn[data-dark="true"]{
  --fg: #e5e7eb;
  --bg: transparent;
  --bor: #3f434a;

  --fg-hover: #1f2937;
  --bg-hover: #e9eaee;
  --bor-hover: #cdd0d6;
}

/* aplica o preview só no hover (não muda o tema global) */
.theme-btn:hover{
  background: var(--bg-hover);
  color: var(--fg-hover);
  border-color: var(--bor-hover);
}

/* ===== ícones ===== */
.ico{
  grid-area: 1/1;
  width: 18px; height: 18px;
  transform-origin: 50% 50%;
  transition: opacity .22s ease, transform .22s ease;
  display: block;
}

/* base: qual ícone aparece por estado (sem hover) */
.theme-btn[data-dark="false"] .sun{ opacity: 1; transform: scale(1) rotate(0deg); }
.theme-btn[data-dark="false"] .moon{ opacity: 0; transform: scale(.8) rotate(15deg); }
.theme-btn[data-dark="true"]  .sun{ opacity: 0; transform: scale(.8) rotate(-15deg); }
.theme-btn[data-dark="true"]  .moon{ opacity: 1; transform: scale(1) rotate(0deg); }

/* ===== troca o ícone no hover (mostra o oposto) ===== */
.theme-btn[data-dark="false"]:hover .sun{ opacity: 0; transform: scale(.8) rotate(-15deg); }
.theme-btn[data-dark="false"]:hover .moon{ opacity: 1; transform: scale(1) rotate(0deg); }

.theme-btn[data-dark="true"]:hover .sun{ opacity: 1; transform: scale(1) rotate(0deg); }
.theme-btn[data-dark="true"]:hover .moon{ opacity: 0; transform: scale(.8) rotate(15deg); }

/* acessibilidade: reduz animações se preferido no SO */
@media (prefers-reduced-motion: reduce) {
  .theme-btn, .ico { transition: none !important; }
}
</style>
