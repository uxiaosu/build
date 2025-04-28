/**
 * Tauri API 垫片模块 
 * 提供模拟的 @tauri-apps/api 导入解决方案
 */

// 默认invoke函数，当动态导入时返回
export const invoke = async (command: string, args?: any): Promise<any> => {
  console.log(`[Tauri Shim] 调用命令: ${command}`, args);
  
  // 如果全局Tauri对象存在，使用实际的API
  if (typeof window !== 'undefined' && window.__TAURI__?.invoke) {
    return window.__TAURI__.invoke(command, args);
  }
  
  // 否则返回模拟数据
  if (command === 'check_tauri_initialized') return '模拟Tauri初始化成功';
  if (command === 'minimize_window_cmd') return null;
  if (command === 'maximize_window_cmd') return null;
  if (command === 'unmaximize_window_cmd') return null;
  if (command === 'is_maximized_cmd') return false;
  if (command === 'close_window_cmd') return null;
  
  console.warn(`[Tauri Shim] 未知命令: ${command}`);
  return `模拟响应: ${command}`;
};

// 导出默认对象，以便import()操作有一个默认值
export default {
  invoke
};

// 通知全局对象，Tauri垫片已加载
if (typeof window !== 'undefined') {
  window.__TAURI_SHIM_LOADED__ = true;
} 