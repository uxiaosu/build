<template>
  <div class="app-container">
    <!-- 标题栏 - 无边框窗口 -->
    <div class="titlebar">
      <div class="titlebar-drag-region">
        <div class="titlebar-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" stroke="url(#titlebar-gradient)" stroke-width="2"></polygon>
            <line x1="12" y1="22" x2="12" y2="15.5" stroke="url(#titlebar-gradient)" stroke-width="2"></line>
            <polyline points="22 8.5 12 15.5 2 8.5" stroke="url(#titlebar-gradient)" stroke-width="2"></polyline>
            <defs>
              <linearGradient id="titlebar-gradient" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                <stop offset="0" stop-color="#8a56ff"></stop>
                <stop offset="1" stop-color="#6a8cff"></stop>
              </linearGradient>
            </defs>
          </svg>
          <span class="titlebar-text">Nova IDE</span>
        </div>
      </div>
      
      <div class="titlebar-controls">
        <!-- 主题切换按钮 -->
        <button class="titlebar-control theme" title="切换主题" @click="toggleTheme">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        </button>
        
        <!-- 窗口控制按钮 -->
        <button class="titlebar-control minimize" title="最小化" @click="minimizeWindow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <button class="titlebar-control maximize" title="最大化" @click="maximizeWindow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          </svg>
        </button>
        <button class="titlebar-control close" title="关闭" @click="closeWindow">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- 插件功能栏 -->
    <div class="plugin-toolbar">
      <div class="plugin-tools">
        <button class="plugin-tool" title="新建文件">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="12" y1="18" x2="12" y2="12"></line>
            <line x1="9" y1="15" x2="15" y2="15"></line>
          </svg>
        </button>
        
        <button class="plugin-tool" title="保存文件">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
            <polyline points="17 21 17 13 7 13 7 21"></polyline>
            <polyline points="7 3 7 8 15 8"></polyline>
          </svg>
        </button>
        
        <button class="plugin-tool" title="查找">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
        
        <button class="plugin-tool" title="终端">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="4 17 10 11 4 5"></polyline>
            <line x1="12" y1="19" x2="20" y2="19"></line>
          </svg>
        </button>
        
        <span class="divider"></span>
        
        <button class="plugin-tool" title="运行">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
        </button>
        
        <button class="plugin-tool" title="调试">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="2"></circle>
            <path d="M16.24 7.76a6 6 0 0 1 0 8.49m-8.48-.01a6 6 0 0 1 0-8.49m11.31-2.82a10 10 0 0 1 0 14.14m-14.14 0a10 10 0 0 1 0-14.14"></path>
          </svg>
        </button>
      </div>
      
      <div class="path-breadcrumbs">
        <span class="breadcrumb-item">项目</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item">src</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-item">components</span>
      </div>
    </div>
    
    <!-- 主内容区 -->
    <div class="main-container">
      <!-- 主侧边栏 - 仅图标导航 -->
      <div class="sidebar-primary">
        <div class="sidebar-top">
          <button class="icon-nav-button active" title="资源管理器">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
              <polyline points="13 2 13 9 20 9"></polyline>
            </svg>
          </button>
          
          <button class="icon-nav-button" title="搜索">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <button class="icon-nav-button" title="源代码控制">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="18" cy="18" r="3"></circle>
              <circle cx="6" cy="6" r="3"></circle>
              <path d="M13 6h3a2 2 0 0 1 2 2v7"></path>
              <line x1="6" y1="9" x2="6" y2="21"></line>
            </svg>
          </button>
          
          <button class="icon-nav-button" title="运行和调试">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 11 12 14 22 4"></polyline>
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
            </svg>
          </button>
          
          <button class="icon-nav-button" title="扩展">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 2a10 10 0 1 0 10 10H12V2Z"></path>
              <path d="M21.2 8A10 10 0 0 0 17.6 3"></path>
            </svg>
          </button>
        </div>
        
        <div class="sidebar-bottom">
          <button class="icon-nav-button" title="设置">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="3"></circle>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
            </svg>
          </button>
          
          <button class="icon-nav-button" title="账户">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"></circle>
              <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2"></path>
              <path d="M18.3 14.8a22.3 22.3 0 0 0 0-5.6"></path>
              <path d="M5.7 14.8a22.3 22.3 0 0 1 0-5.6"></path>
              <path d="M8.7 19.4c-1-1.7-1.4-3.4-1.4-5.4s.4-3.7 1.4-5.4"></path>
              <path d="M15.3 19.4c1-1.7 1.4-3.4 1.4-5.4s-.4-3.7-1.4-5.4"></path>
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 二级侧边栏 - 目录资源树 -->
      <div class="sidebar-secondary">
        <AppSidebarSecondary />
      </div>
      
      <!-- 中央编辑区域 -->
      <div class="editor-container">
        <!-- 编辑器标签页 -->
        <EditorTabs />
        
        <!-- 编辑器内容 -->
        <EditorArea />
      </div>
    </div>
    
    <!-- 状态栏 -->
    <AppStatusBar>
      <template #right>
        <button class="status-bar-btn" @click="windowLoggerVisible = !windowLoggerVisible" title="窗口事件日志">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
          <span>窗口事件</span>
        </button>
      </template>
    </AppStatusBar>
    
    <!-- 终端面板 -->
    <AppTerminal v-model:visible="terminalVisible" />
    
    <!-- 错误面板 -->
    <ErrorPanel v-model:visible="errorPanelVisible" @goto="handleGotoError" />
    
    <!-- 窗口事件日志 -->
    <WindowEventLogger 
      v-model:visible="windowLoggerVisible" 
      :logs="windowLogs" 
      @clear="clearWindowLogs" 
    />
  </div>
