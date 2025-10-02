<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLocale } from '@/composables/useLocale'
import { usePolicyModal } from '@/composables/usePolicyModal' // abre modal de políticas

const { t, locale } = useLocale()
const { show } = usePolicyModal()

// Versão/data da política (ajuste quando atualizar sua política)
const POLICY_VERSION = '1.0'
const POLICY_DATE    = '2025-10-02'

// Endpoint do Formspree
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xgvnokop'

// Estado do form
const email = ref('')
const consentMarketing = ref(false) // obrigatório
const consentAnalytics = ref(false) // opcional

const loading = ref(false)
const success = ref(false)      // houve sucesso no envio
const showSuccess = ref(false)  // controla a exibição do aviso de sucesso
const error = ref<string | null>(null)

const sendingLabel = computed(() => (locale.value === 'pt' ? 'Enviando…' : 'Sending…'))
const successLabel = computed(() => (locale.value === 'pt' ? 'Obrigado, novidade em breve!' : 'Thanks, news soon!'))
const closeLabel = computed(() => (locale.value === 'pt' ? 'Fechar' : 'Close'))

const emailOk = (v: string) => /^\S+@\S+\.\S+$/.test(v)
const canSubmit = computed(() => emailOk(email.value) && consentMarketing.value && !loading.value)

function resetForm() {
  email.value = ''
  consentMarketing.value = false
  consentAnalytics.value = false
  success.value = false
  showSuccess.value = false
  error.value = null
}

function dismissSuccess() {
  resetForm()
}

async function submit() {
  error.value = null

  if (!emailOk(email.value)) {
    error.value = t.value.newsletter.invalid
    return
  }
  if (!consentMarketing.value) {
    error.value = t.value.newsletter.required || (locale.value === 'pt'
      ? 'Você precisa aceitar para continuar.'
      : 'You must accept to continue.')
    return
  }

  loading.value = true

  // timeout de 10s para evitar ficar preso em "Enviando…"
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort('timeout'), 10000)

  try {
    const res = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      signal: ctrl.signal,
      body: JSON.stringify({
        email: email.value,
        source: 'deniscode.com',
        lang: locale.value,
        company: '', // honeypot
        // consentimento + versão da política
        consent_marketing: consentMarketing.value,
        consent_analytics: consentAnalytics.value,
        policy_version: POLICY_VERSION,
        policy_date: POLICY_DATE
      })
    })

    if (!res.ok) {
      const msg = await res.text().catch(() => '')
      throw new Error(`bad_status_${res.status}${msg ? `: ${msg}` : ''}`)
    }

    // sucesso: mostra a faixa para TODOS os tamanhos
    success.value = true
    showSuccess.value = true
    // opcional: limpa só o campo de e-mail para indicar envio concluído
    email.value = ''
  } catch (e: any) {
    if (e?.name === 'AbortError' || String(e).includes('timeout')) {
      error.value = (locale.value === 'pt')
        ? 'Tempo esgotado ao enviar. Verifique conexão/bloqueadores e tente novamente.'
        : 'Request timed out. Check connection/blockers and try again.'
    } else {
      error.value = t.value.newsletter.error
    }
  } finally {
    clearTimeout(timer)
    loading.value = false
  }
}
</script>

