import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import Home from './pages/Home'
import UserProtectWrapper from './pages/UserProtected'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectWrapper from './pages/CaptainProtected'
import CaptainLogout from './pages/CaptainLogout'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'
import 'remixicon/fonts/remixicon.css'

const App = () => {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/riding' element={<Riding />} />
        <Route path='/captains-riding' element={<CaptainRiding />} />

        <Route path='/signup' element={<UserSignup />} />
        <Route path='/captains-login' element={<CaptainLogin />} />
        <Route path='/captains-signup' element={<CaptainSignup />} />
        <Route path='/home'
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          } />
        <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />
        <Route path='/captains-home' element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>

        } />
        <Route path='/captains/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App