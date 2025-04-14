const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Load abi and bytecode
const abiPath = path.resolve(__dirname, "build", "KimchiCoin.abi");
const binPath = path.resolve(__dirname, "build", "KimchiCoin.bin");

const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
const bytecode = fs.readFileSync(binPath, "utf-8");

// Deployment Function

const deployContract = async () => {
  try {
    //connect to ethereum provider
    const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
    provider
      .getBlockNumber()
      .then((blockNumber) =>
        console.log(
          "Connected to Sepolia Infura Network. Current block number:",
          blockNumber
        )
      )
      .catch((error) =>
        console.error("Error connecting to Ethereum provider:", error)
      );
    // create wallet instance. use private key.
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
    console.log("Deploying contract from account: ", wallet.address);

    // check wallet balance
    const balance = await provider.getBalance(wallet.address);
    if (balance === 0n) {
      console.log(
        "\nYour wallet has no ETH. Please fund your wallet to cover gas fees."
      );
      console.log("Use a Sepolia faucet to get free ETH for testing:");
      console.log("- Sepolia Faucet (Alchemy): https://sepoliafaucet.com/");
      console.log("- Sepolia Faucet (Infura): https://faucet.sepolia.dev/");
      throw new Error("Insufficient balance to deploy the contract.");
    } else {
      console.log("Wallet balance:", ethers.formatEther(balance), "KCH");
    }

    //create ContractFactory
    const factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Define constructor arguments
    const initialSupply = ethers.parseUnits("1000000", 18);

    //Deploy contract
    console.log("deploying contract...");
    const contract = await factory.deploy(initialSupply, {
      gasLimit: 3000000, // Set an appropriate gas limit
      gasPrice: ethers.parseUnits("10", "gwei"), // Set an appropriate gas price
    });
    console.log("Transaction hash:", contract.deploymentTransaction().hash);
    await contract.deploymentTransaction().wait();
    console.log("Contract deployed at address:", contract.target);
    return contract.target;
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

const keepAlive = async () => {
  console.log("Contract deployed. Keeping the provider active...");
  setInterval(() => {
    console.log("Provider is still active...");
  }, 60000); // Log every 60 seconds
};

const readline = require("readline");

const interactWithContract = async (provider, contractAddress) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`Contract deployed at address: ${contractAddress}`);
  console.log("You can now interact with the contract. Type 'exit' to quit.");

  rl.on("line", async (input) => {
    if (input.trim().toLowerCase() === "exit") {
      console.log("Exiting...");
      rl.close();
      process.exit(0);
    } else {
      console.log(`You entered: ${input}`);
      // Add logic to interact with the contract here
    }
  });
};

deployContract()
  .then((address) => {
    console.log("Deployment successful! Contract address:", address);
    // keepAlive();
    interactWithContract();
  })
  .catch((error) => console.error("Deployment failed:", error));