</template>

<script setup lang="ts">
// 添加全局Tauri接口声明，避免TypeScript错误
declare global {
  interface Window {
    // 更新为Tauri 2.x的API结构
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
        appWindow?: {
          minimize(): Promise<void>;
          maximize(): Promise<void>;
          unmaximize(): Promise<void>;
          isMaximized(): Promise<boolean>;
          close(): Promise<void>;
          onCloseRequested(handler: (event: any) => void): Promise<() => void>;
          onResized(handler: (event: any) => void): Promise<() => void>;
          onMoved(handler: (event: any) => void): Promise<() => void>;
          onFocusChanged(handler: (event: any) => void): Promise<() => void>;
        };
      };
      // 手动初始化API
      __TAURI_METADATA__?: string;
      __TAURI_IPC__?(msg: any): void;
    };
    // 跟踪Tauri初始化
    __TAURI_INIT_CHECK__?: {
      startTime: number;
      detected: boolean;
      attempts: number;
      initTime?: number;
    };
  }
}

import { ref, watch, onMounted, onUnmounted, computed, inject } from 'vue';
import EditorTabs from './components/editor/EditorTabs.vue';
import EditorArea from './components/editor/EditorArea.vue';
import AppSidebarSecondary from './components/sidebar/AppSidebarSecondary.vue';
import AppStatusBar from './components/common/AppStatusBar.vue';
import AppTerminal from './components/terminal/AppTerminal.vue';
import ErrorPanel from './components/error/ErrorPanel.vue';
import WindowEventLogger from './components/debug/WindowEventLogger.vue';

// 面板可见性状态
const terminalVisible = ref(false);
const errorPanelVisible = ref(false);
const windowLoggerVisible = ref(false);
const currentTheme = ref('dark'); // 默认深色主题

// 窗口事件日志
const windowLogs = ref<{level: string; message: string; timestamp: string}[]>([]);

// 在生命周期钩子前添加一个Tauri 2.x初始化指示符
const tauriInitialized = ref(false);

