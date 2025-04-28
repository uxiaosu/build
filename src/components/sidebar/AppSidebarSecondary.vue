<template>
  <div class="sidebar-secondary">
    <div class="sidebar-header">
      <h3>资源管理器</h3>
    </div>
    <div class="sidebar-content">
      <!-- 资源面板内容 -->
      <div class="section">
        <div class="section-header">
          <span class="section-title">打开的编辑器</span>
          <button class="icon-btn small">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
        </div>
        <div class="section-content">
          <div class="file-item">
            <span class="file-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span class="file-name">App.vue</span>
          </div>
          <div class="file-item">
            <span class="file-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span class="file-name">EditorTabs.vue</span>
          </div>
        </div>
      </div>
      
      <div class="section">
        <div class="section-header">
          <span class="section-title">项目</span>
          <button class="icon-btn small">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>
        <div class="section-content">
          <div class="folder-item">
            <span class="folder-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </span>
            <span class="folder-name">src</span>
          </div>
          <div class="folder-item sub-folder">
            <span class="folder-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path>
              </svg>
            </span>
            <span class="folder-name">components</span>
          </div>
          <div class="file-item sub-file">
            <span class="file-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </span>
            <span class="file-name">App.vue</span>
          </div>
          <div class="file-item sub-file">
            <span class="file-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
            </span>
            <span class="file-name">main.ts</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 辅助侧边栏组件逻辑
</script>

<style scoped>
.sidebar-secondary {
  width: 100%;
  height: 100%;
  background-color: var(--bg-color);
  border-left: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
}

.sidebar-header {
  padding: 8px 16px;
  border-bottom: 1px solid var(--border-color);
}

.sidebar-header h3 {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: var(--text-color-primary);
}

.sidebar-content {
  flex: 1;
  overflow: auto;
  padding: 8px 0;
}

.section {
  margin-bottom: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 4px;
}

.section-title {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--text-color-secondary);
  letter-spacing: 0.5px;
}

.section-content {
  padding: 4px 0;
}

.file-item, .folder-item {
  display: flex;
  align-items: center;
  padding: 4px 16px;
  cursor: pointer;
  font-size: 13px;
  color: var(--text-color-primary);
}

.file-item:hover, .folder-item:hover {
  background-color: var(--bg-color-hover);
}

.file-icon, .folder-icon {
  margin-right: 6px;
  display: flex;
  align-items: center;
}

.folder-icon {
  color: var(--text-color-secondary);
}

.sub-folder {
  padding-left: 32px;
}

.sub-file {
  padding-left: 48px;
}

.icon-btn.small {
  width: 20px;
  height: 20px;
  padding: 0;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-btn.small:hover {
  color: var(--text-color-primary);
}
</style> 