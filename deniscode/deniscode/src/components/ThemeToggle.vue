<!-- src/components/ThemeToggle.vue -->
<script setup>
import { useTheme } from '@/composables/useTheme.js'

const { isDark, toggle } = useTheme()

const setDark  = () => { if (!isDark.value) toggle() }
const setLight = () => { if ( isDark.value) toggle() }
</script>

<template>
  <div class="theme-switch" :data-mode="isDark ? 'dark' : 'light'">
    <button type="button" class="label left"  @click="setDark"  title="Dark">DARK</button>

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
      <!-- no LIGHT recebe .to-right -->
      <span class="knob" :class="!isDark ? 'to-right' : ''"></span>
    </button>

    <button type="button" class="label right" @click="setLight" title="Light">LIGHT</button>
  </div>
</template>

<style scoped>
/* ====== Variáveis ====== */
.theme-switch{
  /* trilho */
  --track-w: 35px;
  --track-h: 20px;
  --track-b: 2px;

  /* miolo do trilho */
  --inner-w: calc(var(--track-w) - 2*var(--track-b));
  --inner-h: calc(var(--track-h) - 2*var(--track-b));

  /* meia-lua: distância do knob à borda ESQ no dark */
  --gap-l: 6px;
  --gap-r: 0px;       /* encosta do lado DIR */

  /* hairline fixes */
  --bleed-x: 1px;     /* cobre o lado direito */
  --left-fudge: .25px;/* alinhamento sub-pixel opcional */

  /* knob LIGHT */
  --knob-light: 15px;

  /* cores */
  --trackL: #d8dce2;  /* contorno claro (dark mode) */
  --trackD: #2f3136;  /* trilho escuro (light mode) */
  --knob:   #eef0f3;

  display:flex; align-items:center; gap:.5rem;
  font-size:12px; font-weight:700; letter-spacing:.06em;
  user-select:none;
}

/* labels */
.label{ border:0; background:transparent; cursor:pointer; padding:0 .2rem; transition:opacity .15s, transform .15s }
.theme-switch[data-mode="dark"]  .label.left  { color:#e5e7eb }
.theme-switch[data-mode="dark"]  .label.right { color:#9ca3af }
.theme-switch[data-mode="light"] .label.left  { color:#6b7280 }
.theme-switch[data-mode="light"] .label.right { color:#111827 }
@media (hover:hover){ .label:hover{ opacity:.85; transform:translateY(-1px) } }

/* trilho */
.toggle{
  position:relative;
  width:var(--track-w);
  height:var(--track-h);
  border-radius:9999px;
  border:var(--track-b) solid;
  outline:0;
  transition:background .2s, border-color .2s, box-shadow .2s;
}
.theme-switch[data-mode="dark"]  .toggle{ background:transparent;  border-color:var(--trackL) }
.theme-switch[data-mode="light"] .toggle{ background:var(--trackD); border-color:rgba(0,0,0,.4) }
.toggle:focus-visible{ box-shadow:0 0 0 4px rgba(189,147,249,.25) }

/* knob base */
.knob{
  position:absolute; top:50%;
  left: calc(var(--gap-l) - var(--left-fudge)); /* FUDGE p/ evitar hairline à esquerda */
  border-radius:9999px;
  background:var(--knob);
  transform:translateY(-50%);
  transition:transform .25s, width .25s, height .25s, background .2s;
}

/* DARK: oval com MESMA ALTURA do miolo (raio idêntico) + bleed horizontal à direita */
.theme-switch[data-mode="dark"] .knob{
  height: var(--inner-h);  /* == raio interno → sem “fiapo” no arco */
  width:  calc(var(--inner-w) - var(--gap-l) - var(--gap-r) + var(--bleed-x));
  border-radius: calc(var(--inner-h) / 2);
}

/* LIGHT: círculo que desliza para a direita */
.theme-switch[data-mode="light"] .knob{
  width:var(--knob-light);
  height:var(--knob-light);
}
.to-right{
  transform: translate(
    calc(var(--inner-w) - var(--knob-light) - var(--gap-l) - var(--gap-r)),
    -50%
  );
}
</style>

