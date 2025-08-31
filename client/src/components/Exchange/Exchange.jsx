import { useState } from 'react'
import './Exchange.css'

const Exchange = ({ isLoggedIn }) => {
    const [fromToken, setFromToken] = useState('BTC')
    const [toToken, setToToken] = useState('KCH')
    const [fromAmount, setFromAmount] = useState('')
    const [toAmount, setToAmount] = useState('')

    if (!isLoggedIn) {
        return (
            <div></div>
        )
    }

    const handleSwap = () => {
        // TODO: Implement actual swap logic
        console.log(`Swapping ${fromAmount} ${fromToken} for ${toToken}`)
        // For now, just show a placeholder conversion
        if (fromAmount && parseFloat(fromAmount) > 0) {
            const conversionRate = 0.85 // Placeholder rate
            setToAmount((parseFloat(fromAmount) * conversionRate).toFixed(4))
        }
    }

    const handleFromAmountChange = (e) => {
        setFromAmount(e.target.value)
        // Clear to amount when from amount changes
        setToAmount('')
    }

    return (
        <div className="exchange_container">
            <div className="exchange-header">
                <h2>🌶️ KimchiSwap Exchange</h2>
                <p>Trade your favorite cryptocurrencies</p>
            </div>

            <div className="from_container exchange_card">
                <label>From</label>
                <div className="input-group">
                    <select 
                        value={fromToken}
                        onChange={(e) => setFromToken(e.target.value)}
                    >
                        <option value="BTC">₿ BTC</option>
                        <option value="ETH">Ξ ETH</option>
                        <option value="USDC">💵 USDC</option>
                    </select>
                    <input
                        type="number"
                        placeholder="0.0"
                        value={fromAmount}
                        onChange={handleFromAmountChange}
                        min="0"
                        step="0.0001"
                    />
                </div>
            </div>

            <button className="swap_button" onClick={handleSwap}>
                🔥 Swap Tokens 🔥
            </button>

            <div className="to_container exchange_card">
                <label>To</label>
                <div className="input-group">
                    <select 
                        value={toToken}
                        onChange={(e) => setToToken(e.target.value)}
                    >
                        <option value="KCH">🌶️ KCH</option>
                        <option value="ETH">Ξ ETH</option>
                        <option value="USDC">💵 USDC</option>
                    </select>
                    <input
                        type="number"
                        placeholder="0.0"
                        value={toAmount}
                        readOnly
                    />
                </div>
            </div>

            {toAmount && (
                <div className="swap-summary">
                    <p>You will receive approximately <strong>{toAmount} {toToken}</strong></p>
                </div>
            )}
        </div>
    )
}

export default Exchange