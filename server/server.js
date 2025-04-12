const express = require("express");
const fs = require("fs");
const solc = require("solc");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json()); // Parse JSON request bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies

const ensureDirectoryExists = (dir) => {
  if (!fs.existsSync(dir)) {
    console.log("build does not exist!");
    fs.mkdirSync(dir, { recursive: true });
    console.log("build directory created!");
  }
};

const compileHandler = (contractPath, outputDir) => {
  try {
    ensureDirectoryExists(outputDir);

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

    // Write ABI and Bytecode to files
    fs.writeFileSync(
      `${outputDir}/${contractName}.abi`,
      JSON.stringify(contract.abi, null, 2)
    );
    fs.writeFileSync(
      `${outputDir}/${contractName}.bin`,
      contract.evm.bytecode.object
    );

    console.log(`${contractName} compiled successfully.`);
    return contract.abi; // Return the ABI
  } catch (error) {
    console.error("Error during compilation:", error.message);
    throw error;
  }
};

// API Endpoint to Compile Contract
app.post("/compile", (req, res) => {
  const { filePath, outputDirectory } = req.body; // Expect contractPath and outputDir in the request body
  try {
    const abi = compileHandler(filePath, outputDirectory);
    res.json({ success: true, abi });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
