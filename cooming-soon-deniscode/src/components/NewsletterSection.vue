<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t, locale } = useLocale()

const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)
const showToast = ref(false)

const sendingLabel = computed(() => (locale.value === 'pt' ? 'Enviando…' : 'Sending…'))

function resetForm() {
  email.value = ''
  success.value = false
  error.value = null
  showToast.value = false
}

async function submit() {
  error.value = null
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = t.value.newsletter.invalid
    return
  }
  loading.value = true
  try {
    // simulação de request
    await new Promise(r => setTimeout(r, 900))
    success.value = true
    showToast.value = true
    setTimeout(() => resetForm(), 3000)
  } catch (e) {
    error.value = t.value.newsletter.error
  } finally {
    loading.value = false
  }
}

function hideToast() { resetForm() }
</script>

<template>
  <div class="p-3 md:p-4 lg:p-5">
    <!-- Formulário -->
    <form
      class="mx-auto max-w-[640px] flex flex-col sm:flex-row gap-3 sm:gap-3 items-center sm:items-center"
      name="newsletter"
      :aria-label="locale === 'pt' ? 'Assinar newsletter' : 'Subscribe to newsletter'"
      @submit.prevent="submit"
    >
      <input
        v-model="email"
        type="email"
        required
        autocomplete="email"
        :placeholder="t.newsletter.placeholder"
        class="w-full sm:flex-1 rounded-xl md:rounded-2xl
               px-4 md:px-6 py-3.5 md:py-4 text-base md:text-[17px] outline-none
               bg-white/85 dark:bg-white/5 backdrop-blur-sm
               border border-neutral-300/60 dark:border-white/15
               text-neutral-900 dark:text-neutral-100
               placeholder:text-neutral-500 dark:placeholder:text-neutral-400
               shadow-sm hover:shadow-md focus:shadow-lg
               focus:border-brand-400/60
               transition-all duration-300 ease-out"
        aria-describedby="err"
      />

      <!-- BOTÃO -->
      <button
        type="submit"
        :disabled="loading"
        class="self-center sm:self-auto whitespace-nowrap
              min-w-[10rem] sm:min-w-[12rem]
              rounded-xl md:rounded-2xl
              px-6 md:px-8 py-3.5 md:py-4
              text-base md:text-[16px] font-semibold text-white
              
              bg-[#6232DE] hover:bg-[#5627D6] active:bg-[#4A21C2]
              dark:bg-brand-700 dark:hover:brightness-[1.03]
              
              shadow-md hover:shadow-lg active:shadow-md
              dark:shadow-md dark:hover:shadow-lg

              focus:outline-none focus:ring-4 focus:ring-[#6232DE]/30
              transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed

              md:bg-gradient-to-br md:from-brand-700 md:to-brand-800
              md:shadow-[0_6px_14px_rgba(127,72,228,.28)]
              md:hover:brightness-[1.02]"
      >
        <span class="flex items-center justify-center gap-2">
          <svg v-if="loading" class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
            <path class="opacity-75" fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
          </svg>
          <span>{{ loading ? sendingLabel : t.newsletter.cta }}</span>
        </span>
      </button>
    </form>

    <!-- Toast Mobile -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="showToast && success" class="sm:hidden fixed bottom-4 left-4 right-4 z-50">
        <div class="bg-gradient-to-r from-emerald-500 to-emerald-600 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-emerald-400/30">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
              </svg>
              <p class="text-sm font-medium text-white">
                {{ locale === 'pt' ? 'Obrigado, novidade em breve!' : 'Thanks, news soon!' }}
              </p>
            </div>
            <button @click="hideToast" class="flex-shrink-0 inline-flex text-white/90 hover:text-white focus:outline-none">
              <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Sucesso Desktop -->
    <transition
      enter-active-class="transform ease-out duration-300 transition"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="success && !showToast" class="hidden sm:block mx-auto max-w-[640px] mt-3">
        <div class="inline-flex items-center space-x-3 bg-emerald-500/10 border border-emerald-400/20 rounded-lg px-4 py-3">
          <svg class="h-4 w-4 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm text-emerald-700 dark:text-emerald-300">
            {{ locale === 'pt' ? 'Obrigado, novidade em breve!' : 'Thanks, news soon!' }}
          </span>
          <button @click="hideToast" class="text-sm font-medium text-emerald-700 underline hover:no-underline dark:text-emerald-300">
            {{ locale === 'pt' ? 'Fechar' : 'Close' }}
          </button>
        </div>
      </div>
    </transition>

    <!-- Erro -->
    <p v-if="error" id="err" class="mx-auto max-w-[640px] mt-2 text-xs text-center text-rose-400">
      {{ error }}
    </p>
  </div>
</template>
