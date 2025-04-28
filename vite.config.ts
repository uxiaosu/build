import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from 'path';

// @ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [vue()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
  
  // 确保正确处理Tauri相关资源
  optimizeDeps: {
    // 不要尝试优化Tauri API，会导致错误
    exclude: ['@tauri-apps/api']
  },
  
  // 生成环境变量告知前端是否在Tauri中运行
  define: {
    '__TAURI_ENV__': JSON.stringify(!!process.env.TAURI_DEBUG || !!process.env.TAURI_PLATFORM),
    // 允许在Vue组件中直接访问global
    'global': 'globalThis',
    __TAURI_RUNNING__: JSON.stringify(!!process.env.TAURI_PLATFORM),
    __TAURI_DEBUG__: JSON.stringify(!!process.env.TAURI_DEBUG),
    'import.meta.env.DEV': JSON.stringify(process.env.NODE_ENV !== 'production'),
    // 解决@tauri-apps/api导入问题
    '@tauri-apps/api': '{}',
    '@tauri-apps/api/tauri': '{}'
  },
  
  // 构建配置
  build: {
    // 生成sourcemap以便调试
    sourcemap: process.env.TAURI_DEBUG ? 'inline' : false,
    // 确保Tauri可以找到静态资源
    target: ['es2021', 'chrome105', 'safari13'],
    // 最小化混淆
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    // 拆分代码
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue', 'vue-router', 'pinia'],
        }
      },
      onwarn(warning, warn) {
        // 忽略"Module level directives @tauri-apps/api missing"等警告
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE' && warning.message.includes('@tauri-apps/api')) {
          return;
        }
        warn(warning);
      }
    },
    // 将路径前缀"/@/"映射到项目的源代码目录
    // 不要更改; Tauri在检查项目的web资产的位置时使用此值。
    outDir: 'dist',
  },
  
  // 解决TypeScript路径别名 
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@tauri-apps/api': resolve(__dirname, 'src/tauri-shim.ts'),
      '@tauri-apps/api/tauri': resolve(__dirname, 'src/tauri-shim.ts')
    }
  }
}));
