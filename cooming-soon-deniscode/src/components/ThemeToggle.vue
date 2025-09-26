<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
const { isDark, toggle } = useTheme()
</script>

<template>
  <button @click="toggle()"
          class="rounded-xl border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm hover:bg-white/60 dark:hover:bg-neutral-900/60 backdrop-blur">
    {{ isDark ? 'Dark' : 'Light' }}
  </button>
</template>
