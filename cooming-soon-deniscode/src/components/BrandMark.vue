<script setup lang="ts">
/* Header minimal: apenas o logo, alternando conforme tema */
</script>

<template>
  <div class="select-none" aria-label="deniscode">
    <!-- Light: logo escuro | Dark: logo claro -->
    <img src="/logo-dark.svg" alt="deniscode" class="h-10 md:h-12 w-auto block dark:hidden" />
    <img src="/logo-light.svg" alt="deniscode" class="h-10 md:h-12 w-auto hidden dark:block" />
  </div>
</template>

<style scoped>
/* nada: limpo e minimal */
</style>
