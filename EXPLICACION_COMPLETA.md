# 📚 Explicación Completa del Proyecto GrowPlanner

## 🎯 ¿Qué es GrowPlanner?

GrowPlanner es una aplicación web que te permite visualizar y gestionar un huerto de forma digital. Imagina que tienes un plano de tu jardín en papel, pero en lugar de eso, lo tienes en tu computadora o teléfono, y puedes hacer clic en cada zona para ver información sobre ella.

---

## 🏗️ ARQUITECTURA GENERAL DEL PROYECTO

Piensa en el proyecto como una casa con diferentes habitaciones, cada una con su función específica:

```
GrowPlanner (La Casa Completa)
├── Frontend (La parte que ves en el navegador)
│   ├── React (El sistema de construcción)
│   ├── TypeScript (El lenguaje que habla)
│   └── Vite (La herramienta que construye todo)
├── Backend (El servidor que guarda información)
│   └── Python + FastAPI (El sistema que procesa datos)
└── Scripts de Inicio (La forma fácil de iniciar todo)
    ├── start-app.bat (Script principal de inicio)
    ├── start-app.vbs (Ejecución silenciosa)
    └── install-shortcut.ps1 (Instalador del acceso directo)
```

---

## 📂 ESTRUCTURA DETALLADA DE ARCHIVOS

### 🚪 **PUNTO DE ENTRADA: `src/main.tsx`**

**¿Qué es?** Este es el archivo que "enciende" toda la aplicación. Es como el interruptor de la luz de tu casa.

**¿Qué hace?**
1. Busca un elemento en la página web llamado "root" (raíz)
2. Si no lo encuentra, muestra un error
3. Si lo encuentra, "monta" (renderiza) el componente principal `App` en ese lugar
4. Activa el modo estricto de React, que ayuda a encontrar errores

**Analogía:** Imagina que estás montando una exposición de arte. Este archivo es el que abre las puertas del museo y coloca la primera obra de arte (el componente App) en el lugar principal.

**Código clave:**
- `ReactDOM.createRoot()`: Crea el "lienzo" donde se pintará la aplicación
- `render(<App />)`: Pinta el componente App en ese lienzo

---

### 🏠 **COMPONENTE PRINCIPAL: `src/app/App.tsx`**

**¿Qué es?** Este es el componente "raíz" de toda la aplicación. Es como el plano arquitectónico principal de tu casa.

**¿Qué hace?**
1. Crea un contenedor principal llamado "page" (página)
2. Dentro de ese contenedor, coloca otro contenedor llamado "garden-container" (contenedor del jardín)
3. Dentro del contenedor del jardín, coloca dos cosas:
   - `GardenLayout`: El plano visual del jardín con todos sus elementos
   - `FrutalesButton`: Un botón para navegar a la vista de frutales

**Analogía:** Es como el director de una obra de teatro que decide qué escenarios van en el escenario principal y en qué orden.

**Estructura visual:**
```
App (Contenedor Principal)
└── garden-container (Contenedor del Jardín)
    ├── GardenLayout (El plano del jardín)
    └── FrutalesButton (Botón de navegación)
```

---

### 🌳 **EL JARDÍN: `src/garden/`**

Esta carpeta contiene TODO lo relacionado con el jardín. Es como un departamento completo dedicado solo a gestionar el huerto.

#### 📋 **TIPOS Y DEFINICIONES: `src/garden/types.ts`**

**¿Qué es?** Este archivo define las "reglas" y "formas" de todos los elementos del jardín. Es como un diccionario que explica qué significa cada cosa.

**¿Qué contiene?**

1. **`GardenElementId` (Enum)**: Una lista de identificadores únicos para cada elemento
   - Es como tener etiquetas con nombres únicos: "greenhouse", "bed-1", "bed-2", etc.
   - Cada elemento del jardín tiene un ID único que no se puede repetir

2. **`GardenElementType`**: Los tipos de elementos que existen
   - `greenhouse`: Invernadero
   - `bed`: Bancal (zona de cultivo)
   - `compost`: Compostera
   - `circle`: Círculo (árbol o planta frutal)
   - `tree`: Árbol

3. **Interfaces (Plantillas de elementos)**:
   - **`BaseGardenElement`**: La plantilla base que TODOS los elementos tienen
     - `id`: El identificador único
     - `type`: El tipo de elemento
     - `name`: El nombre interno
     - `displayName`: El nombre que se muestra al usuario
     - `className`: Las clases CSS para el estilo
   
   - **`GreenhouseElement`**: Plantilla específica para invernaderos
   - **`BedElement`**: Plantilla para bancales (tiene `orientation`: vertical u horizontal)
   - **`CompostElement`**: Plantilla para composteras
   - **`CircleElement`**: Plantilla para círculos (puede tener `hasWrapper` si necesita un contenedor especial)

