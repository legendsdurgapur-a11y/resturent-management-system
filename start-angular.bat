@echo off
setlocal
title BistroFlow Angular App (Port 4200)
echo ============================================================
echo  BistroFlow Angular App
echo  Starting Angular dev server on http://localhost:4200 ...
echo ============================================================
set "PATH=C:\Photo gallery(REACT)\.nodejs;%PATH%"
set "NODE_OPTIONS=--require C:\TRIDIB\patch-realpath.cjs"
cd /d "C:\TRIDIB\restaurant-system\angular-app"
call npx ng serve --host 0.0.0.0 --port 4200 --open
pause
