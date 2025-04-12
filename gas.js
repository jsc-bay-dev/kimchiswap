const { ethers } = require("ethers");
require("dotenv").config(); // Load environment variables

const checkBalance = async () => {
  try {
    // Connect to Ethereum provider
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);

    // Create wallet instance
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

    // Get wallet balance
    const balance = await provider.getBalance(wallet.address);

    // Log wallet address and balance
    console.log("Wallet address:", wallet.address);
    console.log("Wallet balance:", ethers.formatEther(balance), "ETH");
  } catch (error) {
    console.error("Error checking wallet balance:", error);
  }
};

checkBalance();