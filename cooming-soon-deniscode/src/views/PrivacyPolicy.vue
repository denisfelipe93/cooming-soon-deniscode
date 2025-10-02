<!-- src/views/PrivacyPolicy.vue -->
<script setup lang="ts">
const POLICY_VERSION = '1.0'
const POLICY_DATE = '2025-10-02'
</script>

<template>
  <main class="prose dark:prose-invert mx-auto max-w-3xl p-6">
    <h1>Política de Privacidade — Newsletter</h1>
    <p class="text-sm opacity-70">
      Versão: {{ POLICY_VERSION }} · Atualizado em: {{ POLICY_DATE }}
    </p>
    <h2>Resumo</h2>
    <ul>
      <li>Coletamos e-mail (e nome opcional) para envio de newsletter.</li>
      <li>Usamos double opt-in (quando migrarmos do Formspree para ESP) e guardamos prova de consentimento.</li>
      <li>Você pode cancelar a qualquer momento pelo link do rodapé dos e-mails.</li>
    </ul>
  </main>
</template>
