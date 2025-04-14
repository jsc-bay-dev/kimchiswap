const fs = require("fs");
const solc = require("solc");
const path = require("path");

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  } else {
    fs.readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmdirSync(filePath, { recursive: true });
      } else {
        fs.unlinkSync(filePath);
      }
    });
  }
};

/**
 * Compiles a Solidity contract and returns the ABI and bytecode.
 * @param {string} contractFilePath - The path to the Solidity contract file.
 * @param {string} outputDir - The directory where the compiled files will be saved.
 * @returns {object} - An object containing the ABI and bytecode of the compiled contract.
 */
const compileContract = (contractFilePath, outputDir) => {
  try {
    // Ensure the output directory exists
    ensureDirectoryExists(outputDir);

    // Read the Solidity contract source code
    const source = fs.readFileSync(contractFilePath, "utf-8");

    // Prepare the Solidity compiler input
    const input = {
      language: "Solidity",
      sources: {
        [path.basename(contractFilePath)]: {
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

    // Compile the contract
    const output = JSON.parse(solc.compile(JSON.stringify(input)));

    // Check for compilation errors
    if (output.errors) {
      output.errors.forEach((err) => {
        console.error(err.formattedMessage);
      });
      throw new Error("Compilation failed.");
    }

    // Extract the compiled contract
    const contractName = Object.keys(output.contracts[path.basename(contractFilePath)])[0];
    const contract = output.contracts[path.basename(contractFilePath)][contractName];

    // Write the ABI and bytecode to the output directory
    fs.writeFileSync(path.join(outputDir, `${contractName}.abi`), JSON.stringify(contract.abi, null, 2));
    fs.writeFileSync(path.join(outputDir, `${contractName}.bin`), contract.evm.bytecode.object);

    console.log(`${contractName} compiled successfully.`);
    return { abi: contract.abi, bytecode: contract.evm.bytecode.object };
  } catch (error) {
    console.error("Error during compilation:", error.message);
    throw error;
  }
};

// Example usage
const contractPath = path.resolve(__dirname, "KimchiCoin.sol");
const buildPath = path.resolve(__dirname, "build");

const result = compileContract(contractPath, buildPath);
console.log("Compiled ABI:", result.abi);
console.log("Compiled Bytecode:", result.bytecode);