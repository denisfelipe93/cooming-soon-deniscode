<script setup lang="ts">
import LangSwitcher from '@/components/LangSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import SocialLinks from '@/components/SocialLinks.vue'
</script>

<template>
  <footer class="mt-16">
    <div class="mx-auto max-w-screen-xl px-6">
      <div class="h-px w-full bg-black/5 dark:bg-white/10"></div>

      <div class="py-6 md:py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div class="glass-bar flex items-center gap-2">
          <LangSwitcher class="ui-chip-ghost" />
          <ThemeToggle class="ui-chip-ghost" />
          <div class="mx-1 hidden md:block h-5 w-px bg-black/10 dark:bg-white/10"></div>
          <SocialLinks variant="ghost" />
        </div>

        <p class="text-xs text-neutral-500 dark:text-neutral-400">
          © {{ new Date().getFullYear() }} deniscode. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
