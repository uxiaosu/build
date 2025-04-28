// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
use tauri::Window;
use serde::{Serialize, Deserialize};
use std::fmt;

/// 窗口操作错误类型
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum WindowError {
    /// 找不到指定窗口
    WindowNotFound { window_label: String },
    /// 窗口最小化失败
    MinimizeFailed { reason: String },
    /// 窗口最大化失败
    MaximizeFailed { reason: String },
    /// 窗口取消最大化失败
    UnmaximizeFailed { reason: String },
    /// 获取窗口状态失败
    GetStateFailed { reason: String },
    /// 窗口关闭失败
    CloseFailed { reason: String },
    /// 权限错误
    PermissionDenied { operation: String },
    /// 未知错误
    Unknown { message: String },
}

impl fmt::Display for WindowError {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            WindowError::WindowNotFound { window_label } => write!(f, "找不到窗口: {}", window_label),
            WindowError::MinimizeFailed { reason } => write!(f, "窗口最小化失败: {}", reason),
            WindowError::MaximizeFailed { reason } => write!(f, "窗口最大化失败: {}", reason),
            WindowError::UnmaximizeFailed { reason } => write!(f, "窗口取消最大化失败: {}", reason),
            WindowError::GetStateFailed { reason } => write!(f, "获取窗口状态失败: {}", reason),
            WindowError::CloseFailed { reason } => write!(f, "窗口关闭失败: {}", reason),
            WindowError::PermissionDenied { operation } => write!(f, "权限被拒绝，无法执行操作: {}", operation),
            WindowError::Unknown { message } => write!(f, "未知错误: {}", message),
        }
    }
}

impl std::error::Error for WindowError {}

/// 错误响应结构体，包含错误码、消息和详细信息
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct WindowErrorResponse {
    /// 错误代码，用于前端识别错误类型
    pub code: String,
    /// 简短错误消息
    pub message: String,
    /// 详细错误信息
    pub details: Option<String>,
    /// 错误发生时间戳
    pub timestamp: u64,
}

impl WindowErrorResponse {
    /// 从 WindowError 创建响应
    pub fn from_error(error: WindowError) -> Self {
        let code = match &error {
            WindowError::WindowNotFound { .. } => "WINDOW_NOT_FOUND",
            WindowError::MinimizeFailed { .. } => "MINIMIZE_FAILED",
            WindowError::MaximizeFailed { .. } => "MAXIMIZE_FAILED",
            WindowError::UnmaximizeFailed { .. } => "UNMAXIMIZE_FAILED",
            WindowError::GetStateFailed { .. } => "GET_STATE_FAILED",
            WindowError::CloseFailed { .. } => "CLOSE_FAILED",
            WindowError::PermissionDenied { .. } => "PERMISSION_DENIED",
            WindowError::Unknown { .. } => "UNKNOWN_ERROR",
        };

        // 使用系统时间戳
        let timestamp = std::time::SystemTime::now()
            .duration_since(std::time::UNIX_EPOCH)
            .unwrap_or_default()
            .as_secs();

        Self {
            code: code.to_string(),
            message: error.to_string(),
            details: None,
            timestamp,
        }
    }

    /// 添加详细错误信息
    pub fn with_details(mut self, details: impl Into<String>) -> Self {
        self.details = Some(details.into());
        self
    }
}

/// 将窗口操作错误转换为 WindowError 类型
fn map_window_error<E: std::error::Error + 'static>(
    error: E,
    error_type: fn(String) -> WindowError,
) -> WindowError {
    error_type(error.to_string())
}

/// 窗口最小化命令
pub fn minimize_window(window: Window) -> Result<(), WindowErrorResponse> {
    window
        .minimize()
        .map_err(|e| {
            let error = map_window_error(e, |reason| WindowError::MinimizeFailed { reason });
            WindowErrorResponse::from_error(error)
        })
}

/// 窗口最大化命令
pub fn maximize_window(window: Window) -> Result<(), WindowErrorResponse> {
    window
        .maximize()
        .map_err(|e| {
            let error = map_window_error(e, |reason| WindowError::MaximizeFailed { reason });
            WindowErrorResponse::from_error(error)
        })
}

/// 窗口取消最大化命令
pub fn unmaximize_window(window: Window) -> Result<(), WindowErrorResponse> {
    window
        .unmaximize()
        .map_err(|e| {
            let error = map_window_error(e, |reason| WindowError::UnmaximizeFailed { reason });
            WindowErrorResponse::from_error(error)
        })
}

/// 检查窗口是否最大化
pub fn is_maximized(window: Window) -> Result<bool, WindowErrorResponse> {
    window
        .is_maximized()
        .map_err(|e| {
            let error = map_window_error(e, |reason| WindowError::GetStateFailed { reason });
            WindowErrorResponse::from_error(error)
        })
}

/// 关闭窗口命令
pub fn close_window(window: Window) -> Result<(), WindowErrorResponse> {
    window
        .close()
        .map_err(|e| {
            let error = map_window_error(e, |reason| WindowError::CloseFailed { reason });
            WindowErrorResponse::from_error(error)
        })
}

/// 获取窗口状态（包括位置、大小、是否最大化等）
pub fn get_window_state(window: Window) -> Result<serde_json::Value, WindowErrorResponse> {
    let result = serde_json::json!({
        "is_maximized": window.is_maximized().unwrap_or(false),
        "is_fullscreen": window.is_fullscreen().unwrap_or(false),
        "is_focused": window.is_focused().unwrap_or(false),
        "is_visible": window.is_visible().unwrap_or(false),
        "title": window.title().unwrap_or_else(|_| "Unknown".into()),
    });
    
    Ok(result)
}

/// 记录窗口错误到日志系统
pub fn log_window_error(error: &WindowErrorResponse) {
    eprintln!(
        "[窗口错误] 代码: {}, 消息: {}, 时间戳: {}",
        error.code, error.message, error.timestamp
    );
    
    if let Some(details) = &error.details {
        eprintln!("[窗口错误详情] {}", details);
    }
}

/// 问候函数
pub fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
