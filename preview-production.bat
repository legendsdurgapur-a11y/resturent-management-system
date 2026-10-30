@echo off
setlocal
echo Previewing BistroFlow Production Build...
set "PATH=C:\Photo gallery(REACT)\.nodejs;%PATH%"
set "NODE_OPTIONS=--require C:\TRIDIB\patch-realpath.cjs"
cd /d "C:\TRIDIB\restaurant-system\react-app"
echo Node version:
node -v
echo Opening production preview on http://localhost:4173 ...
call npm run preview -- --host
pause
