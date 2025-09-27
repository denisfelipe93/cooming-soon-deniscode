<!-- src/components/LangSwitcher.vue -->
<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { locale, toggleLocale, setLocale } = useLocale()
</script>

<template>
  <!-- Versão “pill” PT/EN -->
  <div
    class="inline-flex select-none items-center rounded-xl border
           border-neutral-200/80 dark:border-neutral-800/80
           bg-white/70 dark:bg-neutral-900/70 backdrop-blur
           p-1 text-sm"
    role="group"
    aria-label="Language switcher"
  >
    <button
      type="button"
      @click="setLocale('pt')"
      :class="[
        'px-3 py-1.5 rounded-lg transition-all',
        locale === 'pt'
          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow'
          : 'hover:bg-white/60 dark:hover:bg-neutral-800/60'
      ]"
    >
      PT
    </button>
    <button
      type="button"
      @click="setLocale('en')"
      :class="[
        'px-3 py-1.5 rounded-lg transition-all',
        locale === 'en'
          ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow'
          : 'hover:bg-white/60 dark:hover:bg-neutral-800/60'
      ]"
    >
      EN
    </button>
  </div>

  <!--
    Se quiser a versão minimalista de um botão único, substitua o bloco acima por:
    <button
      @click="toggleLocale"
      class="rounded-xl border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm
             hover:bg-white/60 dark:hover:bg-neutral-900/60 backdrop-blur"
    >
      {{ locale.toUpperCase() }}
    </button>
  -->
</template>
