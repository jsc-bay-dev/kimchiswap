var fs = require('fs');
var solc = require('solc');

var source = fs.readFileSync('contract.sol', 'utf8');

var input = {
    language: 'Solidity',
    sources: {
        'contract.sol': {
            content: source
        }
    },
    settings: {
        optimizer: {
            enabled: true, // Enable the optimizer
            runs: 200      // Optimize for how many times you expect the code to be executed
        },
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode']
            }
        }
    }
};

function findImports(path) {
    if (path.startsWith('@openzeppelin')) {
        return {
            contents: fs.readFileSync(`node_modules/${path}`, 'utf8')
        };
    } else {
        return { error: 'File not found' };
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));


if (output.errors) {
    output.errors.forEach((err) => {
        console.error(err.formattedMessage);
    });
    process.exit(1); // Exit if there are errors
}
// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['contract.sol']) {
    fs.writeFileSync(
        `build/${contractName}.abi`,
        JSON.stringify(output.contracts['contract.sol'][contractName].abi, null, 2)
    );
    fs.writeFileSync(
        `build/${contractName}.bin`,
        output.contracts['contract.sol'][contractName].evm.bytecode.object
    );
    console.log(`${contractName} compiled successfully!`);
}