import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import './App.css'
import Exchange from './components/Exchange/Exchange'
import Tracker from './components/Tracker/Tracker'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  //useState: isLoading

  return (
    <>
      <div className="app_container">
        <Header isLoggedIn={isLoggedIn}/>
          <main>

            <Tracker/>
            { isLoggedIn ? <Exchange isLoggedIn={isLoggedIn}/> : <Landing/>}
          </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
