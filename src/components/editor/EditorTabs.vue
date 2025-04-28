<template>
  <div class="editor-tabs">
    <div class="tabs-scroll-container">
      <div class="tabs-container">
        <div 
          v-for="tab in tabs" 
          :key="tab.id" 
          class="tab" 
          :class="{ 
            'active': tab.id === activeTabId,
            'has-error': tab.hasError
          }"
          @click="setActiveTab(tab.id)"
          draggable="true"
          @dragstart="handleDragStart($event, tab)"
          @dragover.prevent
          @dragenter="handleDragEnter($event, tab)"
          @dragleave="handleDragLeave($event)"
          @drop="handleDrop($event, tab)"
          @dragend="handleDragEnd()"
        >
          <!-- 文件类型图标 -->
          <div class="tab-icon">
            <svg v-if="getFileExtension(tab.title) === 'vue'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M1.6 2.4L8 13.6L14.4 2.4H11.2L8 8L4.8 2.4H1.6Z" fill="#41B883"/>
              <path d="M4.8 2.4L8 8L11.2 2.4H8.8L8 4L7.2 2.4H4.8Z" fill="#35495E"/>
            </svg>
            <svg v-else-if="getFileExtension(tab.title) === 'js'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2V14H14V2H2ZM8.5 11.5C8.5 12.16 8.06 12.5 7.39 12.5C6.64 12.5 6.21 12.05 6 11.5L6.85 11.05C6.97 11.36 7.14 11.63 7.55 11.63C7.92 11.63 8.13 11.47 8.13 11.21C8.13 10.89 7.92 10.76 7.47 10.54L7.22 10.43C6.54 10.12 6.11 9.74 6.11 8.97C6.11 8.27 6.62 7.76 7.35 7.76C7.89 7.76 8.29 7.97 8.57 8.44L7.76 8.92C7.64 8.66 7.5 8.53 7.35 8.53C7.19 8.53 7.08 8.64 7.08 8.81C7.08 9.02 7.19 9.15 7.61 9.35L7.85 9.46C8.65 9.82 9.08 10.19 9.08 10.97C9.08 11.81 8.43 12.5 7.41 12.5H7.39L8.5 11.5ZM11.5 11.5C11.5 12.16 11.06 12.5 10.39 12.5C9.64 12.5 9.21 12.05 9 11.5L9.85 11.05C9.97 11.36 10.14 11.63 10.55 11.63C10.92 11.63 11.13 11.47 11.13 11.21C11.13 10.89 10.92 10.76 10.47 10.54L10.22 10.43C9.54 10.12 9.11 9.74 9.11 8.97C9.11 8.27 9.62 7.76 10.35 7.76C10.89 7.76 11.29 7.97 11.57 8.44L10.76 8.92C10.64 8.66 10.5 8.53 10.35 8.53C10.19 8.53 10.08 8.64 10.08 8.81C10.08 9.02 10.19 9.15 10.61 9.35L10.85 9.46C11.65 9.82 12.08 10.19 12.08 10.97C12.08 11.81 11.43 12.5 10.41 12.5H10.39L11.5 11.5Z" fill="#F0DB4F"/>
            </svg>
            <svg v-else-if="getFileExtension(tab.title) === 'ts'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 2V14H14V2H2ZM11.2 7.85C11.5 7.95 11.73 8.09 11.92 8.28C12.11 8.47 12.25 8.68 12.36 8.92C12.46 9.17 12.51 9.44 12.51 9.73C12.51 10.04 12.45 10.32 12.33 10.58C12.21 10.83 12.04 11.05 11.83 11.23C11.62 11.41 11.37 11.55 11.08 11.65C10.79 11.75 10.48 11.8 10.15 11.8C9.67 11.8 9.26 11.71 8.92 11.51C8.57 11.32 8.31 11.05 8.12 10.69L8.92 10.02C9.03 10.24 9.18 10.42 9.36 10.55C9.54 10.67 9.76 10.73 10.02 10.73C10.15 10.73 10.28 10.71 10.4 10.67C10.52 10.63 10.62 10.58 10.71 10.51C10.8 10.44 10.87 10.36 10.93 10.25C10.98 10.15 11.01 10.03 11.01 9.89C11.01 9.63 10.92 9.42 10.75 9.27C10.57 9.12 10.33 9.04 10.03 9.04H9.59V8.09H9.99C10.13 8.09 10.25 8.07 10.38 8.03C10.5 7.99 10.61 7.93 10.7 7.86C10.79 7.79 10.86 7.7 10.91 7.6C10.96 7.49 10.99 7.38 10.99 7.25C10.99 7.05 10.92 6.89 10.77 6.77C10.63 6.65 10.45 6.59 10.23 6.59C10.01 6.59 9.82 6.65 9.67 6.75C9.52 6.86 9.39 7 9.3 7.17L8.56 6.6C8.64 6.47 8.73 6.35 8.84 6.25C8.94 6.14 9.07 6.05 9.21 5.98C9.35 5.91 9.51 5.85 9.69 5.81C9.87 5.77 10.07 5.75 10.3 5.75C10.59 5.75 10.85 5.79 11.09 5.88C11.33 5.96 11.54 6.08 11.71 6.23C11.89 6.38 12.02 6.56 12.12 6.77C12.22 6.98 12.27 7.21 12.27 7.47C12.27 7.57 12.26 7.68 12.24 7.78C12.22 7.88 12.19 7.98 12.15 8.07C12.11 8.17 12.06 8.26 12 8.34C11.94 8.42 11.86 8.5 11.77 8.57L11.2 7.85ZM8.17 7.03H5.68V8.01H6.54V11.67H7.32V8.01H8.18V7.04L8.17 7.03Z" fill="#007ACC"/>
            </svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
          </div>
          
          <!-- 文件名称 -->
          <div class="tab-title">{{ tab.title }}</div>
          
          <!-- 错误指示器 -->
          <div v-if="tab.hasError" class="tab-error" :title="tab.errorMessage || '文件中存在错误'">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          
          <!-- 修改指示器 -->
          <div v-if="tab.modified" class="tab-modified"></div>
          
          <!-- 关闭按钮 -->
          <button class="tab-close" @click.stop="closeTab(tab.id)">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </div>
    
    <div class="tabs-actions">
      <button class="tab-action-btn split" @click="splitEditor" title="拆分编辑器">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="12" y1="3" x2="12" y2="21"></line>
        </svg>
      </button>
      <div class="dropdown-container">
        <button class="tab-action-btn more" @click="toggleMoreMenu" title="更多选项">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="1"></circle>
            <circle cx="19" cy="12" r="1"></circle>
            <circle cx="5" cy="12" r="1"></circle>
          </svg>
        </button>
        <div v-if="showMoreMenu" class="dropdown-menu">
          <ul>
            <li @click="closeAllTabs">关闭所有选项卡</li>
            <li @click="closeOtherTabs">关闭其他选项卡</li>
            <li @click="closeSavedTabs">关闭已保存选项卡</li>
            <li class="divider"></li>
            <li @click="copyFilePath">复制文件路径</li>
            <li @click="revealInExplorer">在资源管理器中显示</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 定义Tab类型
