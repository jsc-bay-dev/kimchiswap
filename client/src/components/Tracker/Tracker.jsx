import React from 'react'
import { useState } from 'react'

const Tracker = () => {
    const [data, setData] = useState({})

    // move to back end
    const fetchData = async () => {
        const response = await fetch('https://pro-api.coinmarketcap.com/40fd3ca7-5ad4-403d-88e0-85453f44f192', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            
            }
        })
        const result = await response.json()
        setData(result)
        
    }
    
  return (
    <div>
        <button onClick={fetchData}>Track</button>
    </div>
  )
}

export default Tracker