import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import "./Exchange.css";
import { BrowserProvider } from "ethers";
import compileHandler from "../../utils/compile";
import Compiler from "../Compiler/Compiler";


const Exchange = () => {


  const kimchiCoinPath = '../../contracts/KimchiCoin.sol';
  const buildPath = '../../../../build';

  compilerHandler(kimchiCoinPath, buildPath);
  

  





  return (
    <div className="exchange_window">
      <div className="currency_a">BTC</div>
      <div className="swap_arrow">
        <div className="swap_arrow button">
            <FaExchangeAlt className="swap_icon" size={24} />
        </div>
      </div>
      <div className="currency_b">KCH</div>
    </div>
  );
};

export default Exchange;
