import { useState } from 'react'
import './Header.css'
import Exchange from '../Exchange/Exchange'
import Tracker from '../Tracker/Tracker'

const Header = ({ isLoggedIn }) => {
    const [activeTab, setActiveTab] = useState('explore')
    
    const tabs = [
        { id: 'explore', label: 'Explore', component: <Tracker /> },
        { id: 'trade', label: 'Trade', component: <Exchange isLoggedIn={isLoggedIn} /> }
    ]

    const authHandler = async (params) => {
        
    }

    const handleTabClick = (tabId) => {
        setActiveTab(tabId)
    }

  return (
    <>
      <header>
          <div className="logo">
              <img src="/kimchi.png" alt="Kimchi Jar" className="logo-image" />
              <span className="logo-text">KimchiSwap</span>
          </div>
          
          {isLoggedIn && (
            <nav className="nav-tabs">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => handleTabClick(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </nav>
          )}
         
          <div className="auth">
              {isLoggedIn ? 
                  <button className="log_out">Log Out</button> 
                  :
                  <button className="sign_in">Sign In</button> 
              }
          </div>
      </header>
      
      {isLoggedIn && (
        <div className="tab-content">
          {tabs.find(tab => tab.id === activeTab)?.component}
        </div>
      )}
    </>
  )
}

export default Header