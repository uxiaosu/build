<template>
  <div class="app-sidebar" :class="{ 'collapsed': collapsed }">
    <!-- 侧边栏图标导航 -->
    <div class="sidebar-icons">
      <!-- 文件浏览器图标 -->
      <button 
        class="sidebar-icon-btn" 
        :class="{ 'active': activeTab === 'explorer' }"
        @click="setActiveTab('explorer')"
        title="资源管理器"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3h18v18H3zM3 9h18M9 21V9"></path>
        </svg>
      </button>
      
      <!-- 搜索图标 -->
      <button 
        class="sidebar-icon-btn" 
        :class="{ 'active': activeTab === 'search' }"
        @click="setActiveTab('search')"
        title="搜索"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
      
      <!-- Git图标 -->
      <button 
        class="sidebar-icon-btn" 
        :class="{ 'active': activeTab === 'git' }"
        @click="setActiveTab('git')"
        title="版本控制"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="3"></circle>
          <circle cx="6" cy="6" r="3"></circle>
          <path d="M6 21V9a9 9 0 0 0 9 9"></path>
        </svg>
      </button>
      
      <!-- 调试图标 -->
      <button 
        class="sidebar-icon-btn" 
        :class="{ 'active': activeTab === 'debug' }"
        @click="setActiveTab('debug')"
        title="运行和调试"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="23 8 23 16 16 16"></polyline>
          <line x1="1" y1="16" x2="8" y2="16"></line>
          <path d="M8 16V8a4 4 0 0 1 8 0v8"></path>
        </svg>
      </button>
      
      <!-- 扩展图标 -->
      <button 
        class="sidebar-icon-btn" 
        :class="{ 'active': activeTab === 'extensions' }"
        @click="setActiveTab('extensions')"
        title="扩展"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7"></rect>
          <rect x="14" y="3" width="7" height="7"></rect>
          <rect x="14" y="14" width="7" height="7"></rect>
          <rect x="3" y="14" width="7" height="7"></rect>
        </svg>
      </button>
    </div>
    
    <!-- 侧边栏内容 -->
    <div class="sidebar-content" v-if="!collapsed">
      <!-- 资源管理器 -->
      <div class="sidebar-panel" v-if="activeTab === 'explorer'">
        <div class="sidebar-header">
          <span class="sidebar-title">资源管理器</span>
          <div class="sidebar-actions">
            <button class="icon-btn small" title="新建文件" @click="createNewFile">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="12" y1="18" x2="12" y2="12"></line>
                <line x1="9" y1="15" x2="15" y2="15"></line>
              </svg>
            </button>
            <button class="icon-btn small" title="新建文件夹" @click="createNewFolder">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                <line x1="12" y1="11" x2="12" y2="17"></line>
                <line x1="9" y1="14" x2="15" y2="14"></line>
              </svg>
            </button>
            <button class="icon-btn small" title="刷新" @click="refreshFileExplorer">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M23 4v6h-6"></path>
                <path d="M1 20v-6h6"></path>
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
              </svg>
            </button>
            <button class="icon-btn small" title="折叠所有" @click="collapseAllFolders">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="4" y1="12" x2="20" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
        
        <div class="tree-view">
          <!-- 此处将使用递归组件展示文件树，这里先用静态内容展示 -->
          <div class="tree-item folder expanded">
            <div class="tree-item-header">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>项目根目录</span>
            </div>
            <div class="tree-item-children">
              <div class="tree-item folder">
                <div class="tree-item-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
                  </svg>
                  <span>src</span>
                </div>
              </div>
              <div class="tree-item file">
                <div class="tree-item-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>package.json</span>
                </div>
              </div>
              <div class="tree-item file">
                <div class="tree-item-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                  </svg>
                  <span>README.md</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 搜索面板 -->
      <div class="sidebar-panel" v-else-if="activeTab === 'search'">
        <div class="sidebar-header">
          <span class="sidebar-title">搜索</span>
        </div>
        <div class="search-panel">
          <div class="search-input-container">
            <input 
              type="text" 
              class="search-input" 
              placeholder="搜索" 
              v-model="searchText"
              @keydown.enter="performSearch"
            />
            <button class="icon-btn small" @click="performSearch" title="搜索">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          <div class="search-options">
            <label class="search-option">
              <input type="checkbox" v-model="searchOptions.caseSensitive" />
              <span>区分大小写</span>
            </label>
            <label class="search-option">
              <input type="checkbox" v-model="searchOptions.wholeWord" />
              <span>全字匹配</span>
            </label>
            <label class="search-option">
              <input type="checkbox" v-model="searchOptions.regex" />
              <span>正则表达式</span>
            </label>
          </div>
          <div class="search-results" v-if="searchResults.length > 0">
            <!-- 搜索结果将在这里显示 -->
          </div>
        </div>
      </div>
      
      <!-- 其他侧边栏面板也可以类似实现 -->
      <div class="sidebar-panel" v-else>
        <div class="sidebar-header">
          <span class="sidebar-title">{{ tabTitles[activeTab] }}</span>
        </div>
        <div class="placeholder-content">
          {{ activeTab }} 功能开发中...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits, computed } from 'vue';

