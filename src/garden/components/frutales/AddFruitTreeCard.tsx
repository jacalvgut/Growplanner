/**
 * Componente de tarjeta para añadir un nuevo árbol frutal
 */
import React, { useState } from 'react';
import { AddFruitTreeForm } from './AddFruitTreeForm';

interface AddFruitTreeCardProps {
  onAdd: (tree: { name: string; displayName: string }) => void;
}

/**
 * Tarjeta para añadir un nuevo árbol frutal
 */
export const AddFruitTreeCard: React.FC<AddFruitTreeCardProps> = ({ onAdd }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => {
    setShowForm(true);
  };

  const handleClose = () => {
    setShowForm(false);
  };

  const handleSubmit = (tree: { name: string; displayName: string }) => {
    onAdd(tree);
    setShowForm(false);
  };

  return (
    <>
      <div className="fruit-tree-card-wrapper">
        <button
          className="fruit-tree-card add-fruit-tree-card"
          onClick={handleClick}
          aria-label="Añadir nuevo árbol frutal"
        >
          <div className="fruit-tree-card-content">
            <div className="add-fruit-tree-content">
              <span className="add-icon">+</span>
              <span className="add-text">Añadir</span>
            </div>
          </div>
        </button>
        <span className="fruit-tree-name add-fruit-tree-label">Añadir árbol</span>
      </div>
      {showForm && (
        <AddFruitTreeForm
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

