@echo off
setlocal
title Push BistroFlow to GitHub
echo ============================================================
echo   BistroFlow — Push Project to GitHub
echo   Repository: https://github.com/legendsdurgapur-a11y/resturent-management-system.git
echo ============================================================
echo.

set "PATH=C:\TRIDIB\git\cmd;C:\Users\tridi\AppData\Local\Microsoft\WinGet\Packages\GitHub.cli_Microsoft.Winget.Source_8wekyb3d8bbwe\bin;%PATH%"

cd /d "C:\TRIDIB\restaurant-system"

echo Checking GitHub login status...
gh auth status >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo [!] You are not signed into GitHub yet.
    echo Opening GitHub browser login. Please authorize in your browser when prompted:
    echo.
    gh auth login -h github.com -p https -w
    echo.
    echo Configuring git credential helper...
    gh auth setup-git
)

echo.
echo Pushing committed files to GitHub (main branch)...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ============================================================
    echo   SUCCESS! All project files pushed to GitHub:
    echo   https://github.com/legendsdurgapur-a11y/resturent-management-system
    echo ============================================================
) else (
    echo.
    echo [!] Push encountered an error. If prompted, please enter your GitHub Personal Access Token.
)

pause

