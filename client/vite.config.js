import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5000,
    https: true,
    headers: {
      'X-XSS-Protection': '1; mode=block',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'SAMEORIGIN',
      'Referrer-Policy': 'same-origin',
      'Content-Security-Policy-Report-Only': 'default-src \'self\' \'unsafe-inline\' \'unsafe-eval\'',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  },
},
  plugins: [react(), mkcert()],
})
