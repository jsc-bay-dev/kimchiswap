import Header from './components/Header'
import Footer from './components/Footer'
import { useState } from 'react'
import './App.css'
import Exchange from './components/Exchange'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  //useState: isLoading

  return (
    <>
      <div className="app_container">
        <Header isLoggedIn={isLoggedIn}/>
          <main>
            { isLoggedIn ? <Exchange isLoggedIn={isLoggedIn}/> : <Landing/>}
          </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
