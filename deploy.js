require("dotenv").config();
const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  const rpcUrl = process.env.SEPOLIA_RPC_URL;
  const privateKey = process.env.PRIVATE_KEY;

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const wallet = new ethers.Wallet(privateKey, provider);

  const abi = JSON.parse(fs.readFileSync("./build/KimchiCoin.abi", "utf8"));
  const bytecode = fs.readFileSync("./build/KimchiCoin.bin", "utf8");

  const contractFactory = new ethers.ContractFactory(abi, bytecode, wallet);

  const initialSupply = ethers.parseUnits(process.argv[2] || "1000", 18);
  console.log(
    "Deploying contract with initial supply:",
    initialSupply.toString()
  );

  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice; // Use the gas price from fee data
  console.log(
    "Current gas price:",
    ethers.formatUnits(gasPrice, "gwei"),
    "gwei"
  );

  const contract = await contractFactory.deploy(initialSupply, {
    gasPrice: gasPrice * 2n,
    gasLimit: 5000000n,
  });
  console.log("Transaction hash:", contract.deploymentTransaction().hash);

  console.log("Waiting for confirmation...");
  await contract.deploymentTransaction().wait();
  console.log("Contract deployed at address:", contract.target);
}

main().catch((error) => {
  console.error("Error deploying contract:", error);
  process.exit(1);
});
