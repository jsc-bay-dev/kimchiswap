import Header from './components/Header'
import Footer from './components/Footer'

import './App.css'
import Exchange from './components/Exchange'

function App() {
  //useState: isLoggedIn
  //useState: isLoading

  return (
    <>
      <div className="app_container">
        <Header isLoggedIn/>
          <main>
            { isLoggedIn ? <Exchange/> : <Landing/>}
          </main>
        <Footer/>
      </div>
    </>
  )
}

export default App