4. **`GardenElement`**: Una unión de todos los tipos posibles. Es como decir "un elemento puede ser cualquiera de estos tipos"

5. **`GardenState`**: El estado actual del jardín
   - `elements`: Lista de todos los elementos
   - `selectedElementId`: Qué elemento está seleccionado actualmente (o null si ninguno)
   - `hoveredElementId`: Sobre qué elemento está el mouse (o null si ninguno)

6. **`GardenActions`**: Las acciones que se pueden realizar
   - `selectElement`: Seleccionar un elemento
   - `hoverElement`: Marcar un elemento como "hover" (mouse encima)
   - `addElement`: Añadir un nuevo elemento
   - `removeElement`: Eliminar un elemento
   - `resetSelection`: Deseleccionar todo

7. **`GardenStore`**: La combinación de estado + acciones. Es el "almacén" completo del jardín.

**Analogía:** Es como el manual de instrucciones de un juego de construcción. Te dice qué piezas existen, cómo se llaman, qué propiedades tienen, y qué puedes hacer con ellas.

---

#### 🗄️ **ALMACÉN DE DATOS: `src/garden/store/gardenStore.ts`**

**¿Qué es?** Este es el "almacén" donde se guarda toda la información del jardín. Usa una librería llamada Zustand para gestionar el estado.

**¿Qué hace?**

1. **Inicializa el almacén** con:
   - Todos los elementos del jardín (obtenidos de `getElementsInOrder()`)
   - `selectedElementId` en `null` (ninguno seleccionado al inicio)
   - `hoveredElementId` en `null` (ninguno con hover al inicio)

2. **Proporciona funciones para modificar el estado:**
   - `selectElement(elementId)`: Guarda qué elemento está seleccionado
   - `hoverElement(elementId)`: Guarda sobre qué elemento está el mouse
   - `addElement(element)`: Añade un nuevo elemento al jardín
   - `removeElement(elementId)`: Elimina un elemento del jardín
   - `resetSelection()`: Limpia la selección y el hover

**Analogía:** Es como una caja fuerte donde guardas información importante. Solo tú (la aplicación) puedes abrirla y modificar lo que hay dentro usando las funciones específicas.

**Flujo de datos:**
```
Usuario hace clic → selectElement() → Store se actualiza → Componentes se re-renderizan
```

---

#### 📚 **REGISTRO DE ELEMENTOS: `src/garden/constants/elementRegistry.ts`**

**¿Qué es?** Este archivo es como un catálogo completo de todos los elementos del jardín. Contiene la información detallada de cada uno.

**¿Qué contiene?**

1. **`ELEMENT_REGISTRY`**: Un objeto gigante que contiene TODOS los elementos del jardín
   - Cada elemento tiene su configuración completa:
     - ID único
     - Tipo (greenhouse, bed, compost, circle)
     - Nombre interno
     - Nombre para mostrar
     - Clases CSS (para el estilo)
     - Propiedades especiales (como `orientation` para bancales o `hasWrapper` para círculos)

   **Ejemplo de un elemento:**
   ```javascript
   BED_1: {
     id: 'bed-1',
     type: 'bed',
     name: 'Bancal 1',
     displayName: 'Bancal 1',
     orientation: 'vertical',
     className: 'zone bed bed-vertical bed-1'
   }
   ```

2. **`GARDEN_ELEMENTS_ORDER`**: Un array que define el orden en que se deben renderizar los elementos
   - Es importante porque determina qué elementos aparecen encima de otros (z-index)
   - Los elementos que aparecen al final de la lista se renderizan encima

3. **Funciones auxiliares:**
   - `getElementById(id)`: Busca un elemento por su ID y lo devuelve
   - `getElementsInOrder()`: Devuelve todos los elementos en el orden correcto

**Analogía:** Es como un catálogo de muebles de IKEA. Tiene todas las piezas disponibles, sus especificaciones, y el orden en que debes montarlas.

**Elementos incluidos:**
- 1 Invernadero (greenhouse)
- 5 Bancales (bed-1 a bed-5)
- 2 Composteras (compost-north, compost-south)
- 8 Círculos (árboles frutales: Pitayas, Plataneras, Papayero, Parra, etc.)

---

#### 🎨 **COMPONENTE DE ELEMENTO: `src/garden/components/GardenElement.tsx`**

