import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { UserConfigExport } from 'vite'

// https://vite.dev/config/
const config: UserConfigExport = defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': '/node_modules/',
      'styles': 'src/styles',
      'components': 'src/components',
      'pages': 'src/pages',
      'utils': 'src/utils',
      'assets': 'src/assets',
      'services': 'src/services',
      'hooks': 'src/hooks',
      'context': 'src/context',
      'config': 'src/config',
      'types': 'src/types',
    }
  }
});

export default config