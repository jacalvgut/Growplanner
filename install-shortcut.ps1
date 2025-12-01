# Script PowerShell para crear un acceso directo en el escritorio
# Ejecutar con: powershell -ExecutionPolicy Bypass -File install-shortcut.ps1

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "   Instalando acceso directo GrowPlanner" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Obtener la ruta del script actual
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
$vbsPath = Join-Path $scriptPath "start-app.vbs"
$desktopPath = [Environment]::GetFolderPath("Desktop")
$shortcutPath = Join-Path $desktopPath "GrowPlanner.lnk"

# Verificar que el archivo VBS existe
if (-Not (Test-Path $vbsPath)) {
    Write-Host "Error: No se encontro el archivo start-app.vbs" -ForegroundColor Red
    Write-Host "Ruta esperada: $vbsPath" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Crear el acceso directo
try {
    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut($shortcutPath)
    $Shortcut.TargetPath = "wscript.exe"
    $Shortcut.Arguments = "`"$vbsPath`""
    $Shortcut.WorkingDirectory = $scriptPath
    $Shortcut.Description = "Iniciar GrowPlanner - Sistema de Gestion de Huerto"
    $Shortcut.IconLocation = "shell32.dll,21"
    
    # Intentar usar un icono personalizado si existe
    $iconPath = Join-Path $scriptPath "icon.ico"
    if (Test-Path $iconPath) {
        $Shortcut.IconLocation = $iconPath
    }
    
    $Shortcut.Save()
    
    Write-Host "Acceso directo creado exitosamente en el escritorio" -ForegroundColor Green
    Write-Host "  Ruta: $shortcutPath" -ForegroundColor Gray
    Write-Host ""
    Write-Host "Ahora puedes hacer doble clic en 'GrowPlanner' en tu escritorio" -ForegroundColor Yellow
    Write-Host "para iniciar la aplicacion." -ForegroundColor Yellow
    Write-Host ""
} catch {
    Write-Host "Error al crear el acceso directo: $_" -ForegroundColor Red
    Read-Host "Presiona Enter para salir"
    exit 1
}

Write-Host "Instalacion completada!" -ForegroundColor Green
