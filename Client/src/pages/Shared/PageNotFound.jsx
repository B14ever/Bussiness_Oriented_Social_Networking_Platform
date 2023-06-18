import React from 'react'
import {Box, Typography} from '@mui/material'
const PageNotFound = () => {
  return (
    <Box sx={{background:"#fff",height:"100vh",display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <img  style={{height:'660px'}} src={`../../../Profile_Image/pagenotfound.jpg`}/>
      <Typography variant='subtitle2'>Page Not Found</Typography>
    </Box>
  )
}

export default PageNotFound
