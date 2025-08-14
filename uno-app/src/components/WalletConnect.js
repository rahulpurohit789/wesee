import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const WalletConnect = ({ onConnect, onDisconnect, connected, address }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const connectWallet = async () => {
    setLoading(true);
    setError('');
    
    try {
      if (typeof window.ethereum !== 'undefined') {
        // Request account access
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const connectedAddress = await signer.getAddress();
        
        onConnect(connectedAddress, signer);
      } else {
        setError('MetaMask is not installed. Please install MetaMask to play.');
      }
    } catch (error) {
      setError('Failed to connect wallet: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    onDisconnect();
  };

  const shortenAddress = (addr) => {
    return addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : '';
  };

  return (
    <div className="card">
      <h3>🔗 Wallet Connection</h3>
      
      {!connected ? (
        <div>
          <p>Connect your wallet to start playing UNO with blockchain rewards!</p>
          <button 
            className="btn btn-success" 
            onClick={connectWallet}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="loading"></span> Connecting...
              </>
            ) : (
              'Connect MetaMask'
            )}
          </button>
          
          {error && (
            <div className="status error">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="status success">
            ✅ Connected: {shortenAddress(address)}
          </div>
          <button 
            className="btn btn-secondary" 
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;
