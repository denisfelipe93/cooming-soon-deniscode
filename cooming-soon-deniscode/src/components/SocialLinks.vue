<!-- src/components/SocialLinks.vue -->
<script setup lang="ts">
import { h, computed } from 'vue'
import type { FunctionalComponent } from 'vue'
import { useLocale } from '@/composables/useLocale'

const props = withDefaults(
  defineProps<{ variant?: 'default' | 'ghost' | 'invert' }>(),
  { variant: 'default' }
)

const { t } = useLocale()

// classes por variante
const cls =
  props.variant === 'invert' ? 'ui-icon-invert' :
  props.variant === 'ghost'  ? 'ui-icon-ghost'  :
                               'ui-icon'

// ===== ÍCONES =====
type IconKey = 'ig' | 'x' | 'yt' | 'gh'

const icons: Record<IconKey, FunctionalComponent> = {
  ig: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.7' }, [
      h('rect',   { x: '3',  y: '3',  width: '18', height: '18', rx: '5' }),
      h('circle', { cx: '12', cy: '12', r: '3.8' }),
      h('circle', { cx: '17.2', cy: '6.8', r: '1' })
    ]),
  x: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M18.146 2.25h3.037l-6.64 7.59 7.802 11.91h-6.106l-4.78-6.998-5.478 6.998H2.94l7.1-8.1L2.5 2.25h6.27l4.32 6.24 5.056-6.24Z' })
    ]),
  yt: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M23.5 7.5a3 3 0 0 0-2.1-2.1C19.6 5 12 5 12 5s-7.6 0-9.4.4A3 3 0 0 0 .5 7.5 45 45 0 0 0 0 12a45 45 0 0 0 .5 4.5 3 3 0 0 0 2.1 2.1C4.4 19 12 19 12 19s7.6 0 9.4-.4a3 3 0 0 0 2.1-2.1 45 45 0 0 0 .5-4.5 45 45 0 0 0-.5-4.5ZM9.8 15.1V8.9L15.5 12l-5.7 3.1Z' })
    ]),
  gh: () =>
    h('svg', { viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M12 .5a11.5 11.5 0 0 0-3.64 22.43c.58.11.79-.25.79-.56v-2.1c-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.79 2.74 1.27 3.41.97.11-.76.41-1.27.75-1.56-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.28 1.2-3.08-.12-.3-.52-1.52.11-3.17 0 0 .98-.31 3.21 1.18a11.1 11.1 0 0 1 5.84 0c2.23-1.49 3.21-1.18 3.21-1.18.63 1.65.24 2.87.12 3.17.75.8 1.2 1.82 1.2 3.08 0 4.43-2.7 5.41-5.27 5.69.42.37.8 1.1.8 2.22v3.29c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z' })
    ])
}

// ===== RÓTULOS (sem 'any') =====
interface SocialLabels { instagram: string; x: string; youtube: string; github: string }
const socialLabels = computed<SocialLabels>(() => ({
  instagram: t.value.social.instagram,
  x: t.value.social.x,
  youtube: t.value.social.youtube,
  github: 'GitHub' // adicione social.github no i18n se quiser traduzir
}))
const ariaLabel = computed(() => t.value.social.aria ?? 'Redes sociais')

// ===== LINKS OFICIAIS (X mantido, Twitter removido) =====
const links: Array<{ name: () => string; href: string; key: IconKey }> = [
  { name: () => socialLabels.value.instagram, href: 'https://www.instagram.com/denisc0de/',   key: 'ig' },
  { name: () => socialLabels.value.x,         href: 'https://x.com/DenisCode_',               key: 'x'  },
  { name: () => socialLabels.value.youtube,   href: 'https://www.youtube.com/@odeniscode',    key: 'yt' },
  { name: () => socialLabels.value.github,    href: 'https://github.com/denisfelipe93',       key: 'gh' }
]
</script>

<template>
  <nav :aria-label="ariaLabel" class="flex items-center gap-2">
    <a
      v-for="l in links"
      :key="l.key"
      :href="l.href"
      target="_blank"
      rel="noopener noreferrer"
      :class="cls"
      :aria-label="l.name()"
      :title="l.name()"
    >
      <span class="sr-only">{{ l.name() }}</span>
      <component :is="icons[l.key]" class="h-5 w-5" />
    </a>
  </nav>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden; clip: rect(0,0,0,0);
  white-space: nowrap; border: 0;
}
</style>
