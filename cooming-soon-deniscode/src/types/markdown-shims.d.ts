declare module 'markdown-it';
declare module 'gray-matter';

declare module '*.md?raw' {
  const content: string
  export default content
}
