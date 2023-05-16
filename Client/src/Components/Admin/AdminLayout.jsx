import React from 'react'
import { Box,Container} from '@mui/material'
import { Outlet } from 'react-router-dom'
import ResponsiveDrawer from './AdminNavBar'
const AdminLayout = () => {
  return (
    <Box sx={{ display:'flex',backgroundColor:'#E7EBF0',height:{xs:'130vh',sm:'calc(100vh - 10px)',lg:'calc(100vh)'}}}>
               <ResponsiveDrawer/>
               <Outlet/>
    </Box>
  )
}

export default AdminLayout
