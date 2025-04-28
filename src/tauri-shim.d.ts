declare module '@tauri-apps/api/tauri' {
  export function invoke(command: string, args?: any): Promise<any>;
  export default { invoke };
}

declare module '@tauri-apps/api/window' {
  export const appWindow: {
    title(): Promise<string>;
    minimize(): Promise<void>;
    maximize(): Promise<void>;
    unmaximize(): Promise<void>;
    isMaximized(): Promise<boolean>;
    close(): Promise<void>;
  };
}

declare module '@tauri-apps/api/*' {
  const content: any;
  export default content;
}

// 扩展全局Window接口，添加垫片加载标记
interface Window {
  __TAURI_SHIM_LOADED__?: boolean;
} 