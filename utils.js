const inquirer = require('inquirer');

const totalSupply = async () => {
  try {
    const supply = await contract.totalSupply();
    console.log(`${ethers.formatUnits(supply, 18)} tokens in circulation`);
    return supply;
  } catch (error) {
    console.error("Error fetching total supply:", error);
    throw error;
  }
};
const balanceOf = async (address) => {
  try {
    const balance = await contract.balanceOf(address);
    console.log(
      `Balance of ${address}: ${ethers.formatUnits(balance, 18)} KCH`
    );
    return balance;
  } catch (error) {
    console.error("Error fetching balance:", error);
    throw error;
  }
};
const transferTo = async (recipient, amount) => {
  try {
    const tx = await contract.transfer(
      recipient,
      ethers.parseUnits(amount, 18)
    );
    console.log("Transaction pending... Hash:", tx.hash);
    await tx.wait();
    console.log("Transfer successful!");
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
};
const transferFrom = async (sender, recipient, amount) => {
  try {
    const tx = contract.transferFrom(
      sender,
      recipient,
      ethers.parseUnits(amount, 18)
    );
    console.log("Transaction pending... Hash:", tx.hash);
    await tx.wait();
    console.log("Transfer successful!");
  } catch (error) {
    console.error("Error transferring tokens:", error);
    throw error;
  }
};
const approve = async (spender, amount) => {
    try {
        const tx = await contract.approve(sender, ethers.parseUnits(amount, 18));
        console.log("Approval transaction pending... Hash:", tx.hash)
        await tx.wait();
        console.log("Approval successful!");
        return tx;
    } catch (error) {
        console.error("Error approving spender:", error);
        throw error;
    }
};
const allowance = async (owner, spender) => {try {
    const remaining = await contract.allowance(owner, spender);
    console.log(
      `Allowance for ${spender} by ${owner}: ${ethers.formatUnits(
        remaining,
        18
      )} KCH`
    );
    return remaining;
  } catch (error) {
    console.error("Error fetching allowance:", error);
    throw error;
  }};



const inquireTransferTo = async () => {
    try {
        const user_input = await inquirer.prompt([
            {
                type: 'input',
                name: 'recipient',
                message: 'Enter the recipient address:',
                validate: (input) => input ? true : 'Recipient address is required',
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to transfer:',
                validate: (input) => !isNaN(input) && Number(input) > 0 ? true : 'Please enter a valid amount',
            },
        ]);

        const { recipient, amount } = user_input;
        return user_input;
    } catch (error) {
        console.error("Error during user input transfer:", error);
        throw error;
    }
};

const inquireTransferFrom = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'sender',
                message: 'Enter the sender address:',
                validate: (input) => input ? true : 'Sender address is required',
            },
            {
                type: 'input',
                name: 'recipient',
                message: 'Enter the recipient address:',
                validate: (input) => input ? true : 'Recipient address is required',
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to transfer:',
                validate: (input) => !isNaN(input) && Number(input) > 0 ? true : 'Please enter a valid amount',
            },
        ]);

        const { sender, recipient, amount } = answers;
        await transferFrom(sender, recipient, amount);
    } catch (error) {
        console.error("Error during user input transfer from:", error);
        throw error;
    }
};

const inquireApprove = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'spender',
                message: 'Enter the spender address:',
                validate: (input) => input ? true : 'Spender address is required',
            },
            {
                type: 'input',
                name: 'amount',
                message: 'Enter the amount to approve:',
                validate: (input) => !isNaN(input) && Number(input) > 0 ? true : 'Please enter a valid amount',
            },
        ]);

        const { spender, amount } = answers;
        await approve(spender, amount);
    } catch (error) {
        console.error("Error during user input approve:", error);
        throw error;
    }
};

const inquireAllowance = async () => {
    try {
        const answers = await inquirer.prompt([
            {
                type: 'input',
                name: 'owner',
                message: 'Enter the owner address:',
                validate: (input) => input ? true : 'Owner address is required',
            },
            {
                type: 'input',
                name: 'spender',
                message: 'Enter the spender address:',
                validate: (input) => input ? true : 'Spender address is required',
            },
        ]);

        const { owner, spender } = answers;
        await allowance(owner, spender);
    } catch (error) {
        console.error("Error during user input allowance:", error);
        throw error;
    }
};

module.exports = {
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
};