**¿Qué es?** Este es un componente genérico que puede renderizar CUALQUIER elemento del jardín. Es como una plantilla reutilizable.

**¿Qué hace?**

1. **Recibe un elemento** como prop (propiedad)
2. **Usa hooks** para gestionar la selección y el hover:
   - `useElementSelection()`: Para saber si está seleccionado y para seleccionarlo
   - `useElementHover()`: Para saber si tiene el mouse encima y para gestionar el hover

3. **Crea un botón** con:
   - La clase CSS del elemento (para el estilo)
   - Un manejador de clic (`handleClick`) que selecciona el elemento
   - Un manejador de mouse enter (`handleMouseEnter`) que activa el hover
   - Un manejador de mouse leave (`handleMouseLeave`) que desactiva el hover
   - El nombre a mostrar (`displayName`)
   - Atributos de accesibilidad (aria-label, aria-selected)

4. **Lógica especial para wrappers:**
   - Si el elemento es un círculo y tiene `hasWrapper: true`, lo envuelve en un div especial llamado "right-bottom-rect"
   - Esto es necesario para algunos elementos que necesitan un contenedor adicional

**Analogía:** Es como un molde de galletas. Puedes usar el mismo molde para hacer diferentes formas, pero cada galleta tiene su propio sabor (propiedades).

**Flujo de interacción:**
```
Usuario pasa el mouse → handleMouseEnter → onHover() → Store actualiza hoveredElementId
Usuario hace clic → handleClick → select() → Store actualiza selectedElementId → handleElementClick() ejecuta lógica
Usuario quita el mouse → handleMouseLeave → onHoverEnd() → Store limpia hoveredElementId
```

---

#### 🗺️ **LAYOUT DEL JARDÍN: `src/garden/components/GardenLayout.tsx`**

**¿Qué es?** Este componente es el que organiza y muestra TODOS los elementos del jardín en la pantalla.

**¿Qué hace?**

1. **Obtiene el orden de renderizado** usando `getRenderOrder()` del controlador de layout
2. **Crea un contenedor** con la clase "garden" (que tiene todos los estilos CSS)
3. **Recorre cada elemento** en el orden correcto
4. **Para cada elemento:**
   - Busca su configuración usando `getElementById()`
   - Crea un componente `GardenElement` con esa configuración
   - Le asigna una "key" única (el ID) para que React pueda identificarlo

**Analogía:** Es como el director de escena que coloca todos los actores en sus posiciones correctas en el escenario, en el orden correcto.

**Estructura visual:**
```
GardenLayout
└── div.garden (contenedor con estilos CSS)
    ├── GardenElement (Invernadero)
    ├── GardenElement (Bancal 1)
    ├── GardenElement (Bancal 2)
    ├── ... (todos los demás elementos)
    └── GardenElement (Círculo inferior derecho)
```

---

#### 🎣 **HOOKS PERSONALIZADOS**

Los hooks son funciones especiales de React que permiten "engancharse" al estado y a las funcionalidades. Son como herramientas especializadas.

##### **`useGardenStore.ts`**

**¿Qué es?** Un conjunto de hooks para acceder al almacén del jardín de diferentes formas.

**Hooks incluidos:**

1. **`useGardenStore()`**: Devuelve TODO el almacén (estado + acciones)
   - Úsalo cuando necesites tanto leer como modificar

2. **`useGardenState()`**: Devuelve SOLO el estado (sin acciones)
   - Úsalo cuando solo necesites leer información
   - Es más eficiente porque solo se re-renderiza cuando cambia el estado

3. **`useGardenActions()`**: Devuelve SOLO las acciones (sin estado)
   - Úsalo cuando solo necesites funciones para modificar
   - Nunca causa re-renderizados porque no depende del estado

**Analogía:** Es como tener diferentes tipos de llaves para la misma caja fuerte:
- Una llave maestra (useGardenStore) que abre todo
- Una llave de solo lectura (useGardenState) que solo te deja ver
- Una llave de solo escritura (useGardenActions) que solo te deja modificar

---

##### **`useElementSelection.ts`**

**¿Qué es?** Un hook especializado en gestionar la selección de elementos.

**¿Qué hace?**

1. **Obtiene el estado de selección** del almacén
2. **Proporciona funciones:**
   - `select(elementId)`: Selecciona un elemento
     - Actualiza el store
     - Ejecuta `handleElementClick()` para la lógica de negocio
   - `deselect()`: Deselecciona el elemento actual
   - `isSelected(elementId)`: Verifica si un elemento está seleccionado

**Analogía:** Es como un asistente especializado en seleccionar cosas. Tú le dices "selecciona esto" y él se encarga de todo el proceso.