// 添加窗口日志
const addWindowLog = (level: string, message: string) => {
  const timestamp = new Date().toLocaleTimeString();
  windowLogs.value.push({ level, message, timestamp });
  console[level as 'log' | 'error' | 'warn' | 'debug'](message);
  
  // 如果有太多日志，移除最早的
  if (windowLogs.value.length > 100) {
    windowLogs.value.shift();
  }
};

// 处理错误跳转
const handleGotoError = (file: string, line: number, column: number) => {
  console.log(`跳转到文件 ${file} 第 ${line} 行，第 ${column} 列`);
  // 这里应该实现跳转到错误位置的逻辑
};

// 切换主题
const toggleTheme = () => {
  currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme.value);
};

// 监听主题变化
watch(currentTheme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme);
});

// 检测是否在 Tauri 环境中运行
const isTauriEnvironment = computed(() => {
  try {
    return Boolean(
      typeof window !== 'undefined' && 
      window.__TAURI__ !== undefined
    );
  } catch (e) {
    console.error('检测 Tauri 环境时出错:', e);
    return false;
  }
});

// 添加一个强制重新检测Tauri环境的函数
const forceTauriCheck = async () => {
  // 首先检查环境变量
  if (typeof window !== 'undefined') {
    // 检查Tauri定义的环境变量
    if (window.__TAURI_ENV__ === true) {
      addWindowLog('info', '检测到Tauri环境变量');
      tauriInitialized.value = true;
      return true;
    }
    
    // 检查是否运行在Tauri后端注入的环境中
    if (window.__TAURI_BACKEND_INITIALIZED__) {
      addWindowLog('info', '检测到通过后端注入的Tauri标记');
      tauriInitialized.value = true;
      return true;
    }
    
    // 检查全局Tauri对象是否存在
    if (window.__TAURI__) {
      addWindowLog('info', '检测到Tauri全局对象');
      tauriInitialized.value = true;
      try {
        // 尝试使用Tauri API
        if (window.__TAURI__.invoke) {
          // 尝试调用后端命令，如果成功说明Tauri环境正常
          const result = await window.__TAURI__.invoke('check_tauri_initialized');
          addWindowLog('info', `成功调用Tauri后端: ${result}`);
          return true;
        }
      } catch (err) {
        addWindowLog('warn', `尝试调用Tauri API失败: ${err}`);
        // API调用失败并不一定意味着不在Tauri环境中，可能只是这个特定命令不存在
      }
      // 即使调用失败，仍然认为在Tauri环境中（因为全局对象存在）
      return true;
    }
  }
  
  // 监听后端可能发送的事件
  document.addEventListener('tauri-backend-ready', () => {
    addWindowLog('info', '收到后端发送的tauri-backend-ready事件');
    tauriInitialized.value = true;
  }, { once: true });
  
  // 所有方法都失败，确认不在Tauri环境中
  addWindowLog('warn', '所有Tauri检测方法都失败，可能不在Tauri环境中运行');
  return false;
};

