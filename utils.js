const inquirer = require('inquirer');

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
    inquireTransferTo,
    inquireTransferFrom,
    inquireApprove,
    inquireAllowance
};