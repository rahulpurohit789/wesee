import React, { useState, useEffect } from 'react';
import WalletConnect from './components/WalletConnect';
import TokenPurchase from './components/TokenPurchase';
import GameBoard from './components/GameBoard';
import { blockchainAPI } from './services/api';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [apiStatus, setApiStatus] = useState({ connected: false, configured: false });
  const [gameState, setGameState] = useState({
    player1Address: '',
    player2Address: '',
    stake: 0.1,
    gameStarted: false
  });

  // Check API status on component mount
  useEffect(() => {
    checkAPIStatus();
  }, []);

  const checkAPIStatus = async () => {
    try {
      const health = await blockchainAPI.healthCheck();
      const info = await blockchainAPI.getInfo();
      
      setApiStatus({
        connected: health.status === 'success',
        configured: info.configured || false
      });
    } catch (error) {
      setApiStatus({ connected: false, configured: false });
    }
  };

  const handleWalletConnect = (address, signer) => {
    setWalletAddress(address);
    setWalletConnected(true);
  };

  const handleWalletDisconnect = () => {
    setWalletAddress('');
    setWalletConnected(false);
    setGameState(prev => ({ ...prev, gameStarted: false }));
  };

  const handlePurchaseComplete = (result) => {
    console.log('Purchase completed:', result);
    // You could update user's token balance here
  };

  const handleGameEnd = (winnerAddress) => {
    console.log('Game ended! Winner:', winnerAddress);
    setGameState(prev => ({ ...prev, gameStarted: false }));
  };

  const startNewGame = () => {
    if (!walletConnected) {
      alert('Please connect your wallet first!');
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      player1Address: walletAddress,
      player2Address: '0x' + Array.from({length: 40}, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join(''), // Random address for demo
      gameStarted: true
    }));
  };

  return (
    <div className="container">
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>🎮 UNO Blockchain Game</h1>
        <p>Play UNO with blockchain rewards and smart contract integration</p>
      </header>

      {/* API Status */}
      <div className="card">
        <h3>🔌 API Status</h3>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div className={`status ${apiStatus.connected ? 'success' : 'error'}`}>
            {apiStatus.connected ? '✅ API Connected' : '❌ API Disconnected'}
          </div>
          <div className={`status ${apiStatus.configured ? 'success' : 'warning'}`}>
            {apiStatus.configured ? '✅ Blockchain Configured' : '⚠️ Blockchain Not Configured'}
          </div>
        </div>
        {!apiStatus.connected && (
          <p style={{ marginTop: '10px', color: '#dc3545' }}>
            Make sure your blockchain API is running on http://localhost:3000
          </p>
        )}
      </div>

      {/* Wallet Connection */}
      <WalletConnect
        onConnect={handleWalletConnect}
        onDisconnect={handleWalletDisconnect}
        connected={walletConnected}
        address={walletAddress}
      />

      {/* Token Purchase */}
      <TokenPurchase
        address={walletAddress}
        onPurchaseComplete={handlePurchaseComplete}
      />

      {/* Game Section */}
      <div className="card">
        <h3>🎯 Start New Game</h3>
        {!gameState.gameStarted ? (
          <div>
            <p>Ready to play UNO? Connect your wallet and start a new game!</p>
            <button 
              className="btn btn-success" 
              onClick={startNewGame}
              disabled={!walletConnected}
            >
              Start New Game
            </button>
          </div>
        ) : (
          <div>
            <h4>Game Details:</h4>
            <p><strong>Player 1:</strong> {gameState.player1Address}</p>
            <p><strong>Player 2:</strong> {gameState.player2Address}</p>
            <p><strong>Stake:</strong> {gameState.stake} GT</p>
            
            <button 
              className="btn btn-secondary" 
              onClick={() => setGameState(prev => ({ ...prev, gameStarted: false }))}
            >
              Cancel Game
            </button>
          </div>
        )}
      </div>

      {/* Game Board */}
      {gameState.gameStarted && (
        <GameBoard
          player1Address={gameState.player1Address}
          player2Address={gameState.player2Address}
          stake={gameState.stake}
          onGameEnd={handleGameEnd}
        />
      )}

      {/* Instructions */}
      <div className="card">
        <h3>📖 How to Play</h3>
        <ol style={{ textAlign: 'left', lineHeight: '1.6' }}>
          <li><strong>Connect Wallet:</strong> Connect your MetaMask wallet to the app</li>
          <li><strong>Buy Tokens:</strong> Purchase GT tokens with USDT to participate</li>
          <li><strong>Start Game:</strong> Create a new match with another player</li>
          <li><strong>Play UNO:</strong> Follow standard UNO rules - match color or number</li>
          <li><strong>Win Rewards:</strong> Winner receives the staked GT tokens</li>
        </ol>
        
        <h4 style={{ marginTop: '20px' }}>🎯 Game Flow:</h4>
        <div style={{ 
          background: '#f8f9fa', 
          padding: '15px', 
          borderRadius: '8px',
          marginTop: '10px'
        }}>
          <p><strong>1. Purchase GT →</strong> 2. Create Match → <strong>3. Stake Tokens →</strong> 4. Play UNO → <strong>5. Winner Gets GT</strong></p>
        </div>
      </div>

      <footer style={{ textAlign: 'center', marginTop: '50px', color: '#666' }}>
        <p>🎮 UNO Blockchain Game - Powered by Smart Contracts</p>
      </footer>
    </div>
  );
}

export default App;
