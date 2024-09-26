import { useState } from 'react'
import TodoList from './TodoList'
import Sidebar from './components/Sidebar'
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/CustomNavbar'

function App() {
  
  return (
      <>
        <CustomNavbar />
        <Sidebar />
      </>
  )
}

export default App
