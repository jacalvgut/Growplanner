/**
 * Formulario para añadir una o múltiples plantas
 */
import React, { useState } from 'react';
import { GardenElement, CreatePlantData, CreateMultiplePlantsData, SeedOrigin } from '../../types';
import { useCultivation } from '../../hooks/useCultivation';
import { useElementDetail } from '../../hooks/useElementDetail';

interface PlantFormProps {
  element: GardenElement;
  onClose: () => void;
}

/**
 * Formulario de creación de plantas
 */
export const PlantForm: React.FC<PlantFormProps> = ({ element, onClose }) => {
  const { addPlant, addMultiplePlants } = useCultivation(element.id);
  const detailData = useElementDetail(element.id);
  const [count, setCount] = useState(1);
  const [commonName, setCommonName] = useState('');
  const [variety, setVariety] = useState('');
  const [plantedDate, setPlantedDate] = useState(new Date().toISOString().split('T')[0]);
  const [germinatedFromSeed, setGerminatedFromSeed] = useState(true);
  const [seedOrigin, setSeedOrigin] = useState<SeedOrigin>('propia');
  const [seedOriginDetails, setSeedOriginDetails] = useState('');
  const [notes, setNotes] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (count === 1) {
        const data: CreatePlantData = {
          commonName,
          variety,
          position: { x: 50, y: 50 }, // Posición por defecto
          plantedDate,
          germinatedFromSeed,
          seedOrigin: germinatedFromSeed ? seedOrigin : undefined,
          seedOriginDetails: germinatedFromSeed ? seedOriginDetails : undefined,
          notes,
        };
        await addPlant(data);
      } else {
        const data: CreateMultiplePlantsData = {
          count,
          commonName,
          variety,
          plantedDate,
          germinatedFromSeed,
          seedOrigin: germinatedFromSeed ? seedOrigin : undefined,
          seedOriginDetails: germinatedFromSeed ? seedOriginDetails : undefined,
          notes,
        };
        await addMultiplePlants(data);
      }
      // Recargar datos después de crear
      if (detailData.reload) {
        await detailData.reload();
      }
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la planta');
      console.error('Error creating plant:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Añadir {count > 1 ? 'Plantas' : 'Planta'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cantidad:</label>
            <input
              type="number"
              min="1"
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value) || 1)}
              required
            />
          </div>
          <div className="form-group">
            <label>Nombre común:</label>
            <input
              type="text"
              value={commonName}
              onChange={(e) => setCommonName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Variedad:</label>
            <input
              type="text"
              value={variety}
              onChange={(e) => setVariety(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Fecha de plantado:</label>
            <input
              type="date"
              value={plantedDate}
              onChange={(e) => setPlantedDate(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={germinatedFromSeed}
                onChange={(e) => setGerminatedFromSeed(e.target.checked)}
              />
              Germinado desde semilla
            </label>
          </div>
          {germinatedFromSeed && (
            <>
              <div className="form-group">
                <label>Origen de la semilla:</label>
                <select
                  value={seedOrigin}
                  onChange={(e) => setSeedOrigin(e.target.value as SeedOrigin)}
                >
                  <option value="propia">Propia</option>
                  <option value="comprada">Comprada</option>
                  <option value="intercambio">Intercambio</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="form-group">
                <label>Detalles del origen:</label>
                <input
                  type="text"
                  value={seedOriginDetails}
                  onChange={(e) => setSeedOriginDetails(e.target.value)}
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Notas:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
          {error && (
            <div className="form-error" style={{ color: 'red', marginBottom: '1rem' }}>
              {error}
            </div>
          )}
          <div className="form-actions">
            <button type="button" onClick={onClose} disabled={loading}>
              Cancelar
            </button>
            <button type="submit" disabled={loading}>
              {loading ? 'Añadiendo...' : 'Añadir'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

