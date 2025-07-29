

const Exchange = () => {
    // useState: isLoading
    // useState: isLoggedIn
    // 
    if (!isLoggedIn) {
        return (
            <div className="landing_page"></div>
        )
    }
  return (
    <div className="exchange_container">
        <div className="left_container">
            <label htmlFor=""></label>
            <select name="" id="">
                <option value=""></option>
            </select>
        </div>
        <div className="swap">
            <button className="swap_button">swap</button>
        </div>
        <div className="right_container"></div>
    </div>
  )
}

export default Exchange