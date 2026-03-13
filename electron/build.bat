@echo off
chcp 65001 >nul
title Kalkulator JDG — Build

echo.
echo  ╔══════════════════════════════════════╗
echo  ║   Kalkulator JDG — Builder           ║
echo  ╚══════════════════════════════════════╝
echo.

:: Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo  [BLAD] Node.js nie jest zainstalowany.
    echo  Pobierz z: https://nodejs.org
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODEVERSION=%%i
echo  Node.js: %NODEVERSION%

:: Install dependencies if needed
if not exist "node_modules\" (
    echo.
    echo  [1/2] Instalowanie zaleznosci (pierwsze uruchomienie ~90 MB)...
    npm install
    if %errorlevel% neq 0 (
        echo  [BLAD] npm install zakonczony bledem.
        pause
        exit /b 1
    )
) else (
    echo  Zaleznosci: OK
)

:: Build
echo.
echo  [2/2] Budowanie aplikacji dla Windows x64...
npm run build:win

if %errorlevel% neq 0 (
    echo.
    echo  [BLAD] Build zakonczony bledem.
    pause
    exit /b 1
)

echo.
echo  ════════════════════════════════════════
echo  Build zakonczony! Pliki w katalogu dist\
echo  ════════════════════════════════════════
echo.
explorer dist
pause
