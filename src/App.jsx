import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import Footer from './components/Footer'
import NavCategories from './components/NavCategories'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Header></Header>
    <NavCategories></NavCategories>
    <main>
      <HomePage></HomePage>
    </main>
    <Footer></Footer>
    </div>
  )
}

export default App
