/**
 * Vista principal de árboles frutales
 * Muestra un grid de árboles + botón para añadir más
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getFruitTreesInOrder } from '../constants/fruitTrees';
import { FruitTree, FruitTreeId } from '../types';
import { getFruitTreeImageSrc } from '../utils/fruitTreeImages';
import { useFruitTreesStore } from '../store/fruitTreesStore';
import { AddFruitTreeCard } from '../components/frutales/AddFruitTreeCard';

/**
 * Componente de tarjeta de árbol frutal
 */
interface FruitTreeCardProps {
  tree: FruitTree;
  onSelect: (treeId: string) => void;
}

const FruitTreeCard: React.FC<FruitTreeCardProps> = ({ tree, onSelect }) => {
  const imageSrc = getFruitTreeImageSrc(tree);
  const [imageError, setImageError] = React.useState(false);

  // Debug: mostrar ruta generada
  React.useEffect(() => {
    if (imageSrc) {
      console.log(`[FruitTreeCard] ${tree.displayName} -> ${imageSrc}`);
    } else {
      console.warn(`[FruitTreeCard] No se encontró imagen para ${tree.displayName}`);
    }
  }, [tree.displayName, imageSrc]);

  const handleImageError = () => {
    setImageError(true);
    console.warn(`[FruitTreeCard] Error al cargar imagen para ${tree.displayName}:`, imageSrc);
  };

  return (
    <div className="fruit-tree-card-wrapper">
      <button
        className="fruit-tree-card"
        onClick={() => onSelect(tree.id)}
        aria-label={`Ver detalles de ${tree.displayName}`}
      >
        <div className="fruit-tree-card-content">
          {!imageError && imageSrc ? (
            <img
              src={imageSrc}
              alt={tree.displayName}
              className="fruit-tree-image"
              onError={handleImageError}
            />
          ) : (
            <div className="fruit-tree-placeholder">
              <span className="fruit-tree-icon">🌳</span>
            </div>
          )}
        </div>
      </button>
      <span className="fruit-tree-name">{tree.displayName}</span>
    </div>
  );
};

/**
 * Vista principal de frutales
 */
export const FrutalesView: React.FC = () => {
  const navigate = useNavigate();
  const baseTrees = getFruitTreesInOrder();
  const { customTrees, addCustomTree } = useFruitTreesStore();
  
  // Combinar árboles base con árboles personalizados
  const allTrees = [...baseTrees, ...customTrees];

  const handleTreeSelect = (treeId: string) => {
    navigate(`/frutales/${treeId}`);
  };

  const handleBackToGarden = () => {
    navigate('/');
  };

  const handleAddTree = (treeData: { name: string; displayName: string }) => {
    // Generar un ID único para el nuevo árbol
    const newId = `custom-${Date.now()}` as FruitTreeId;
    const newTree: FruitTree = {
      id: newId,
      name: treeData.name,
      displayName: treeData.displayName,
    };
    addCustomTree(newTree);
  };

  return (
    <div className="frutales-page">
      <div className="frutales-container">
        <header className="frutales-header">
          <button 
            className="back-button" 
            onClick={handleBackToGarden}
            aria-label="Volver al jardín principal"
          >
            ← Volver al Jardín
          </button>
          <h1 className="frutales-title">Árboles Frutales</h1>
        </header>
        <div className="frutales-grid">
          {allTrees.map((tree) => (
            <FruitTreeCard
              key={tree.id}
              tree={tree}
              onSelect={handleTreeSelect}
            />
          ))}
          <AddFruitTreeCard onAdd={handleAddTree} />
        </div>
      </div>
    </div>
  );
};

