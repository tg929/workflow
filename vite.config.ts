import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.SHOWCASE_BASE || '/',
})
