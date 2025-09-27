<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'
const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    @click="toggle"
    :aria-pressed="isDark"
    :title="isDark ? 'Dark' : 'Light'"
    class="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl
           bg-white/70 dark:bg-neutral-900/70 backdrop-blur
           border border-neutral-200/80 dark:border-neutral-800/80
           shadow-sm transition-all duration-300
           hover:shadow-md hover:-translate-y-0.5
           focus:outline-none focus:ring-2 focus:ring-[#4c2b89]/30"
  >
    <!-- SUN (fill, sem serrilhado) -->
    <svg
      v-show="!isDark"
      key="sun"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-5 w-5 transition duration-300 ease-out scale-100 opacity-100 group-active:scale-95"
    >
      <!-- disco -->
      <circle cx="12" cy="12" r="4.5" fill="currentColor"/>
      <!-- 8 raios -->
      <g fill="currentColor">
        <rect x="11" y="1.5"  width="2" height="4" rx="1"/>
        <rect x="11" y="18.5" width="2" height="4" rx="1"/>
        <rect x="1.5" y="11" width="4" height="2" rx="1"/>
        <rect x="18.5" y="11" width="4" height="2" rx="1"/>
        <rect x="4.2" y="4.2" width="2" height="4" rx="1" transform="rotate(-45 5.2 6.2)"/>
        <rect x="17.8" y="15.8" width="2" height="4" rx="1" transform="rotate(-45 18.8 17.8)"/>
        <rect x="15.8" y="4.2" width="2" height="4" rx="1" transform="rotate(45 16.8 6.2)"/>
        <rect x="4.2" y="15.8" width="2" height="4" rx="1" transform="rotate(45 5.2 17.8)"/>
      </g>
    </svg>

    <!-- MOON (crescente por máscara – também preenchido) -->
    <svg
      v-show="isDark"
      key="moon"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      class="h-5 w-5 transition duration-300 ease-out scale-100 opacity-100 group-active:scale-95"
    >
      <defs>
        <mask id="m">
          <rect width="24" height="24" fill="white"/>
          <!-- “recorte” do círculo menor -->
          <circle cx="16" cy="8.5" r="6.8" fill="black"/>
        </mask>
      </defs>
      <circle cx="12" cy="12" r="9" fill="currentColor" mask="url(#m)"/>
    </svg>

    <!-- glow sutil -->
    <span
      class="pointer-events-none absolute inset-0 -z-10 rounded-xl opacity-0
             transition-opacity duration-300 group-hover:opacity-100"
      :class="isDark
        ? 'shadow-[0_0_22px_3px_rgba(139,92,246,0.14)]'
        : 'shadow-[0_0_22px_3px_rgba(76,43,137,0.12)]'"
    />
  </button>
</template>
