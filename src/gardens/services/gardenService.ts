import type { Garden, GardenSummary, GardenDesignElement } from '../types';

async function requestJson<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`/api${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(`API Error: ${res.status} ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function listGardens(): Promise<GardenSummary[]> {
  return requestJson<GardenSummary[]>('/gardens');
}

export async function getGarden(gardenId: string): Promise<Garden> {
  return requestJson<Garden>(`/gardens/${encodeURIComponent(gardenId)}`);
}

export async function createGarden(name: string): Promise<Garden> {
  return requestJson<Garden>('/gardens', {
    method: 'POST',
    body: JSON.stringify({ name }),
  });
}

export async function updateGarden(
  gardenId: string,
  updates: {
    name?: string;
    elements?: GardenDesignElement[];
    showFrutalesButton?: boolean;
    fruitTrees?: { id: string; name: string; displayName: string }[];
  }
): Promise<Garden> {
  return requestJson<Garden>(`/gardens/${encodeURIComponent(gardenId)}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}

export async function deleteGarden(gardenId: string): Promise<void> {
  await requestJson(`/gardens/${encodeURIComponent(gardenId)}`, { method: 'DELETE' });
}

export async function createGardenWithOptions(opts: {
  name: string;
  showFrutalesButton: boolean;
  elements?: GardenDesignElement[];
}): Promise<Garden> {
  return requestJson<Garden>('/gardens', {
    method: 'POST',
    body: JSON.stringify(opts),
  });
}

export async function createDefaultGardenDraft(opts: {
  name: string;
  showFrutalesButton: boolean;
}): Promise<Garden> {
  // Draft local (aún no persistido). Simula la plantilla base del backend.
  const now = new Date().toISOString();
  return {
    id: 'new',
    name: opts.name,
    updatedAt: now,
    showFrutalesButton: opts.showFrutalesButton,
    elements: [],
  };
}

