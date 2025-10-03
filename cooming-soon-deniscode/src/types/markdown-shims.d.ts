// src/types/markdown-shims.d.ts
declare module '*.md?raw' {
  const content: string
  export default content
}
