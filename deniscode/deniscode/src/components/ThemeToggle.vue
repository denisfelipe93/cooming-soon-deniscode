<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'

const { isDark, toggle } = useTheme()
const setDark  = () => { if (!isDark.value) toggle() }
const setLight = () => { if ( isDark.value) toggle() }

/* ===== medidas escolhidas ===== */
const trackW = 36
const trackH = 19
const border = 1        // “contorno” via fills
const knobLite = 14

/* miolo */
const innerW = trackW - 2*border
const innerH = trackH - 2*border
const rOut = trackH / 2
const rIn  = Math.max(innerH / 2, 0)

/* meia-lua e folga do light */
const gapL = 8
const lightPadRight = 2

/* IDs únicos p/ evitar colisões */
const uid = Math.random().toString(36).slice(2)
const clipId = `inner-clip-${uid}`
const maskId = `knob-cut-${uid}`

/* knob (único retângulo) — anima x/y/width/height/rx/ry */
const knobX = computed(() =>
  isDark.value ? border + gapL : border + innerW - knobLite - lightPadRight
)
const knobY = computed(() =>
  isDark.value ? border : border + (innerH - knobLite) / 2
)
const knobW = computed(() =>
  isDark.value ? innerW - gapL : knobLite
)
const knobH = computed(() =>
  isDark.value ? innerH : knobLite
)
const knobR = computed(() =>
  isDark.value ? rIn : knobLite / 2
)

/* aplica máscara só no DARK (remove atributo no LIGHT) */
const maskAttr = computed(() => (isDark.value ? `url(#${maskId})` : null))

/* cores */
const trackFill = computed(() => (isDark.value ? 'transparent' : '#2f3136'))
const ringColor = computed(() => (isDark.value ? '#eef0f3'     : '#2f3136'))
const knobFill  = '#eef0f3'
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
      <svg :width="trackW" :height="trackH" :viewBox="`0 0 ${trackW} ${trackH}`" class="switch-svg">
        <defs>
          <!-- miolo para clip (ID único) -->
          <clipPath :id="clipId" clipPathUnits="userSpaceOnUse">
            <rect :x="border" :y="border" :width="innerW" :height="innerH" :rx="rIn" :ry="rIn"/>
          </clipPath>

          <!-- máscara do knob no DARK: recorta círculo à esquerda -->
          <mask :id="maskId" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
            <!-- branco mantém, preto recorta -->
            <rect :x="0" :y="0" :width="trackW" :height="trackH" fill="white"/>
            <circle
              :cx="border + gapL"
              :cy="border + innerH/2"
              :r="gapL"
              fill="black"
            />
          </mask>
        </defs>

        <!-- anel do contorno (sem stroke) -->
        <rect :x="0" :y="0" :width="trackW" :height="trackH" :rx="rOut" :ry="rOut" :fill="ringColor"/>
        <!-- miolo -->
        <rect :x="border" :y="border" :width="innerW" :height="innerH" :rx="rIn" :ry="rIn" :fill="trackFill"/>

        <!-- KNOB único (clipado; no DARK recebe máscara com meia-lua) -->
        <rect class="knob"
          :x="knobX" :y="knobY"
          :width="knobW" :height="knobH"
          :rx="knobR" :ry="knobR"
          :fill="knobFill"
          :clip-path="`url(#${clipId})`"
          :mask="maskAttr"
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

  /* hover unificado dos labels */
  --label-base-dark:  #9ca3af;
  --label-hover-dark: #e5e7eb;
  --label-base-light: #6b7280;
  --label-hover-light:#111827;
}
.label{
  border:0; background:transparent; cursor:pointer; padding:0 .2rem;
  transition: color .15s ease;
}
.theme-switch[data-mode="dark"]  .label{ color:var(--label-base-dark)  }
.theme-switch[data-mode="light"] .label{ color:var(--label-base-light) }
.theme-switch[data-mode="dark"]  .label:hover{ color:var(--label-hover-dark)  }
.theme-switch[data-mode="light"] .label:hover{ color:var(--label-hover-light) }

.toggle{ border:0; padding:0; background:none; cursor:pointer; line-height:0 }
.switch-svg{ display:block }

/* animação “de antes”: atributos do SVG */
.knob{
  transition:
    x .22s ease,
    y .22s ease,
    width .22s ease,
    height .22s ease,
    rx .22s ease,
    ry .22s ease;
}
</style>
