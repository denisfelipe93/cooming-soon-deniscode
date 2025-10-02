<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  width?: string // ex.: 'max-w-3xl'
  closeOnBackdrop?: boolean
}>(), {
  width: 'max-w-3xl',
  closeOnBackdrop: true
})

const emit = defineEmits<{ (e:'update:modelValue', v:boolean): void }>()

const dialog = ref<HTMLElement | null>(null)
const lastFocused = ref<HTMLElement | null>(null)

function close() { emit('update:modelValue', false) }

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(() => props.modelValue, (open) => {
  if (open) {
    lastFocused.value = document.activeElement as HTMLElement
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
    // foco inicial
    setTimeout(() => dialog.value?.focus(), 0)
  } else {
    document.documentElement.style.overflow = ''
    window.removeEventListener('keydown', onKeydown)
    lastFocused.value?.focus?.()
  }
})

onMounted(() => {
  if (props.modelValue) {
    document.documentElement.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeydown)
  }
})
onUnmounted(() => {
  document.documentElement.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[100] flex items-center justify-center p-3"
        aria-modal="true"
        role="dialog"
        :aria-label="title || 'Dialog'"
      >
        <!-- backdrop -->
        <div
          class="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
          @click="closeOnBackdrop && close()"
        />
        <!-- card -->
        <div
          ref="dialog"
          tabindex="-1"
          class="relative w-full"
        >
          <div :class="['mx-auto rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-black/10 dark:border-white/10', width]">
            <header class="flex items-center justify-between px-5 py-4 border-b border-black/10 dark:border-white/10">
              <h2 class="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{{ title }}</h2>
              <button
                class="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
                aria-label="Close"
                @click="close"
              >
                <svg viewBox="0 0 20 20" class="w-5 h-5" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
                </svg>
              </button>
            </header>
            <div class="px-5 py-5 max-h-[75vh] overflow-auto prose dark:prose-invert">
              <slot />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<style scoped>
.fade-enter-active,.fade-leave-active{transition:opacity .18s ease}
.fade-enter-from,.fade-leave-to{opacity:0}
</style>
