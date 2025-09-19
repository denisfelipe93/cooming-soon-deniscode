<!-- src/components/ThemeToggle.vue -->
<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'

const { isDark, toggle } = useTheme()
const setDark  = () => { if (!isDark.value) toggle() }
const setLight = () => { if ( isDark.value) toggle() }

/* ===== tamanhos (pares → sem meia-linha) ===== */
const trackW   = 36
const trackH   = 19   // ← par
const strokeW  = 1    // ← par
const knobLite = 14

/* miolo */
const innerW = trackW - strokeW
const innerH = trackH - strokeW
const r      = innerH / 2

/* meia-lua e folga da bolinha (LIGHT) */
const gapL          = 8
const lightPadRight = 2

/* overshoot sutil p/ “soldar” o knob sob o stroke (sem engordar visivelmente) */
const overX = 0.6, overY = 0.35

/* knob único: anima x/y/w/h/r */
const knobX = computed(() =>
  isDark.value ? strokeW/2 + gapL : strokeW/2 + innerW - knobLite - lightPadRight
)
const knobY = computed(() =>
  isDark.value ? strokeW/2 - overY : strokeW/2 + (innerH - knobLite)/2
)
const knobW = computed(() =>
  isDark.value ? innerW - gapL + overX : knobLite
)
const knobH = computed(() =>
  isDark.value ? innerH + 2*overY : knobLite
)
const knobR = computed(() =>
  isDark.value ? r + overY : knobLite/2
)

/* cores */
const trackFill   = computed(() => isDark.value ? 'transparent' : '#2f3136')
const trackStroke = computed(() => isDark.value ? '#eef0f3'     : '#2f3136')
const knobFill    = '#eef0f3'

/* stroke superior levemente mais grosso (cobre qualquer hairline) */
const strokeOverlayFudge = 0.45
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
      <svg :width="trackW" :height="trackH" :viewBox="`0 0 ${trackW} ${trackH}`"
           class="switch-svg" shape-rendering="geometricPrecision">
        <!-- trilho base -->
        <rect
          :x="strokeW/2" :y="strokeW/2"
          :width="trackW - strokeW" :height="trackH - strokeW"
          :rx="(trackH - strokeW)/2" :ry="(trackH - strokeW)/2"
          :fill="trackFill" :stroke="trackStroke" :stroke-width="strokeW"
          stroke-linejoin="round" stroke-linecap="round"
        />

        <!-- knob (com overshoot por baixo do stroke) -->
        <rect class="knob"
          :x="knobX" :y="knobY"
          :width="knobW" :height="knobH"
          :rx="knobR" :ry="knobR"
          :fill="knobFill"
        />

        <!-- stroke por cima cobre qualquer hairline -->
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

  --label-base-dark:#9ca3af;  --label-hover-dark:#e5e7eb;
  --label-base-light:#6b7280; --label-hover-light:#111827;
}
.label{
  border:0; background:transparent; cursor:pointer; padding:0 .2rem;
  transition:color .15s ease;
}
.theme-switch[data-mode="dark"]  .label{ color:var(--label-base-dark)  }
.theme-switch[data-mode="light"] .label{ color:var(--label-base-light) }
.theme-switch[data-mode="dark"]  .label:hover{ color:var(--label-hover-dark)  }
.theme-switch[data-mode="light"] .label:hover{ color:var(--label-hover-light) }

.toggle{ border:0; padding:0; background:none; cursor:pointer; line-height:0 }
.switch-svg{ display:block }
.knob{
  transition:
    x .22s ease, y .22s ease,
    width .22s ease, height .22s ease,
    rx .22s ease, ry .22s ease;
}
</style>
