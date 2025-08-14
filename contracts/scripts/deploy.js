const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting deployment...");

  // Get the deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Deploy GameToken first
  console.log("📦 Deploying GameToken...");
  const GameToken = await hre.ethers.getContractFactory("GameToken");
  const gameToken = await GameToken.deploy();
  await gameToken.waitForDeployment();
  const gameTokenAddress = await gameToken.getAddress();
  console.log("✅ GameToken deployed to:", gameTokenAddress);

  // Deploy TokenStore (you'll need to provide USDT address)
  console.log("📦 Deploying TokenStore...");
  const TokenStore = await hre.ethers.getContractFactory("TokenStore");
  
  // For Sepolia, use USDT testnet address
  const usdtAddress = "0x7169D38820dfd117C3FA1f22a697dBA58d90BA06"; // Sepolia USDT
  const tokenStore = await TokenStore.deploy(usdtAddress, gameTokenAddress);
  await tokenStore.waitForDeployment();
  const tokenStoreAddress = await tokenStore.getAddress();
  console.log("✅ TokenStore deployed to:", tokenStoreAddress);

  // Deploy PlayGame
  console.log("📦 Deploying PlayGame...");
  const PlayGame = await hre.ethers.getContractFactory("PlayGame");
  const playGame = await PlayGame.deploy(gameTokenAddress);
  await playGame.waitForDeployment();
  const playGameAddress = await playGame.getAddress();
  console.log("✅ PlayGame deployed to:", playGameAddress);

  console.log("\n🎉 All contracts deployed successfully!");
  console.log("\n📋 Contract Addresses:");
  console.log("GameToken:", gameTokenAddress);
  console.log("TokenStore:", tokenStoreAddress);
  console.log("PlayGame:", playGameAddress);
  console.log("USDT (Sepolia):", usdtAddress);

  console.log("\n🔧 Next steps:");
  console.log("1. Update your .env file with these addresses");
  console.log("2. Get some Sepolia ETH from a faucet");
  console.log("3. Get some Sepolia USDT from a faucet");
  console.log("4. Test the contracts!");

  // Save addresses to a file
  const fs = require("fs");
  const addresses = {
    GameToken: gameTokenAddress,
    TokenStore: tokenStoreAddress,
    PlayGame: playGameAddress,
    USDT: usdtAddress,
    network: hre.network.name
  };
  
  fs.writeFileSync("deployed-addresses.json", JSON.stringify(addresses, null, 2));
  console.log("\n💾 Addresses saved to deployed-addresses.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