interface Tab {
  id: string;
  title: string;
  modified: boolean;
  hasError?: boolean;
  errorMessage?: string;
  path?: string;
}

// 定义事件
const emit = defineEmits<{
  (e: 'active-tab-change', tabId: string): void;
  (e: 'close-tab', tabId: string): void;
  (e: 'split-editor', direction: 'horizontal' | 'vertical'): void;
  (e: 'tab-reorder', tabs: Tab[]): void;
}>();

// 模拟标签数据，实际应用中应从状态管理中获取
const tabs = ref<Tab[]>([
  { id: '1', title: 'App.vue', modified: false, path: '/src/App.vue' },
  { id: '2', title: 'EditorTabs.vue', modified: true, path: '/src/components/editor/EditorTabs.vue' },
  { id: '3', title: 'main.ts', modified: false, hasError: true, errorMessage: '类型错误：无法将string类型赋值给number类型', path: '/src/main.ts' },
  { id: '4', title: 'store.ts', modified: false, path: '/src/store.ts' },
  { id: '5', title: 'utils.js', modified: true, path: '/src/utils.js' },
]);

const activeTabId = ref('2'); // 默认选中第二个标签
const draggedTabId = ref<string | null>(null);
const showMoreMenu = ref(false);

// 设置激活标签
const setActiveTab = (id: string) => {
  activeTabId.value = id;
  emit('active-tab-change', id);
};

// 关闭标签
const closeTab = (id: string) => {
  const index = tabs.value.findIndex(tab => tab.id === id);
  if (index !== -1) {
    tabs.value.splice(index, 1);
    
    // 如果关闭的是当前激活的标签，需要激活另一个标签
    if (id === activeTabId.value) {
      if (tabs.value.length > 0) {
        const newActiveId = tabs.value[Math.min(index, tabs.value.length - 1)].id;
        activeTabId.value = newActiveId;
        emit('active-tab-change', newActiveId);
      } else {
        activeTabId.value = '';
      }
    }
    
    emit('close-tab', id);
  }
};

