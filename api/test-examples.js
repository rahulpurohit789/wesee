// Test Examples for Smart Contract API
// Copy these commands to test the API endpoints

const testExamples = {
  // Health Check
  health: `curl -X GET http://localhost:3000/health`,

  // Purchase Tokens
  purchase: `curl -X GET "http://localhost:3000/purchase?amount=10&buyer=0x1234567890123456789012345678901234567890"`,

  // Create Match
  createMatch: `curl -X POST http://localhost:3000/match/start \\
    -H "Content-Type: application/json" \\
    -d '{
      "matchId": "0x1234567890123456789012345678901234567890123456789012345678901234",
      "p1": "0x1234567890123456789012345678901234567890",
      "p2": "0x0987654321098765432109876543210987654321",
      "stake": "0.1",
      "autoStake": true
    }'`,

  // Commit Match Result
  commitResult: `curl -X POST http://localhost:3000/match/result \\
    -H "Content-Type: application/json" \\
    -d '{
      "matchId": "0x1234567890123456789012345678901234567890123456789012345678901234",
      "winner": "0x1234567890123456789012345678901234567890"
    }'`
};

console.log('=== Smart Contract API Test Examples ===\n');

Object.entries(testExamples).forEach(([name, command]) => {
  console.log(`${name.toUpperCase()}:`);
  console.log(command);
  console.log('');
});

console.log('=== Expected Responses ===\n');

console.log('Health Check Response:');
console.log(JSON.stringify({
  status: 'success',
  message: 'Smart Contract API is running',
  timestamp: '2024-01-01T00:00:00.000Z'
}, null, 2));

console.log('\nPurchase Response:');
console.log(JSON.stringify({
  status: 'success',
  txHash: '0x1234567890123456789012345678901234567890123456789012345678901234',
  details: {
    usdtAmount: 10,
    gameTokensMinted: '100.0',
    buyer: '0x1234567890123456789012345678901234567890',
    blockNumber: 12345
  }
}, null, 2));

console.log('\nCreate Match Response:');
console.log(JSON.stringify({
  status: 'success',
  txHash: '0x1234567890123456789012345678901234567890123456789012345678901234',
  details: {
    matchId: '0x1234567890123456789012345678901234567890123456789012345678901234',
    player1: '0x1234567890123456789012345678901234567890',
    player2: '0x0987654321098765432109876543210987654321',
    stake: 0.1,
    blockNumber: 12345,
    autoStake: {
      status: 'success',
      txHash: '0x0987654321098765432109876543210987654321098765432109876543210987',
      details: {
        matchId: '0x1234567890123456789012345678901234567890123456789012345678901234',
        staker: '0x1234567890123456789012345678901234567890',
        blockNumber: 12346
      }
    }
  }
}, null, 2));

console.log('\nCommit Result Response:');
console.log(JSON.stringify({
  status: 'success',
  txHash: '0x1234567890123456789012345678901234567890123456789012345678901234',
  details: {
    matchId: '0x1234567890123456789012345678901234567890123456789012345678901234',
    winner: '0x1234567890123456789012345678901234567890',
    blockNumber: 12347
  }
}, null, 2));
