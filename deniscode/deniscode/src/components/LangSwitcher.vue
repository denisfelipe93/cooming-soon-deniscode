<script setup>
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale.js'

const { locale, setLocale } = useLocale()
const current = computed(() => locale.value)
</script>

<template>
  <div class="inline-flex items-center" role="group" aria-label="Idioma">
    <div class="flex items-center rounded-xl border border-zinc-300/70 dark:border-zinc-700/70 overflow-hidden">
      <button
        type="button"
        class="px-2.5 py-1.5 text-[12px] font-semibold tracking-wide transition-colors
               text-zinc-700 dark:text-zinc-300"
        :class="current === 'pt'
          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60'"
        @click="setLocale('pt')"
        aria-pressed="current === 'pt'"
      >PT</button>

      <button
        type="button"
        class="px-2.5 py-1.5 text-[12px] font-semibold tracking-wide transition-colors
               text-zinc-700 dark:text-zinc-300"
        :class="current === 'en'
          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white'
          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/60'"
        @click="setLocale('en')"
        aria-pressed="current === 'en'"
      >EN</button>
    </div>
  </div>
</template>
