# Instrucciones para agregar imágenes

## Ubicación
Las imágenes deben estar en esta carpeta: `public/images/fruit-trees/`

## Nombres de archivo requeridos

Los nombres deben ser **exactamente** como se muestra a continuación (sin tildes, sin espacios, en minúsculas):

1. `aguacaterohash.jpg` o `aguacaterohash.png` - Para "Aguacatero Hash"
2. `aguacaterocuba.jpg` o `aguacaterocuba.png` - Para "Aguacatero Cuba"
3. `naranjero1.jpg` o `naranjero1.png` - Para "Naranjero 1"
4. `naranjero2.jpg` o `naranjero2.png` - Para "Naranjero 2"
5. `peral.jpg` o `peral.png` - Para "Peral"
6. `manzanero.jpg` o `manzanero.png` - Para "Manzanero"
7. `ciruelero.jpg` o `ciruelero.png` - Para "Ciruelero"
8. `limonero.jpg` o `limonero.png` - Para "Limonero"

## Formato
- Extensiones soportadas: `.jpg`, `.jpeg`, `.png`
- Se intentará cargar primero `.jpg`, luego `.png` si el `.jpg` no existe
- Si no se encuentra ninguna imagen, se mostrará un placeholder con un icono 🌳

## Verificación
Después de agregar las imágenes:
1. Reinicia el servidor de desarrollo (Ctrl+C y luego `npm run dev`)
2. Abre la consola del navegador (F12) para ver los logs de depuración
3. Las rutas generadas aparecerán en la consola

## Solución de problemas

Si las imágenes no se ven:
1. Verifica que los nombres sean exactamente como se muestra arriba (sin espacios, sin tildes, minúsculas)
2. Verifica que las imágenes estén en `public/images/fruit-trees/` (no en `src/assets/`)
3. Reinicia el servidor de desarrollo
4. Revisa la consola del navegador para ver qué rutas se están intentando cargar

