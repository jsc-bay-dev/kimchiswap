import React, { useState } from "react";
import axios from "axios";
import "./Compiler.css";



  
 const Compiler = () => {
    const [abi, setAbi] = useState(null);
    const [error, setError] = useState(null);
    
    const kimchiCoinPath = '../../contracts/KimchiCoin.sol'
    const outputDirectoryPath = '../client/build';


  
    const handleCompiler = async () => {
      try {
        console.log("request being made")
        console.log(outputDirectoryPath)
        const response = await axios.post("/compiler", {
          filePath: kimchiCoinPath,
          outputDirectory: outputDirectoryPath,
        });
        console.log("post request made!")
        setAbi(response.data.abi);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
      }
    };

    return (
      <div className="compiler">
      <button onClick={handleCompiler}>COMPILE</button>
      {abi && <pre>{JSON.stringify(abi, null, 2)}</pre>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="compiler" id="deploy_button">
        DEPLOY
      </div>
    </div>
    )
  };
  
  export default Compiler;