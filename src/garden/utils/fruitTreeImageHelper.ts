/**
 * Utilidades para obtener rutas de imágenes de árboles frutales
 */
import { FruitTree } from '../types';

/**
 * Normaliza el nombre del árbol para obtener el nombre del archivo de imagen
 * Elimina tildes, espacios y convierte a minúsculas
 */
function normalizeImageName(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Elimina tildes
    .replace(/\s+/g, '') // Elimina espacios
    .trim();
}

/**
 * Mapeo de nombres de árboles a nombres de archivo de imagen
 * Permite flexibilidad si los nombres no coinciden exactamente
 */
const imageNameMap: Record<string, string[]> = {
  'aguacaterohash': ['aguacaterohash', 'aguacatero'], // Permite variaciones
  'aguacaterocuba': ['aguacaterocuba', 'aguacatero'],
  'naranjero1': ['naranjero1', 'naranjero'],
  'naranjero2': ['naranjero2', 'naranjero'],
  'peral': ['peral'],
  'manzanero': ['manzanero'],
  'ciruelero': ['ciruelero'],
  'limonero': ['limonero'],
};

/**
 * Obtiene posibles nombres de archivo para un árbol
 */
function getPossibleImageNames(tree: FruitTree): string[] {
  const normalized = normalizeImageName(tree.name);
  return imageNameMap[normalized] || [normalized];
}

/**
 * Obtiene la ruta de la imagen de un árbol frutal usando import.meta.url
 * Las imágenes deben estar en src/assets/images/fruit-trees/
 */
export function getFruitTreeImageSrc(tree: FruitTree): string {
  const possibleNames = getPossibleImageNames(tree);
  
  // Intentar con cada nombre posible
  for (const baseName of possibleNames) {
    try {
      // Usar new URL con import.meta.url para rutas relativas
      // Vite procesará estas rutas correctamente
      const imageUrl = new URL(
        `../../assets/images/fruit-trees/${baseName}.jpg`,
        import.meta.url
      );
      return imageUrl.href;
    } catch (error) {
      // Continuar con el siguiente nombre
      continue;
    }
  }
  
  // Si no se encuentra, retornar la ruta del primer nombre intentado
  const firstTry = possibleNames[0];
  const fallbackUrl = new URL(
    `../../assets/images/fruit-trees/${firstTry}.jpg`,
    import.meta.url
  );
  
  if (import.meta.env.DEV) {
    console.log(`[FruitTree] ${tree.displayName} -> Intentando: ${firstTry}.jpg`);
  }
  
  return fallbackUrl.href;
}

/**
 * Obtiene la ruta alternativa de la imagen (PNG)
 * Se usa cuando la imagen JPG no está disponible
 */
export function getFruitTreeImageSrcPng(tree: FruitTree): string {
  const possibleNames = getPossibleImageNames(tree);
  
  for (const baseName of possibleNames) {
    try {
      const imageUrl = new URL(
        `../../assets/images/fruit-trees/${baseName}.png`,
        import.meta.url
      );
      return imageUrl.href;
    } catch (error) {
      continue;
    }
  }
  
  const firstTry = possibleNames[0];
  const fallbackUrl = new URL(
    `../../assets/images/fruit-trees/${firstTry}.png`,
    import.meta.url
  );
  
  if (import.meta.env.DEV) {
    console.log(`[FruitTree] ${tree.displayName} -> Intentando PNG: ${firstTry}.png`);
  }
  
  return fallbackUrl.href;
}

