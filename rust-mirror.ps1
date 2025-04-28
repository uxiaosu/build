# 为Rust设置国内镜像源的PowerShell脚本

# 创建.cargo目录（如果不存在）
$cargoDir = "$env:USERPROFILE\.cargo"
if (-not (Test-Path $cargoDir)) {
    New-Item -ItemType Directory -Path $cargoDir -Force | Out-Null
    Write-Host "创建目录: $cargoDir"
}

# 配置Cargo镜像
$configPath = "$cargoDir\config.toml"
$configContent = @"
[source.crates-io]
registry = "https://github.com/rust-lang/crates.io-index"
replace-with = 'ustc'

[source.ustc]
registry = "git://mirrors.ustc.edu.cn/crates.io-index"

[source.tuna]
registry = "https://mirrors.tuna.tsinghua.edu.cn/git/crates.io-index.git"

[source.rsproxy]
registry = "https://rsproxy.cn/crates.io-index"

[net]
git-fetch-with-cli = true
"@

Set-Content -Path $configPath -Value $configContent
Write-Host "Cargo配置已写入: $configPath"

# 设置环境变量
[System.Environment]::SetEnvironmentVariable("RUSTUP_DIST_SERVER", "https://mirrors.ustc.edu.cn/rust-static", [System.EnvironmentVariableTarget]::User)
[System.Environment]::SetEnvironmentVariable("RUSTUP_UPDATE_ROOT", "https://mirrors.ustc.edu.cn/rust-static/rustup", [System.EnvironmentVariableTarget]::User)

Write-Host "已设置Rust环境变量:"
Write-Host "RUSTUP_DIST_SERVER = https://mirrors.ustc.edu.cn/rust-static"
Write-Host "RUSTUP_UPDATE_ROOT = https://mirrors.ustc.edu.cn/rust-static/rustup"

Write-Host "`n环境变量已设置为用户级别。如需应用到当前会话，请执行:"
Write-Host '$env:RUSTUP_DIST_SERVER = "https://mirrors.ustc.edu.cn/rust-static"'
Write-Host '$env:RUSTUP_UPDATE_ROOT = "https://mirrors.ustc.edu.cn/rust-static/rustup"'

Write-Host "`n配置完成！" 