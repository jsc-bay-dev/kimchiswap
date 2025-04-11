import React from "react";
import { FaExchangeAlt } from "react-icons/fa";
import "./Exchange.css";

const Exchange = () => {
  return (
    <div className="exchange_window">
      <div className="currency_a"></div>
      <div className="swap_arrow">
        <div className="swap_arrow button">
            <FaExchangeAlt size={24}/>
        </div>
      </div>
      <div className="currency_b"></div>
    </div>
  );
};

export default Exchange;
