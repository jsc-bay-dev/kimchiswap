import React from 'react'
import { useState } from 'react'

const Tracker = () => {
    const [data, setData] = useState({})

    // move to back end
    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/api/crypto/prices', {
        method: 'GET',
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