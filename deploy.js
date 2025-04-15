const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const {
  totalSupply,
  balanceOf,
  transferTo,
  transferFrom,
  approve,
  allowance,
  inquireTransferTo,
  inquireTransferFrom,
  inquireApprove,
  inquireAllowance
} = require("./utils");
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

const interactWithContract = async (provider, wallet, contractAddress) => {
  const contract = new ethers.Contract(contractAddress, abi, provider);

  const fx = [
    "Check balance",
    "Transfer to",
    "Transfer from",
    "Approve third party",
    "Check allowance",
    "Exit",
  ];

  const userInput = async () => {
    const { input } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Select an action:",
        choices: fx,
      },
    ]);

    return input;
  };

  while (true) {
    const selection = await userInput();
    console.log("You selected:", selection);

    if (selection === "Check balance") {
      try {
        const balance = await contract.balanceOf(wallet.address);
        console.log(
          "Balance of wallet:",
          ethers.formatUnits(balance, 18),
          "KCH"
        );
      } catch (error) {
        console.error("Error checking balance:", error);
      }
    } else if (selection === "Transfer to") {
      try {
        const { recipient, amount } = await inquireTransferTo();
        await transferTo(contract, recipient, amount);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Transfer from") {
      try {
        const { sender, recipient, amount } = await inquireTransferFrom();
        await transferFrom(sender, recipient, amount);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Approve third party") {
      try {
        const { spender, amount } = await inquireApprove();
        await approve(spender, amount);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Check allowance") {
      try {
        const { owner, spender } = await inquireAllowance();
        await allowance(owner, spender);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Exit") {
      console.log("Exiting...");
      break;
    } else {
      console.log("Action not implemented yet.");
    }
  }
};

deployContract()
  .then((address) => {
    console.log("Deployment successful! Contract address:", address);
    // keepAlive();
    interactWithContract(provider, wallet, address);
  })
  .catch((error) => console.error("Deployment failed:", error));
