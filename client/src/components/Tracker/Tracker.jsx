import React from 'react'
import { useState, useEffect } from 'react'
import './Tracker.css'

const Tracker = () => {
    const [data, setData] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [lastUpdated, setLastUpdated] = useState(null)

    // move to back end
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('http://localhost:3001/api/crypto/prices', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
        const result = await response.json()
        setData(result)
        setLastUpdated(new Date())
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    useEffect(() => {
      fetchData()
      // Auto-refresh every 30 seconds
      const interval = setInterval(fetchData, 30000)
      return () => clearInterval(interval)
    }, [])
    
  return (
    <div className="tracker-container">
      <div className="tracker-header">
        <h2>🌶️ KimchiSwap Price Tracker</h2>
        <button 
          className={`refresh-button ${isLoading ? 'loading' : ''}`}
          onClick={fetchData}
          disabled={isLoading}
        >
          {isLoading ? '🔄' : '🔄'} {isLoading ? 'Updating...' : 'Refresh'}
        </button>
      </div>

      {lastUpdated && (
        <p className="last-updated">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </p>
      )}

      <div className="price-grid">
        {Object.keys(data).length > 0 ? (
          Object.entries(data).map(([symbol, price]) => (
            <div key={symbol} className="price-card">
              <div className="crypto-symbol">{symbol}</div>
              <div className="crypto-price">${parseFloat(price).toFixed(2)}</div>
            </div>
          ))
        ) : (
          <div className="no-data">
            {isLoading ? 'Loading prices...' : 'No price data available'}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tracker