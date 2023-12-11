import { useState } from 'react'

import './App.css'
import AppRouter from './confiq/router.jsx'
import { BrowserRouter } from 'react-router-dom'
function App() {


  return (
  <BrowserRouter>
  <AppRouter/>
  </BrowserRouter>
   
  )
}

export default App
