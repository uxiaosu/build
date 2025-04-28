<template>
  <div class="editor-content" ref="editorContainer">
    <!-- Monaco编辑器将在这里挂载 -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, defineProps, defineEmits } from 'vue';
import * as monaco from 'monaco-editor';

// 定义属性
const props = defineProps<{
  value: string;
  language?: string;
  readOnly?: boolean;
  path?: string;
}>();

// 定义事件
const emit = defineEmits<{
  (e: 'update:value', value: string): void;
  (e: 'save'): void;
}>();

// 编辑器容器引用
const editorContainer = ref<HTMLElement | null>(null);
// 编辑器实例
let editor: monaco.editor.IStandaloneCodeEditor | null = null;

// 创建编辑器
onMounted(() => {
  if (editorContainer.value) {
    // 设置编辑器主题
    monaco.editor.defineTheme('ideTheme', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editor.lineHighlightBackground': '#2a2a2a',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
      }
    });

    // 创建编辑器实例
    editor = monaco.editor.create(editorContainer.value, {
      value: props.value,
      language: props.language || 'javascript',
      theme: 'ideTheme',
      automaticLayout: true,
      minimap: {
        enabled: true,
      },
      scrollBeyondLastLine: false,
      readOnly: props.readOnly || false,
      fontSize: 13,
      lineHeight: 21,
      lineNumbers: 'on',
      renderLineHighlight: 'all',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      roundedSelection: true,
      selectOnLineNumbers: true,
      wordWrap: 'on',
      folding: true,
      showFoldingControls: 'mouseover',
      bracketPairColorization: {
        enabled: true,
      },
    });

    // 监听编辑器内容变化
    editor.onDidChangeModelContent(() => {
      if (editor) {
        const value = editor.getValue();
        emit('update:value', value);
      }
    });

    // 添加保存快捷键
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      emit('save');
    });
  }
});

// 监听属性变化
watch(() => props.value, (newValue) => {
  if (editor && editor.getValue() !== newValue) {
    editor.setValue(newValue);
  }
});

watch(() => props.language, (newLanguage) => {
  if (editor && newLanguage) {
    monaco.editor.setModelLanguage(editor.getModel()!, newLanguage);
  }
});

watch(() => props.readOnly, (newReadOnly) => {
  if (editor) {
    editor.updateOptions({ readOnly: newReadOnly });
  }
});

// 组件销毁前清理资源
onBeforeUnmount(() => {
  if (editor) {
    editor.dispose();
    editor = null;
  }
});

// 暴露编辑器实例给父组件
defineExpose({
  getEditor: () => editor,
});
</script>

<style scoped>
.editor-content {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style> 