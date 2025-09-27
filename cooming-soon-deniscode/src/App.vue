<script setup lang="ts">
import BackgroundFX from '@/components/BackgroundFX.vue'
import BrandMark from '@/components/BrandMark.vue'
import NewsletterSection from '@/components/NewsletterSection.vue'
import FooterWithFaq from '@/components/FooterWithFaq.vue'
import LangSwitcher from '@/components/LangSwitcher.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useLocale } from '@/composables/useLocale'

const { t } = useLocale()
</script>

<template>
  <BackgroundFX />

  <div class="relative z-10 flex min-h-screen flex-col text-neutral-900 dark:text-neutral-100">
    <!-- HEADER -->
    <header class="pt-6 md:pt-8">
      <div class="container-px mx-auto max-w-screen-xl flex items-center justify-between">
        <!-- esquerda -->
        <BrandMark />
        <!-- direita -->
        <div class="flex items-center gap-2">
          <LangSwitcher class="ui-chip-ghost" />
          <ThemeToggle class="ui-chip-ghost" />
        </div>
      </div>
    </header>

    <!-- ESPAÇAMENTO APENAS APÓS O HEADER -->
    <div class="h-6 md:h-8"></div>

    <!-- HERO -->
    <main class="flex-1 grid place-items-center py-10">
      <section class="container-px mx-auto max-w-4xl text-center">
        <h1 class="text-balance text-fluid-hero font-bold tracking-tight leading-[1.06]">
          {{ t.hero.title }}
        </h1>

        <p class="mt-5 text-base md:text-lg text-neutral-600 dark:text-neutral-300">
          {{ t.hero.subtitle }}
        </p>

        <!-- Newsletter -->
        <div id="newsletter" class="mt-8 md:mt-10 flex justify-center">
          <div class="glass-card w-full max-w-2xl">
            <NewsletterSection />
          </div>
        </div>

        <p class="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
          {{ t.newsletter.legal }}
        </p>
      </section>
    </main>

    <!-- FOOTER + FAQ -->
    <FooterWithFaq />
  </div>
</template>
