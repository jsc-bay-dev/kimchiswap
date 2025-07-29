import './Header.css'

const Header = (isLoggedIn) => {
    const authHandler = async (params) => {
        
    }

  return (
    <header>
        <div className="logo">
        </div>
        <h1 className="title">KimchiSwap</h1>
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