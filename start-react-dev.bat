@echo off
setlocal
echo Starting BistroFlow Restaurant Reservation System...
set "PATH=C:\Photo gallery(REACT)\.nodejs;%PATH%"
set "NODE_OPTIONS=--require C:\TRIDIB\patch-realpath.cjs"
cd /d "C:\TRIDIB\restaurant-system\react-app"
echo Node version:
node -v
echo Launching development server on http://localhost:3000 ...
call npm run dev -- --host
pause
