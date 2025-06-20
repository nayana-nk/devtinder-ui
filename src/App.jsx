import { Profiler, useState } from 'react'
import Login from './componnets/Login'
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import BodyComponent from './componnets/BodyComponent'
import Profile from './componnets/Profile'
import { Provider } from 'react-redux'
import appStore from './utils/appStore'
import FeedPage from './componnets/FeedPage'
import RequestsPage from './componnets/Requests'
import Connections from './componnets/Connections'


function App() {

  return (
    <>
    <Provider store={appStore}>
    <BrowserRouter basename='/'>
    <Routes>
       <Route path="/" element={<BodyComponent/>} >
       <Route path="/" element={<Login/>} />
       <Route path="/feed" element={<FeedPage/>} />
         <Route path="/profile" element={<Profile/>} />
          <Route path="/connections" element={<Connections/>} />
          <Route path="/requests" element={<RequestsPage/>} />
       </Route>
    </Routes>
    </BrowserRouter> 
    </Provider>
    </>
  )
}

export default App
