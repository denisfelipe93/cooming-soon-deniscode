<!-- src/components/ThemeToggle.vue -->
<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'

const { isDark, toggle } = useTheme()
const setDark  = () => { if (!isDark.value) toggle() }
const setLight = () => { if ( isDark.value) toggle() }

/* ===== tamanhos ===== */
const trackW   = 35
const trackH   = 22
const strokeW  = 2
const knobLite = 16

/* miolo */
const innerW = trackW - strokeW
const innerH = trackH - strokeW
const r      = innerH / 2

/* meia-lua (5–9) */
const gapL   = 8

/* overshoot sutil p/ “soldar” sob o stroke */
const overX  = 0.6
const overY  = 0.35

/* folga do knob no LIGHT p/ esquerda */
const lightPadRight = 2

/* 👇 cobertura extra do stroke de cima pra eliminar cortes sutis */
const strokeOverlayFudge = 0.3  // px (0.3–0.6)

/* posição/tamanho do knob */
const knobX = computed(() =>
  isDark.value
    ? strokeW/2 + gapL
    : strokeW/2 + innerW - knobLite - lightPadRight
)
const knobY = computed(() =>
  isDark.value ? strokeW/2 - overY : strokeW/2 + (innerH - knobLite) / 2
)
const knobW = computed(() =>
  isDark.value ? innerW - gapL + overX : knobLite
)
const knobH = computed(() =>
  isDark.value ? innerH + 2*overY : knobLite
)

/* cores */
const trackFill   = computed(() => isDark.value ? 'transparent' : '#2f3136')
const trackStroke = computed(() => isDark.value ? '#eef0f3'     : '#2f3136')
const knobFill    = '#eef0f3'
</script>

<template>
  <div class="theme-switch" :data-mode="isDark ? 'dark' : 'light'">
    <button type="button" class="label" @click="setDark">DARK</button>

    <button
      type="button"
      class="toggle"
      role="switch"
      :aria-checked="isDark"
      :title="isDark ? 'Dark' : 'Light'"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <svg
        :width="trackW" :height="trackH" :viewBox="`0 0 ${trackW} ${trackH}`"
        class="switch-svg" shape-rendering="geometricPrecision"
      >
        <!-- trilho -->
        <rect
          :x="strokeW/2" :y="strokeW/2"
          :width="trackW - strokeW" :height="trackH - strokeW"
          :rx="(trackH - strokeW)/2" :ry="(trackH - strokeW)/2"
          :fill="trackFill" :stroke="trackStroke" :stroke-width="strokeW"
          stroke-linejoin="round" stroke-linecap="round"
        />

        <!-- knob (com overshoot, fica sob o stroke) -->
        <rect class="knob"
          :x="knobX" :y="knobY"
          :width="knobW" :height="knobH"
          :rx="r + (isDark ? overY : 0)" :ry="r + (isDark ? overY : 0)"
          :fill="knobFill"
        />

        <!-- stroke por cima com um “pelinho” a mais pra cobrir hairline -->
        <rect
          :x="strokeW/2" :y="strokeW/2"
          :width="trackW - strokeW" :height="trackH - strokeW"
          :rx="(trackH - strokeW)/2" :ry="(trackH - strokeW)/2"
          fill="none" :stroke="trackStroke" :stroke-width="strokeW + strokeOverlayFudge"
          stroke-linejoin="round" stroke-linecap="round"
        />
      </svg>
    </button>

    <button type="button" class="label" @click="setLight">LIGHT</button>
  </div>
</template>

<style scoped>
.theme-switch{
  display:flex; align-items:center; gap:.5rem;
  font-size:12px; font-weight:700; letter-spacing:.06em; user-select:none;

  /* Paleta dos labels via CSS vars */
  --label-base-dark:  #9ca3af; /* base no dark */
  --label-hover-dark: #e5e7eb; /* hover no dark (claro) */
  --label-base-light: #6b7280; /* base no light */
  --label-hover-light:#111827; /* hover no light (escuro) */
}

/* === labels iguais (hover unificado) === */
.label{
  border:0; background:transparent; cursor:pointer; padding:0 .2rem;
  transition: color .15s ease; /* só cor, sem levantar */
}
.theme-switch[data-mode="dark"]  .label{ color:var(--label-base-dark)  }
.theme-switch[data-mode="light"] .label{ color:var(--label-base-light) }
.theme-switch[data-mode="dark"]  .label:hover{ color:var(--label-hover-dark)  }
.theme-switch[data-mode="light"] .label:hover{ color:var(--label-hover-light) }

/* botão do switch */
.toggle{ border:0; padding:0; background:none; cursor:pointer; line-height:0 }
.switch-svg{ display:block }
.knob{ transition: x .22s ease, y .22s ease, width .22s ease, height .22s ease, rx .22s ease, ry .22s ease }
</style>
