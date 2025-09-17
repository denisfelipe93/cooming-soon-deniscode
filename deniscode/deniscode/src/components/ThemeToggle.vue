<script setup>
import { useTheme } from '@/composables/useTheme.js'
const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    @click="toggle"
    aria-label="Toggle color theme"
    class="inline-flex items-center justify-center w-9 h-9 rounded-full border
           border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition
           focus:outline-none focus:ring-2 focus:ring-[#BD93F9]/60"
    title="Theme"
  >
    <span v-if="!isDark">🌙</span>
    <span v-else>🌞</span>
  </button>
</template>
