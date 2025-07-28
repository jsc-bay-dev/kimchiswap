// Enhanced deployment script for KimchiCoin
const { ethers } = require('hardhat');

async function main() {
    console.log('Deploying KimchiCoin...');
    
    // Get the deployer account
    const [deployer] = await ethers.getSigners();
    console.log('Deploying with account:', deployer.address);
    
    // Check deployer balance
    const balance = await deployer.getBalance();
    console.log('Account balance:', ethers.utils.formatEther(balance), 'ETH');
    
    // Deploy the contract
    const initialSupply = 1000000; // 1 million tokens
    const KimchiCoin = await ethers.getContractFactory('KimchiCoin');
    const kimchiCoin = await KimchiCoin.deploy(initialSupply);
    
    await kimchiCoin.deployed();
    
    console.log('✅ KimchiCoin deployed successfully!');
    console.log('Contract address:', kimchiCoin.address);
    console.log('Transaction hash:', kimchiCoin.deployTransaction.hash);
    
    // Verify contract details
    console.log('\n📊 Contract Details:');
    console.log('Name:', await kimchiCoin.name());
    console.log('Symbol:', await kimchiCoin.symbol());
    console.log('Decimals:', await kimchiCoin.decimals());
    console.log('Total Supply:', ethers.utils.formatEther(await kimchiCoin.totalSupply()));
    console.log('Owner Balance:', ethers.utils.formatEther(await kimchiCoin.balanceOf(deployer.address)));
    
    // Gas usage information
    const receipt = await kimchiCoin.deployTransaction.wait();
    console.log('\n⛽ Gas Information:');
    console.log('Gas Used:', receipt.gasUsed.toString());
    console.log('Gas Price:', ethers.utils.formatUnits(kimchiCoin.deployTransaction.gasPrice, 'gwei'), 'gwei');
    
    return kimchiCoin;
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('❌ Deployment failed:', error);
        process.exit(1);
    });
