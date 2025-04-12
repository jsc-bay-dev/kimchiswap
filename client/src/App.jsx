import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Exchange from './components/Exchange/Exchange'
import Compiler from './components/Compiler/Compiler'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      
      <Exchange />
      <Compiler />
      <Footer />
    </>
  )
}

export default App
