

const Exchange = ({ isLoggedIn }) => {
    // useState: isLoading
    // useState: isLoggedIn
    // 
    if (!isLoggedIn) {
        return (
            <div className="landing_page"></div>
        )
    }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-kimchi-200">
        <div className="bg-gradient-to-br from-kimchi-50 to-orange-50 rounded-xl p-4 space-y-3 border border-kimchi-100">
            <label className="block text-sm font-medium text-kimchi-800">From</label>
            <div className="flex items-center space-x-3">
                <select className="flex-1 bg-white border border-kimchi-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kimchi-500 focus:border-transparent hover:border-kimchi-400 transition-colors">
                    <option value="BTC">BTC - Bitcoin</option>
                    <option value="ETH">ETH - Ethereum</option>
                    <option value="USDC">USDC - USD Coin</option>
                </select>
                <input 
                    type="number" 
                    placeholder="0.0" 
                    className="w-24 bg-transparent text-right text-lg font-semibold focus:outline-none text-kimchi-900"
                />
            </div>
        </div>
        
        <div className="flex justify-center">
            <button className="bg-kimchi-500 hover:bg-kimchi-600 text-white p-3 rounded-full transition-all duration-300 transform hover:rotate-180 hover:scale-110 shadow-lg hover:shadow-kimchi-200">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
            </button>
        </div>
        
        <div className="bg-gradient-to-br from-kimchi-50 to-orange-50 rounded-xl p-4 space-y-3 border border-kimchi-100">
            <label className="block text-sm font-medium text-kimchi-800">To</label>
            <div className="flex items-center space-x-3">
                <select className="flex-1 bg-white border border-kimchi-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-kimchi-500 focus:border-transparent hover:border-kimchi-400 transition-colors">
                    <option value="KCH">🌶️ KCH - Kimchi Token</option>
                    <option value="ETH">ETH - Ethereum</option>
                    <option value="USDC">USDC - USD Coin</option>
                </select>
                <input 
                    type="number" 
                    placeholder="0.0" 
                    className="w-24 bg-transparent text-right text-lg font-semibold focus:outline-none text-kimchi-900"
                    readOnly
                />
            </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-kimchi-500 via-kimchi-600 to-red-500 hover:from-kimchi-600 hover:via-kimchi-700 hover:to-red-600 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-kimchi-300 focus:ring-offset-2 shadow-lg hover:shadow-xl">
            🔥 Swap Tokens 🔥
        </button>
    </div>
  )
}

export default Exchange