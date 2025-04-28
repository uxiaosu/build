#!/bin/bash

# 设置环境变量使用国内镜像
export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static
export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup

# 下载并运行 rustup-init
curl --proto '=https' --tlsv1.2 -sSf https://mirrors.ustc.edu.cn/rust-static/rustup/rustup-init.sh | sh

# 设置环境变量持久化
echo "# Rust 镜像源设置" >> ~/.bashrc
echo "export RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static" >> ~/.bashrc
echo "export RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup" >> ~/.bashrc

# Windows下可能需要设置环境变量
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
  echo "请手动设置Windows环境变量:"
  echo "RUSTUP_DIST_SERVER=https://mirrors.ustc.edu.cn/rust-static"
  echo "RUSTUP_UPDATE_ROOT=https://mirrors.ustc.edu.cn/rust-static/rustup"
fi

echo "Rust 环境配置完成，请重新打开终端或运行 'source ~/.bashrc' 使环境变量生效" 