**Flujo:**
```
Usuario hace clic → select(elementId) → selectElement() actualiza store → handleElementClick() ejecuta lógica → alert() muestra mensaje
```

---

##### **`useElementHover.ts`**

**¿Qué es?** Un hook especializado en gestionar el efecto hover (cuando pasas el mouse por encima).

**¿Qué hace?**

1. **Obtiene el estado de hover** del almacén
2. **Proporciona funciones:**
   - `onHover(elementId)`: Activa el hover sobre un elemento
   - `onHoverEnd()`: Desactiva el hover
   - `isHovered(elementId)`: Verifica si un elemento tiene hover activo

**Analogía:** Es como un sensor de movimiento. Detecta cuando el mouse está encima de algo y activa el estado correspondiente.

**Flujo:**
```
Mouse entra → onHover(elementId) → hoverElement() actualiza store → handleElementHover() ejecuta lógica
Mouse sale → onHoverEnd() → hoverElement(null) limpia store → handleElementHover(null) limpia lógica
```

---

##### **`useGardenCanvas.ts`**

**¿Qué es?** Un hook para gestionar el "lienzo" (canvas) del jardín, es decir, el contenedor principal.

**¿Qué hace?**

1. **Obtiene los elementos** y la función `resetSelection` del almacén
2. **Obtiene el orden de renderizado**
3. **Proporciona:**
   - `elements`: Lista de elementos
   - `renderOrder`: Orden de renderizado
   - `handleCanvasClick()`: Función para manejar clics fuera de los elementos (deselecciona todo)

**Analogía:** Es como el administrador del escenario. Gestiona el espacio donde están todos los elementos y puede limpiar la selección cuando haces clic en un área vacía.

---

#### 🎮 **CONTROLADORES (CONTROLLERS)**

Los controladores son archivos que contienen la lógica de negocio, separada de la lógica visual. Son como los "cerebros" que deciden qué hacer cuando ocurre algo.

##### **`interactionController.ts`**

**¿Qué es?** El controlador que maneja todas las interacciones del usuario (clics, hover, etc.).

**Funciones:**

1. **`handleElementClick(elementId, elementName)`:**
   - Se ejecuta cuando el usuario hace clic en un elemento
   - Actualmente muestra un `console.log` y un `alert` con el nombre del elemento
   - Tiene TODOs para futuras implementaciones:
     - Navegación a vista detallada
     - Llamadas al backend para obtener datos

2. **`handleElementHover(elementId)`:**
   - Se ejecuta cuando el mouse está sobre un elemento
   - Actualiza el estado de hover en el store

3. **`handleClickOutside()`:**
   - Se ejecuta cuando el usuario hace clic fuera de los elementos
   - Resetea la selección

**Analogía:** Es como el recepcionista de un hotel. Cuando alguien llega (hace clic), decide qué hacer: mostrar información, redirigir a otra habitación, etc.

**Estado actual vs futuro:**
- **Ahora:** Solo muestra alertas
- **Futuro:** Navegará a páginas de detalle, cargará datos del backend, etc.

---

##### **`layoutController.ts`**

**¿Qué es?** El controlador que gestiona todo lo relacionado con el layout (disposición) de los elementos.

**Funciones:**

1. **`getRenderOrder()`:**
   - Devuelve el orden en que se deben renderizar los elementos
   - Simplemente devuelve `GARDEN_ELEMENTS_ORDER` del registro

2. **`needsWrapper(elementId)`:**
   - Verifica si un elemento necesita un contenedor especial (wrapper)
   - Solo los círculos con `hasWrapper: true` lo necesitan

3. **`getOrderedElements()`:**
   - Devuelve todos los elementos en el orden correcto
   - Útil cuando necesitas trabajar con la lista completa

**Analogía:** Es como el arquitecto que decide dónde va cada habitación en un edificio y si alguna necesita una estructura especial.

---

### 🎨 **COMPONENTES DE UI: `src/ui/components/FrutalesButton.tsx`**

**¿Qué es?** Un botón especial que permite navegar a la vista de frutales.

**¿Qué hace?**

1. **Define el texto** del botón: "FRUTALES"
2. **Crea un botón** con:
   - La clase CSS "frutales-button" (para el estilo)
   - Un manejador de clic que actualmente muestra un alert
   - Atributos de accesibilidad
3. **Renderiza el texto** dentro de un span con la clase "frutales-text"

**Estado actual:**
- Muestra un alert cuando se hace clic
- Tiene un TODO para implementar la navegación real

