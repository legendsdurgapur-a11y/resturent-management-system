@echo off
setlocal
title BistroFlow Starter
echo ============================================================
echo   BistroFlow Restaurant System — Launching All Services
echo ============================================================
echo.
echo   1. Starting Backend API (http://localhost:3001) ...
start "BistroFlow Backend (3001)" cmd /k "C:\TRIDIB\restaurant-system\start-backend.bat"
timeout /t 3 /nobreak > nul
echo.
echo   2. Starting Angular Dev Server (http://localhost:4200) ...
start "BistroFlow Angular (4200)" cmd /k "C:\TRIDIB\restaurant-system\start-angular.bat"
echo.
echo ============================================================
echo   Done! Angular will automatically open in your browser.
echo   If it does not, visit: http://localhost:4200
echo ============================================================
pause
