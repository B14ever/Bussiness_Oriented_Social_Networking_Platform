import React from 'react'
import { Box,Container} from '@mui/material'
import { Outlet } from 'react-router-dom'
import PersonalAccountNavBar from './PersonalAccountNavBar'
import Footer from '../Shared/Footer'
const PersonalAccountLayout = () => {
  return (
        <Box sx={{backgroundColor:'#E7EBF0',height:{xs:'130vh',sm:'calc(100vh - 10px)',lg:'calc(100vh - 100px)'}}}>
            <PersonalAccountNavBar/>
               <Outlet/>
        </Box>
  )
}

export default PersonalAccountLayout
