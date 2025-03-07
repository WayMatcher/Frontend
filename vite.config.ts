import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { UserConfigExport } from 'vite'

// https://vite.dev/config/
const config: UserConfigExport = defineConfig({
  plugins: [react()]
});

export default config