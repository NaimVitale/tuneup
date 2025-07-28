import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
    <Header></Header>
    <main>
      <HomePage></HomePage>
    </main>
    </div>
  )
}

export default App
