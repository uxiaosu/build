<template>
  <div class="app-toolbar">
    <div class="toolbar-section">
      <!-- 应用Logo和菜单按钮 -->
      <button class="icon-btn" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <span class="app-title">IDE应用</span>
      
      <!-- 文件菜单 -->
      <button class="toolbar-btn" @click="handleMenu('file')">文件</button>
      <button class="toolbar-btn" @click="handleMenu('edit')">编辑</button>
      <button class="toolbar-btn" @click="handleMenu('view')">查看</button>
      <button class="toolbar-btn" @click="handleMenu('run')">运行</button>
    </div>
    
    <div class="toolbar-section">
      <!-- 搜索框 -->
      <div class="search-container">
        <input 
          type="text" 
          class="search-input" 
          placeholder="搜索文件或符号 (Ctrl+P)" 
          v-model="searchQuery"
          @focus="showSearchPanel = true"
          @blur="showSearchPanel = false"
          @keydown.esc="searchQuery = ''; showSearchPanel = false"
        />
        <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
      </div>
    </div>
    
    <div class="toolbar-section">
      <!-- 右侧工具按钮 -->
      <button class="icon-btn" @click="themeStore.toggleDarkMode" :title="themeStore.isDarkMode ? '切换到浅色模式' : '切换到深色模式'">
        <svg v-if="themeStore.isDarkMode" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
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
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </button>
      
      <button class="icon-btn" @click="toggleSettings" title="设置">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
      
      <button class="icon-btn" @click="toggleUserProfile" title="用户设置">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useThemeStore } from '../../stores/themeStore';

// 状态
const searchQuery = ref('');
const showSearchPanel = ref(false);

// 主题状态
const themeStore = useThemeStore();

// 方法
const toggleMenu = () => {
  // 实现显示/隐藏菜单逻辑
  console.log('Toggle menu');
};

const handleMenu = (menu: string) => {
  // 处理菜单点击
  console.log('Menu clicked:', menu);
};

const toggleSettings = () => {
  // 显示设置面板
  console.log('Toggle settings');
};

const toggleUserProfile = () => {
  // 显示用户简介
  console.log('Toggle user profile');
};
</script>

<style scoped>
.app-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  background-color: var(--bg-color);
  border-bottom: 1px solid var(--border-color);
  padding: 0 8px;
  user-select: none;
}

.toolbar-section {
  display: flex;
  align-items: center;
}

.app-title {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color-primary);
  margin: 0 16px 0 8px;
}

.toolbar-btn {
  border: none;
  background: none;
  padding: 0 12px;
  height: 100%;
  font-size: 13px;
  color: var(--text-color-regular);
  cursor: pointer;
  outline: none;
}

.toolbar-btn:hover {
  color: var(--text-color-primary);
  background-color: var(--bg-color-page);
}

.search-container {
  position: relative;
  width: 250px;
}

.search-input {
  width: 100%;
  height: 28px;
  padding: 0 32px 0 10px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-color-page);
  color: var(--text-color-primary);
  font-size: 13px;
  outline: none;
}

.search-input:focus {
  border-color: var(--primary-color);
}

.search-icon {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-color-secondary);
  pointer-events: none;
}
</style> 