**Analogía:** Es como un botón de elevador que todavía no está conectado. Tiene la apariencia y la estructura, pero la funcionalidad completa está pendiente.

---

### 🎨 **ESTILOS: `src/styles.css`**

**¿Qué es?** El archivo que contiene TODOS los estilos visuales de la aplicación. Es como el diseñador de interiores que decide cómo se ve todo.

**Secciones principales:**

1. **Layout Principal (`.page`):**
   - Ocupa toda la altura de la ventana (100vh)
   - Tiene un fondo con gradiente (cielo azul que se convierte en verde)
   - Centra el contenido

2. **Contenedor del Jardín (`.garden-container`):**
   - Usa flexbox para alinear el jardín y el botón de frutales horizontalmente
   - Tiene un gap (espacio) entre ellos

3. **El Jardín (`.garden`):**
   - Es el contenedor principal con borde marrón
   - Tiene un fondo con gradiente marrón (simula tierra)
   - Tiene una relación de aspecto específica (1141:696)
   - Tiene una línea divisoria vertical (`.garden::after`)

4. **Elementos Base (`.zone`):**
   - Estilos base que TODOS los elementos comparten
   - Borde, fondo, cursor pointer, transiciones
   - Efectos hover (cambia de color y se eleva ligeramente)
   - Efectos active (cuando se hace clic)

5. **Estilos Específicos:**
   - **`.greenhouse`**: Posición, tamaño, gradiente verde claro
   - **`.bed`**: Estilos para bancales (verticales y horizontales)
   - **`.bed-1`, `.bed-2`, etc.**: Posiciones específicas de cada bancal
   - **`.circle`**: Estilos para círculos (árboles frutales)
   - **`.circle-bottom-left`, `.circle-right-1`, etc.**: Posiciones específicas de cada círculo
   - **`.compost-main`, `.compost-small`**: Estilos para composteras
   - **`.right-bottom-rect`**: Contenedor especial para el círculo inferior derecho
   - **`.frutales-button`**: Estilos del botón de frutales (texto vertical)

6. **Media Queries:**
   - Estilos responsivos para pantallas pequeñas (móviles)
   - Cambia el layout a vertical
   - Ajusta el botón de frutales

**Analogía:** Es como el libro de estilo de una revista. Define exactamente cómo debe verse cada elemento: colores, tamaños, posiciones, efectos, etc.

**Sistema de posicionamiento:**
- Todos los elementos usan `position: absolute`
- Se posicionan usando porcentajes (top, left, right, bottom, width, height)
- Esto permite que el diseño sea responsive (se adapte a diferentes tamaños de pantalla)

---

### ⚙️ **CONFIGURACIÓN DEL PROYECTO**

#### **Scripts de Inicio**

El proyecto incluye varios scripts para facilitar el inicio de la aplicación:

- **`start-app.bat`**: Script principal que inicia ambos servidores
- **`start-app.vbs`**: Wrapper para ejecución silenciosa (usado por el acceso directo)
- **`install-shortcut.ps1`**: Crea el acceso directo en el escritorio
- **`crear-acceso-directo.bat`**: Script simple para ejecutar la instalación

Estos scripts automatizan completamente el proceso de inicio, incluyendo:
- Verificación e instalación de dependencias
- Creación del entorno virtual de Python
- Inicio de ambos servidores
- Apertura automática del navegador

#### **`package.json`**

**¿Qué es?** El archivo que describe el proyecto y sus dependencias. Es como el "DNI" de tu aplicación.

**Contiene:**

1. **Información del proyecto:**
   - Nombre: "growplanner"
   - Versión: "1.0.0"
   - Privado: true (no se publicará en npm)

2. **Scripts (comandos):**
   - `npm run dev`: Inicia el servidor de desarrollo
   - `npm run build`: Construye la aplicación para producción
   - `npm run preview`: Previsualiza la versión de producción

3. **Dependencias (librerías necesarias):**
   - `react`: La librería principal para construir interfaces
   - `react-dom`: Para renderizar React en el navegador
   - `zustand`: Para gestionar el estado global

4. **Dependencias de desarrollo:**
   - `@types/node`, `@types/react`, `@types/react-dom`: Tipos de TypeScript
   - `typescript`: El compilador de TypeScript
   - `vite`: La herramienta de construcción
   - `@vitejs/plugin-react-swc`: Plugin para React en Vite

**Analogía:** Es como la lista de materiales y herramientas que necesitas para construir una casa.

---

#### **`vite.config.ts`**

**¿Qué es?** La configuración de Vite, la herramienta que construye y sirve la aplicación.

**¿Qué hace?**

