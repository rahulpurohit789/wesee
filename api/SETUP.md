# Smart Contract API Setup Guide

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   ```bash
   cp env.example .env
   # Edit .env with your actual values
   ```

3. **Start the server:**
   ```bash
   npm start
   # or for development:
   npm run dev
   ```

## Environment Variables

Edit your `.env` file with the following values:

```env
# Blockchain Configuration
RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
PRIVATE_KEY=your_actual_private_key_without_0x_prefix

# Contract Addresses (replace with your deployed contract addresses)
USDT_ADDRESS=0x1234567890123456789012345678901234567890
GAMETOKEN_ADDRESS=0x1234567890123456789012345678901234567890
TOKENSTORE_ADDRESS=0x1234567890123456789012345678901234567890
PLAYGAME_ADDRESS=0x1234567890123456789012345678901234567890

# Server Configuration
PORT=3000
```

## Important Notes

- **Private Key**: Should be a 64-character hex string WITHOUT the `0x` prefix
- **RPC URL**: Use a reliable RPC provider (Infura, Alchemy, etc.)
- **Contract Addresses**: Must be valid deployed contract addresses on your target network

## Testing

The API will start even without proper configuration, but blockchain operations will fail with a helpful error message.

To test the API:

1. **Health check:**
   ```bash
   curl http://localhost:3000/health
   ```

2. **API info:**
   ```bash
   curl http://localhost:3000/
   ```

3. **Test examples:**
   ```bash
   node test-examples.js
   ```

## Troubleshooting

- **"Blockchain service not configured"**: Check your `.env` file values
- **"Invalid private key"**: Ensure private key is 64 characters without `0x` prefix
- **"Contract not found"**: Verify contract addresses are correct and deployed