<template>
  <div class="p-3 md:p-4 lg:p-5">
    <form
      class="mx-auto max-w-[640px] flex flex-col gap-3"
      name="newsletter"
      :aria-label="locale === 'pt' ? 'Assinar newsletter' : 'Subscribe to newsletter'"
      @submit.prevent="submit"
    >
      <!-- honeypot anti-spam (não preencher) -->
      <input type="text" name="company" class="hidden" tabindex="-1" autocomplete="off" />

      <div class="flex flex-col sm:flex-row gap-3 items-center">
        <input
          v-model="email"
          type="email"
          name="email"
          required
          autocomplete="email"
          :placeholder="t.newsletter.placeholder"
          class="w-full sm:flex-1 rounded-xl md:rounded-2xl px-4 md:px-6 py-3.5 md:py-4 outline-none
                 bg-white/85 dark:bg-white/5 border border-neutral-300/60 dark:border-white/15
                 text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400
                 shadow-sm hover:shadow-md focus:shadow-lg focus:border-brand-400/60 transition-all duration-300 ease-out"
          :aria-invalid="!!error"
          aria-describedby="err"
        />

        <button
          type="submit"
          :disabled="!canSubmit"
          class="self-center sm:self-auto min-w-[10rem] sm:min-w-[12rem] rounded-xl md:rounded-2xl
                 px-6 md:px-8 py-3.5 md:py-4 text-base md:text-[16px] font-semibold text-white
                 bg-[#6232DE] hover:bg-[#5627D6] active:bg-[#4A21C2]
                 dark:bg-brand-700 dark:hover:brightness-[1.03]
                 shadow-md hover:shadow-lg active:shadow-md dark:shadow-md dark:hover:shadow-lg
                 focus:outline-none focus:ring-4 focus:ring-[#6232DE]/30 transition-colors duration-200
                 disabled:opacity-60 disabled:cursor-not-allowed md:bg-gradient-to-br md:from-brand-700 md:to-brand-800
                 md:shadow-[0_6px_14px_rgba(127,72,228,.28)] md:hover:brightness-[1.02]"
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
      </div>

      <!-- consentimento obrigatório -->
      <div class="flex items-start gap-3 text-sm leading-6">
        <input id="consentMkt" v-model="consentMarketing" type="checkbox" required class="mt-1" />
        <div>
          <label for="consentMkt" class="cursor-pointer select-none">
            {{ t.newsletter.consentMarketing || (locale === 'pt'
              ? 'Quero receber a newsletter da deniscode por e-mail. Posso cancelar a qualquer momento.'
              : 'I want to receive deniscode’s newsletter by email. I can unsubscribe at any time.') }}
          </label>
          <p class="mt-1">
            <!-- abre o modal -->
            <button type="button" class="underline hover:no-underline" @click.stop="show('privacy')">
              {{ t.newsletter.privacyLink || (locale === 'pt' ? 'Política de Privacidade' : 'Privacy Policy') }}
            </button>
            ·
            <button type="button" class="underline hover:no-underline" @click.stop="show('terms')">
              {{ t.newsletter.termsLink || (locale === 'pt' ? 'Termos' : 'Terms') }}
            </button>
          </p>
        </div>
      </div>

      <!-- consentimento opcional -->
      <div class="flex items-start gap-3 text-sm leading-6">
        <input id="consentAna" v-model="consentAnalytics" type="checkbox" class="mt-1" />
        <label for="consentAna" class="cursor-pointer select-none">
          {{ t.newsletter.consentAnalytics || (locale === 'pt'
            ? 'Aceito a personalização e a medição de desempenho dos e-mails (pixels/cookies).'
            : 'I agree to email personalization and performance measurement (pixels/cookies).') }}
        </label>
      </div>

      <!-- erro -->
      <p v-if="error" id="err" class="text-xs text-center text-rose-400">
        {{ error }}
      </p>

      <!-- sucesso (mesma UI para todos) -->
      <div
        v-if="success && showSuccess"
        class="mx-auto max-w-[640px] mt-3"
        role="status"
        aria-live="polite"
      >
        <div class="flex flex-wrap items-center gap-3 bg-emerald-500/10 border border-emerald-400/20 rounded-lg px-4 py-3">
          <svg class="h-4 w-4 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
          </svg>
          <span class="text-sm text-emerald-700 dark:text-emerald-300">
            {{ successLabel }}
          </span>
          <button
            type="button"
            @click="dismissSuccess"
            class="ml-auto text-sm font-medium text-emerald-700 underline hover:no-underline dark:text-emerald-300"
          >
            {{ closeLabel }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