// 初始化Tauri环境
const initializeTauri = async () => {
  try {
    // 检查是否直接通过URL访问
    const isLocalhost = window.location.href.includes('localhost:1420');
    const isTauriDetected = window.__TAURI__ !== undefined;
    
    if (isLocalhost && !isTauriDetected) {
      addWindowLog('warn', '⚠️ 检测到直接通过浏览器访问localhost:1420，而不是通过Tauri启动');
      addWindowLog('info', '请使用 npm run tauri dev 命令启动应用');
      
      // 显示警告信息
      const warningDiv = document.createElement('div');
      warningDiv.className = 'tauri-warning';
      warningDiv.innerHTML = `
        <h2>⚠️ 未检测到Tauri环境</h2>
        <p>您正在直接通过浏览器访问，而不是通过Tauri启动。</p>
        <p>请使用 <code>npm run tauri dev</code> 命令启动应用。</p>
        <p>窗口控制等功能在浏览器中将无法正常工作。</p>
        <p>如果您确实是在使用npm run tauri dev，请检查您的Tauri配置是否正确。</p>
      `;
      document.body.appendChild(warningDiv);
      
      // 设置警告样式
      const style = document.createElement('style');
      style.textContent = `
        .tauri-warning {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background: rgba(255, 60, 60, 0.9);
          color: white;
          padding: 15px;
          border-radius: 5px;
          z-index: 9999;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 400px;
        }
        .tauri-warning code {
          background: rgba(0,0,0,0.2);
          padding: 2px 4px;
          border-radius: 3px;
        }
      `;
      document.head.appendChild(style);
      
      // 添加在浏览器中运行的特殊模拟模式
      // 将window.__TAURI__设置为模拟对象，这样应用可以在浏览器中工作
      if (import.meta.env.DEV) {
        console.log('开发模式: 注入模拟的Tauri API');
        window.__TAURI__ = window.__TAURI__ || {
          invoke: async (cmd: string, args?: any) => {
            console.log(`[模拟Tauri] 调用后端命令: ${cmd}`, args);
            // 模拟一些基本命令的响应
            if (cmd === 'check_tauri_initialized') return '模拟Tauri初始化成功';
            if (cmd === 'minimize_window_cmd') return null;
            if (cmd === 'maximize_window_cmd') return null;
            if (cmd === 'unmaximize_window_cmd') return null;
            if (cmd === 'is_maximized_cmd') return false;
            if (cmd === 'close_window_cmd') return null;
            return '模拟Tauri响应';
          },
          event: {
            listen: async (event: string, callback: any) => {
              console.log(`[模拟Tauri] 监听事件: ${event}`);
              // 返回一个空的清理函数
              return () => {};
            },
            once: async (event: string, callback: any) => {
              console.log(`[模拟Tauri] 单次监听事件: ${event}`);
            },
            emit: async (event: string, payload?: any) => {
              console.log(`[模拟Tauri] 发送事件: ${event}`, payload);
            }
          }
        };
        
        // 设置模拟模式标记，让其他组件知道
        window.__TAURI_INIT_CHECK__ = {
          startTime: Date.now(),
          detected: true,
          attempts: 1,
          initTime: Date.now()
        };
        
        // 即使在模拟模式下，也让检测通过
        addWindowLog('info', '开发模式: 使用模拟的Tauri API');
        tauriInitialized.value = true;
        return true;
      }
    }
    
    // 执行正常的Tauri环境检测
    return await forceTauriCheck();
  } catch (err) {
    addWindowLog('error', `Tauri初始化失败: ${err}`);
    return false;
  }
};

// 窗口控制 - 使用Tauri 2.0的全局对象方式
const minimizeWindow = async () => {
  addWindowLog('debug', '尝试最小化窗口');
  
  try {
    if (isTauriEnvironment.value && window.__TAURI__) {
      try {
        // 使用全局Tauri对象直接调用
        if (window.__TAURI__.invoke) {
          await window.__TAURI__.invoke('minimize_window_cmd');
          addWindowLog('info', '窗口已最小化');
          return;
        }
      } catch (error) {
        addWindowLog('error', `最小化窗口失败: ${error}`);
        console.error('最小化窗口失败:', error);
      }
    }
    
    // 在开发模式下模拟
    addWindowLog('warn', '非Tauri环境或API不可用，使用模拟最小化');
    const mockDiv = document.createElement('div');
    mockDiv.className = 'mock-notification';
    mockDiv.textContent = '已模拟最小化窗口';
    document.body.appendChild(mockDiv);
    
    setTimeout(() => {
      document.body.removeChild(mockDiv);
    }, 2000);
  } catch (err) {
    const errorMsg = `最小化窗口失败: ${err.toString()}`;
    addWindowLog('error', errorMsg);
    console.error(errorMsg, err);
    errorPanelVisible.value = true;
  }
};

