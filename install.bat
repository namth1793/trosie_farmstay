@echo off
chcp 65001 > nul
echo ========================================
echo    Chay Lap Farmstay - Cai Dat
echo ========================================
echo.
echo [1/2] Cai dat Backend...
cd /d "%~dp0backend"
call npm install
echo.
echo [2/2] Cai dat Frontend...
cd /d "%~dp0frontend"
call npm install
echo.
echo ========================================
echo   Cai dat hoan tat!
echo   Chay start.bat de khoi dong.
echo ========================================
pause