1. **Configura el plugin de React** para que Vite entienda archivos React
2. **Define el puerto del servidor de desarrollo** (5173)
3. **Configura alias de rutas:**
   - `@garden` → `./src/garden`
   - `@ui` → `./src/ui`
   - `@app` → `./src/app`
   - `@core` → `./src/core`
   
   Estos alias permiten importar archivos de forma más corta:
   ```typescript
   // En lugar de: import { ... } from '../../../garden/...'
   // Puedes hacer: import { ... } from '@garden/...'
   ```

**Analogía:** Es como la configuración de tu coche. Define cómo debe comportarse el motor (Vite) y qué rutas cortas puede usar.

---

#### **`tsconfig.json`**

**¿Qué es?** La configuración de TypeScript, el compilador que convierte TypeScript a JavaScript.

**Configuraciones importantes:**

1. **`target: "ESNext"`**: Compila a la versión más moderna de JavaScript
2. **`strict: true`**: Activa todas las verificaciones estrictas (ayuda a encontrar errores)
3. **`jsx: "react-jsx"`**: Cómo debe procesar el código JSX de React
4. **`paths`**: Define los mismos alias que Vite (para que TypeScript los entienda)

**Analogía:** Es como las reglas de un juego. TypeScript verifica que sigas las reglas antes de convertir tu código.

---

### 🐍 **BACKEND: `backend/main.py`**

**¿Qué es?** El servidor backend escrito en Python usando FastAPI.

**¿Qué hace actualmente?**

1. **Crea una aplicación FastAPI** llamada "GrowPlanner API"
2. **Configura CORS** (Cross-Origin Resource Sharing):
   - Permite que el frontend (que corre en otro puerto) se comunique con el backend
   - `allow_origins=["*"]`: Permite peticiones desde cualquier origen (en desarrollo)
3. **Define un endpoint de salud:**
   - `GET /api/health`: Devuelve `{"status": "ok"}`
   - Útil para verificar que el servidor está funcionando

**Estado actual:**
- Muy básico, solo tiene el endpoint de salud
- Preparado para futuras implementaciones (gestión de datos del jardín, cultivos, etc.)

**Analogía:** Es como un restaurante que acaba de abrir. Tiene la estructura básica (mesas, cocina), pero el menú completo todavía está en desarrollo.

**Futuras funcionalidades (según el README):**
- Guardar y cargar datos del jardín
- Gestión de cultivos por bancal
- Calendario de siembra y cosecha
- Registro de riegos y cuidados

---

## 🚀 INICIO Y EJECUCIÓN DE LA APLICACIÓN

### **Sistema de Inicio Automático**

GrowPlanner incluye un sistema completo para facilitar su inicio, permitiendo iniciar la aplicación con un simple doble clic desde el escritorio.

#### **Archivos de Inicio:**

1. **`start-app.bat`** - Script principal que:
   - Verifica e instala automáticamente dependencias de Node.js si faltan
   - Crea y configura el entorno virtual de Python si no existe
   - Instala dependencias de Python automáticamente
   - Inicia el servidor backend (puerto 8000) en una ventana separada
   - Inicia el servidor frontend (puerto 5173) en otra ventana separada
   - Abre automáticamente el navegador en `http://localhost:5173`
   - Muestra mensajes informativos durante todo el proceso

2. **`start-app.vbs`** - Wrapper silencioso que:
   - Ejecuta el script batch sin mostrar ventanas de consola molestas
   - Permite una experiencia más limpia al usuario
   - Se usa como destino del acceso directo del escritorio

3. **`install-shortcut.ps1`** - Script de instalación que:
   - Crea un acceso directo en el escritorio llamado "GrowPlanner"
   - Configura el acceso directo para ejecutar el script VBS
   - Asigna un icono apropiado
   - Solo necesita ejecutarse una vez

4. **`crear-acceso-directo.bat`** - Script simple que:
   - Ejecuta el script PowerShell de instalación
   - Facilita la creación del acceso directo para usuarios no técnicos

#### **Cómo Usar:**

**Primera vez (Instalación):**
1. Ejecutar `crear-acceso-directo.bat` o `install-shortcut.ps1`
2. Se creará el acceso directo "GrowPlanner" en el escritorio

**Uso diario:**
1. Hacer doble clic en el icono "GrowPlanner" del escritorio
2. La aplicación se iniciará automáticamente:
   - Se abrirán dos ventanas de consola (backend y frontend)
   - Se abrirá el navegador automáticamente
   - Todo estará listo para usar

