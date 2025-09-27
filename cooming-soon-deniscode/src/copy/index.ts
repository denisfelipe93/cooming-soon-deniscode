// src/copy/index.ts
import pt from './pt'
import en from './en'

export type Copy = typeof pt // base do tipo

export const dictionaries = { pt, en }
export { pt, en }
