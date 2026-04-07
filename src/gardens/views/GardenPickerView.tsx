import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { GardenSummary } from '../types';
import * as gardenService from '../services/gardenService';

export const GardenPickerView: React.FC = () => {
  const navigate = useNavigate();
  const [gardens, setGardens] = useState<GardenSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newName, setNewName] = useState('Nueva huerta');
  const [newShowFrutales, setNewShowFrutales] = useState(true);

  const sortedGardens = useMemo(() => {
    if (!gardens) return [];
    return [...gardens].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }, [gardens]);

  const reload = async () => {
    const list = await gardenService.listGardens();
    setGardens(list);
  };

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const list = await gardenService.listGardens();
        if (!cancelled) setGardens(list);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleOpen = (gardenId: string) => {
    navigate(`/garden/${gardenId}`);
  };

  const handleCreate = async () => {
    // Importante: NO crear en backend hasta que el usuario guarde en el editor.
    navigate('/garden/new/edit', {
      state: {
        draft: {
          name: newName.trim() || 'Nueva huerta',
          showFrutalesButton: newShowFrutales,
        },
      },
    });
  };

  const handleDelete = async (gardenId: string, gardenName: string) => {
    // Protección extra: no borrar la huerta base.
    if (gardenId === 'default') return;
    const ok1 = window.confirm(`¿Eliminar la huerta "${gardenName}"?\n\nEsta acción no se puede deshacer.`);
    if (!ok1) return;
    const ok2 = window.confirm(`Confirmación final:\n\n¿Seguro que quieres ELIMINAR "${gardenName}"?`);
    if (!ok2) return;
    try {
      setError(null);
      await gardenService.deleteGarden(gardenId);
      await reload();
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  };

  return (
    <div className="page">
      <div className="garden-picker">
        <header className="garden-picker__header">
          <h1 className="garden-picker__title">Seleccionar huerta</h1>
          <p className="garden-picker__subtitle">
            Elige una huerta existente o crea una nueva.
          </p>
        </header>

        {error && <div className="garden-picker__error">{error}</div>}

        <section className="garden-picker__section">
          <h2 className="garden-picker__sectionTitle">Tus huertas</h2>
          {gardens === null ? (
            <div className="garden-picker__loading">Cargando…</div>
          ) : sortedGardens.length === 0 ? (
            <div className="garden-picker__empty">No hay huertas todavía.</div>
          ) : (
            <div className="garden-picker__grid">
              {sortedGardens.map((g) => (
                <div key={g.id} className="garden-cardWrap">
                  <button className="garden-card" onClick={() => handleOpen(g.id)}>
                    <div className="garden-card__name">{g.name}</div>
                    <div className="garden-card__meta">
                      Actualizada: {new Date(g.updatedAt).toLocaleString()}
                    </div>
                    <div className="garden-card__meta">
                      Frutales: <strong>{g.showFrutalesButton ? 'Sí' : 'No'}</strong>
                    </div>
                  </button>
                  <button
                    className="garden-card__delete"
                    onClick={() => handleDelete(g.id, g.name)}
                    disabled={g.id === 'default'}
                    aria-label={`Eliminar huerta ${g.name}`}
                    title={g.id === 'default' ? 'No se puede eliminar la huerta base' : 'Eliminar huerta'}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="garden-picker__section">
          <h2 className="garden-picker__sectionTitle">Crear nueva huerta</h2>
          <div className="garden-picker__create">
            <input
              className="garden-picker__input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Nombre de la huerta"
              disabled={creating}
            />
            <label className="garden-picker__checkbox">
              <input
                type="checkbox"
                checked={newShowFrutales}
                onChange={(e) => setNewShowFrutales(e.target.checked)}
                disabled={creating}
              />
              Mostrar botón Frutales
            </label>
            <button
              className="garden-picker__primary"
              onClick={handleCreate}
              disabled={creating}
            >
              {creating ? 'Creando…' : 'Nueva huerta'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

