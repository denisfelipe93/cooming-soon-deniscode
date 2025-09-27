// src/copy/en.ts
const en = {
  brand: { nameA: 'denis', nameB: 'code' },

  seo: {
    title: 'deniscode — coming soon',
    description:
      'We’re arriving to deliver the best coding and development experience. Join the newsletter to be notified.',
  },

  hero: {
    title: 'we’re coming to deliver the best code experience',
    subtitle: 'want to know first? join our newsletter',
  },

  newsletter: {
    placeholder: 'Your e-mail',
    cta: 'notify me',
    legal: 'no spam. cancel anytime.',
    success: 'Thanks! You’ll hear from us soon.',
    invalid: 'Enter a valid e-mail.',
    error: 'Could not send now. Please try again.',
  },

  footer: {
    rights: (year: number) => `© ${year} deniscode. All rights reserved.`,
  },

  toggles: {
    lang: 'EN',
    theme: { light: 'Light', dark: 'Dark' },
  },

  social: {
    aria: 'deniscode on social media',
    instagram: 'Instagram',
    x: 'X',
    twitter: 'Twitter',
    youtube: 'YouTube',
  },

  faq: {
    title: 'Frequently asked questions',
    items: [
      {
        q: 'While the site is under construction, can I request a quote?',
        a: 'Yes. Leave your e-mail in the newsletter and we’ll get back as soon as possible to understand your project and send a proposal.',
      },
      {
        q: 'On average, how long does a website take?',
        a: 'It depends on scope and complexity. After brief and budget approval, we share a real schedule. As a reference, common projects take 14–30 business days.',
      },
      {
        q: 'I only want maintenance, is it possible?',
        a: 'Yes. If you already have a site and need improvements, performance, fixes or consulting, we do ongoing or one-off maintenance.',
      },
    ],
    ctaText: 'I want to be contacted',
  },
}

export default en
export type EN = typeof en
