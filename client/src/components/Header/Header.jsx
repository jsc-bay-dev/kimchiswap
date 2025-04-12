import React from "react";
import "./Header.css";
import kimchiLogo from "../../assets/kimchi.png";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src={kimchiLogo} alt="KimchiSwap Logo" className="logo_img" />
      </div>

      <h1>KimchiSwap</h1>
      <div className="connect_button">
        <button className="connect_button">Connect</button>
      </div>
    </div>
  );
};

export default Header;
