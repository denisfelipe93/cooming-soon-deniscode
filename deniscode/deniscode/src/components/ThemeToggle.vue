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
      <span class="knob" :class="!isDark ? 'to-right' : ''"></span>
    </button>

    <button type="button" class="label right" @click="setLight" title="Light">LIGHT</button>
  </div>
</template>

<style scoped>
/* ====== Variáveis (você pode ajustar tamanhos aqui) ====== */
.theme-switch{
  /* trilho */
  --track-w: 42px;          /* se quiser menor: 36px ou 35px */
  --track-h: 23px;          /* ex.: 20px */
  --track-b: 2px;

  /* miolo do trilho */
  --inner-w: calc(var(--track-w) - 2 * var(--track-b));
  --inner-h: calc(var(--track-h) - 2 * var(--track-b));

  /* meia-lua (gap à esquerda no DARK) */
  --gap-l: 6px;
  --gap-r: -1px;             /* se quiser encostar totalmente à direita, use 0px */

  /* knob no LIGHT (círculo) */
  --knob-light: 18px;        /* se reduzir o trilho, use 14px ou 15px */

  /* CORES (as que você escolheu) */
  --trackL: #eef0f3;         /* contorno claro no dark */
  --trackD: #2f3136;         /* trilho escuro no light */
  --knob:   #eef0f3;         /* knob claro */

  display:flex; align-items:center; gap:.5rem;
  font-size:12px; font-weight:700; letter-spacing:.06em;
  user-select:none;
}

/* ====== Rótulos ====== */
.label{
  border:0; background:transparent; cursor:pointer;
  padding:0 .2rem; transition:opacity .15s, transform .15s;
}
.theme-switch[data-mode="dark"]  .label.left  { color:#e5e7eb }
.theme-switch[data-mode="dark"]  .label.right { color:#9ca3af }
.theme-switch[data-mode="light"] .label.left  { color:#6b7280 }
.theme-switch[data-mode="light"] .label.right { color:#111827 }
@media (hover:hover){
  .label:hover{ opacity:.85; transform:translateY(-1px) }
}

/* ====== Trilho ====== */
.toggle{
  position:relative;
  width:var(--track-w);
  height:var(--track-h);
  border-radius:9999px;
  border:var(--track-b) solid;
  outline:0;
  transition:background .2s, border-color .2s, box-shadow .2s;
  cursor:pointer;
  overflow:hidden;                /* importante p/ não aparecer fiapo */
}
.theme-switch[data-mode="dark"]  .toggle{
  background:transparent;         /* interior transparente no dark */
  border-color:var(--trackL);
}
.theme-switch[data-mode="light"] .toggle{
  background:var(--trackD);       /* trilho preenchido no light */
  border-color:var(--trackD);
}
.toggle:focus-visible{ box-shadow:0 0 0 4px rgba(189,147,249,.25) }

/* ====== Knob ====== */
.knob{
  position:absolute;
  top:50%;
  left:var(--gap-l);
  border-radius:9999px;
  background:var(--knob);
  transform:translateY(-50%);     /* centralizado verticalmente */
  transition:transform .3s ease, width .3s ease, height .3s ease, background .2s;
  box-shadow:0 1px 3px rgba(0,0,0,.2);  /* sutil */
}

/* DARK: oval com a MESMA ALTURA do miolo (sem gap vertical) */
.theme-switch[data-mode="dark"] .knob{
  height:var(--inner-h);
  width: calc(var(--inner-w) - var(--gap-l) - var(--gap-r)); /* sem espaço à direita */
  border-radius:calc(var(--inner-h)/2);
  left:var(--gap-l);
}

/* LIGHT: círculo que desliza para a direita */
.theme-switch[data-mode="light"] .knob{
  width:var(--knob-light);
  height:var(--knob-light);
  left:var(--gap-l);
}
.to-right{
  transform: translate(
    calc(var(--inner-w) - var(--knob-light) - var(--gap-l)),
    -50%
  );
}
</style>
