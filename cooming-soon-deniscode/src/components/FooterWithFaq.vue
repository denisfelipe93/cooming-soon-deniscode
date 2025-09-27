<script setup lang="ts">
import { onMounted } from 'vue'
import { useLocale } from '@/composables/useLocale'
import SocialLinks from '@/components/SocialLinks.vue'

const { t } = useLocale()

/** JSON-LD de FAQ no <head> (SEO) */
onMounted(() => {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: t.value.faq.items.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
  const el = document.createElement('script')
  el.type = 'application/ld+json'
  el.textContent = JSON.stringify(data)
  document.head.appendChild(el)
})
</script>

<template>
  <section class="mt-16 md:mt-20 bg-neutral-950 text-neutral-100">
    <div class="container-px mx-auto max-w-screen-xl py-10 md:py-14">
      <!-- Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-y-14 md:gap-y-0 md:gap-x-12 items-stretch">
        <!-- ESQUERDA -->
        <div
          class="order-2 md:order-1 md:pr-10 md:border-r md:border-white/10
                 pt-8 md:pt-0
                 flex items-start justify-center md:items-center"
        >
          <div class="flex flex-col items-center text-center w-full md:translate-x-4">
            <!-- wordmark -->
            <div class="text-lg md:text-xl font-medium tracking-tight leading-none text-neutral-100">
              {{ t.brand.nameA }}
              <span class="text-neutral-400">{{ t.brand.nameB }}</span>
            </div>

            <!-- LOGO -->
            <img
              src="/logo-light.svg"
              alt="deniscode"
              class="-mt-4 h-20 md:h-24 w-auto"
              decoding="async" loading="eager"
            />

            <!-- redes sociais -->
            <div class="mt-6">
              <SocialLinks variant="invert" />
            </div>
          </div>
        </div>

        <!-- DIREITA (FAQ) -->
        <div class="order-1 md:order-2 md:pl-8 border-b border-white/10 pb-8 md:border-b-0 md:pb-0">
          <h2 class="text-center text-2xl md:text-3xl font-semibold tracking-tight">
            {{ t.faq.title }}
          </h2>

          <div class="mt-6 grid gap-3.5">
            <details
              v-for="(item, i) in t.faq.items"
              :key="i"
              :open="i === 0"
              class="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[6px]
                     px-3.5 py-1.5 md:px-5 md:py-2 transition
                     hover:border-white/20 hover:bg-white/[0.07]"
            >
              <summary
                class="flex items-center justify-between gap-3 md:gap-4 text-left list-none select-none
                       py-2.5 md:py-3 px-1 rounded-xl
                       focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30
                       focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                <span class="flex-1 text-base md:text-lg font-medium text-neutral-100 leading-snug">
                  {{ item.q }}
                </span>

                <span
                  class="shrink-0 inline-grid place-items-center h-7 w-7 md:h-8 md:w-8
                         rounded-lg ring-1 ring-white/15 text-neutral-200
                         transition transform group-open:bg-white/10 group-open:text-white"
                  aria-hidden="true"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="h-3.5 w-3.5 md:h-4 md:w-4 transition-transform duration-200 ease-out group-open:rotate-45"
                    fill="currentColor"
                  >
                    <path d="M11 5h2v14h-2zM5 11h14v2H5z"/>
                  </svg>
                </span>
              </summary>

              <div class="mt-1.5 md:mt-2 pb-2 md:pb-3 pr-0.5 md:pr-1 text-sm md:text-base text-neutral-300 leading-relaxed">
                {{ item.a }}
              </div>

              <div v-if="i === 0" class="mt-1.5 md:mt-2 pb-2">
                <a href="#newsletter"
                   class="inline-flex items-center gap-2 text-sm font-medium text-brand-300 hover:brightness-[1.1]">
                  {{ t.faq.ctaText }}
                  <svg class="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M13.5 5H21v7.5h-2.25V8.56L6.06 21.25 2.75 17.94 15.44 5H13.5z"/>
                  </svg>
                </a>
              </div>
            </details>
          </div>
        </div>
      </div>

      <!-- legal text -->
      <div class="mt-10 md:mt-12 md:border-t border-white/10 md:pt-5">
        <p class="text-center text-xs text-neutral-400">
          {{ t.footer.rights(new Date().getFullYear()) }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
summary::-webkit-details-marker { display: none; }
summary { list-style: none; }
</style>
