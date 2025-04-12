const fs = require("fs");
const solc = require("solc");

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log("build does not exist!");
    fs.mkdirSync(dir, { recursive: true });
    console.log("build directory created!");
  }
};

const compileHandler = async (contractPath, outputPath) => {
  ensureDirectoryExists(outputPath);
  try {

      const source = fs.readFileSync(contractPath, "utf8");
      
      const input = {
          language: "Solidity",
          sources: {
              [path.basename(contractPath)]: {
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
        
        const contractName = Object.keys(output.contracts)[0];
        const contract =
        output.contracts[contractName][
            Object.keys(output.contracts[contractName])[0]
        ];
        
        console.log(`${contractName} compiled successfully.`);
        return contract.abi; // Return the ABI
    } catch (error) {
        console.error("Error during compilation:", error.message);
        throw error;
    }
};

module.exports = compileHandler;
