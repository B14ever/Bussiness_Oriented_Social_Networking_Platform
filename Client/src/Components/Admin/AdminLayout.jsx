import React from 'react'
import { Box,Container} from '@mui/material'
import { Outlet } from 'react-router-dom'
import ResponsiveDrawer from './AdminNavBar'
const AdminLayout = () => {
  return (
   <div>
     <Box sx={{ display:'flex',backgroundColor:'#E7EBF0',height:'auto'}}>
               <ResponsiveDrawer/>
               <Outlet/>
    </Box>
   </div>
  )
}

export default AdminLayout
