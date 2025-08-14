# 🎮 UNO Blockchain Game

A complete UNO card game with blockchain integration, allowing players to stake GT tokens and win rewards through smart contracts.

## 🚀 Features

- **🎯 Full UNO Game Logic**: Complete UNO card game with all standard rules
- **🔗 Wallet Integration**: MetaMask wallet connection for blockchain interactions
- **💰 Token Purchase**: Buy GT tokens with USDT through smart contracts
- **🎲 Match Creation**: Create blockchain-based matches with staking
- **🏆 Winner Rewards**: Automatic GT token distribution to winners
- **🎨 Modern UI**: Beautiful, responsive design with smooth animations

## 🏗️ Architecture

```
uno-app/
├── src/
│   ├── components/          # React components
│   │   ├── WalletConnect.js # MetaMask integration
│   │   ├── TokenPurchase.js # GT token buying
│   │   ├── GameBoard.js     # Main game interface
│   │   └── UNOCard.js       # Individual card component
│   ├── services/
│   │   └── api.js          # Blockchain API integration
│   ├── utils/
│   │   └── gameLogic.js    # UNO game rules and logic
│   └── App.js              # Main application
└── public/
    └── index.html          # HTML template
```

## 🛠️ Setup Instructions

### Prerequisites

1. **Node.js** (v14 or higher)
2. **MetaMask** browser extension
3. **Blockchain API** running (from the `api/` folder)

### Installation

1. **Navigate to the UNO app directory:**
   ```bash
   cd uno-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3001` (React will automatically open this)

## 🎯 How to Play

### 1. **Connect Wallet**
- Click "Connect MetaMask" to link your wallet
- Ensure you're on the correct network (Sepolia testnet recommended)

### 2. **Buy GT Tokens**
- Enter the amount of USDT you want to spend
- Click "Buy GT Tokens" to purchase game tokens
- Wait for blockchain confirmation

### 3. **Start a Game**
- Click "Start New Game" to create a match
- The game will automatically create a blockchain match with staking
- Player 2 will be a random address (for demo purposes)

### 4. **Play UNO**
- Follow standard UNO rules
- Match color or number with the top card
- Use action cards (Skip, Reverse, Draw 2)
- Play wild cards to change color

### 5. **Win Rewards**
- First player to play all cards wins
- Winner automatically receives the staked GT tokens
- Transaction is recorded on the blockchain

## 🔗 API Integration

The app integrates with your blockchain API through these endpoints:

- **GET /purchase** - Buy GT tokens with USDT
- **POST /match/start** - Create new match with staking
- **POST /match/result** - Commit winner and distribute rewards
- **GET /health** - Check API status

## 🎨 Game Features

### **Card Types**
- **Number Cards**: 0-9 in four colors (red, blue, green, yellow)
- **Action Cards**: Skip, Reverse, Draw 2
- **Wild Cards**: Wild, Wild Draw 4

### **Game Rules**
- Match color or number with top card
- Action cards have special effects
- Wild cards can be played anytime
- First to play all cards wins

### **Blockchain Integration**
- Real-time wallet connection
- Smart contract match creation
- Automatic token staking
- Winner reward distribution

## 🚀 Deployment

### **Development**
```bash
npm start
```

### **Production Build**
```bash
npm run build
```

### **Environment Variables**
Create a `.env` file in the `uno-app` directory:
```env
REACT_APP_API_URL=http://localhost:3000
```

## 🔧 Configuration

### **API Endpoint**
The app connects to your blockchain API. Make sure:
1. API is running on `http://localhost:3000`
2. Smart contracts are deployed and configured
3. Environment variables are set correctly

### **Network Configuration**
- **Testnet**: Sepolia (recommended for testing)
- **Mainnet**: Ethereum (for production)

## 🎮 Game Flow

```
1. Connect Wallet → 2. Buy GT Tokens → 3. Create Match → 4. Stake Tokens → 5. Play UNO → 6. Winner Gets GT
```

## 🐛 Troubleshooting

### **Common Issues**

1. **"API Disconnected"**
   - Ensure your blockchain API is running
   - Check if API is on port 3000

2. **"Blockchain Not Configured"**
   - Set up your `.env` file in the API directory
   - Deploy smart contracts and update addresses

3. **"MetaMask not installed"**
   - Install MetaMask browser extension
   - Connect to the correct network

4. **"Transaction failed"**
   - Check your wallet has enough ETH for gas
   - Ensure you have sufficient USDT/GT tokens

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔒 Security

- Private keys never leave your wallet
- All transactions require user approval
- Smart contracts handle token distribution
- No sensitive data stored locally

## 🎯 Future Enhancements

- Multiplayer support (more than 2 players)
- Tournament mode
- Leaderboards
- NFT card collections
- Mobile app version

## 📄 License

MIT License - feel free to use and modify!

---

**🎮 Ready to play UNO with blockchain rewards? Start the app and connect your wallet!**
