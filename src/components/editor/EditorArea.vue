<template>
  <div class="editor-area">
    <div v-if="currentFile" class="editor-wrapper">
      <EditorContent
        v-model:value="fileContent"
        :language="currentLanguage"
        :path="currentFile.path"
        @save="saveFile"
      />
    </div>
    <div v-else class="editor-placeholder">
      <div class="placeholder-content">
        <div class="placeholder-logo">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="16 18 22 12 16 6"></polyline>
            <polyline points="8 6 2 12 8 18"></polyline>
          </svg>
        </div>
        <h2>欢迎使用代码编辑器</h2>
        <p>打开文件或开始一个新项目</p>
        <div class="action-buttons">
          <button class="btn btn-primary" @click="openFile">打开文件</button>
          <button class="btn" @click="createNewFile">新建文件</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import EditorContent from './EditorContent.vue';
import { useFileStore } from '../../stores/fileStore';

// 状态
const fileStore = useFileStore();
const fileContent = ref('');

// 计算属性
const currentFile = computed(() => fileStore.currentFile);

const currentLanguage = computed(() => {
  if (!currentFile.value) return 'javascript';
  
  const ext = currentFile.value.path.split('.').pop()?.toLowerCase();
  
  // 根据文件扩展名确定语言
  const langMap: Record<string, string> = {
    'js': 'javascript',
    'ts': 'typescript',
    'html': 'html',
    'css': 'css',
    'json': 'json',
    'md': 'markdown',
    'vue': 'html',
    'jsx': 'javascript',
    'tsx': 'typescript',
    'py': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
    'go': 'go',
    'rs': 'rust',
    'php': 'php',
    'rb': 'ruby',
    'sh': 'shell',
  };
  
  return ext ? (langMap[ext] || 'plaintext') : 'plaintext';
});

// 监听当前文件变化
watch(() => currentFile.value, async () => {
  if (currentFile.value) {
    try {
      // 从文件存储加载文件内容
      fileContent.value = await fileStore.loadFileContent(currentFile.value.path);
    } catch (error) {
      console.error('加载文件失败:', error);
      fileContent.value = '';
    }
  } else {
    fileContent.value = '';
  }
}, { immediate: true });

// 监听文件内容变化
watch(fileContent, (newContent) => {
  if (currentFile.value && newContent !== fileStore.getOriginalContent(currentFile.value.path)) {
    fileStore.markFileAsModified(currentFile.value.path);
  }
});

// 方法
const saveFile = async () => {
  if (currentFile.value) {
    try {
      await fileStore.saveFile(currentFile.value.path, fileContent.value);
      console.log('文件已保存:', currentFile.value.path);
    } catch (error) {
      console.error('保存文件失败:', error);
    }
  }
};

const openFile = () => {
  fileStore.openFilePicker();
};

const createNewFile = () => {
  fileStore.createNewFile();
};
</script>

<style scoped>
.editor-area {
  height: 100%;
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: var(--editor-bg);
}

.editor-wrapper {
  height: 100%;
  width: 100%;
}

.editor-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--text-color-secondary);
}

.placeholder-content {
  text-align: center;
  max-width: 500px;
  padding: 32px;
}

.placeholder-logo {
  margin-bottom: 24px;
  color: var(--primary-color);
}

.placeholder-content h2 {
  font-size: 24px;
  margin-bottom: 12px;
  color: var(--text-color-primary);
  font-weight: 500;
}

.placeholder-content p {
  font-size: 16px;
  margin-bottom: 32px;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
}
</style> 