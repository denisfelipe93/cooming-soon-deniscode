import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    // rota raiz vazia (evita o warn e não muda seu layout)
    { path: '/', component: { render: () => null } }
    // se você removeu /privacy e /terms porque usa modal, não precisa de mais rotas aqui
  ],
  scrollBehavior() { return { top: 0 } }
})
