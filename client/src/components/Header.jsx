import React from 'react'

const Header = (isLoggedIn) => {
    const authHandler = async (params) => {
        
    }

  return (
    <header>
        <div className="logo">
            <image className="kimchi_logo"></image>
        </div>
        <div className="title">KimchiSwap</div>
        <div className="auth">
            {isLoggedIn ? 
                <button className="log_out">Log Out</button> 
                :
                <button className="sign_in">Sign In</button> 
            }
        </div>
    </header>
  )
}

export default Header