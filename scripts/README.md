# Scripts de GrowPlanner

Esta carpeta contiene todos los scripts necesarios para iniciar y configurar la aplicación.

## 📁 Estructura

```
scripts/
├── start-app.bat          # Script principal de inicio (frontend + backend)
├── start-app.vbs          # Wrapper silencioso para el acceso directo
└── setup/                 # Scripts de instalación del acceso directo
    ├── install-shortcut.ps1
    └── crear-acceso-directo.bat
```

## 🚀 Uso

### Iniciar la aplicación

**Opción 1: Desde la línea de comandos**
```bash
scripts\start-app.bat
```

**Opción 2: Usando el acceso directo del escritorio**
- Primero ejecuta `scripts\setup\crear-acceso-directo.bat` (solo una vez)
- Luego haz doble clic en "GrowPlanner" en tu escritorio

### Crear acceso directo

```bash
scripts\setup\crear-acceso-directo.bat
```

O directamente con PowerShell:
```bash
powershell -ExecutionPolicy Bypass -File scripts\setup\install-shortcut.ps1
```

## 📝 Descripción de Scripts

### `start-app.bat`
Script principal que:
- Verifica e instala dependencias de Node.js si es necesario
- Crea y configura el entorno virtual de Python si no existe
- Instala dependencias de Python si es necesario
- Inicia el servidor backend (puerto 8000)
- Inicia el servidor frontend (puerto 5173)
- Abre el navegador automáticamente

### `start-app.vbs`
Wrapper silencioso que ejecuta `start-app.bat` sin mostrar ventana de consola. 
Usado por el acceso directo del escritorio.

### `setup/install-shortcut.ps1`
Script PowerShell que crea el acceso directo en el escritorio apuntando a `start-app.vbs`.

### `setup/crear-acceso-directo.bat`
Script simple que ejecuta `install-shortcut.ps1` de forma más amigable para el usuario.

