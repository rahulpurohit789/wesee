import React from 'react';
import { getCardText } from '../utils/gameLogic';

const UNOCard = ({ card, onClick, disabled = false, selected = false }) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick(card);
    }
  };

  const cardClass = `uno-card ${card.color} ${selected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`;
  
  return (
    <div 
      className={cardClass}
      onClick={handleClick}
      style={{
        transform: selected ? 'translateY(-10px)' : 'translateY(0)',
        boxShadow: selected ? '0 8px 16px rgba(0,0,0,0.3)' : '0 4px 8px rgba(0,0,0,0.2)',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer'
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '12px', marginBottom: '5px' }}>
          {card.color !== 'wild' && card.color.toUpperCase()}
        </div>
        <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
          {getCardText(card)}
        </div>
      </div>
    </div>
  );
};

export default UNOCard;
