@echo off
REM My Tech Knowledge Base - Development Scripts for Windows
REM Run from project root directory

setlocal enabledelayedexpansion

set WEBSITE_DIR=website

REM Colors (using color codes)
set RED=[91m
set GREEN=[92m
set YELLOW=[93m
set BLUE=[94m
set NC=[0m

REM Helper functions
:log_info
echo %BLUE%ℹ️  %~1%NC%
goto :eof

:log_success
echo %GREEN%✅ %~1%NC%
goto :eof

:log_warning
echo %YELLOW%⚠️  %~1%NC%
goto :eof

:log_error
echo %RED%❌ %~1%NC%
goto :eof

REM Check if we're in the right directory
:check_directory
if not exist "%WEBSITE_DIR%" (
    call :log_error "Website directory not found. Are you in the project root?"
    exit /b 1
)
goto :eof

REM Install dependencies
:install_deps
call :log_info "Installing dependencies..."
cd "%WEBSITE_DIR%"
call npm install
cd ..
call :log_success "Dependencies installed"
goto :eof

REM Start development server
:start_dev
call :check_directory
call :log_info "Starting development server..."
cd "%WEBSITE_DIR%"
call npm start
goto :eof

REM Build for production
:build_prod
call :check_directory
call :log_info "Building for production..."
cd "%WEBSITE_DIR%"
call npm run build
call :log_success "Build complete"
goto :eof

REM Preview production build
:preview_build
call :check_directory
call :log_info "Building and serving production version..."
cd "%WEBSITE_DIR%"
call npm run preview
goto :eof

REM Clean install
:clean_install
call :check_directory
call :log_warning "This will remove node_modules and package-lock.json"
set /p choice="Continue? (y/N): "
if /i "!choice!"=="y" (
    call :log_info "Performing clean install..."
    cd "%WEBSITE_DIR%"
    rmdir /s /q node_modules 2>nul
    del package-lock.json 2>nul
    call npm install
    cd ..
    call :log_success "Clean install complete"
)
goto :eof

REM Deploy reminder
:deploy_reminder
call :check_directory
call :log_info "Building for deployment..."
cd "%WEBSITE_DIR%"
call npm run build
cd ..
call :log_success "Build complete!"
call :log_info "To deploy:"
echo   1. Commit your changes: git add . ^&^& git commit -m "Update docs"
echo   2. Push to main: git push origin main
echo   3. GitHub Actions will automatically deploy to GitHub Pages
goto :eof

REM Show help
:show_help
echo My Tech Knowledge Base - Development Scripts ^(Windows^)
echo.
echo Usage: scripts\dev.bat [command]
echo.
echo Commands:
echo   install    Install dependencies
echo   dev        Start development server
echo   build      Build for production
echo   preview    Build and preview production version
echo   clean      Clean install ^(removes node_modules^)
echo   deploy     Build and show deployment instructions
echo   help       Show this help message
echo.
echo Or use npm scripts from project root:
echo   npm run dev        - Start development server
echo   npm run build      - Build for production
echo   npm run preview    - Preview production build
echo   npm run deploy     - Build and show deployment steps
echo   npm run clean-install - Clean install dependencies
goto :eof

REM Main script logic
if "%1"=="" goto show_help
if "%1"=="install" goto install_deps
if "%1"=="dev" goto start_dev
if "%1"=="build" goto build_prod
if "%1"=="preview" goto preview_build
if "%1"=="clean" goto clean_install
if "%1"=="deploy" goto deploy_reminder
if "%1"=="help" goto show_help

REM Default to help
goto show_help