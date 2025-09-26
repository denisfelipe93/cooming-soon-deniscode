<script setup lang="ts">
const props = defineProps<{ variant?: 'default' | 'ghost' }>()
const cls = props.variant === 'ghost' ? 'ui-icon-ghost' : 'ui-icon'

const links = [
  { name: 'Instagram', href: 'https://instagram.com/deniscode', key: 'ig' },
  { name: 'X',         href: 'https://x.com/deniscode',        key: 'x'  },
  { name: 'Twitter',   href: 'https://twitter.com/deniscode',  key: 'tw' },
  { name: 'YouTube',   href: 'https://youtube.com/@deniscode', key: 'yt' },
]
</script>

<template>
  <nav aria-label="deniscode nas redes" class="flex items-center gap-2">
    <a
      v-for="l in links" :key="l.key"
      :href="l.href" target="_blank" rel="noopener noreferrer"
      :class="cls" :aria-label="l.name" :title="l.name"
    >
      <span class="sr-only">{{ l.name }}</span>
      <component :is="icons[l.key]" class="h-5 w-5" />
    </a>
  </nav>
</template>

<script lang="ts">
import { h } from 'vue'
export const icons: Record<string, any> = {
  ig:{ render:()=>h('svg',{viewBox:'0 0 24 24',fill:'none',stroke:'currentColor','stroke-width':'1.7'},[
      h('rect',{x:'3',y:'3',width:'18',height:'18',rx:'5'}),
      h('circle',{cx:'12',cy:'12',r:'3.8'}),
      h('circle',{cx:'17.2',cy:'6.8',r:'1'})
  ])},
  x:{ render:()=>h('svg',{viewBox:'0 0 24 24',fill:'currentColor'},[
      h('path',{d:'M18.146 2.25h3.037l-6.64 7.59 7.802 11.91h-6.106l-4.78-6.998-5.478 6.998H2.94l7.1-8.1L2.5 2.25h6.27l4.32 6.24 5.056-6.24Z'})
  ])},
  tw:{ render:()=>h('svg',{viewBox:'0 0 24 24',fill:'currentColor'},[
      h('path',{d:'M23 4.8c-.8.4-1.6.7-2.5.8.9-.6 1.5-1.4 1.8-2.4-.9.6-1.9 1-3 1.2A4.2 4.2 0 0 0 12 6.9c0 .3 0 .6.1.8C8.3 7.5 5 5.7 2.9 3.1a4.2 4.2 0 0 0 .6 5.6c-.7 0-1.4-.2-2-.5v.1a4.2 4.2 0 0 0 3.4 4.1c-.3.1-.7.1-1 .1-.2 0-.5 0-.7-.1a4.2 4.2 0 0 0 3.9 2.9A8.5 8.5 0 0 1 1 18.6 12 12 0 0 0 7.5 20c7.2 0 11.1-6 11.1-11.1v-.5c.8-.6 1.5-1.3 2-2.1Z'})
  ])},
  yt:{ render:()=>h('svg',{viewBox:'0 0 24 24',fill:'currentColor'},[
      h('path',{d:'M23.5 7.5a3 3 0 0 0-2.1-2.1C19.6 5 12 5 12 5s-7.6 0-9.4.4A3 3 0 0 0 .5 7.5 45 45 0 0 0 0 12a45 45 0 0 0 .5 4.5 3 3 0 0 0 2.1 2.1C4.4 19 12 19 12 19s7.6 0 9.4-.4a3 3 0 0 0 2.1-2.1 45 45 0 0 0 .5-4.5 45 45 0 0 0-.5-4.5ZM9.8 15.1V8.9L15.5 12l-5.7 3.1Z'})
  ])},
}
</script>

<style scoped>
.sr-only {
  position:absolute; width:1px; height:1px; padding:0; margin:-1px;
  overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
}
</style>
