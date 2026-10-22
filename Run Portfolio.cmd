@echo off
setlocal
cd /d "%~dp0"

echo Stopping any server on port 3000...
for /f "tokens=5" %%P in ('netstat -ano ^| findstr /R /C:":3000 .*LISTENING"') do taskkill /PID %%P /F >nul 2>&1

echo Clearing the Next.js cache...
if exist ".next" rmdir /s /q ".next"

echo Starting the portfolio app...
call npm run dev -- --hostname 0.0.0.0
pause
