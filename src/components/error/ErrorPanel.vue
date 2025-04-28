<template>
  <div v-if="visible" class="error-panel">
    <div class="panel-header">
      <div class="panel-tabs">
        <button 
          class="panel-tab" 
          :class="{ 'active': activeTab === 'problems' }"
          @click="activeTab = 'problems'"
        >
          问题
          <span v-if="problems.length > 0" class="badge error">{{ problems.length }}</span>
        </button>
        <button 
          class="panel-tab" 
          :class="{ 'active': activeTab === 'output' }"
          @click="activeTab = 'output'"
        >
          输出
        </button>
        <button 
          class="panel-tab" 
          :class="{ 'active': activeTab === 'debug' }"
          @click="activeTab = 'debug'"
        >
          调试控制台
        </button>
      </div>
      <div class="panel-actions">
        <button class="icon-btn small" title="清除所有" @click="clearAll">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
        </button>
        <button class="icon-btn small" title="关闭" @click="$emit('update:visible', false)">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="panel-content">
      <!-- 问题面板 -->
      <div v-if="activeTab === 'problems'" class="problems-container">
        <div class="filter-bar">
          <input 
            type="text" 
            class="filter-input" 
            placeholder="按文本筛选 (例如：error, src/)" 
            v-model="filterText"
          />
          <div class="filter-actions">
            <button 
              class="filter-btn" 
              :class="{ 'active': filterType === 'all' }"
              @click="filterType = 'all'"
            >
              全部
            </button>
            <button 
              class="filter-btn" 
              :class="{ 'active': filterType === 'errors' }"
              @click="filterType = 'errors'"
            >
              错误
            </button>
            <button 
              class="filter-btn" 
              :class="{ 'active': filterType === 'warnings' }"
              @click="filterType = 'warnings'"
            >
              警告
            </button>
          </div>
        </div>
        
        <div class="problems-list">
          <div 
            v-for="(problem, index) in filteredProblems" 
            :key="index"
            class="problem-item"
            @click="goToProblem(problem)"
          >
            <div class="problem-icon" :class="problem.severity">
              <svg v-if="problem.severity === 'error'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              <svg v-else-if="problem.severity === 'warning'" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
            </div>
            <div class="problem-info">
              <div class="problem-message">{{ problem.message }}</div>
              <div class="problem-location">{{ problem.file }}:{{ problem.line }}:{{ problem.column }}</div>
            </div>
          </div>
          
          <div v-if="filteredProblems.length === 0" class="empty-state">
            <span v-if="problems.length === 0">暂无问题</span>
            <span v-else>没有匹配的问题</span>
          </div>
        </div>
      </div>
      
      <!-- 输出面板 -->
      <div v-else-if="activeTab === 'output'" class="output-container">
        <div class="output-content">
          <div v-for="(line, index) in output" :key="index" class="output-line">
            {{ line }}
          </div>
          
          <div v-if="output.length === 0" class="empty-state">
            暂无输出
          </div>
        </div>
      </div>
      
      <!-- 调试控制台 -->
      <div v-else-if="activeTab === 'debug'" class="debug-container">
        <div class="debug-content">
          <div class="empty-state">
            调试会话未开始
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, defineProps, defineEmits } from 'vue';

// 定义问题类型
interface Problem {
  id: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  file: string;
  line: number;
  column: number;
  source?: string;
  code?: string;
}

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'goto', file: string, line: number, column: number): void;
}>();

// 面板状态
const activeTab = ref('problems');
const filterText = ref('');
const filterType = ref('all');

// 数据
const problems = ref<Problem[]>([
  {
    id: '1',
    message: '未使用的变量 "result"',
    severity: 'warning',
    file: 'src/utils/helper.ts',
    line: 42,
    column: 10,
    source: 'eslint',
    code: 'no-unused-vars'
  },
  {
    id: '2',
    message: '缺少分号',
    severity: 'info',
    file: 'src/components/App.vue',
    line: 156,
    column: 23,
    source: 'eslint',
    code: 'semi'
  },
  {
    id: '3',
    message: 'Cannot find module "non-existent-module"',
    severity: 'error',
    file: 'src/services/api.ts',
    line: 12,
    column: 8,
    source: 'typescript',
    code: 'TS2307'
  }
]);

