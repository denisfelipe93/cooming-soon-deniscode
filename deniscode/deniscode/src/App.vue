<!-- src/App.vue -->
<script setup>
import { onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Hero from '@/components/Hero.vue'

// (opcional) usa o tema escuro se o sistema preferir
onMounted(() => {
  const saved = localStorage.getItem('theme') // 'dark' | 'light' (se você quiser salvar no futuro)
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches
  const isDark = saved ? saved === 'dark' : prefersDark
  document.documentElement.classList.toggle('dark', !!isDark)
})
</script>

<template>
  <!-- Header fixo -->
  <Navbar />

  <!-- Conteúdo: padding top = altura do header (h-16) -->
  <main class="pt-16 min-h-screen font-sans antialiased bg-white text-zinc-900 dark:bg-[#0b0f14] dark:text-zinc-100">
    <Hero />
    <!-- (futuras seções aqui) -->
    <!-- <SolutionsSection /> -->
    <!-- <PricingSection /> -->
    <!-- <AboutSection /> -->
    <!-- <ContactSection /> -->
  </main>
</template>

<style scoped>
/* estilos globais específicos desta página, se precisar */
</style>
