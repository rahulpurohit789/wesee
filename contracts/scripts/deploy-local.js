const hre = require("hardhat");

async function main() {
  console.log("🚀 Starting LOCAL deployment...");

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

  // Deploy TokenStore with mock USDT address
  console.log("📦 Deploying TokenStore...");
  const TokenStore = await hre.ethers.getContractFactory("TokenStore");
  
  // For local testing, use a mock USDT address
  const mockUsdtAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Mock USDT
  const tokenStore = await TokenStore.deploy(mockUsdtAddress, gameTokenAddress);
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
  console.log("Mock USDT:", mockUsdtAddress);

  console.log("\n🔧 For API .env file, use these values:");
  console.log("USDT_ADDRESS=" + mockUsdtAddress);
  console.log("GAMETOKEN_ADDRESS=" + gameTokenAddress);
  console.log("TOKENSTORE_ADDRESS=" + tokenStoreAddress);
  console.log("PLAYGAME_ADDRESS=" + playGameAddress);

  // Save addresses to a file
  const fs = require("fs");
  const addresses = {
    GameToken: gameTokenAddress,
    TokenStore: tokenStoreAddress,
    PlayGame: playGameAddress,
    USDT: mockUsdtAddress,
    network: "localhost"
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