const maximizeWindow = async () => {
  addWindowLog('debug', '尝试切换窗口最大化状态');
  
  try {
    if (isTauriEnvironment.value && window.__TAURI__) {
      try {
        // 使用全局Tauri对象直接调用
        if (window.__TAURI__.invoke) {
          const isMaximized = await window.__TAURI__.invoke('is_maximized_cmd');
          
          if (isMaximized) {
            addWindowLog('debug', '窗口已最大化，尝试还原');
            await window.__TAURI__.invoke('unmaximize_window_cmd');
          } else {
            addWindowLog('debug', '窗口未最大化，尝试最大化');
            await window.__TAURI__.invoke('maximize_window_cmd');
          }
          
          addWindowLog('info', '窗口最大化状态已切换');
          return;
        }
      } catch (error) {
        addWindowLog('error', `切换窗口最大化状态失败: ${error}`);
        console.error('切换窗口最大化状态失败:', error);
      }
    }
    
    // 模拟行为
    addWindowLog('warn', '非Tauri环境或API不可用，使用模拟最大化/还原');
    document.documentElement.classList.toggle('dev-maximized');
    
    // 在开发模式下模拟
    const mockDiv = document.createElement('div');
    mockDiv.className = 'mock-notification';
    mockDiv.textContent = document.documentElement.classList.contains('dev-maximized') ? 
                        '已模拟最大化窗口' : '已模拟还原窗口';
    document.body.appendChild(mockDiv);
    
    setTimeout(() => {
      document.body.removeChild(mockDiv);
    }, 2000);
  } catch (err) {
    const errorMsg = `切换窗口最大化状态失败: ${err.toString()}`;
    addWindowLog('error', errorMsg);
    console.error(errorMsg, err);
    errorPanelVisible.value = true;
  }
};

const closeWindow = async () => {
  addWindowLog('debug', '尝试关闭窗口');
  
  try {
    if (isTauriEnvironment.value && window.__TAURI__) {
      try {
        // 使用全局Tauri对象直接调用
        if (window.__TAURI__.invoke) {
          await window.__TAURI__.invoke('close_window_cmd');
          addWindowLog('info', '窗口已关闭');
          return;
        }
      } catch (error) {
        addWindowLog('error', `关闭窗口失败: ${error}`);
        console.error('关闭窗口失败:', error);
      }
    }
    
    // 模拟行为
    addWindowLog('warn', '非Tauri环境或API不可用，使用模拟关闭');
    alert('在开发模式下，关闭按钮被禁用。请使用浏览器控件关闭页面。');
  } catch (err) {
    const errorMsg = `关闭窗口失败: ${err.toString()}`;
    addWindowLog('error', errorMsg);
    console.error(errorMsg, err);
    errorPanelVisible.value = true;
  }
};

// 添加窗口事件监听
const setupWindowEventListeners = async () => {
  if (!isTauriEnvironment.value || !window.__TAURI__) {
    addWindowLog('warn', '非 Tauri 环境，无法设置窗口事件监听');
    return () => {};
  }
  
  const listeners: (() => void)[] = [];
  
  try {
    // 使用全局Tauri对象添加事件监听
    if (window.__TAURI__.event) {
      try {
        // 监听窗口关闭请求
        const unlistenClose = await window.__TAURI__.event.listen('tauri://close-requested', (event: any) => {
          addWindowLog('info', `窗口关闭请求事件: ${JSON.stringify(event)}`);
        });
        listeners.push(unlistenClose);
        
        // 监听窗口尺寸变化
        const unlistenResize = await window.__TAURI__.event.listen('tauri://resize', (event: any) => {
          addWindowLog('info', `窗口大小调整事件: ${JSON.stringify(event)}`);
        });
        listeners.push(unlistenResize);
        
        // 监听窗口移动
        const unlistenMove = await window.__TAURI__.event.listen('tauri://move', (event: any) => {
          addWindowLog('info', `窗口移动事件: ${JSON.stringify(event)}`);
        });
        listeners.push(unlistenMove);
        
        // 监听窗口焦点变化
        const unlistenFocus = await window.__TAURI__.event.listen('tauri://focus-change', (event: any) => {
          addWindowLog('info', `窗口焦点状态: ${event.payload}`);
        });
        listeners.push(unlistenFocus);
        
        addWindowLog('info', '成功设置窗口事件监听');
      } catch (error) {
        addWindowLog('error', `设置窗口事件监听失败: ${error}`);
        console.error('设置窗口事件监听失败:', error);
      }
    } else {
      addWindowLog('warn', 'Tauri事件API不可用');
    }
  } catch (err) {
    const errorMsg = `设置窗口事件监听失败: ${err.toString()}`;
    addWindowLog('error', errorMsg);
    console.error(errorMsg, err);
  }
  
  // 返回清理函数
  return () => {
    addWindowLog('debug', '开始清理窗口事件监听器');
    listeners.forEach(unlisten => {
      try {
        unlisten();
      } catch (err) {
        addWindowLog('warn', `清理事件监听器失败: ${err}`);
      }
    });
    addWindowLog('info', `已清理 ${listeners.length} 个窗口事件监听器`);
  };
};

