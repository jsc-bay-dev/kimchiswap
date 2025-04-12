// compile.js
const fs = require("fs");
const solc = require("solc");

const ensureDirectoryExists = (dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  };

export const compileHandler = (contractPath, outputDir) => {
  try {

    ensureDirectoryExists(outputDir)
    const source = fs.readFileSync(contractPath, "utf8");

    const input = {
      language: "Solidity",
      sources: {
        [contractPath.split('/').pop()] : {
          content: source,
        },
      },
      settings: {
        outputSelection: {
          "*": {
            "*": ["abi", "evm.bytecode"],
          },
        },
      },
    };

    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    if (output.errors) {
      output.errors.forEach((err) => {
        console.error(err.formattedMessage);
      });
      throw new Error("Compilation failed.");
    }

    for (const contractName in output.contracts["KimchiCoin.sol"]) {
      const contract = output.contracts["KimchiCoin.sol"][contractName];
      fs.writeFileSync("KimchiCoin.abi", JSON.stringify(contract.abi, null, 2));
      fs.writeFileSync("KimchiCoin.bin", contract.evm.bytecode.object);
      console.log(`${contractName} compiled.`);
    }
  } catch (error) {
    console.error("Error during compilation:", error.message);
  }
};

