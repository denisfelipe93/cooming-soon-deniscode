// src/copy/pt.ts
const pt = {
  brand: {
    nameA: 'denis',
    nameB: 'code',
  },

  seo: {
    title: 'deniscode — em breve',
    description:
      'Estamos chegando para entregar a melhor experiência em código e desenvolvimento. Assine a newsletter para ser avisado.',
  },

  hero: {
    title: 'estamos chegando para entregar a melhor experiência em código',
    subtitle: 'quer saber antes? siga nossa newsletter',
  },

  newsletter: {
    placeholder: 'Seu e-mail',
    cta: 'seja notificado',
    legal: 'sem spam. cancelar a qualquer momento.',
    success: 'Obrigado! Você receberá novidades em breve.',
    invalid: 'Digite um e-mail válido.',
    error: 'Não foi possível enviar agora. Tente novamente.',
    // ---- Textos de consentimento ----
    consentMarketing:
      'Quero receber a newsletter da deniscode por e-mail. Posso cancelar a qualquer momento.',
    consentAnalytics:
      'Aceito a personalização e a medição de desempenho dos e-mails (pixels/cookies).',
    required: 'Você precisa aceitar para continuar.',
    privacyLink: 'Política de Privacidade',
    termsLink: 'Termos',
  },

  footer: {
    rights: (year: number) => `© ${year} deniscode. Todos os direitos reservados.`,
  },

  toggles: {
    lang: 'PT',
    theme: { light: 'Light', dark: 'Dark' },
  },

  social: {
    aria: 'deniscode nas redes',
    instagram: 'Instagram',
    x: 'X',
    github: 'GitHub',
    youtube: 'YouTube',
  },

  faq: {
    title: 'Perguntas frequentes',
    items: [
      {
        q: 'Enquanto o site está em construção, posso solicitar um orçamento?',
        a: 'Sim. Deixe seu e-mail na newsletter e retornaremos o mais rápido possível para entender seu projeto e enviar uma proposta.',
      },
      {
        q: 'Em média, quanto tempo um site fica pronto?',
        a: 'Depende do escopo e da complexidade. Após o briefing e a aprovação do orçamento, passamos um cronograma realista. Como referência, projetos comuns levam de 14 a 30 dias úteis.',
      },
      {
        q: 'Quero apenas manutenção do meu site, é possível?',
        a: 'Sim. Se você já tem um site e precisa de melhorias, performance, correções ou consultoria, fazemos manutenção contínua ou pontual.',
      },
    ],
    ctaText: 'quero receber um contato',
  },
}

export default pt
export type PT = typeof pt
