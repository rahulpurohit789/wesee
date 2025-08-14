// Minimal ABIs for the required contract functions

const USDT_ABI = [
  "function transferFrom(address from, address to, uint256 amount) external returns (bool)",
  "function approve(address spender, uint256 amount) external returns (bool)",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

const GAMETOKEN_ABI = [
  "function mint(address to, uint256 amount) external",
  "function balanceOf(address account) external view returns (uint256)",
  "function decimals() external view returns (uint8)"
];

const TOKENSTORE_ABI = [
  "function buy(uint256 usdtAmount) external",
  "function gtPerUsdt() external view returns (uint256)"
];

const PLAYGAME_ABI = [
  "function createMatch(bytes32 matchId, address p1, address p2, uint256 stake) external",
  "function commitResult(bytes32 matchId, address winner) external",
  "function stake(bytes32 matchId) external"
];

module.exports = {
  USDT_ABI,
  GAMETOKEN_ABI,
  TOKENSTORE_ABI,
  PLAYGAME_ABI
};