// 清除窗口日志
const clearWindowLogs = () => {
  windowLogs.value = [];
  addWindowLog('info', '日志已清除');
};

// 添加Document事件监听器，以便在tauri-ready事件触发时进行处理
onMounted(async () => {
  // 添加document事件监听器来检测Tauri就绪
  const tauriBackendHandler = (event: any) => {
    console.log('收到tauri-backend-ready事件:', event);
    tauriInitialized.value = true;
    addWindowLog('info', 'Tauri 已初始化并准备就绪 (通过后端事件检测)');
  };
  
  document.addEventListener('tauri-backend-ready', tauriBackendHandler);

  // 创建一个变量存储清理函数，初始值为空函数
  let cleanupFunction = () => {};

  // 尝试初始化Tauri环境
  const tauriReady = await initializeTauri();
  
  // 诊断 Tauri 环境
  console.log('%c========== Tauri 环境诊断 ==========', 'font-weight:bold;color:blue');
  console.log('window.location.href:', window.location.href);
  console.log('window.navigator.userAgent:', navigator.userAgent);
  console.log('document.title:', document.title);
  console.log('isTauriEnvironment:', isTauriEnvironment.value);
  console.log('window.__TAURI__ 存在:', Boolean(window.__TAURI__));
  console.log('window.__TAURI_BACKEND_INITIALIZED__ 存在:', Boolean(window.__TAURI_BACKEND_INITIALIZED__));
  console.log('tauriInitialized:', tauriInitialized.value);
  
  if (window.__TAURI__) {
    console.log('window.__TAURI__ 上的属性:');
    for (const key in window.__TAURI__) {
      console.log(`- ${key}: ${typeof window.__TAURI__[key]}`);
    }
  }
  console.log('%c=====================================', 'font-weight:bold;color:blue');
  
  // 设置标记来区分 Tauri 和浏览器环境
  if (isTauriEnvironment.value || tauriInitialized.value) {
    localStorage.setItem('runningInTauri', 'true');
    document.documentElement.classList.add('tauri-environment');
  } else {
    localStorage.removeItem('runningInTauri');
    document.documentElement.classList.add('browser-environment');
  }
  
  document.documentElement.setAttribute('data-theme', currentTheme.value);
  addWindowLog('info', '应用已挂载，主题已初始化');
  
  // 设置窗口事件监听 - 只有在Tauri初始化后才进行
  if (tauriInitialized.value) {
    try {
      const cleanup = await setupWindowEventListeners();
      if (typeof cleanup === 'function') {
        cleanupFunction = cleanup;
      }
    } catch (error) {
      addWindowLog('error', `设置窗口事件监听时出错: ${error}`);
    }
  }
  
  // 设置组件卸载时的清理函数
  onUnmounted(() => {
    try {
      cleanupFunction();
      document.removeEventListener('tauri-backend-ready', tauriBackendHandler);
      addWindowLog('info', '应用已卸载，事件监听已清理');
    } catch (err) {
      console.error(`清理事件监听时出错: ${err}`);
    }
  });
});
</script>

