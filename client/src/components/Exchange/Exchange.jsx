import './Exchange.css'

const Exchange = ({ isLoggedIn }) => {

    if (!isLoggedIn) {
        return (
            <div></div>
        )
    }

    

    return (
        <div className="exchange_container">
            <div className="from_container exchange_card">
                <label>From</label>
                <div>
                    <select>
                        <option value="BTC">BTC</option>
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                    </select>
                    <input
                        type="number"
                        placeholder="0.0 USD"
                    />
                </div>
            </div>


            <button className="swap_button">
                🔥 Swap Tokens 🔥
            </button>
            Ï

            <div className="to_container exchange_card">
                <label>To</label>
                <div>
                    <select>
                        <option value="KCH">🌶️ KCH</option>
                        <option value="ETH">ETH</option>
                        <option value="USDC">USDC</option>
                    </select>
                    <input
                        type="number"
                        placeholder="0.0 USD"
                        readOnly
                    />
                </div>
            </div>


        </div>
    )
}

export default Exchange