// 获取文件扩展名
const getFileExtension = (filename: string): string => {
  return filename.split('.').pop() || '';
};

// 拆分编辑器
const splitEditor = () => {
  emit('split-editor', 'vertical'); // 默认垂直拆分
};

// 切换更多菜单
const toggleMoreMenu = () => {
  showMoreMenu.value = !showMoreMenu.value;
};

// 关闭点击菜单外部时的菜单
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (!target.closest('.dropdown-container') && showMoreMenu.value) {
    showMoreMenu.value = false;
  }
};

// 关闭所有选项卡
const closeAllTabs = () => {
  tabs.value.forEach(tab => {
    emit('close-tab', tab.id);
  });
  tabs.value = [];
  activeTabId.value = '';
  showMoreMenu.value = false;
};

// 关闭其他选项卡
const closeOtherTabs = () => {
  const currentTab = tabs.value.find(tab => tab.id === activeTabId.value);
  if (currentTab) {
    tabs.value.forEach(tab => {
      if (tab.id !== activeTabId.value) {
        emit('close-tab', tab.id);
      }
    });
    tabs.value = [currentTab];
  }
  showMoreMenu.value = false;
};

// 关闭已保存选项卡
const closeSavedTabs = () => {
  const tabsToKeep = tabs.value.filter(tab => tab.modified);
  tabs.value.forEach(tab => {
    if (!tab.modified) {
      emit('close-tab', tab.id);
    }
  });
  tabs.value = tabsToKeep;
  
  if (tabsToKeep.length > 0 && !tabsToKeep.some(tab => tab.id === activeTabId.value)) {
    activeTabId.value = tabsToKeep[0].id;
    emit('active-tab-change', activeTabId.value);
  } else if (tabsToKeep.length === 0) {
    activeTabId.value = '';
  }
  
  showMoreMenu.value = false;
};

// 复制文件路径
const copyFilePath = () => {
  const currentTab = tabs.value.find(tab => tab.id === activeTabId.value);
  if (currentTab && currentTab.path) {
    navigator.clipboard.writeText(currentTab.path).catch(err => {
      console.error('复制文件路径失败:', err);
    });
  }
  showMoreMenu.value = false;
};

// 在资源管理器中显示
const revealInExplorer = () => {
  // 这里需要与后端通信，调用操作系统的能力
  // 在Tauri中可以通过invoke调用Rust函数
  const currentTab = tabs.value.find(tab => tab.id === activeTabId.value);
  if (currentTab && currentTab.path) {
    console.log('在资源管理器中显示文件:', currentTab.path);
    // 示例: window.__TAURI__.invoke('reveal_in_explorer', { path: currentTab.path });
  }
  showMoreMenu.value = false;
};

// 拖拽功能实现
const handleDragStart = (event: DragEvent, tab: Tab) => {
  if (event.dataTransfer) {
    draggedTabId.value = tab.id;
    event.dataTransfer.effectAllowed = 'move';
    // 设置自定义数据
    event.dataTransfer.setData('text/plain', tab.id);
    
    // 设置拖拽图像
    const dragImage = document.createElement('div');
    dragImage.textContent = tab.title;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    document.body.appendChild(dragImage);
    event.dataTransfer.setDragImage(dragImage, 0, 0);
    setTimeout(() => {
      document.body.removeChild(dragImage);
    }, 0);
  }
};

const handleDragEnter = (event: DragEvent, targetTab: Tab) => {
  if (draggedTabId.value !== null && draggedTabId.value !== targetTab.id) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    target.classList.add('drag-over');
  }
};

const handleDragLeave = (event: DragEvent) => {
  const target = event.currentTarget as HTMLElement;
  target.classList.remove('drag-over');
};

const handleDrop = (event: DragEvent, targetTab: Tab) => {
  event.preventDefault();
  const target = event.currentTarget as HTMLElement;
  target.classList.remove('drag-over');
  
  if (draggedTabId.value !== null && draggedTabId.value !== targetTab.id) {
    const draggedIndex = tabs.value.findIndex(tab => tab.id === draggedTabId.value);
    const targetIndex = tabs.value.findIndex(tab => tab.id === targetTab.id);
    
    if (draggedIndex !== -1 && targetIndex !== -1) {
      // 重新排序tabs
      const draggedTab = tabs.value[draggedIndex];
      tabs.value.splice(draggedIndex, 1);
      tabs.value.splice(targetIndex, 0, draggedTab);
      
      // 通知更新
      emit('tab-reorder', [...tabs.value]);
    }
  }
};

