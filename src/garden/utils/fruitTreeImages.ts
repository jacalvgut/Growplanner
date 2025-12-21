/**
 * Importaciones estáticas de imágenes de árboles frutales
 * Vite necesita importaciones estáticas para procesar las imágenes correctamente
 */

// Importar todas las imágenes disponibles usando import.meta.glob
// Esto permite que Vite procese las imágenes en tiempo de compilación
// La ruta es relativa desde este archivo (src/garden/utils/) hasta src/assets/images/fruit-trees/
const images = import.meta.glob<{ default: string }>(
  '../../assets/images/fruit-trees/*.{jpg,jpeg,png}',
  { eager: true }
);

// Debug: mostrar imágenes encontradas
if (import.meta.env.DEV) {
  console.log('[FruitTreeImages] Imágenes encontradas:', Object.keys(images));
}

/**
 * Obtiene la ruta de una imagen por su nombre de archivo (sin extensión)
 */
function getImagePath(filename: string): string | null {
  // Buscar la imagen en el objeto de importaciones
  for (const [path, module] of Object.entries(images)) {
    // Extraer el nombre del archivo de la ruta
    const pathParts = path.split('/');
    const fullFileName = pathParts[pathParts.length - 1];
    const fileName = fullFileName.replace(/\.(jpg|jpeg|png)$/i, '');
    
    if (fileName.toLowerCase() === filename.toLowerCase()) {
      return module.default;
    }
  }
  
  return null;
}

/**
 * Mapeo de nombres de árboles a posibles nombres de archivo
 * Permite variaciones en los nombres de archivo
 */
const treeToImageMap: Record<string, string[]> = {
  'aguacaterohash': ['aguacaterohash', 'aguacatero'], // Si solo hay un aguacatero.png, se usará para ambos
  'aguacaterocuba': ['aguacaterocuba', 'aguacatero'],
  'naranjero1': ['naranjero1', 'naranjero'],
  'naranjero2': ['naranjero2', 'naranjero'],
  'peral': ['peral'],
  'manzanero': ['manzanero'],
  'ciruelero': ['ciruelero'],
  'limonero': ['limonero'],
  'mandarino': ['mandarino'],
};

/**
 * Obtiene la ruta de la imagen de un árbol frutal
 */
export function getFruitTreeImageSrc(tree: { name: string }): string | null {
  // Normalizar el nombre del árbol
  const normalized = tree.name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '')
    .trim();
  
  // Obtener posibles nombres de archivo
  const possibleNames = treeToImageMap[normalized] || [normalized];
  
  // Intentar encontrar la imagen con cada nombre posible
  for (const imageName of possibleNames) {
    // Intentar primero con .jpg
    const jpgPath = getImagePath(imageName);
    if (jpgPath) {
      return jpgPath;
    }
    
    // Intentar con .png
    const pngPath = getImagePath(imageName);
    if (pngPath) {
      return pngPath;
    }
  }
  
  return null;
}