const props = defineProps<{
  collapsed: boolean
}>();

const emit = defineEmits<{
  (e: 'update:collapsed', value: boolean): void
}>();

// 侧边栏状态
const activeTab = ref('explorer');
const searchText = ref('');
const searchOptions = ref({
  caseSensitive: false,
  wholeWord: false,
  regex: false
});
const searchResults = ref([]);

// 计算属性
const tabTitles = computed(() => ({
  explorer: '资源管理器',
  search: '搜索',
  git: '版本控制',
  debug: '运行和调试',
  extensions: '扩展'
}));

// 方法
const setActiveTab = (tab: string) => {
  if (activeTab.value === tab && !props.collapsed) {
    // 如果点击当前活动的标签，则切换折叠状态
    emit('update:collapsed', !props.collapsed);
  } else {
    // 否则，激活所选标签并展开侧边栏
    activeTab.value = tab;
    if (props.collapsed) {
      emit('update:collapsed', false);
    }
  }
};

const createNewFile = () => {
  console.log('Create new file');
  // 实现创建新文件逻辑
};

const createNewFolder = () => {
  console.log('Create new folder');
  // 实现创建新文件夹逻辑
};

const refreshFileExplorer = () => {
  console.log('Refresh file explorer');
  // 实现刷新文件浏览器逻辑
};

const collapseAllFolders = () => {
  console.log('Collapse all folders');
  // 实现折叠所有文件夹逻辑
};

const performSearch = () => {
  console.log('Performing search:', searchText.value, searchOptions.value);
  // 实现搜索逻辑
  searchResults.value = []; // 暂时为空，后续会实现真正的搜索功能
};
</script>

<style scoped>
.app-sidebar {
  display: flex;
  height: 100%;
  background-color: var(--bg-color-page);
  user-select: none;
}

.sidebar-icons {
  display: flex;
  flex-direction: column;
  width: 48px;
  background-color: var(--bg-color);
  border-right: 1px solid var(--border-color);
  padding-top: 12px;
}

.sidebar-icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  position: relative;
}

.sidebar-icon-btn:hover {
  color: var(--text-color-primary);
}

.sidebar-icon-btn.active {
  color: var(--primary-color);
}

.sidebar-icon-btn.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 12px;
  height: 24px;
  width: 2px;
  background-color: var(--primary-color);
}

.sidebar-content {
  width: 300px;
  border-right: 1px solid var(--border-color);
  overflow: hidden;
}

.collapsed .sidebar-content {
  display: none;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  color: var(--text-color-secondary);
  height: 36px;
}

.sidebar-actions {
  display: flex;
}

.icon-btn.small {
  width: 24px;
  height: 24px;
}

.tree-view {
  padding: 8px;
  overflow: auto;
  height: calc(100% - 36px);
}

.tree-item {
  font-size: 13px;
  margin-bottom: 2px;
}

.tree-item-header {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
}

.tree-item-header:hover {
  background-color: var(--bg-color-overlay);
}

.tree-item-header svg {
  margin-right: 6px;
  color: var(--text-color-secondary);
}

.tree-item-children {
  padding-left: 20px;
}

.folder.expanded .tree-item-children {
  display: block;
}

.folder:not(.expanded) .tree-item-children {
  display: none;
}

.search-panel {
  padding: 8px;
}

.search-input-container {
  display: flex;
  margin-bottom: 8px;
}

.search-options {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  font-size: 12px;
}

.search-option {
  display: flex;
  align-items: center;
  margin-right: 12px;
  cursor: pointer;
}

.search-option input {
  margin-right: 4px;
}

.placeholder-content {
  padding: 16px;
  color: var(--text-color-secondary);
  font-style: italic;
}
</style> 