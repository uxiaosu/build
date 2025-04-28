import { defineStore } from 'pinia';

export type ThemeType = 'light' | 'dark' | 'custom';

interface ThemeState {
  currentTheme: ThemeType;
  customTheme: Record<string, string>; // 自定义主题变量
  systemPrefersDark: boolean;
}

export const useThemeStore = defineStore('theme', {
  state: (): ThemeState => ({
    currentTheme: 'light',
    customTheme: {},
    systemPrefersDark: false
  }),
  
  getters: {
    isDarkMode(): boolean {
      return this.currentTheme === 'dark';
    }
  },
  
  actions: {
    // 切换主题
    setTheme(theme: ThemeType) {
      this.currentTheme = theme;
      
      // 移除现有主题类
      document.documentElement.classList.remove('light', 'dark', 'custom');
      
      // 添加新主题类
      document.documentElement.classList.add(theme);
      
      // 如果是自定义主题，应用自定义变量
      if (theme === 'custom') {
        this.applyCustomTheme();
      }
      
      // 保存用户偏好
      localStorage.setItem('ide-theme', theme);
    },
    
    // 初始化主题
    initTheme() {
      // 检测系统偏好
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.systemPrefersDark = prefersDark;
      
      // 读取用户保存的主题
      const savedTheme = localStorage.getItem('ide-theme') as ThemeType;
      
      // 应用主题
      if (savedTheme) {
        this.setTheme(savedTheme);
      } else {
        // 默认跟随系统
        this.setTheme(prefersDark ? 'dark' : 'light');
      }
      
      // 监听系统主题变化
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        this.systemPrefersDark = e.matches;
        // 如果用户未明确设置主题，则跟随系统
        if (!localStorage.getItem('ide-theme')) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    },
    
    // 切换为深色/浅色模式
    toggleDarkMode() {
      this.setTheme(this.currentTheme === 'dark' ? 'light' : 'dark');
    },
    
    // 更新自定义主题变量
    updateCustomTheme(variables: Record<string, string>) {
      this.customTheme = { ...this.customTheme, ...variables };
      
      if (this.currentTheme === 'custom') {
        this.applyCustomTheme();
      }
    },
    
    // 应用自定义主题变量到CSS
    applyCustomTheme() {
      Object.entries(this.customTheme).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
      });
    }
  }
}); 