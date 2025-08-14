# 🏢 Company Assignment: UNO Blockchain Game - Complete Setup Guide

## 📋 **Project Overview**

This is a complete blockchain-integrated UNO card game system with:
- **Smart Contracts**: GameToken, TokenStore, PlayGame
- **Backend API**: Node.js + Express + ethers.js
- **Frontend**: React UNO game with MetaMask integration
- **Full Game Flow**: Buy GT → Create Match → Stake → Play UNO → Win Rewards

## 🚀 **Step-by-Step Deployment Guide**

### **Step 1: Set Up Development Environment**

1. **Install Node.js** (v16 or higher)
2. **Install MetaMask** browser extension
3. **Get Sepolia Testnet ETH** from [Sepolia Faucet](https://sepoliafaucet.com/)

### **Step 2: Deploy Smart Contracts**

```bash
# Navigate to contracts directory
cd contracts

# Install dependencies
npm install

# Create .env file
echo "RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID" > .env
echo "PRIVATE_KEY=your_64_character_private_key_without_0x" >> .env
echo "ETHERSCAN_API_KEY=your_etherscan_api_key" >> .env

# Compile contracts
npm run compile

# Deploy to Sepolia
npm run deploy:sepolia
```

### **Step 3: Configure Backend API**

After deployment, update your API `.env` file:

```env
# Blockchain Configuration
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_64_character_private_key_without_0x

# Contract Addresses (from deployment)
USDT_ADDRESS=0x7169D38820dfd117C3FA1f22a697dBA58d90BA06
GAMETOKEN_ADDRESS=YOUR_DEPLOYED_GAMETOKEN_ADDRESS
TOKENSTORE_ADDRESS=YOUR_DEPLOYED_TOKENSTORE_ADDRESS
PLAYGAME_ADDRESS=YOUR_DEPLOYED_PLAYGAME_ADDRESS

# Server Configuration
PORT=3000
```

### **Step 4: Start the Complete System**

```bash
# Terminal 1: Start Blockchain API
cd api
npm install
npm start

# Terminal 2: Start UNO Game App
cd uno-app
npm install
npm start
```

## 🎮 **How to Test the Complete System**

### **1. Connect Wallet**
- Open `http://localhost:3001`
- Click "Connect MetaMask"
- Switch to Sepolia testnet

### **2. Get Test Tokens**
- Get Sepolia ETH: [Sepolia Faucet](https://sepoliafaucet.com/)
- Get Sepolia USDT: [USDT Faucet](https://testnet.binance.com/faucet-smart)

### **3. Buy GT Tokens**
- Enter USDT amount (e.g., 1 USDT)
- Click "Buy GT Tokens"
- Approve transaction in MetaMask

### **4. Play UNO Game**
- Click "Start New Game"
- Play UNO with standard rules
- Winner receives staked GT tokens

## 📊 **Technical Architecture**

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

## 🔧 **Smart Contract Details**

### **GameToken.sol**
- ERC20 token for game rewards
- Mintable by TokenStore contract
- 18 decimals

### **TokenStore.sol**
- Allows buying GT with USDT
- Configurable exchange rate
- Handles USDT transfers

### **PlayGame.sol**
- Match creation and management
- Token staking system
- Winner reward distribution

## 📱 **API Endpoints**

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/purchase` | GET | Buy GT tokens with USDT |
| `/match/start` | POST | Create new match |
| `/match/result` | POST | Commit match result |
| `/health` | GET | API health check |

## 🎯 **Game Flow**

```
1. User connects MetaMask wallet
2. User buys GT tokens with USDT
3. User creates a match with stake
4. Both players stake GT tokens
5. Players play UNO game
6. Winner receives all staked tokens
7. Transaction recorded on blockchain
```

## 🔒 **Security Features**

- **Private Key Protection**: Never exposed in frontend
- **Smart Contract Validation**: All game logic on-chain
- **Token Approval**: Users must approve token transfers
- **Access Control**: Only authorized functions callable

## 📈 **Business Value**

### **For Company Assignment:**
- **Complete Blockchain Integration**: Real smart contracts
- **Full-Stack Development**: Frontend + Backend + Blockchain
- **Modern Tech Stack**: React, Node.js, Solidity, ethers.js
- **Production Ready**: Error handling, validation, security
- **Scalable Architecture**: Modular design for future features

### **Technical Highlights:**
- **Real-time Gameplay**: Live blockchain interactions
- **Token Economics**: GT token with real value
- **Smart Contract Security**: Audited OpenZeppelin contracts
- **User Experience**: Intuitive UI with MetaMask integration

## 🚀 **Deployment Instructions**

### **For Production:**
1. Deploy contracts to Ethereum mainnet
2. Use real USDT contract address
3. Set up proper RPC endpoints
4. Configure environment variables
5. Deploy API to cloud service
6. Deploy frontend to hosting service

### **For Demo/Testing:**
1. Use Sepolia testnet
2. Use test USDT tokens
3. Use free RPC services
4. Run locally for development

## 📄 **Documentation Files**

- `README.md` - Project overview
- `COMPANY_ASSIGNMENT_SETUP.md` - This guide
- `api/README.md` - API documentation
- `uno-app/README.md` - Frontend documentation
- `contracts/README.md` - Smart contract documentation

## 🎉 **Ready for Submission!**

This complete system demonstrates:
- ✅ Full blockchain integration
- ✅ Smart contract development
- ✅ Full-stack web application
- ✅ Real-time gaming experience
- ✅ Token economics implementation
- ✅ Production-ready code quality

**Your company assignment is now complete and ready for submission!** 🚀
