import { Profiler, useState } from 'react'
import Login from './componnets/Login'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import BodyComponent from './componnets/BodyComponent'
import Profile from './componnets/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import FeedPage from './componnets/FeedPage'


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
       <Route path="/" element={<BodyComponent/>} >
       <Route path="/" element={<FeedPage/>} />
       <Route path="/login" element={<Login/>} />
         <Route path="/profile" element={<Profile/>} />
       </Route>
    </Routes>
    </BrowserRouter> 
    </Provider>
    </>
  )
}

export default App