**Nota:** La primera ejecución puede tardar más tiempo ya que instalará dependencias si es necesario. Las siguientes ejecuciones serán más rápidas.

---

## 🔄 FLUJO COMPLETO DE LA APLICACIÓN

### 1. **Inicio de la Aplicación**

**Desde el acceso directo:**
```
1. Usuario hace doble clic en "GrowPlanner" del escritorio
2. start-app.vbs ejecuta start-app.bat silenciosamente
3. start-app.bat verifica e instala dependencias si es necesario
4. start-app.bat inicia el servidor backend (puerto 8000)
5. start-app.bat inicia el servidor frontend (puerto 5173)
6. start-app.bat abre el navegador en http://localhost:5173
```

**Carga en el navegador:**
```
1. El navegador carga index.html
2. index.html carga main.tsx
3. main.tsx busca el elemento #root
4. main.tsx renderiza <App />
5. App renderiza <GardenLayout /> y <FrutalesButton />
6. GardenLayout obtiene el orden de renderizado
7. GardenLayout crea un GardenElement para cada elemento
8. Cada GardenElement se renderiza con sus estilos CSS
9. La aplicación está lista para interactuar
```

### 2. **Interacción del Usuario: Hover**

```
1. Usuario pasa el mouse sobre un elemento
2. GardenElement detecta onMouseEnter
3. Llama a handleMouseEnter()
4. handleMouseEnter() llama a onHover(element.id)
5. onHover() actualiza el store con hoverElement(elementId)
6. El store notifica a todos los componentes suscritos
7. Los estilos CSS :hover se activan automáticamente
8. El elemento cambia de color y se eleva ligeramente
```

### 3. **Interacción del Usuario: Clic**

```
1. Usuario hace clic en un elemento
2. GardenElement detecta onClick
3. Llama a handleClick()
4. handleClick() llama a select(element.id)
5. select() actualiza el store con selectElement(elementId)
6. select() llama a handleElementClick() para la lógica de negocio
7. handleElementClick() muestra un alert con el nombre del elemento
8. El store notifica a todos los componentes
9. Si hubiera lógica de selección visual, se activaría aquí
```

### 4. **Interacción del Usuario: Clic Fuera**

```
1. Usuario hace clic en un área vacía del jardín
2. (Futuro: handleCanvasClick() se ejecutaría)
3. handleClickOutside() se llama
4. resetSelection() limpia selectedElementId y hoveredElementId
5. El store notifica a todos los componentes
6. Todos los elementos se deseleccionan
```

---

## 🎯 CONCEPTOS CLAVE EXPLICADOS

### **React Components (Componentes React)**

**¿Qué son?** Son como bloques de construcción reutilizables. Cada componente es una pieza de la interfaz que puede tener su propia lógica y estilo.

**Analogía:** Son como piezas de LEGO. Puedes combinar diferentes piezas para construir algo más grande.

**En este proyecto:**
- `App`: El bloque principal
- `GardenLayout`: El bloque que contiene el jardín
- `GardenElement`: Un bloque reutilizable para cada elemento
- `FrutalesButton`: Un bloque para el botón de navegación

---

### **State Management (Gestión de Estado) con Zustand**

**¿Qué es?** Una forma de guardar y compartir información entre diferentes partes de la aplicación.

**¿Por qué es importante?** Sin esto, cada componente tendría su propia información y no podrían comunicarse entre sí.

**Analogía:** Es como una pizarra compartida en una oficina. Cualquiera puede leer lo que hay escrito y actualizarlo, y todos ven los cambios en tiempo real.

**En este proyecto:**
- El store guarda: qué elemento está seleccionado, sobre cuál está el mouse, y la lista de elementos
- Cualquier componente puede leer o modificar esta información

---

### **TypeScript Types (Tipos de TypeScript)**

**¿Qué son?** Son como "etiquetas" que le dices a TypeScript qué tipo de dato esperas.

**¿Por qué son útiles?** Ayudan a prevenir errores. Si intentas usar un dato de forma incorrecta, TypeScript te avisa antes de que el código se ejecute.

**Analogía:** Es como tener etiquetas en cajas. Sabes qué hay dentro sin abrirlas, y si intentas poner algo incorrecto, te avisan.

**En este proyecto:**
- `GardenElementId`: Solo puede ser uno de los IDs definidos
- `GardenElement`: Debe tener las propiedades correctas según su tipo
- Esto previene errores como usar un ID que no existe o olvidar una propiedad requerida

---

### **CSS Positioning (Posicionamiento CSS)**

**¿Qué es?** La forma en que CSS coloca los elementos en la pantalla.

**Tipos usados en este proyecto:**

