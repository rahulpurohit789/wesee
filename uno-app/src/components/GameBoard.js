import React, { useState, useEffect } from 'react';
import UNOCard from './UNOCard';
import StakingInterface from './StakingInterface';
import { 
  generateDeck, 
  shuffleDeck, 
  dealCards, 
  canPlayCard, 
  checkWinner,
  getNextPlayer,
  generateMatchId 
} from '../utils/gameLogic';
import { createMatch, commitResult, stakeMatch } from '../services/api';

const GameBoard = ({ player1Address, player2Address, stake, onGameEnd }) => {
  const [gameState, setGameState] = useState({
    deck: [],
    hands: [[], []],
    currentPlayer: 0,
    topCard: null,
    currentColor: null,
    matchId: null,
    gameStarted: false,
    winner: null,
    isStaked: false
  });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // Initialize game
  const startGame = async () => {
    setLoading(true);
    setStatus({ type: 'info', message: 'Starting game...' });

    try {
      // Generate match ID
      const matchId = generateMatchId();
      
      // Create match on blockchain
      const matchResult = await createMatch({
        matchId,
        p1: player1Address,
        p2: player2Address,
        stake,
        autoStake: true
      });

      // Initialize game state
      const deck = shuffleDeck(generateDeck());
      const { hands, remainingDeck } = dealCards(deck, 2, 7);
      
      // Set top card
      const topCard = remainingDeck.pop();
      const currentColor = topCard.color === 'wild' ? 'red' : topCard.color;

      setGameState({
        deck: remainingDeck,
        hands,
        currentPlayer: 0,
        topCard,
        currentColor,
        matchId,
        gameStarted: true,
        winner: null,
        isStaked: false
      });

      setStatus({ type: 'success', message: 'Game started! Player 1 goes first.' });

    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Play a card
  const playCard = async (card, cardIndex) => {
    if (!canPlayCard(card, gameState.topCard, gameState.currentColor)) {
      setStatus({ type: 'error', message: 'Cannot play this card!' });
      return;
    }

    setLoading(true);
    setStatus({ type: 'info', message: 'Playing card...' });

    try {
      // Update game state
      const newHands = [...gameState.hands];
      newHands[gameState.currentPlayer].splice(cardIndex, 1);
      
      const newDeck = [...gameState.deck];
      const newTopCard = card;
      const newCurrentColor = card.color === 'wild' ? gameState.currentColor : card.color;
      
      // Check for winner
      const isWinner = checkWinner(newHands[gameState.currentPlayer]);
      
      if (isWinner) {
        // Commit result to blockchain
        await commitResult({
          matchId: gameState.matchId,
          winner: gameState.currentPlayer === 0 ? player1Address : player2Address
        });
        
        setGameState(prev => ({
          ...prev,
          hands: newHands,
          topCard: newTopCard,
          currentColor: newCurrentColor,
          winner: gameState.currentPlayer
        }));
        
        setStatus({ type: 'success', message: `Player ${gameState.currentPlayer + 1} wins!` });
        
        if (onGameEnd) {
          onGameEnd(gameState.currentPlayer === 0 ? player1Address : player2Address);
        }
      } else {
        // Continue game
        const nextPlayer = getNextPlayer(gameState.currentPlayer);
        
        setGameState(prev => ({
          ...prev,
          hands: newHands,
          deck: newDeck,
          topCard: newTopCard,
          currentColor: newCurrentColor,
          currentPlayer: nextPlayer
        }));
        
        setStatus({ type: 'success', message: `Player ${nextPlayer + 1}'s turn` });
      }

    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Handle staking
  const handleStake = async (matchId) => {
    try {
      const result = await stakeMatch(matchId);
      setGameState(prev => ({ ...prev, isStaked: true }));
      setStatus({ type: 'success', message: 'Stake successful! You can now play.' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
    }
  };

  // Draw a card
  const drawCard = () => {
    if (gameState.deck.length === 0) {
      setStatus({ type: 'error', message: 'No cards left to draw!' });
      return;
    }

    const newDeck = [...gameState.deck];
    const drawnCard = newDeck.pop();
    const newHands = [...gameState.hands];
    newHands[gameState.currentPlayer].push(drawnCard);

    setGameState(prev => ({
      ...prev,
      deck: newDeck,
      hands: newHands
    }));

    setStatus({ type: 'info', message: 'Card drawn. Next player\'s turn.' });
  };

  return (
    <div className="game-board">
      {/* Player 1 Hand */}
      <div className="player-hand">
        <h3>Player 1 ({player1Address?.slice(0, 6)}...)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {gameState.hands[0].map((card, index) => (
            <UNOCard
              key={`p1-${index}`}
              card={card}
              onClick={() => gameState.currentPlayer === 0 && playCard(card, index)}
              disabled={gameState.currentPlayer !== 0 || loading}
            />
          ))}
        </div>
        <p>Cards: {gameState.hands[0].length}</p>
      </div>

             {/* Game Center */}
       <div className="game-center">
         <h2>🎮 UNO Game</h2>
         
         {!gameState.gameStarted ? (
           <div>
             <p>Stake: {stake} GT</p>
             <button 
               className="btn btn-success" 
               onClick={startGame}
               disabled={loading}
             >
               {loading ? 'Starting...' : 'Start Game'}
             </button>
           </div>
         ) : (
           <div>
             {/* Staking Interface */}
             <StakingInterface
               matchId={gameState.matchId}
               stakeAmount={stake}
               onStake={handleStake}
               isStaked={gameState.isStaked}
               disabled={loading}
             />
             
             {gameState.isStaked && (
               <div>
                 <h3>Current Player: {gameState.currentPlayer + 1}</h3>
                 
                 {/* Top Card */}
                 {gameState.topCard && (
                   <div style={{ margin: '20px 0' }}>
                     <h4>Top Card:</h4>
                     <UNOCard card={gameState.topCard} disabled={true} />
                     <p>Current Color: <strong>{gameState.currentColor}</strong></p>
                   </div>
                 )}
                 
                 {/* Game Actions */}
                 <div style={{ margin: '20px 0' }}>
                   <button 
                     className="btn btn-secondary" 
                     onClick={drawCard}
                     disabled={loading || gameState.winner !== null}
                   >
                     Draw Card
                   </button>
                 </div>
                 
                 {/* Game Status */}
                 {gameState.winner !== null && (
                   <div className="status success">
                     🎉 Player {gameState.winner + 1} wins the game!
                   </div>
                 )}
               </div>
             )}
        
                  {status && (
            <div className={`status ${status.type}`}>
              {status.message}
            </div>
          )}
           </div>
         )}
        </div>

      {/* Player 2 Hand */}
      <div className="player-hand">
        <h3>Player 2 ({player2Address?.slice(0, 6)}...)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
          {gameState.hands[1].map((card, index) => (
            <UNOCard
              key={`p2-${index}`}
              card={card}
              onClick={() => gameState.currentPlayer === 1 && playCard(card, index)}
              disabled={gameState.currentPlayer !== 1 || loading}
            />
          ))}
        </div>
        <p>Cards: {gameState.hands[1].length}</p>
      </div>
    </div>
  );
};

export default GameBoard;
