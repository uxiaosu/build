import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./styles/main.css";

// 为Tauri的全局对象添加类型声明
declare global {
  interface Window {
    __TAURI__?: {
      invoke(cmd: string, args?: any): Promise<any>;
      tauri?: {
        invoke(cmd: string, args?: any): Promise<any>;
      };
      event?: {
        listen(event: string, callback: (event: any) => void): Promise<() => void>;
        once(event: string, callback: (event: any) => void): Promise<void>;
        emit(event: string, payload?: any): Promise<void>;
      };
      window?: {
        WebviewWindow?: {
          getByLabel(label: string): any;
        };
        appWindow?: any;
      };
    };
    __TAURI_BACKEND_INITIALIZED__?: boolean;
    __TAURI_INIT_CHECK__?: {
      startTime: number;
      detected: boolean;
      attempts: number;
      initTime?: number;
    };
  }
}

/**
 * 检测Tauri环境
 * Tauri 2.x适配 - 仅使用全局对象进行检测
 */
const loadTauriAPI = () => {
  console.log('检测Tauri环境状态...');
  try {
    // 检查全局Tauri对象
    const tauriExists = typeof window !== 'undefined' && 
                        window.__TAURI__ !== undefined;
    
    console.log(`Tauri环境检测: ${tauriExists ? '成功' : '失败'}`);
    
    if (tauriExists) {
      // 设置全局标志，方便其他组件检测
      if (typeof window !== 'undefined') {
        window.__TAURI_INIT_CHECK__ = {
          startTime: Date.now(),
          detected: true,
          attempts: 1,
          initTime: Date.now()
        };
      }
    }
    
    return tauriExists;
  } catch (e) {
    console.warn('Tauri环境检测发生错误:', e);
    return false;
  }
};

// 确保在应用启动前触发Tauri初始化检测
const tauriDetected = loadTauriAPI();

// 初始化Vue应用
const app = createApp(App);
app.use(createPinia());

// 提供Tauri状态
app.provide('tauriDetected', tauriDetected);

// 添加全局错误处理
app.config.errorHandler = (err, instance, info) => {
  console.error("全局错误:", err);
  console.info("错误组件:", instance);
  console.info("错误信息:", info);
};

// 挂载应用
app.mount("#app");

// 输出诊断信息
console.log("应用已启动,", tauriDetected ? "在Tauri环境中运行" : "在浏览器环境中运行");
