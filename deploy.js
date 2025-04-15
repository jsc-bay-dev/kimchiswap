const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer").default;
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
  inquireAllowance,
} = require("./utils");
require("dotenv").config();

// Load abi and bytecode
const abiPath = path.resolve(__dirname, "build", "KimchiCoin.abi");
const binPath = path.resolve(__dirname, "build", "KimchiCoin.bin");

const abi = JSON.parse(fs.readFileSync(abiPath, "utf-8"));
const bytecode = fs.readFileSync(binPath, "utf-8");

// Initialize provider and wallet globally
const provider = new ethers.JsonRpcProvider(process.env.SEPOLIA_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

// Log provider connection
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
// Deployment Function

const deployContract = async (wallet) => {
  try {
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
    return { contract };
  } catch (error) {
    console.error("Error deploying contract:", error);
    throw error;
  }
};

const interactWithContract = async (wallet, contract) => {
  const deployedContract = new ethers.Contract(contract.target, abi, wallet);
  console.log("Interacting with contract at address:", deployedContract.target);

  const fx = [
    "Check balance",
    "Transfer to",
    "Transfer from",
    "Approve third party",
    "Check allowance",
    "Total supply",
    "Exit",
  ];

  const userInput = async () => {
    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "Select an action:",
        choices: fx,
      },
    ]);

    return action;
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
        console.log("Contract:", contract);
        console.error("Error checking balance:", error);
      }
    } else if (selection === "Transfer to") {
      try {
        const { recipient, amount } = await inquireTransferTo();
        const tx = await contract.transfer(recipient, amount);
        console.log(`Transfer of ${ethers.formatUnits(amount, 18)} made to ${recipient}.`);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Transfer from") {
      try {
        const { sender, recipient, amount } = await inquireTransferFrom();
        const txFrom = await contract.transferFrom(sender, recipient, amount);
        console.log(`Transfer of ${ethers.formatUnits(amount, 18)} received from ${sender}.`);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Approve third party") {
      try {
        const { spender, amount } = await inquireApprove();
        const approval = await contract.approve(spender, amount);
        console.log(`${spender} has been authorized to spend ${ethers.formatUnits(amount, 18)}.`);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Check allowance") {
      try {
        const { owner, spender } = await inquireAllowance();
        const allowance = await contract.allowance(owner, spender);
        console.log(`${spender} may spend ${ethers.formatUnits(allowance, 18)} more ___.`);
      } catch (error) {
        console.error("An error occurred during the transfer:", error);
      }
    } else if (selection === "Total supply") {
      try {
        const totalSupply = await contract.totalSupply();
        console.log(`Total supply: ${ethers.formatUnits(totalSupply, 18)} KCH`);
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

deployContract(wallet)
  .then(({ contract }) => {
    console.log("Deployment successful! Contract address:", contract.address);

    // Start interacting with the contract
    interactWithContract(wallet, contract);
  })
  .catch((error) => console.error("Deployment failed:", error));
