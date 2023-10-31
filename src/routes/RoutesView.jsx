import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Errorpage from '../pages/Errorpage'

const RoutesView = () => {
  return (
    <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='*' element={<Errorpage/>}/>
        <Route/>
    </Routes>
  )
}

export default RoutesView