@echo off
REM Script para iniciar GrowPlanner (Frontend + Backend)
REM Este script inicia ambos servidores y abre el navegador

echo ========================================
echo    Iniciando GrowPlanner...
echo ========================================
echo.

REM Cambiar al directorio del proyecto (un nivel arriba desde scripts/)
cd /d "%~dp0.."

REM Verificar si node_modules existe
if not exist "node_modules\" (
    echo [INFO] Instalando dependencias de Node.js...
    call npm install
    if errorlevel 1 (
        echo [ERROR] Error al instalar dependencias de Node.js
        pause
        exit /b 1
    )
)

REM Verificar si el entorno virtual de Python existe
if not exist "backend\venv\" (
    echo [INFO] Creando entorno virtual de Python...
    cd backend
    python -m venv venv
    if errorlevel 1 (
        echo [ERROR] Error al crear entorno virtual. Asegúrate de tener Python instalado.
        pause
        exit /b 1
    )
    cd ..
)

REM Activar entorno virtual y verificar dependencias
cd backend
call venv\Scripts\activate.bat
if not exist "venv\Lib\site-packages\fastapi" (
    echo [INFO] Instalando dependencias de Python...
    pip install -r requirements.txt
    if errorlevel 1 (
        echo [ERROR] Error al instalar dependencias de Python
        pause
        exit /b 1
    )
)
cd ..

REM Iniciar backend en una nueva ventana
echo [INFO] Iniciando servidor backend (puerto 8000)...
start "GrowPlanner Backend" cmd /k "cd /d %~dp0..\backend && venv\Scripts\activate.bat && python -m uvicorn main:app --reload --port 8000 --host 0.0.0.0"

REM Esperar un momento para que el backend inicie
timeout /t 2 /nobreak >nul

REM Iniciar frontend en una nueva ventana
echo [INFO] Iniciando servidor frontend (puerto 5173)...
start "GrowPlanner Frontend" cmd /k "cd /d %~dp0.. && npm run dev"

REM Esperar un momento para que el frontend inicie
timeout /t 3 /nobreak >nul

REM Abrir el navegador
echo [INFO] Abriendo navegador...
start http://localhost:5173

echo.
echo ========================================
echo    GrowPlanner iniciado correctamente!
echo ========================================
echo.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo.
echo Presiona cualquier tecla para cerrar esta ventana...
echo (Los servidores seguirán ejecutándose en ventanas separadas)
pause >nul

