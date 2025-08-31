import React from 'react'
import './Landing.css'
import KimchiCoin from '../../assets/KimchiCoin.svg'



const Landing = () => {
  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to{' '}
            <span className="hero-title-gradient">
              KimchiSwap
            </span>
          </h1>
          
          <div className="hero-buttons">
            <img src={KimchiCoin} alt="KimchiCoin" style={{ width: 120, height: 120, display: 'block', margin: '0 auto' }} />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