<style>
@import './styles/theme.css';

/* 应用容器 */
.app-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
}

/* 标题栏 - 无边框设计 */
.titlebar {
  height: var(--titlebar-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-sm);
  background-color: var(--bg-color);
  color: var(--text-color-secondary);
  user-select: none;
  -webkit-app-region: drag;
}

.titlebar-drag-region {
  display: flex;
  align-items: center;
  flex: 1;
  height: 100%;
}

.titlebar-logo {
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-md);
  -webkit-app-region: no-drag;
}

.titlebar-text {
  margin-left: var(--spacing-sm);
  font-weight: 600;
  font-size: 14px;
  background: linear-gradient(to right, #8a56ff, #6a8cff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.titlebar-controls {
  display: flex;
  -webkit-app-region: no-drag;
}

.titlebar-control {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-sm);
  transition: all var(--transition-quick);
}

.titlebar-control:hover {
  background-color: var(--bg-color-hover);
}

.titlebar-control.close:hover {
  background-color: #e81123;
  color: white;
}

/* 插件功能栏 */
.plugin-toolbar {
  height: 36px;
  background-color: var(--bg-color-light);
  border-bottom: 1px solid var(--divider-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 var(--spacing-md);
}

.plugin-tools {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.plugin-tool {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: var(--border-radius-sm);
  background-color: transparent;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  transition: all var(--transition-quick);
}

.plugin-tool:hover {
  background-color: var(--bg-color-hover);
  color: var(--text-color-primary);
}

.divider {
  width: 1px;
  height: 18px;
  background-color: var(--divider-color);
  margin: 0 var(--spacing-xs);
}

.path-breadcrumbs {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: var(--text-color-secondary);
}

.breadcrumb-item {
  cursor: pointer;
}

.breadcrumb-item:hover {
  color: var(--text-color-primary);
}

.breadcrumb-separator {
  margin: 0 var(--spacing-xs);
  color: var(--text-color-disabled);
}

/* 主容器 */
.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 主侧边栏 - 仅图标 */
.sidebar-primary {
  width: 50px;
  height: 100%;
  background-color: var(--bg-color);
  border-right: 1px solid var(--divider-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
}

.sidebar-top, .sidebar-bottom {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}

.icon-nav-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;
  height: 38px;
  border: none;
  background: transparent;
  color: var(--text-color-secondary);
  cursor: pointer;
  border-radius: var(--border-radius-md);
  transition: all var(--transition-quick);
}

.icon-nav-button:hover {
  background-color: var(--bg-color-hover);
  color: var(--text-color-primary);
}

.icon-nav-button.active {
  color: var(--primary-color);
  background-color: var(--bg-color-lighter);
}

/* 二级侧边栏 */
.sidebar-secondary {
  width: 260px;
  height: 100%;
  background-color: var(--bg-color-light);
  border-right: 1px solid var(--divider-color);
}

/* 编辑器容器 */
.editor-container {
  flex: 1;
  height: 100%;
  background-color: var(--editor-bg);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 状态栏按钮 */
.status-bar-btn {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 8px;
  height: 22px;
  background: transparent;
  border: none;
  border-radius: 3px;
  color: var(--text-color-secondary);
  font-size: 12px;
  cursor: pointer;
}

.status-bar-btn:hover {
  background-color: var(--bg-color-hover);
  color: var(--text-color-primary);
}

.status-bar-btn svg {
  opacity: 0.7;
}

.status-bar-btn:hover svg {
  opacity: 1;
}

/* 模拟通知样式 */
.mock-notification {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: var(--bg-color-light);
  color: var(--text-color-primary);
  padding: 12px 16px;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  animation: slideIn 0.3s ease-out;
  border-left: 4px solid var(--primary-color);
  font-size: 14px;
  max-width: 300px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>