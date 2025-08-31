import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { useState } from 'react'
import './App.css'
import Landing from './components/Landing/Landing'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  //useState: isLoading

  return (
    <>
      <div className="app_container">
        <Header isLoggedIn={isLoggedIn}/>
        <main>
          {!isLoggedIn && <Landing />}
        </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
