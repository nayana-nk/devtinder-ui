import { Profiler, useState } from 'react'
import Login from './Login'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import BodyComponent from './BodyComponent'
import Profile from './Profile'


function App() {

  return (
    <>
    <BrowserRouter basename='/'>
    <Routes>
       <Route path="/" element={<BodyComponent/>} >
       <Route path="/login" element={<Login/>} />
         <Route path="/profile" element={<Profile/>} />
       </Route>
    </Routes>
    </BrowserRouter> 
    </>
  )
}

export default App
