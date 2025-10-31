import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Myprofile from './pages/Myprofile'
import MyAppointment from './pages/MyAppointment'
import Appointment from './pages/Appointment'
import Navbar from './components/Navbar'
import Footer from './components/Footer'


const App = () => {
  const location = useLocation();

  // hide navbar and footer on these pages
  const hideLayoutRoutes = ['/',];

  const shouldHideLayout = hideLayoutRoutes.includes(location.pathname);
  const token = localStorage.getItem('token')
  return (
    <div className='mx-4 sm:mx-[10%]'>
      {!shouldHideLayout && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/dashboard' element={<Home />} />
        
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/my-profile' element={<Myprofile />} />
        <Route path='/my-appointment' element={<MyAppointment />} />
        <Route path='/appointment' element={<Appointment />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
      </Routes>

      {!shouldHideLayout && <Footer />}
    </div>
  )
}

export default App