# 🎮 UNO Blockchain Game

A complete blockchain-integrated UNO card game with smart contracts, API backend, and React frontend. Players can buy game tokens, create matches, stake tokens, play UNO, and win rewards on the blockchain.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend│    │  Node.js API    │    │ Smart Contracts │
│   (UNO Game)    │◄──►│  (Express)      │◄──►│  (Solidity)     │
│                 │    │                 │    │                 │
│ • MetaMask      │    │ • Purchase API  │    │ • GameToken     │
│ • Game Logic    │    │ • Match API     │    │ • TokenStore    │
│ • UI/UX         │    │ • Result API    │    │ • PlayGame      │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Game Source Reference

### Core Game Logic
- **UNO Rules Implementation**: Standard UNO card game rules with 108 cards (4 colors × 25 numbers + 8 action cards)
- **Game State Management**: Real-time game state tracking, turn management, and winner determination
- **Card Logic**: Deck generation, shuffling, dealing, and card validation
- **Player Management**: Two-player game with real-time updates

### Smart Contracts
- **GameToken.sol**: ERC20 token for game rewards and staking
- **TokenStore.sol**: Token exchange system (USDT → GT conversion)
- **PlayGame.sol**: Match creation, staking, and reward distribution

## 🔗 API/Contract Integration Points

### Backend API Endpoints
```bash
GET  /purchase?amount=1&buyer=0x...     # Buy GT tokens with USDT
POST /match/start                       # Create new match
POST /match/result                      # Commit match result
GET  /health                           # API health check
```

### Smart Contract Functions
```solidity
// TokenStore.sol
function buy(uint256 usdtAmount) external

// PlayGame.sol  
function createMatch(bytes32 matchId, address p1, address p2, uint256 stake) external
function stakeMatch(bytes32 matchId) external
function commitResult(bytes32 matchId, address winner) external
```

### Frontend Integration
- **MetaMask Connection**: Wallet integration for blockchain transactions
- **Real-time Updates**: Live game state synchronization
- **Transaction Handling**: Automatic transaction signing and confirmation

## 🎲 Matchmaking Logic

### Match Creation Flow
1. **Player Initiates**: Player creates match with stake amount
2. **Match Registration**: Smart contract records match details
3. **Staking Phase**: Both players must stake GT tokens
4. **Game Start**: Once both players stake, game begins
5. **Winner Determination**: Game logic determines winner
6. **Reward Distribution**: Winner receives 2× stake amount

### Smart Contract Match Structure
```solidity
struct Match {
    address player1;
    address player2;
    uint256 stakeAmount;
    bool isActive;
    address winner;
    bool isCompleted;
}
```

### Game Flow
```
1. Buy GT Tokens (USDT → GT)
   ↓
2. Create Match (stake amount)
   ↓
3. Both Players Stake GT
   ↓
4. Play UNO Game
   ↓
5. Determine Winner
   ↓
6. Transfer 2× Stake to Winner
```

## 🚀 How to Run the Game Locally

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- MetaMask browser extension (optional for full experience)

### Step 1: Clone Repository
```bash
git clone <your-repo-url>
cd blockchain-uno-game
```

### Step 2: Install Dependencies
```bash
# Install API dependencies
cd api
npm install

# Install contract dependencies
cd ../contracts
npm install

# Install frontend dependencies
cd ../uno-app
npm install
```

### Step 3: Deploy Smart Contracts
```bash
cd contracts

# Compile contracts
npx hardhat compile

# Start local blockchain
npx hardhat node

# In new terminal, deploy contracts
npx hardhat run scripts/deploy-local.js --network localhost
```

### Step 4: Configure API
Update `api/utils/blockchain.js` with deployed contract addresses from Step 3.

### Step 5: Start Services
```bash
# Terminal 1: Start API
cd api
npm start

# Terminal 2: Start Frontend
cd uno-app
npm start
```

### Step 6: Play the Game
1. Open browser to `http://localhost:3001`
2. Connect MetaMask to localhost:8545
3. Import test account with private key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
4. Buy GT tokens and start playing!

## 🧪 Testing

### API Testing
```bash
# Test purchase
curl "http://localhost:3000/purchase?amount=1&buyer=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"

# Test match creation
curl -X POST "http://localhost:3000/match/start" \
  -H "Content-Type: application/json" \
  -d '{"matchId":"0x1234567890123456789012345678901234567890123456789012345678901234","p1":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266","p2":"0x70997970C51812dc3A010C7d01b50e0d17dc79C8","stake":100}'

# Test match result
curl -X POST "http://localhost:3000/match/result" \
  -H "Content-Type: application/json" \
  -d '{"matchId":"0x1234567890123456789012345678901234567890123456789012345678901234","winner":"0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"}'
```

### Smart Contract Testing
```bash
cd contracts
npx hardhat test
```

## 📁 Project Structure
```
blockchain-uno-game/
├── contracts/                 # Smart contracts
│   ├── contracts/            # Solidity contracts
│   ├── scripts/              # Deployment scripts
│   └── hardhat.config.js     # Hardhat configuration
├── api/                      # Backend API
│   ├── routes/               # API endpoints
│   ├── utils/                # Blockchain service
│   └── server.js             # Express server
├── uno-app/                  # React frontend
│   ├── src/                  # React components
│   ├── public/               # Static files
│   └── package.json          # Frontend dependencies
└── README.md                 # This file
```

## 🔧 Configuration

### Environment Variables
```env
# API Configuration
RPC_URL=http://127.0.0.1:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
USDT_ADDRESS=<deployed_usdt_address>
GAMETOKEN_ADDRESS=<deployed_gametoken_address>
TOKENSTORE_ADDRESS=<deployed_tokenstore_address>
PLAYGAME_ADDRESS=<deployed_playgame_address>
PORT=3000
```

### MetaMask Configuration
- **Network Name**: Localhost 8545
- **RPC URL**: http://127.0.0.1:8545
- **Chain ID**: 31337
- **Currency Symbol**: ETH

## 🎮 Game Features

### Core Gameplay
- ✅ Standard UNO rules implementation
- ✅ Real-time two-player gameplay
- ✅ Card validation and game state management
- ✅ Automatic winner determination

### Blockchain Integration
- ✅ Token purchase with USDT
- ✅ Match creation and staking
- ✅ Automatic reward distribution
- ✅ Transaction recording on blockchain

### User Experience
- ✅ Intuitive UI with card animations
- ✅ MetaMask wallet integration
- ✅ Real-time game updates
- ✅ Transaction status tracking
- ✅ Demo mode for easy testing
- ✅ Quick GT token acquisition for testing

## 🚀 Deployment

### Local Development
- Hardhat local network
- Express API on port 3000
- React app on port 3001

### Production Deployment
1. Deploy contracts to Ethereum mainnet/Sepolia
2. Deploy API to cloud service (Heroku, AWS, etc.)
3. Deploy frontend to hosting service (Vercel, Netlify, etc.)
4. Update environment variables with production addresses

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation in each component folder
- Review the smart contract comments for technical details

---

**🎉 Enjoy playing UNO on the blockchain!** 🚀
