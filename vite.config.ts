import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
<<<<<<< HEAD
    include: ['katex']
  },
  build: {
    commonjsOptions: {
      include: [/katex/]
    }
  }
=======
  },
>>>>>>> 2dd10b48221f417dfca36b5cc0431124bc84675b
});
