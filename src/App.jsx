import {BrowserRouter,Routes,Route}  from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import UserCart from './Components/UserCart'
import Nav from './Components/Nav'
import UserProfile from './Components/UserProfile'
import store from './Store/EcartStore'
import { useState } from 'react'


function App() {
  const [isLogIn, setIsLogIn] = useState(store.getState().isLoggedIn);

  store.subscribe(() => {
    setIsLogIn(store.getState().user.isLoggedIn);
  });


  return (
    <>
    <BrowserRouter>
    {isLogIn && <Nav/>}
      
      <Routes>
        <Route path='/' element={isLogIn ? <Home/> : <Login/>}></Route>
        <Route path='/home' element={isLogIn ? <Home/> : <Login/>}></Route>
        <Route path='/login' element={isLogIn ? <Home/> : <Login/>}></Route>
        <Route path='/Cart' element={isLogIn ? <UserCart/> : <Login/>}></Route>
        <Route path='/my-profile' element={isLogIn ? <UserProfile/> : <Login/>}></Route>
        <Route path='/profile' element={isLogIn ? <UserProfile/> : <Login/>}></Route>
        

      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