const output = ref<string[]>([
  '[11:45:23] Starting development server...',
  '[11:45:25] Compiled successfully!'
]);

// 计算过滤后的问题列表
const filteredProblems = computed(() => {
  return problems.value.filter(problem => {
    // 按类型过滤
    if (filterType.value !== 'all') {
      if (filterType.value === 'errors' && problem.severity !== 'error') return false;
      if (filterType.value === 'warnings' && problem.severity !== 'warning') return false;
    }
    
    // 按文本过滤
    if (filterText.value) {
      const text = filterText.value.toLowerCase();
      return (
        problem.message.toLowerCase().includes(text) ||
        problem.file.toLowerCase().includes(text) ||
        (problem.source && problem.source.toLowerCase().includes(text)) ||
        (problem.code && problem.code.toLowerCase().includes(text))
      );
    }
    
    return true;
  });
});

// 方法
const clearAll = () => {
  if (activeTab.value === 'problems') {
    problems.value = [];
  } else if (activeTab.value === 'output') {
    output.value = [];
  }
};

const goToProblem = (problem: Problem) => {
  emit('goto', problem.file, problem.line, problem.column);
};

// 公开方法，供外部调用
defineExpose({
  // 添加新问题
  addProblem(problem: Problem) {
    problems.value.push(problem);
  },
  
  // 清除所有问题
  clearProblems() {
    problems.value = [];
  },
  
  // 添加输出
  addOutput(text: string) {
    output.value.push(text);
  }
});
</script>

<style scoped>
.error-panel {
  position: absolute;
  bottom: 24px; /* 状态栏高度 */
  left: 0;
  right: 0;
  height: 200px;
  background-color: var(--error-panel-bg);
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 90;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 36px;
  border-bottom: 1px solid var(--border-color);
  padding: 0 8px;
}

.panel-tabs {
  display: flex;
  height: 100%;
}

.panel-tab {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0 16px;
  font-size: 12px;
  background: none;
  border: none;
  color: var(--text-color-secondary);
  position: relative;
  cursor: pointer;
}

.panel-tab.active {
  color: var(--text-color-primary);
}

.panel-tab.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--primary-color);
}

.panel-actions {
  display: flex;
}

.panel-content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

.problems-container,
.output-container,
.debug-container {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.filter-bar {
  display: flex;
  align-items: center;
  padding: 8px;
  border-bottom: 1px solid var(--border-color-lighter);
}

.filter-input {
  flex: 1;
  height: 24px;
  padding: 0 8px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-color);
  color: var(--text-color-primary);
  font-size: 12px;
}

.filter-actions {
  display: flex;
  margin-left: 8px;
}

.filter-btn {
  padding: 4px 8px;
  font-size: 11px;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--text-color-secondary);
  cursor: pointer;
}

.filter-btn.active {
  background-color: var(--primary-light);
  color: var(--primary-color);
}

.problems-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
}

.problem-item {
  display: flex;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 2px;
}

.problem-item:hover {
  background-color: var(--error-item-hover);
}

.problem-icon {
  display: flex;
  margin-right: 8px;
}

.problem-icon.error {
  color: var(--error-color);
}

.problem-icon.warning {
  color: var(--warning-color);
}

.problem-icon.info {
  color: var(--info-color);
}

.problem-info {
  flex: 1;
  min-width: 0;
}

.problem-message {
  font-size: 12px;
  color: var(--text-color-primary);
  margin-bottom: 2px;
  word-break: break-word;
}

.problem-location {
  font-size: 11px;
  color: var(--text-color-secondary);
}

.output-content {
  padding: 8px;
  overflow-y: auto;
  height: 100%;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.5;
  white-space: pre-wrap;
}

.output-line {
  margin-bottom: 2px;
}

.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--text-color-secondary);
  font-style: italic;
  font-size: 13px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
  height: 16px;
  padding: 0 4px;
  border-radius: 8px;
  font-size: 10px;
  font-weight: bold;
  color: white;
  margin-left: 6px;
}

.badge.error {
  background-color: var(--error-badge-bg);
}

.badge.warning {
  background-color: var(--warning-badge-bg);
}

.badge.info {
  background-color: var(--info-badge-bg);
}
</style> 