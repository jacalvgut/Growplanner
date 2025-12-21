/**
 * Formulario para añadir un nuevo árbol frutal
 */
import React, { useState } from 'react';

interface AddFruitTreeFormProps {
  onClose: () => void;
  onSubmit: (tree: { name: string; displayName: string }) => void;
}

/**
 * Formulario de añadir árbol frutal
 */
export const AddFruitTreeForm: React.FC<AddFruitTreeFormProps> = ({
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('El nombre es obligatorio');
      return;
    }

    if (!displayName.trim()) {
      setError('El nombre para mostrar es obligatorio');
      return;
    }

    onSubmit({
      name: name.trim(),
      displayName: displayName.trim(),
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Añadir Nuevo Árbol Frutal</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="tree-name">Nombre del árbol:</label>
            <input
              id="tree-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Cerezo"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="tree-display-name">Nombre para mostrar:</label>
            <input
              id="tree-display-name"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Ej: Cerezo"
              required
            />
          </div>
          {error && (
            <div className="form-error" style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">
              Añadir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