const handleDragEnd = () => {
  draggedTabId.value = null;
  // 移除所有拖拽状态类
  document.querySelectorAll('.tab').forEach(tab => {
    (tab as HTMLElement).classList.remove('drag-over');
  });
};

// 生命周期钩子
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  
  // 检查是否在开发环境中，如果是则添加一些模拟数据
  if (!window.__TAURI__ && import.meta.env.DEV) {
    // 添加模拟数据
    tabs.value = [
      { 
        id: '1', 
        title: 'main.rs', 
        path: '/src-tauri/src/main.rs', 
        icon: 'rust', 
        modified: false, 
        active: true,
        error: false
      },
      { 
        id: '2', 
        title: 'App.vue', 
        path: '/src/App.vue', 
        icon: 'vue', 
        modified: true, 
        active: false,
        error: false 
      },
      { 
        id: '3', 
        title: 'EditorTabs.vue', 
        path: '/src/components/editor/EditorTabs.vue', 
        icon: 'vue', 
        modified: false, 
        active: false,
        error: true 
      }
    ];
    
    console.log('在开发环境中添加了模拟标签数据');
  }
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
.editor-tabs {
  display: flex;
  height: 40px;
  background-color: var(--bg-color-light);
  border-bottom: 1px solid var(--divider-color);
  user-select: none;
}

.tabs-scroll-container {
  flex: 1;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  scrollbar-width: none; /* Firefox */
}

.tabs-scroll-container::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.tabs-container {
  display: flex;
  height: 100%;
}

.tab {
  display: flex;
  align-items: center;
  padding: 0 0 0 var(--spacing-md);
  min-width: 160px;
  max-width: 240px;
  height: 100%;
  background-color: var(--bg-color-light);
  color: var(--text-color-secondary);
  position: relative;
  border-right: 1px solid var(--divider-color);
  cursor: pointer;
  transition: all var(--transition-quick);
}

.tab::before {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 1px;
  background-color: transparent;
  transition: all var(--transition-quick);
}

.tab:hover {
  color: var(--text-color-primary);
  background-color: var(--bg-color-hover);
}

.tab.active {
  color: var(--text-color-primary);
  background-color: var(--editor-bg);
}

.tab.active::before {
  background-color: var(--primary-color);
}

.tab.has-error::before {
  background-color: var(--error-color);
}

.tab.drag-over {
  border-left: 2px solid var(--primary-color);
}

.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: var(--spacing-sm);
  color: var(--text-color-secondary);
}

.tab-title {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}

.tab-modified {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--primary-color);
  margin: 0 var(--spacing-sm);
}

.tab-error {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 var(--spacing-sm);
  color: var(--error-color);
}

.tab-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  opacity: 0;
  margin: 0 var(--spacing-xs);
  background: transparent;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--text-color-secondary);
  cursor: pointer;
  transition: all var(--transition-quick);
}

.tab:hover .tab-close {
  opacity: 1;
}

.tab-close:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--text-color-primary);
}

.tabs-actions {
  display: flex;
  align-items: center;
  padding: 0 var(--spacing-xs);
  background-color: var(--bg-color-light);
}

.tab-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background: transparent;
  border: none;
  border-radius: var(--border-radius-sm);
  color: var(--text-color-secondary);
  cursor: pointer;
  transition: all var(--transition-quick);
}

.tab-action-btn:hover {
  background-color: var(--bg-color-hover);
  color: var(--text-color-primary);
}

.dropdown-container {
  position: relative;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 180px;
  background-color: var(--bg-color);
  border: 1px solid var(--divider-color);
  border-radius: var(--border-radius-md);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  margin-top: 4px;
  overflow: hidden;
}

.dropdown-menu ul {
  list-style: none;
  padding: 4px 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 8px 12px;
  font-size: 13px;
  color: var(--text-color-primary);
  cursor: pointer;
  transition: background-color var(--transition-quick);
}

.dropdown-menu li:hover {
  background-color: var(--bg-color-hover);
}

.dropdown-menu .divider {
  height: 1px;
  background-color: var(--divider-color);
  padding: 0;
  margin: 4px 0;
  cursor: default;
}

.dropdown-menu .divider:hover {
  background-color: var(--divider-color);
}
</style> 