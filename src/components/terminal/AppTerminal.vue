<template>
  <div v-if="visible" class="terminal-container">
    <div class="terminal-header">
      <span class="terminal-title">终端</span>
      <div class="terminal-actions">
        <button class="icon-btn small" @click="clearTerminal" title="清除">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="9" y1="9" x2="15" y2="15"></line>
            <line x1="15" y1="9" x2="9" y2="15"></line>
          </svg>
        </button>
        <button class="icon-btn small" @click="$emit('update:visible', false)" title="关闭">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
    <div class="terminal-content" ref="terminalContent">
      <div v-for="(line, index) in terminalOutput" :key="index" class="terminal-line">
        <span v-html="formatOutput(line)"></span>
      </div>
      <div class="terminal-input-line">
        <span class="terminal-prompt">$ </span>
        <input 
          ref="terminalInput"
          type="text" 
          class="terminal-input" 
          v-model="currentCommand"
          @keydown.enter="executeCommand"
          @keydown.up="navigateHistory(-1)"
          @keydown.down="navigateHistory(1)"
          spellcheck="false"
          autocomplete="off"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick, defineProps, defineEmits } from 'vue';

const props = defineProps<{
  visible: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void;
}>();

// 终端状态
const terminalContent = ref<HTMLElement | null>(null);
const terminalInput = ref<HTMLInputElement | null>(null);
const currentCommand = ref('');
const terminalOutput = ref<string[]>([
  'Welcome to IDE Terminal v1.0.0',
  'Type "help" to see available commands',
  ''
]);
const commandHistory = ref<string[]>([]);
const historyIndex = ref(-1);

// 当终端显示状态变化时聚焦输入框
watch(() => props.visible, (newVisible) => {
  if (newVisible) {
    nextTick(() => {
      terminalInput.value?.focus();
    });
  }
});

// 监视输出变化，自动滚动到底部
watch(terminalOutput, () => {
  nextTick(() => {
    if (terminalContent.value) {
      terminalContent.value.scrollTop = terminalContent.value.scrollHeight;
    }
  });
});

// 挂载后初始化
onMounted(() => {
  if (props.visible && terminalInput.value) {
    terminalInput.value.focus();
  }
});

// 执行命令
const executeCommand = () => {
  const command = currentCommand.value.trim();
  if (command) {
    // 添加命令到输出
    terminalOutput.value.push(`$ ${command}`);
    
    // 添加到历史记录
    commandHistory.value.push(command);
    historyIndex.value = -1;
    
    // 处理命令
    processCommand(command);
    
    // 清空当前命令
    currentCommand.value = '';
  }
};

// 处理命令
const processCommand = (command: string) => {
  const parts = command.split(' ');
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);
  
  switch (cmd) {
    case 'help':
      showHelp();
      break;
    case 'clear':
      clearTerminal();
      break;
    case 'echo':
      terminalOutput.value.push(args.join(' '));
      break;
    case 'ls':
      listFiles();
      break;
    case 'cd':
      changeDirectory(args[0]);
      break;
    case 'pwd':
      printWorkingDirectory();
      break;
    case 'date':
      showDate();
      break;
    case 'exit':
      emit('update:visible', false);
      break;
    default:
      terminalOutput.value.push(`命令未找到: ${cmd}. 输入 'help' 查看可用命令。`);
  }
  
  // 添加空行，增加可读性
  terminalOutput.value.push('');
};

// 命令实现
const showHelp = () => {
  terminalOutput.value.push(
    '可用命令:',
    '  help      - 显示此帮助信息',
    '  clear     - 清除终端',
    '  echo [文本] - 输出文本',
    '  ls        - 列出文件',
    '  cd [目录]  - 切换目录',
    '  pwd       - 显示当前工作目录',
    '  date      - 显示当前日期和时间',
    '  exit      - 关闭终端'
  );
};

const clearTerminal = () => {
  terminalOutput.value = [];
};

const listFiles = () => {
  // 模拟文件列表
  terminalOutput.value.push(
    'src/',
    'package.json',
    'README.md',
    'node_modules/',
    'public/'
  );
};

const changeDirectory = (dir: string) => {
  if (!dir) {
    terminalOutput.value.push('未指定目录');
    return;
  }
  
  // 模拟目录切换
  terminalOutput.value.push(`切换到目录: ${dir}`);
};

const printWorkingDirectory = () => {
  // 模拟当前工作目录
  terminalOutput.value.push('/project/workspace');
};

const showDate = () => {
  const now = new Date();
  terminalOutput.value.push(now.toString());
};

// 历史命令导航
const navigateHistory = (direction: number) => {
  if (commandHistory.value.length === 0) return;
  
  if (direction < 0) {
    // 向上导航到较旧的命令
    if (historyIndex.value < commandHistory.value.length - 1) {
      historyIndex.value++;
    }
  } else {
    // 向下导航到较新的命令
    if (historyIndex.value > -1) {
      historyIndex.value--;
    }
  }
  
  if (historyIndex.value >= 0) {
    currentCommand.value = commandHistory.value[commandHistory.value.length - 1 - historyIndex.value];
  } else {
    currentCommand.value = '';
  }
};

// 格式化输出，支持ANSI颜色代码等
const formatOutput = (line: string): string => {
  // 实现简单的格式化，如高亮关键字等
  // 这里只做了一个简单示例，实际中可能需要更复杂的处理
  return line
    .replace(/error/gi, '<span style="color: #f56c6c;">error</span>')
    .replace(/warning/gi, '<span style="color: #e6a23c;">warning</span>')
    .replace(/success/gi, '<span style="color: #67c23a;">success</span>');
};
</script>

<style scoped>
.terminal-container {
  position: absolute;
  bottom: 24px; /* 状态栏高度 */
  left: 0;
  right: 0;
  height: 300px;
  background-color: #1e1e1e;
  border-top: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  z-index: 100;
}

.terminal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 8px;
  background-color: #252525;
  border-bottom: 1px solid var(--border-color);
}

.terminal-title {
  font-size: 12px;
  font-weight: 500;
  color: #e0e0e0;
}

.terminal-actions {
  display: flex;
}

.terminal-content {
  flex: 1;
  padding: 8px;
  overflow-y: auto;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.5;
  color: #e0e0e0;
  white-space: pre-wrap;
}

.terminal-input-line {
  display: flex;
  align-items: center;
}

.terminal-prompt {
  color: #4fd6be;
  padding-right: 8px;
  user-select: none;
}

.terminal-input {
  flex: 1;
  background: transparent;
  border: none;
  color: #e0e0e0;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  outline: none;
  padding: 0;
}

.terminal-line {
  margin-bottom: 4px;
}

.icon-btn.small {
  width: 24px;
  height: 24px;
  color: #e0e0e0;
}

.icon-btn.small:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style> 