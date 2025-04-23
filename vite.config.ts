import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';           // ← 新增

export default defineConfig({
  plugins: [react(), svgr()],                 // ← 插进插件
});
