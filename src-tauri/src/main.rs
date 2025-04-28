// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// 从lib.rs导入窗口操作函数和错误处理
use build_lib::{
    minimize_window, maximize_window, unmaximize_window,
    is_maximized, close_window, get_window_state,
    greet, WindowErrorResponse
};
use tauri::Manager;

// 为Tauri命令添加宏注解
#[tauri::command]
fn minimize_window_cmd(window: tauri::Window) -> Result<(), WindowErrorResponse> {
    minimize_window(window)
}

#[tauri::command]
fn maximize_window_cmd(window: tauri::Window) -> Result<(), WindowErrorResponse> {
    maximize_window(window)
}

#[tauri::command]
fn unmaximize_window_cmd(window: tauri::Window) -> Result<(), WindowErrorResponse> {
    unmaximize_window(window)
}

#[tauri::command]
fn is_maximized_cmd(window: tauri::Window) -> Result<bool, WindowErrorResponse> {
    is_maximized(window)
}

#[tauri::command]
fn close_window_cmd(window: tauri::Window) -> Result<(), WindowErrorResponse> {
    close_window(window)
}

#[tauri::command]
fn get_window_state_cmd(window: tauri::Window) -> Result<serde_json::Value, WindowErrorResponse> {
    get_window_state(window)
}

#[tauri::command]
fn greet_cmd(name: &str) -> String {
    greet(name)
}

// 前端可以调用这个命令来确认Tauri环境是否正常初始化
#[tauri::command]
fn check_tauri_initialized() -> String {
    println!("前端调用了check_tauri_initialized命令");
    "Tauri backend is working!".into()
}

// 主函数 - 应用入口点
fn main() {
    println!("Tauri后端正在启动...");
    
    tauri::Builder::default()
        .setup(|app| {
            println!("Tauri设置中...");
            
            // Tauri 2.0兼容性处理 - 尝试获取窗口
            #[cfg(debug_assertions)]
            {
                // 获取窗口 - Tauri 2.0中使用get_webview_window
                let window = match app.get_webview_window("main") {
                    Some(win) => win,
                    None => {
                        println!("警告: 无法获取主窗口，前端初始化可能失败");
                        return Ok(());
                    }
                };
                
                // 注入前端检测代码
                if let Err(e) = window.eval(
                    r#"
                    console.log("⚡ Tauri后端已成功注入前端!");
                    window.__TAURI_BACKEND_INITIALIZED__ = true;
                    if (window.dispatchEvent) {
                        window.dispatchEvent(new CustomEvent('tauri-backend-ready'));
                    }
                    "#,
                ) {
                    println!("无法执行前端脚本: {}", e);
                }
            }
            
            // 获取窗口并监听事件
            if let Some(window) = app.get_webview_window("main") {
                window.on_window_event(|event| {
                    match event {
                        tauri::WindowEvent::CloseRequested { api, .. } => {
                            println!("主窗口关闭请求");
                            api.prevent_close();
                            // 确认关闭
                            std::process::exit(0);
                        }
                        tauri::WindowEvent::Focused(focused) => {
                            println!("窗口焦点状态: {}", focused);
                        }
                        tauri::WindowEvent::Moved(position) => {
                            println!("窗口移动到: {:?}", position);
                        }
                        tauri::WindowEvent::Resized(size) => {
                            println!("窗口大小调整为: {:?}", size);
                        }
                        _ => {}
                    }
                });
                println!("主窗口事件监听器已设置");
            } else {
                println!("警告: 无法获取主窗口进行事件监听");
            }
            
            println!("主窗口已初始化");
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet_cmd, 
            minimize_window_cmd, 
            maximize_window_cmd, 
            unmaximize_window_cmd, 
            is_maximized_cmd, 
            close_window_cmd,
            get_window_state_cmd,
            check_tauri_initialized
        ])
        .run(tauri::generate_context!())
        .expect("Tauri应用运行失败");
}
