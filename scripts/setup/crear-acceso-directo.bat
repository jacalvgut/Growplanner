@echo off
REM Script simple para crear el acceso directo en el escritorio
REM Ejecuta el script PowerShell de instalación

echo Creando acceso directo en el escritorio...
echo.

REM Obtener la ruta del script actual
set "SCRIPT_DIR=%~dp0"
set "PROJECT_ROOT=%SCRIPT_DIR%..\.."

powershell -ExecutionPolicy Bypass -File "%SCRIPT_DIR%install-shortcut.ps1"

pause

