<template>
  <div class="status-bar">
    <div class="status-left">
      <!-- 左侧状态信息 -->
      <div class="status-item" @click="toggleTerminal">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="4 17 10 11 4 5"></polyline>
          <line x1="12" y1="19" x2="20" y2="19"></line>
        </svg>
        <span>终端</span>
      </div>
      
      <div class="status-item" @click="toggleProblems">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ problemsCount > 0 ? `${problemsCount} 问题` : '无问题' }}</span>
      </div>
      
      <!-- 左侧插槽 -->
      <slot name="left"></slot>
    </div>
    
    <div class="status-right">
      <!-- 右侧状态信息 -->
      <div class="status-item" v-if="currentFile">
        <span>{{ currentLanguage }}</span>
      </div>
      
      <div class="status-item" v-if="currentFile">
        <span>{{ cursorPosition }}</span>
      </div>
      
      <div class="status-item">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="18" cy="18" r="3"></circle>
          <circle cx="6" cy="6" r="3"></circle>
          <path d="M6 21V9a9 9 0 0 0 9 9"></path>
        </svg>
        <span>主分支</span>
      </div>
      
      <div class="status-item" @click="toggleNotifications">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <span v-if="notificationsCount > 0">{{ notificationsCount }}</span>
      </div>
      
      <!-- 右侧插槽 -->
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useFileStore } from '../../stores/fileStore';

// 状态
const problemsCount = ref(0);
const notificationsCount = ref(0);
const cursorPosition = ref('第 1 行，第 1 列');

// 文件存储
const fileStore = useFileStore();

// 计算属性
const currentFile = computed(() => fileStore.currentFile);

const currentLanguage = computed(() => {
  if (!currentFile.value) return '';
  
  const ext = currentFile.value.path.split('.').pop()?.toLowerCase();
  
  // 根据文件扩展名返回语言显示名称
  const langDisplayMap: Record<string, string> = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'html': 'HTML',
    'css': 'CSS',
    'json': 'JSON',
    'md': 'Markdown',
    'vue': 'Vue',
    'jsx': 'JSX',
    'tsx': 'TSX',
    'py': 'Python',
    'java': 'Java',
    'c': 'C',
    'cpp': 'C++',
    'cs': 'C#',
    'go': 'Go',
    'rs': 'Rust',
    'php': 'PHP',
    'rb': 'Ruby',
    'sh': 'Shell',
  };
  
  return ext ? (langDisplayMap[ext] || ext.toUpperCase()) : '';
});

// 方法
const toggleTerminal = () => {
  // 这里应该触发终端的显示/隐藏
  console.log('Toggle terminal');
};

const toggleProblems = () => {
  // 这里应该触发问题面板的显示/隐藏
  console.log('Toggle problems panel');
};

const toggleNotifications = () => {
  // 这里应该触发通知面板的显示/隐藏
  console.log('Toggle notifications');
};

// 更新光标位置（通常由编辑器调用）
const updateCursorPosition = (line: number, column: number) => {
  cursorPosition.value = `第 ${line} 行，第 ${column} 列`;
};

// 导出方法供其他组件调用
defineExpose({
  updateCursorPosition
});
</script>

<style scoped>
.status-bar {
  height: 24px;
  display: flex;
  justify-content: space-between;
  background-color: var(--bg-color);
  border-top: 1px solid var(--border-color);
  font-size: 12px;
  color: var(--text-color-secondary);
  user-select: none;
}

.status-left, .status-right {
  display: flex;
  align-items: center;
}

.status-item {
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 100%;
  cursor: pointer;
  border-right: 1px solid var(--border-color);
}

.status-right .status-item {
  border-right: none;
  border-left: 1px solid var(--border-color);
}

.status-item:hover {
  background-color: var(--bg-color-hover);
}

.status-item svg {
  margin-right: 4px;
}
</style> 