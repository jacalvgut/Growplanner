# Instrucciones para iniciar el Backend

## Problema: Backend no disponible

Si ves el error "No se puede conectar con el servidor", significa que el backend no está corriendo.

## Solución Rápida

### Opción 1: Usar el script de inicio (Recomendado)

Ejecuta desde la raíz del proyecto:
```bash
scripts\start-app.bat
```

Este script iniciará automáticamente tanto el frontend como el backend.

### Opción 2: Iniciar manualmente el backend

1. Abre una terminal en la raíz del proyecto
2. Navega al directorio backend:
   ```bash
   cd backend
   ```
3. Activa el entorno virtual:
   ```bash
   venv\Scripts\activate
   ```
4. Inicia el servidor:
   ```bash
   python -m uvicorn main:app --reload --port 8000
   ```

Deberías ver un mensaje como:
```
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

## Verificar que el backend está funcionando

Abre en tu navegador: http://localhost:8000/api/health

Deberías ver: `{"status":"ok"}`

## Notas

- El backend debe estar corriendo en el puerto 8000
- El frontend se conecta automáticamente a http://localhost:8000/api
- Si cambias el puerto, actualiza la variable `VITE_API_URL` en un archivo `.env`

