<template>
  <div class="window-event-logger" :class="{ 'is-open': visible }">
    <div class="logger-header">
      <h3>窗口事件日志</h3>
      <div class="logger-controls">
        <button class="control-btn" @click="clearLogs" title="清除日志">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 6h18"></path>
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
          </svg>
        </button>
        <button class="control-btn" @click="$emit('update:visible', false)" title="关闭">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="log-container">
      <div v-if="logs.length === 0" class="empty-logs">
        暂无窗口事件日志
      </div>
      <div v-else class="log-list">
        <div v-for="(log, index) in logs" :key="index" class="log-item" :class="log.level">
          <span class="log-time">{{ log.timestamp }}</span>
          <span class="log-level">[{{ log.level.toUpperCase() }}]</span>
          <span class="log-message">{{ log.message }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义组件属性
interface Props {
  visible: boolean;
  logs: Array<{level: string; message: string; timestamp: string}>;
}

// 使用withDefaults为属性提供默认值
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  logs: () => []
});

// 定义事件
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
  (e: 'clear'): void;
}>();

// 清除日志
const clearLogs = () => {
  // 通知父组件清除日志
  emit('clear');
};
</script>

<style scoped>
.window-event-logger {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40%;
  height: 300px;
  background-color: var(--bg-color-light);
  border-left: 1px solid var(--divider-color);
  border-top: 1px solid var(--divider-color);
  display: flex;
  flex-direction: column;
  box-shadow: -2px -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.window-event-logger.is-open {
  transform: translateY(0);
}

.logger-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  border-bottom: 1px solid var(--divider-color);
  background-color: var(--bg-color);
}

.logger-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.logger-controls {
  display: flex;
  gap: 8px;
}

.control-btn {
  background: transparent;
  border: none;
  color: var(--text-color-secondary);
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background-color: var(--bg-color-hover);
  color: var(--text-color-primary);
}

.log-container {
  flex: 1;
  overflow-y: auto;
  padding: 8px;
  font-family: monospace;
  font-size: 12px;
}

.empty-logs {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--text-color-disabled);
  font-style: italic;
}

.log-list {
  display: flex;
  flex-direction: column;
}

.log-item {
  padding: 4px 8px;
  border-radius: 2px;
  margin-bottom: 2px;
  display: flex;
  align-items: flex-start;
}

.log-item.error {
  background-color: rgba(255, 0, 0, 0.1);
  color: #e54d4d;
}

.log-item.warn {
  background-color: rgba(255, 204, 0, 0.1);
  color: #e5a43d;
}

.log-item.info {
  background-color: rgba(0, 153, 255, 0.1);
  color: #3d9ee5;
}

.log-item.debug {
  color: var(--text-color-secondary);
}

.log-time {
  flex-shrink: 0;
  margin-right: 8px;
  color: var(--text-color-secondary);
  font-size: 10px;
  width: 80px;
}

.log-level {
  flex-shrink: 0;
  width: 60px;
  font-weight: bold;
  margin-right: 8px;
}

.log-message {
  word-break: break-word;
}
</style> 