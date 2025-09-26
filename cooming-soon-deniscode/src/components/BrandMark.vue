<script setup lang="ts">
// Sem JS: alternamos o logo com classes (light/dark)
</script>

<template>
  <div class="flex flex-col items-center select-none" role="banner" aria-label="deniscode">
    <!-- wordmark minimal e delicado -->
    <h1 class="leading-none tracking-tight text-[16px] md:text-[18px] font-medium">
      <span class="text-neutral-900 dark:text-neutral-100">denis</span>
      <span class="ml-1 font-normal text-neutral-600 dark:text-neutral-400">code</span>
    </h1>

    <!-- logo MUITO perto do texto -->
    <div class="-mt-0.5">
      <!-- tema light: logo escuro -->
      <img
        src="/logo-light.svg"
        alt="logo deniscode"
        class="h-10 md:h-12 w-auto block dark:hidden"
        decoding="async" loading="eager"
      />
      <!-- tema dark: logo claro -->
      <img
        src="/logo-dark.svg"
        alt="logo deniscode"
        class="h-10 md:h-12 w-auto hidden dark:block"
        decoding="async" loading="eager"
      />
    </div>
  </div>
</template>

<style scoped>
/* propositalmente sem animações/sombras */
</style>
