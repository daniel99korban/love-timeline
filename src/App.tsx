import './App.css'
import { Outlet } from 'react-router-dom'
import { Footer } from './common/Footer'
import { Header } from './common/Header'

function App() {

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}

export default App
