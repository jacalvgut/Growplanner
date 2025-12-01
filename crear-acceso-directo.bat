@echo off
REM Script simple para crear el acceso directo en el escritorio
REM Ejecuta el script PowerShell de instalación

echo Creando acceso directo en el escritorio...
echo.

powershell -ExecutionPolicy Bypass -File "%~dp0install-shortcut.ps1"

pause