1. **`position: absolute`**: Coloca el elemento en una posición exacta relativa a su contenedor padre
   - Usado para todos los elementos del jardín
   - Permite posicionarlos con `top`, `left`, `right`, `bottom`

2. **`position: relative`**: El contenedor `.garden` es relativo, así que todos los elementos absolutos se posicionan respecto a él

**Analogía:** Es como tener un mapa y colocar chinchetas en posiciones exactas. El mapa es el contenedor relativo, y las chinchetas son los elementos absolutos.

---

### **Hooks de React**

**¿Qué son?** Funciones especiales que te permiten "engancharte" a características de React, como el estado o el ciclo de vida.

**Hooks usados en este proyecto:**

1. **`useCallback`**: Memoriza una función para que no se recree en cada render
   - Útil para optimización
   - Usado en los hooks personalizados

2. **Hooks personalizados**: Funciones que combinan otros hooks
   - `useElementSelection`: Combina el store y la lógica de selección
   - `useElementHover`: Combina el store y la lógica de hover

**Analogía:** Son como herramientas especializadas. Cada hook es una herramienta diferente para una tarea específica.

---

## 🗺️ DIAGRAMA DE FLUJO DE DATOS

```
┌─────────────────────────────────────────────────────────┐
│                    USUARIO                              │
│              (Hace clic, pasa mouse)                    │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              GardenElement Component                     │
│  (Detecta la interacción: onClick, onMouseEnter)        │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Hooks Personalizados                        │
│  useElementSelection() o useElementHover()                │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Garden Store (Zustand)                      │
│  (Actualiza: selectedElementId, hoveredElementId)       │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Controllers                                 │
│  handleElementClick() o handleElementHover()             │
│  (Ejecuta lógica de negocio)                            │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│              Componentes se Re-renderizan                │
│  (React detecta cambios en el store y actualiza UI)    │
└─────────────────────────────────────────────────────────┘
```

---

## 📊 ESTRUCTURA DE DATOS

### **Ejemplo de un Elemento Completo:**

```javascript
{
  id: 'bed-1',                    // Identificador único
  type: 'bed',                    // Tipo de elemento
  name: 'Bancal 1',               // Nombre interno
  displayName: 'Bancal 1',        // Nombre que ve el usuario
  orientation: 'vertical',        // Propiedad específica de bancales
  className: 'zone bed bed-vertical bed-1'  // Clases CSS
}
```

### **Estado del Store:**

```javascript
{
  elements: [                     // Array de todos los elementos
    { id: 'greenhouse', ... },
    { id: 'bed-1', ... },
    // ... más elementos
  ],
  selectedElementId: 'bed-1',     // ID del elemento seleccionado (o null)
  hoveredElementId: null          // ID del elemento con hover (o null)
}
```

---

## 🚀 PRÓXIMOS PASOS (Según el README)

1. **Navegación entre vistas**: Implementar React Router para cambiar entre diferentes páginas
2. **Conexión Frontend-Backend**: Hacer que el frontend se comunique con el backend para guardar/cargar datos
3. **Vista detallada**: Crear páginas que muestren información detallada de cada elemento
4. **Gestión de cultivos**: Permitir añadir, editar y eliminar cultivos en cada bancal
5. **Calendario**: Sistema para gestionar fechas de siembra y cosecha
6. **Registro de cuidados**: Sistema para anotar riegos, fertilizaciones, etc.

---

## 🎓 RESUMEN FINAL

**GrowPlanner** es una aplicación web moderna que:

1. **Muestra un plano interactivo** de un huerto con diferentes zonas
2. **Permite interactuar** con cada zona (hover, clic)
3. **Gestiona el estado** de forma centralizada usando Zustand
4. **Está preparada para crecer** con funcionalidades futuras (backend, navegación, etc.)

**Arquitectura:**
- **Frontend**: React + TypeScript + Vite (rápido y moderno)
- **Estado**: Zustand (simple y eficiente)
- **Backend**: Python + FastAPI (preparado para futuras funcionalidades)
- **Estilos**: CSS puro con variables y gradientes (sin dependencias adicionales)

**Principios de diseño:**
- **Separación de responsabilidades**: Cada archivo tiene una función clara
- **Reutilización**: Componentes genéricos en lugar de duplicar código
- **Type Safety**: TypeScript previene errores
- **Escalabilidad**: Fácil añadir nuevos elementos o funcionalidades

---

¡Espero que esta explicación te haya ayudado a entender completamente cómo funciona GrowPlanner! Si tienes alguna pregunta específica sobre algún componente, no dudes en preguntar. 🌱

