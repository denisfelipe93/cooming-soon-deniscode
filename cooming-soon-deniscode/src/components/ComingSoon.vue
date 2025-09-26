<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
const target = new Date(import.meta.env.VITE_LAUNCH_DATE || '2026-05-09T12:00:00-03:00')
const now = ref(new Date())
let timer: number | undefined
onMounted(() => { timer = window.setInterval(() => (now.value = new Date()), 1000) })
const diffMs = computed(() => Math.max(0, target.getTime() - now.value.getTime()))
const parts = computed(() => {
  const total = Math.floor(diffMs.value / 1000)
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const minutes = Math.floor((total % 3600) / 60)
  const seconds = total % 60
  return { days, hours, minutes, seconds }
})
const email = ref(''); const submitted = ref(false)
function submit() {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) return
  submitted.value = true
}
</script>

<template>
  <section class="min-h-[100svh] grid place-items-center px-6">
    <div class="mx-auto w-full max-w-3xl text-center">
      <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight">
        Em breve: <span class="text-indigo-600 dark:text-indigo-400">deniscode</span>
      </h1>
      <p class="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-300">
        Estamos construindo algo com <span class="font-semibold">design & engenharia</span>.
      </p>

      <div class="mt-8 grid grid-cols-4 gap-3">
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div class="text-3xl font-bold tabular-nums">{{ parts.days }}</div>
          <div class="text-xs mt-1 uppercase tracking-wider text-neutral-500">dias</div>
        </div>
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div class="text-3xl font-bold tabular-nums">{{ parts.hours }}</div>
          <div class="text-xs mt-1 uppercase tracking-wider text-neutral-500">horas</div>
        </div>
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div class="text-3xl font-bold tabular-nums">{{ parts.minutes }}</div>
          <div class="text-xs mt-1 uppercase tracking-wider text-neutral-500">min</div>
        </div>
        <div class="rounded-2xl border border-neutral-200 dark:border-neutral-800 p-4">
          <div class="text-3xl font-bold tabular-nums">{{ parts.seconds }}</div>
          <div class="text-xs mt-1 uppercase tracking-wider text-neutral-500">seg</div>
        </div>
      </div>

      <form class="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-2 justify-center"
            name="newsletter" method="POST" data-netlify="true" netlify-honeypot="bot-field"
            @submit.prevent="submit">
        <input type="hidden" name="form-name" value="newsletter" />
        <p class="hidden"><label>Não preencha: <input name="bot-field" /></label></p>
        <input v-model="email" type="email" required autocomplete="email" placeholder="Seu e-mail"
               class="w-full sm:w-80 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur px-4 py-3 outline-none focus:ring-4 focus:ring-indigo-300/50 dark:focus:ring-indigo-700/40" />
        <button type="submit"
                class="inline-flex items-center justify-center rounded-2xl px-5 py-3 font-semibold bg-indigo-600 text-white hover:opacity-95 active:opacity-90 shadow-sm">
          Quero saber quando lançar
        </button>
      </form>

      <p v-if="submitted" class="mt-3 text-sm text-green-600 dark:text-green-400">
        Obrigado! Você receberá novidades em breve.
      </p>

      <footer class="mt-12 pb-10 text-xs text-neutral-500">
        © {{ new Date().getFullYear() }} deniscode. Todos os direitos reservados.
      </footer>
    </div>
  </section>
</template>
