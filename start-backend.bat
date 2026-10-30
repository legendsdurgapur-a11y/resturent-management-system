@echo off
setlocal
title BistroFlow Backend API (Port 3001)
echo ============================================================
echo  BistroFlow Backend (Node.js + Express + SQLite)
echo  Starting API server on http://localhost:3001 ...
echo ============================================================
set "PATH=C:\Photo gallery(REACT)\.nodejs;%PATH%"
set "NODE_OPTIONS=--require C:\TRIDIB\patch-realpath.cjs"
cd /d "C:\TRIDIB\restaurant-system\backend"
node server.js
pause
