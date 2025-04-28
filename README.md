# IDE 应用开发项目

基于 Tauri + Vue 的现代化集成开发环境(IDE)应用。

## 国内镜像配置

本项目已配置使用国内镜像源加速依赖下载。

### 前端依赖 (Node.js)

已通过以下文件配置 NPM 和 Yarn 使用国内镜像：

- `.npmrc` - NPM 配置
- `.yarnrc.yml` - Yarn 配置 (Yarn 2+)

### 后端依赖 (Rust/Tauri)

已通过以下文件配置 Rust 使用国内镜像：

- `.cargo/config.toml` - Cargo 配置

### 首次配置 Rust 环境

在 Windows 上：

```powershell
# 以管理员身份运行 PowerShell
.\rust-mirror.ps1
```

在 macOS/Linux 上：

```bash
chmod +x ./rustup-init.sh
./rustup-init.sh
```

## 项目设置

### 安装依赖

```bash
# 使用 npm
npm install

# 或使用 yarn
yarn
```

### 开发模式

```bash
# 启动前端开发服务器
npm run dev
# 或
yarn dev

# 启动 Tauri 开发模式（包含前端和后端）
npm run tauri dev
# 或
yarn tauri dev
```

### 构建项目

```bash
npm run tauri build
# 或
yarn tauri build
```

## 主要特性

- 代码编辑 (Monaco Editor)
- 文件管理系统
- 集成终端
- 错误报告系统
- 主题定制
- 版本控制集成

## 开发路线图

- [x] 基础UI框架
- [x] 编辑器标签系统
- [x] 代码编辑功能
- [ ] 文件浏览器集成
- [ ] 完整终端支持
- [ ] Git版本控制集成
- [ ] 插件系统
