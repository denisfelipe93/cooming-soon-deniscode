<script setup lang="ts">
import { useLocale } from '@/composables/useLocale'
const { locale, toggleLocale } = useLocale()
</script>

<template>
  <button @click="toggleLocale"
          class="rounded-xl border border-neutral-200 dark:border-neutral-800 px-3 py-2 text-sm hover:bg-white/60 dark:hover:bg-neutral-900/60 backdrop-blur">
    {{ locale.toUpperCase() }}
  </button>
</template>
