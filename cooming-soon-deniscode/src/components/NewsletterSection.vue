<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const loading = ref(false)
const success = ref(false)
const error = ref<string | null>(null)

// simulação: troque pela sua integração (Netlify, API, etc.)
async function submit() {
  error.value = null
  if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    error.value = 'Digite um e-mail válido.'
    return
  }
  loading.value = true
  try {
    await new Promise(r => setTimeout(r, 900))
    success.value = true
  } catch (e) {
    error.value = 'Não foi possível enviar agora. Tente novamente.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="p-3 md:p-4 lg:p-5">
    <form
      v-if="!success"
      class="flex flex-col sm:flex-row gap-3 sm:gap-2 items-stretch sm:items-center"
      name="newsletter"
      aria-label="Assinar newsletter"
      @submit.prevent="submit"
    >
      <input
        v-model="email"
        type="email"
        required
        autocomplete="email"
        placeholder="Seu e-mail"
        class="flex-1 rounded-xl
              px-4 md:px-5 py-3 md:py-4 text-base md:text-[17px] outline-none
              bg-white dark:bg-white/5
              border border-neutral-200/70 dark:border-white/10
              text-neutral-900 dark:text-neutral-100
              placeholder:text-neutral-500 dark:placeholder:text-neutral-500
              shadow-[inset_0_1px_0_rgba(255,255,255,.6)]
              focus:border-transparent focus:ring-4 ring-brand-700/25"
      />

      <button
        type="submit"
        :disabled="loading"
        class="rounded-xl px-5 md:px-6 py-3 md:py-4
               font-semibold text-white text-[15px] md:text-[16px]
               bg-gradient-to-br from-brand-700 to-brand-500
               shadow-[0_6px_14px_rgba(127,72,228,.28)]
               hover:brightness-[1.03] active:translate-y-[1px]
               focus:outline-none focus:ring-4 ring-brand-700/35
               disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {{ loading ? 'enviando…' : 'seja notificado' }}
      </button>
    </form>

    <p v-else class="px-1 py-2 text-sm text-center text-emerald-500">
      🎉 Obrigado! Você receberá novidades em breve.
    </p>

    <p v-if="error" id="err" class="mt-2 text-xs text-rose-500">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
/* estilos principais via util classes e .glass-card */
</style>
