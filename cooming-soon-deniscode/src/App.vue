<script setup lang="ts">
import BackgroundFX from '@/components/BackgroundFX.vue'
import BrandMark from '@/components/BrandMark.vue'
import NewsletterSection from '@/components/NewsletterSection.vue'
import LangSwitcher from '@/components/LangSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import SocialLinks from '@/components/SocialLinks.vue'
import FooterPremium from '@/components/FooterPremium.vue'
</script>

<template>
  <BackgroundFX />

  <div class="relative z-10 flex min-h-screen flex-col text-neutral-900 dark:text-neutral-100">
    <!-- topo / assinatura -->
    <header class="pt-8 md:pt-10">
      <div class="container-px mx-auto max-w-screen-xl flex justify-center">
        <BrandMark />
      </div>
    </header>

    <!-- HERO -->
    <main class="flex-1 grid place-items-center py-10">
      <section class="container-px mx-auto max-w-4xl text-center">
        <h1 class="text-balance text-fluid-hero font-bold tracking-tight leading-[1.06]">
          estamos chegando para entregar a melhor experiência em código
        </h1>

        <p class="mt-5 text-base md:text-lg text-neutral-600 dark:text-neutral-300">
          quer saber antes? siga nossa newsletter
        </p>

        <div class="mt-8 md:mt-10 flex justify-center">
          <div class="glass-card w-full max-w-2xl">
            <NewsletterSection />
          </div>
        </div>

        <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          sem spam. cancelar a qualquer momento.
        </p>
      </section>
    </main>

    <!-- RODAPÉ com chips + sociais -->
    <<FooterPremium />
  </div>
</template>

