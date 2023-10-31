import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Errorpage from '../pages/Errorpage'
import ContactPage from '../pages/Contactpage'


const RoutesView = () => {
  return (
    <Routes>
        <Route path='/contact' element={<ContactPage/>}/>
        <Route path='/' element={<Homepage/>}/>
        <Route path='*' element={<Errorpage/>}/>
        <Route/>
    </Routes>
  )
}

export default RoutesView