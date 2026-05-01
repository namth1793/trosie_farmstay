@echo off
chcp 65001 > nul
echo ========================================
echo    Chay Lap Farmstay - Khoi Dong
echo ========================================
echo.
echo Backend : http://localhost:5023
echo Frontend: http://localhost:5174
echo.
start "Farmstay Backend" cmd /k "cd /d "%~dp0backend" && npm start"
timeout /t 2 > nul
start "Farmstay Frontend" cmd /k "cd /d "%~dp0frontend" && npm run dev"
timeout /t 3 > nul
start http://localhost:5174
echo.
echo Da khoi dong! Nhan phim bat ky de dong cua so nay.
pause
