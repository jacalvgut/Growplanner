/**
 * Utilidades para transformar datos entre camelCase (frontend) y snake_case (backend)
 */

/**
 * Convierte un objeto de camelCase a snake_case
 */
export function camelToSnake(obj: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
    
    // Si el valor es un objeto, convertirlo recursivamente
    if (value && typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date)) {
      result[snakeKey] = camelToSnake(value as Record<string, unknown>);
    } else {
      result[snakeKey] = value;
    }
  }
  
  return result;
}

/**
 * Convierte datos de planta de camelCase a snake_case para el backend
 */
export function plantDataToSnakeCase(data: {
  commonName?: string;
  variety?: string;
  position?: { x: number; y: number };
  plantedDate?: string;
  germinatedFromSeed?: boolean;
  seedOrigin?: string;
  seedOriginDetails?: string;
  notes?: string;
}): {
  common_name: string;
  variety: string;
  position: { x: number; y: number };
  planted_date: string;
  germinated_from_seed: boolean;
  seed_origin?: string;
  seed_origin_details?: string;
  notes?: string;
} {
  return {
    common_name: data.commonName || '',
    variety: data.variety || '',
    position: data.position || { x: 50, y: 50 },
    planted_date: data.plantedDate || new Date().toISOString().split('T')[0],
    germinated_from_seed: data.germinatedFromSeed ?? true,
    seed_origin: data.seedOrigin,
    seed_origin_details: data.seedOriginDetails,
    notes: data.notes,
  };
}

/**
 * Convierte actualizaciones de planta de camelCase a snake_case
 */
export function plantUpdatesToSnakeCase(updates: Record<string, unknown>): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  
  for (const [key, value] of Object.entries(updates)) {
    if (key === 'isPlanted') {
      result['is_planted'] = value;
    } else if (key === 'commonName') {
      result['common_name'] = value;
    } else if (key === 'plantedDate') {
      result['planted_date'] = value;
    } else if (key === 'germinatedFromSeed') {
      result['germinated_from_seed'] = value;
    } else if (key === 'seedOrigin') {
      result['seed_origin'] = value;
    } else if (key === 'seedOriginDetails') {
      result['seed_origin_details'] = value;
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

/**
 * Convierte datos de múltiples plantas de camelCase a snake_case
 */
export function multiplePlantsDataToSnakeCase(data: {
  count?: number;
  commonName?: string;
  variety?: string;
  plantedDate?: string;
  germinatedFromSeed?: boolean;
  seedOrigin?: string;
  seedOriginDetails?: string;
  notes?: string;
}): {
  count: number;
  common_name: string;
  variety: string;
  planted_date: string;
  germinated_from_seed: boolean;
  seed_origin?: string;
  seed_origin_details?: string;
  notes?: string;
} {
  return {
    count: data.count || 1,
    common_name: data.commonName || '',
    variety: data.variety || '',
    planted_date: data.plantedDate || new Date().toISOString().split('T')[0],
    germinated_from_seed: data.germinatedFromSeed ?? true,
    seed_origin: data.seedOrigin,
    seed_origin_details: data.seedOriginDetails,
    notes: data.notes,
  };
}

