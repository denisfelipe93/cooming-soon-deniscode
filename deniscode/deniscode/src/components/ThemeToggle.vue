<!-- src/components/ThemeToggle.vue -->
<script setup>
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme.js'

const { isDark, toggle } = useTheme()
const setDark  = () => { if (!isDark.value) toggle() }
const setLight = () => { if ( isDark.value) toggle() }

/* ===== tamanhos ===== */
const trackW   = 36
const trackH   = 19
const border   = 1       // espessura do “contorno” (feito com fills)
const knobLite = 14

/* miolo */
const innerW = trackW - 2*border
const innerH = trackH - 2*border
const rOut   = trackH / 2
const rIn    = Math.max(innerH / 2, 0)

/* meia-lua e folga do light */
const gapL          = 8
const lightPadRight = 2

/* ============ geometria animada ============ */
/* retângulo de FILL que gera a meia-lua (clipado pelo miolo) */
const fillX = border + gapL
const fillY = border
const fillW = computed(() => isDark.value ? innerW - gapL : 0)
const fillH = innerH

/* thumb (círculo) — aparece no LIGHT */
const thumbR  = knobLite / 2
const thumbCY = border + innerH / 2
const thumbCX = computed(() =>
  isDark.value
    ? border + gapL + thumbR   // qualquer posição (fica invisível)
    : border + innerW - lightPadRight - thumbR
)
const thumbOpacity = computed(() => isDark.value ? 0 : 1)

/* cores */
const trackFill = computed(() => isDark.value ? 'transparent' : '#2f3136')
const ringColor = computed(() => isDark.value ? '#eef0f3'     : '#2f3136')
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
          <!-- recorte EXATO do miolo -->
          <clipPath id="inner-clip">
            <rect :x="border" :y="border" :width="innerW" :height="innerH" :rx="rIn" :ry="rIn"/>
          </clipPath>
        </defs>

        <!-- “anel” do contorno (sem stroke) -->
        <rect :x="0" :y="0" :width="trackW" :height="trackH" :rx="rOut" :ry="rOut" :fill="ringColor"/>
        <!-- miolo do trilho -->
        <rect :x="border" :y="border" :width="innerW" :height="innerH" :rx="rIn" :ry="rIn" :fill="trackFill"/>

        <!-- FILL do dark (gera meia-lua); recolhe a 0 no light -->
        <rect class="fill"
          :x="fillX" :y="fillY"
          :width="fillW" :height="fillH"
          :rx="rIn" :ry="rIn"
          :fill="knobFill"
          clip-path="url(#inner-clip)"
        />

        <!-- THUMB (círculo) — só visível no light -->
        <circle class="thumb"
          :cx="thumbCX" :cy="thumbCY" :r="thumbR"
          :fill="knobFill"
          :opacity="thumbOpacity"
          clip-path="url(#inner-clip)"
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

  /* cores dos labels */
  --label-base-dark:  #9ca3af;
  --label-hover-dark: #e5e7eb;
  --label-base-light: #6b7280;
  --label-hover-light:#111827;
}

/* hover unificado (sem “levantar”) */
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

/* animações suaves (funcionam em Chrome/Edge/Firefox atuais) */
.fill  { transition: width .24s ease; }
.thumb { transition: cx .24s ease, opacity .18s ease; }
</style>
