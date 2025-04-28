import { defineStore } from 'pinia';

// 文件类型定义
export interface FileInfo {
  path: string;
  name: string;
  type: 'file' | 'directory';
  size?: number;
  lastModified?: Date;
  children?: FileInfo[];
  parent?: string;
}

// 打开文件的标签
export interface FileTab {
  id: string;
  path: string;
  title: string;
  modified: boolean;
}

// 文件存储状态
interface FileState {
  // 文件树结构
  fileTree: FileInfo[];
  // 当前打开的文件
  currentFile: FileInfo | null;
  // 打开的标签页
  openTabs: FileTab[];
  // 活动标签ID
  activeTabId: string | null;
  // 文件内容缓存
  fileContents: Record<string, string>;
  // 原始文件内容（用于比较是否修改）
  originalContents: Record<string, string>;
}

export const useFileStore = defineStore('file', {
  state: (): FileState => ({
    fileTree: [],
    currentFile: null,
    openTabs: [],
    activeTabId: null,
    fileContents: {},
    originalContents: {}
  }),
  
  getters: {
    // 获取当前活动标签
    activeTab(): FileTab | undefined {
      return this.openTabs.find(tab => tab.id === this.activeTabId);
    },
    
    // 获取当前打开的所有文件路径
    openFilePaths(): string[] {
      return this.openTabs.map(tab => tab.path);
    }
  },
  
  actions: {
    // 设置文件树
    setFileTree(tree: FileInfo[]) {
      this.fileTree = tree;
    },
    
    // 打开文件
    async openFile(file: FileInfo) {
      // 检查文件是否已经打开
      const existingTabIndex = this.openTabs.findIndex(tab => tab.path === file.path);
      
      if (existingTabIndex >= 0) {
        // 文件已经打开，激活该标签
        this.activeTabId = this.openTabs[existingTabIndex].id;
      } else {
        // 创建新标签
        const newTab: FileTab = {
          id: `file-${Date.now()}`,
          path: file.path,
          title: file.name,
          modified: false
        };
        
        // 添加到打开的标签中
        this.openTabs.push(newTab);
        this.activeTabId = newTab.id;
      }
      
      // 设置当前文件
      this.currentFile = file;
      
      // 如果内容未加载，加载文件内容
      if (!this.fileContents[file.path]) {
        await this.loadFileContent(file.path);
      }
    },
    
    // 加载文件内容
    async loadFileContent(path: string): Promise<string> {
      try {
        // 模拟从服务器或文件系统获取内容
        // 实际实现中，这里应该调用API或文件系统接口
        const content = localStorage.getItem(`file:${path}`) || '';
        
        // 缓存文件内容
        this.fileContents[path] = content;
        this.originalContents[path] = content;
        
        return content;
      } catch (error) {
        console.error('加载文件内容失败:', error);
        throw error;
      }
    },
    
    // 保存文件
    async saveFile(path: string, content: string): Promise<void> {
      try {
        // 模拟保存到服务器或文件系统
        // 实际实现中，这里应该调用API或文件系统接口
        localStorage.setItem(`file:${path}`, content);
        
        // 更新缓存
        this.fileContents[path] = content;
        this.originalContents[path] = content;
        
        // 更新标签状态
        const tabIndex = this.openTabs.findIndex(tab => tab.path === path);
        if (tabIndex >= 0) {
          this.openTabs[tabIndex].modified = false;
        }
      } catch (error) {
        console.error('保存文件失败:', error);
        throw error;
      }
    },
    
    // 标记文件为已修改
    markFileAsModified(path: string) {
      const tabIndex = this.openTabs.findIndex(tab => tab.path === path);
      if (tabIndex >= 0 && !this.openTabs[tabIndex].modified) {
        this.openTabs[tabIndex].modified = true;
      }
    },
    
    // 关闭标签
    closeTab(tabId: string) {
      const tabIndex = this.openTabs.findIndex(tab => tab.id === tabId);
      
      if (tabIndex >= 0) {
        // 获取标签信息
        const tab = this.openTabs[tabIndex];
        
        // 从打开的标签中移除
        this.openTabs.splice(tabIndex, 1);
        
        // 如果关闭的是当前激活的标签，需要激活另一个标签
        if (this.activeTabId === tabId) {
          if (this.openTabs.length > 0) {
            // 激活前一个标签，如果没有则激活后一个
            const newIndex = Math.min(tabIndex, this.openTabs.length - 1);
            this.activeTabId = this.openTabs[newIndex].id;
            
            // 设置当前文件
            const activeTabPath = this.openTabs[newIndex].path;
            this.currentFile = this.findFileByPath(activeTabPath);
          } else {
            // 没有打开的标签了
            this.activeTabId = null;
            this.currentFile = null;
          }
        }
      }
    },
    
    // 查找指定路径的文件
    findFileByPath(path: string): FileInfo | null {
      // 实现文件查找逻辑
      // 这是一个简化的实现，实际应用中可能需要递归查找
      const findInTree = (tree: FileInfo[]): FileInfo | null => {
        for (const item of tree) {
          if (item.path === path) {
            return item;
          }
          
          if (item.children) {
            const found = findInTree(item.children);
            if (found) return found;
          }
        }
        
        return null;
      };
      
      return findInTree(this.fileTree);
    },
    
    // 获取原始文件内容
    getOriginalContent(path: string): string {
      return this.originalContents[path] || '';
    },
    
    // 创建新文件
    createNewFile() {
      // 实现创建新文件的逻辑
      console.log('创建新文件');
      // 这里应该弹出一个对话框让用户输入文件名和路径
    },
    
    // 打开文件选择器
    openFilePicker() {
      // 实现打开文件选择器的逻辑
      console.log('打开文件选择器');
      // 这里应该弹出一个文件选择对话框
    }
  }
}); 