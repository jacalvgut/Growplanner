import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { Garden } from '../types';
import * as gardenService from '../services/gardenService';
import { AddFruitTreeCard } from '../../garden/components/frutales/AddFruitTreeCard';

export const GardenFrutalesView: React.FC = () => {
  const { gardenId } = useParams<{ gardenId: string }>();
  const navigate = useNavigate();
  const [garden, setGarden] = React.useState<Garden | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!gardenId) return;
    let cancelled = false;
    (async () => {
      try {
        const g = await gardenService.getGarden(gardenId);
        if (!cancelled) setGarden(g);
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : String(e));
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [gardenId]);

  if (!gardenId) {
    navigate('/');
    return null;
  }

  const handleBack = () => navigate(`/garden/${gardenId}`);

  const handleAddTree = async (treeData: { name: string; displayName: string }) => {
    if (!garden) return;
    const id = `custom-${Date.now()}`;
    const next = [...(garden.fruitTrees ?? []), { id, name: treeData.name, displayName: treeData.displayName }];
    const saved = await gardenService.updateGarden(gardenId, { fruitTrees: next });
    setGarden(saved);
  };

  const handleRemoveTree = async (treeId: string, displayName: string) => {
    if (!garden) return;
    const ok = window.confirm(`¿Eliminar "${displayName}" de esta huerta?`);
    if (!ok) return;
    const next = (garden.fruitTrees ?? []).filter((t) => t.id !== treeId);
    const saved = await gardenService.updateGarden(gardenId, { fruitTrees: next });
    setGarden(saved);
  };

  return (
    <div className="frutales-page">
      <div className="frutales-container">
        <header className="frutales-header">
          <button className="back-button" onClick={handleBack} aria-label="Volver a la huerta">
            ← Volver a la Huerta
          </button>
          <h1 className="frutales-title">Árboles Frutales</h1>
        </header>

        {error && <div style={{ marginBottom: '1rem' }}>{error}</div>}

        <div className="frutales-grid">
          {(garden?.fruitTrees ?? []).map((tree) => (
            <div key={tree.id} className="fruit-tree-card-wrapper">
              <button
                className="fruit-tree-card"
                onClick={() => {}}
                aria-label={`Árbol ${tree.displayName}`}
              >
                <div className="fruit-tree-card-content">
                  <div className="fruit-tree-placeholder">
                    <span className="fruit-tree-icon">🌳</span>
                  </div>
                </div>
              </button>
              <button
                className="fruit-tree-remove"
                onClick={() => handleRemoveTree(tree.id, tree.displayName)}
                aria-label={`Eliminar ${tree.displayName}`}
                title="Eliminar"
              >
                Eliminar
              </button>
              <span className="fruit-tree-name">{tree.displayName}</span>
            </div>
          ))}
          <AddFruitTreeCard onAdd={handleAddTree} />
        </div>
      </div>
    </div>
  );
};

