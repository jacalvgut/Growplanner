export type GardenElementType =
  | 'bed'
  | 'tree'
  | 'compost'
  | 'greenhouse'
  | 'circle'
  | 'fence'
  | 'gate'
  | 'path';

export type GardenElementShape = 'rect' | 'circle';

export interface GardenDesignElement {
  id: string;
  type: GardenElementType;
  label: string;
  // Para elementos rect/circle
  shape?: GardenElementShape;
  xPct?: number;
  yPct?: number;
  wPct?: number;
  hPct?: number;

  // Para elementos lineales (vallado/puerta/camino)
  x1Pct?: number;
  y1Pct?: number;
  x2Pct?: number;
  y2Pct?: number;
  thicknessPct?: number; // camino principalmente
  gateSwingDeg?: number; // puerta (arco)
  gateHinge?: 'start' | 'end';

  rotationDeg?: number | null;
}

export interface Garden {
  id: string;
  name: string;
  updatedAt: string;
  showFrutalesButton: boolean;
  fruitTrees: { id: string; name: string; displayName: string }[];
  elements: GardenDesignElement[];
}

export interface GardenSummary {
  id: string;
  name: string;
  updatedAt: string;
  showFrutalesButton: boolean;
}

