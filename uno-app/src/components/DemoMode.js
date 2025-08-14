import React from 'react';

const DemoMode = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <div className="card" style={{ 
      background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
      border: '2px solid #2196f3'
    }}>
      <h3>🎮 Demo Mode Active</h3>
      <p>You're currently in demo mode. This means:</p>
      
      <ul style={{ textAlign: 'left', margin: '15px 0', lineHeight: '1.6' }}>
        <li>✅ <strong>Quick Testing:</strong> Use "Get Demo GT" button to instantly get test tokens</li>
        <li>✅ <strong>No Real Money:</strong> All transactions are simulated for testing</li>
        <li>✅ <strong>Full Game Flow:</strong> Test the complete UNO game experience</li>
        <li>✅ <strong>Smart Contract Integration:</strong> See how blockchain integration works</li>
      </ul>
      
      <div style={{ 
        background: '#fff', 
        padding: '15px', 
        borderRadius: '8px',
        marginTop: '15px',
        border: '1px solid #e0e0e0'
      }}>
        <h4>🚀 Quick Start:</h4>
        <ol style={{ textAlign: 'left', lineHeight: '1.6' }}>
          <li>Connect your wallet (MetaMask)</li>
          <li>Click "Get Demo GT" to get test tokens</li>
          <li>Start a new game</li>
          <li>Play UNO and test the blockchain rewards!</li>
        </ol>
      </div>
      
      <div style={{ 
        marginTop: '15px',
        padding: '10px',
        background: '#fff3cd',
        borderRadius: '5px',
        border: '1px solid #ffeaa7'
      }}>
        <strong>💡 Note:</strong> In production, you would need real USDT and the contracts would be deployed on a real blockchain network.
      </div>
    </div>
  );
};

export default DemoMode;
