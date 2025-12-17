# GrowPlanner - Sistema de Gestión de Huerto

Aplicación web para la gestión y control de un huerto, permitiendo organizar y monitorear diferentes zonas como bancales, invernadero, composteras y árboles frutales.

## 🚀 Tecnologías

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite 6.4.1
- **Backend**: Python + FastAPI (preparado para futura integración)
- **Estilos**: CSS3 con variables y gradientes

## 📁 Estructura del Proyecto

```
growplanner/
├── src/                    # Código fuente del frontend
│   ├── app/              # Componentes principales
│   ├── garden/           # Módulo del jardín
│   │   ├── components/   # Componentes del jardín
│   │   ├── constants/    # Registro de elementos
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── hooks/        # Hooks personalizados
│   │   └── store/        # Gestión de estado
│   ├── ui/               # Componentes de UI
│   ├── main.tsx          # Punto de entrada
│   └── styles.css        # Estilos globales
├── backend/              # Backend Python (FastAPI)
│   ├── main.py
│   ├── requirements.txt
│   └── venv/            # Entorno virtual (se crea automáticamente)
├── scripts/              # Scripts de inicio y configuración
│   ├── start-app.bat     # Script principal de inicio
│   ├── start-app.vbs     # Ejecución silenciosa
│   └── setup/            # Scripts de instalación del acceso directo
│       ├── install-shortcut.ps1  # Instalador del acceso directo
│       └── crear-acceso-directo.bat  # Script simple de instalación
└── package.json
```

## 🏗️ Arquitectura

### Sistema de Tipos

El proyecto utiliza TypeScript con tipos bien definidos:

- **`GardenElementId`**: Enum con IDs únicos de cada elemento
- **`GardenElement`**: Interface que define la estructura de cada elemento
- **`GardenElementType`**: Tipos de elementos (greenhouse, bed, compost, circle, tree)

### Componentes

- **Componente Genérico**: `GardenElementButton` - Componente reutilizable para todos los elementos
- **Componentes Específicos**: Mantenidos por compatibilidad (Bed1-5, CircleRight1-4, etc.)
- **Layout**: `GardenLayout` - Organiza y renderiza todos los elementos usando el sistema de constantes

### Constantes

Todos los elementos del jardín están definidos en `src/constants/gardenElements.ts`, lo que permite:
- Centralizar la configuración
- Facilitar la modificación de nombres y clases
- Escalar fácilmente añadiendo nuevos elementos

## 🎨 Diseño

El diseño replica un plano de huerto con:
- **Invernadero**: Zona de cultivo protegido
- **Bancales 1-5**: Zonas de cultivo (verticales y horizontales)
- **Composteras**: Norte y Sur
- **Círculos**: Árboles y plantas frutales (Pitayas, Plataneras, Papayero, Olivo, etc.)
- **Botón Frutales**: Navegación a vista de frutales (a implementar)

## 🛠️ Desarrollo

### Instalación Inicial

#### Opción 1: Instalación Automática (Recomendada)

1. **Crear el acceso directo en el escritorio:**
   ```bash
   # Ejecutar una sola vez para crear el acceso directo
   scripts\setup\crear-acceso-directo.bat
   ```
   O ejecutar directamente:
   ```bash
   powershell -ExecutionPolicy Bypass -File scripts\setup\install-shortcut.ps1
   ```

2. **Usar el acceso directo:**
   - Busca el icono "GrowPlanner" en tu escritorio
   - Haz doble clic para iniciar la aplicación
   - El script automáticamente:
     - Instala dependencias si es necesario
     - Inicia el servidor backend (puerto 8000)
     - Inicia el servidor frontend (puerto 5173)
     - Abre el navegador en `http://localhost:5173`

#### Opción 2: Instalación Manual

**Instalar dependencias de Node.js:**
```bash
npm install
```

**Instalar dependencias de Python:**
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
```

### Ejecutar la Aplicación

#### Método Rápido (con acceso directo)
- **Doble clic en "GrowPlanner" del escritorio** (después de la instalación inicial)

#### Método Manual

**Iniciar ambos servidores automáticamente:**
```bash
scripts\start-app.bat
```

**O iniciar manualmente:**

Frontend:
```bash
npm run dev
```
La aplicación estará disponible en `http://localhost:5173`

Backend:
```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload --port 8000
```

### Build para producción

```bash
npm run build
```

## 📝 Próximas Mejoras

- [ ] Implementar navegación entre vistas (React Router)
- [ ] Conectar frontend con backend para persistencia de datos
- [ ] Vista detallada de cada elemento del jardín
- [ ] Sistema de gestión de cultivos por bancal
- [ ] Calendario de siembra y cosecha
- [ ] Registro de riegos y cuidados

## 🧩 Extensibilidad

El proyecto está diseñado para ser fácilmente extensible:

1. **Añadir nuevos elementos**: Agregar entrada en `GARDEN_ELEMENTS` y `GardenElementId`
2. **Modificar estilos**: Editar `src/styles.css` con comentarios descriptivos
3. **Añadir funcionalidad**: Extender `handleElementClick` para navegación o llamadas API

## 🖥️ Scripts de Inicio

El proyecto incluye scripts automatizados para facilitar el inicio:

- **`scripts/start-app.bat`**: Inicia automáticamente frontend y backend
- **`scripts/start-app.vbs`**: Ejecución silenciosa (usado por el acceso directo)
- **`scripts/setup/install-shortcut.ps1`**: Crea el acceso directo en el escritorio
- **`scripts/setup/crear-acceso-directo.bat`**: Ejecuta la instalación del acceso directo

**Características:**
- ✅ Instalación automática de dependencias
- ✅ Creación automática del entorno virtual de Python
- ✅ Inicio simultáneo de ambos servidores
- ✅ Apertura automática del navegador
- ✅ Acceso directo en el escritorio para inicio rápido

## 📄 Licencia

ISC

