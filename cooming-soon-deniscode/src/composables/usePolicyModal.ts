import { ref } from 'vue'

export type PolicyKind = 'privacy' | 'terms'
const open = ref(false)
const kind = ref<PolicyKind>('privacy')

export function usePolicyModal(){
  function show(k: PolicyKind){ kind.value = k; open.value = true }
  function hide(){ open.value = false }
  return { open, kind, show, hide }
}
