import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { UserConfigExport } from 'vite'

// https://vite.dev/config/
const config: UserConfigExport = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': '/node_modules/',
      'styles': 'src/styles'
    }
  }
})

export default config