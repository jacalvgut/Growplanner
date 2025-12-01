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
├── src/
│   ├── components/          # Componentes React
│   │   ├── elements/       # Elementos individuales del jardín
│   │   ├── GardenLayout.tsx # Layout principal
│   │   └── FrutalesButton.tsx
│   ├── constants/          # Constantes y configuración
│   │   └── gardenElements.ts
│   ├── types/              # Definiciones de tipos TypeScript
│   │   └── garden.ts
│   ├── interaction/        # Lógica de interacción
│   │   └── handleElementClick.ts
│   ├── App.tsx            # Componente raíz
│   ├── main.tsx           # Punto de entrada
│   └── styles.css         # Estilos globales
├── backend/               # Backend Python (FastAPI)
│   ├── main.py
│   └── requirements.txt
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

### Instalación

```bash
npm install
```

### Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Build para producción

```bash
npm run build
```

### Backend (Python)

```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
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

## 📄 Licencia

ISC

