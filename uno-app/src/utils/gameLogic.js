// UNO Card Colors and Types
export const CARD_COLORS = ['red', 'blue', 'green', 'yellow'];
export const CARD_NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
export const CARD_ACTIONS = ['skip', 'reverse', 'draw2'];
export const WILD_CARDS = ['wild', 'wild_draw4'];

// Generate a full UNO deck
export const generateDeck = () => {
  const deck = [];
  
  // Add number cards (0-9) for each color
  CARD_COLORS.forEach(color => {
    // One 0 card per color
    deck.push({ color, value: '0', type: 'number' });
    
    // Two of each number 1-9 per color
    CARD_NUMBERS.slice(1).forEach(number => {
      deck.push({ color, value: number, type: 'number' });
      deck.push({ color, value: number, type: 'number' });
    });
    
    // Add action cards (2 of each per color)
    CARD_ACTIONS.forEach(action => {
      deck.push({ color, value: action, type: 'action' });
      deck.push({ color, value: action, type: 'action' });
    });
  });
  
  // Add wild cards (4 of each)
  WILD_CARDS.forEach(wild => {
    for (let i = 0; i < 4; i++) {
      deck.push({ color: 'wild', value: wild, type: 'wild' });
    }
  });
  
  return deck;
};

// Shuffle deck using Fisher-Yates algorithm
export const shuffleDeck = (deck) => {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Deal cards to players
export const dealCards = (deck, numPlayers = 2, cardsPerPlayer = 7) => {
  const hands = Array(numPlayers).fill().map(() => []);
  const remainingDeck = [...deck];
  
  for (let i = 0; i < cardsPerPlayer; i++) {
    for (let j = 0; j < numPlayers; j++) {
      if (remainingDeck.length > 0) {
        hands[j].push(remainingDeck.pop());
      }
    }
  }
  
  return { hands, remainingDeck };
};

// Check if a card can be played
export const canPlayCard = (card, topCard, currentColor) => {
  // Wild cards can always be played
  if (card.type === 'wild') {
    return true;
  }
  
  // Check color match
  if (card.color === currentColor) {
    return true;
  }
  
  // Check value match
  if (card.value === topCard.value) {
    return true;
  }
  
  return false;
};

// Get card display text
export const getCardText = (card) => {
  if (card.type === 'wild') {
    return card.value === 'wild' ? 'WILD' : 'WILD+4';
  }
  
  if (card.type === 'action') {
    switch (card.value) {
      case 'skip': return 'SKIP';
      case 'reverse': return 'REV';
      case 'draw2': return '+2';
      default: return card.value;
    }
  }
  
  return card.value;
};

// Generate match ID
export const generateMatchId = () => {
  return '0x' + Array.from({length: 64}, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

// Calculate game score
export const calculateScore = (cards) => {
  return cards.reduce((score, card) => {
    if (card.type === 'number') {
      return score + parseInt(card.value);
    } else if (card.type === 'action') {
      return score + 20;
    } else if (card.type === 'wild') {
      return score + 50;
    }
    return score;
  }, 0);
};

// Check if player has won
export const checkWinner = (hand) => {
  return hand.length === 0;
};

// Get next player (for 2 players, just alternate)
export const getNextPlayer = (currentPlayer, numPlayers = 2) => {
  return (currentPlayer + 1) % numPlayers;
};
