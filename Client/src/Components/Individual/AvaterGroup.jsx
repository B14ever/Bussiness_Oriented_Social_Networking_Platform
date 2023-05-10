import React from 'react'
import { Avatar } from '@mui/material/node'
const AvaterGroup = () => {
  return (
    <React.Fragment>
       <Avatar src="../../../Profile_Image/Model1.jpg"
        sx={{width: { xs: 40, sm: 45,lg: 60}, 
        height: { xs: 40, sm: 45,lg: 60},}}/>
    <Avatar src="../../../Profile_Image/Model2.jpg"
        sx={{width: { xs: 60, sm:60, md: 60, lg:80}, 
        height: { xs: 60, sm: 60, md: 60, lg: 80},}}/>
    <Avatar src="../../../Profile_Image/Mode4.jpg"
        sx={{width: { xs:80, sm: 130, md: 110, lg:110}, 
        height: { xs:80, sm: 130, md: 110, lg: 110},}}/>
    <Avatar src="../../../Profile_Image/Model3.jpg"
        sx={{width: { xs: 60, sm:60, md: 60, lg:80}, 
        height: { xs: 60, sm: 60, md: 60, lg: 80},}}/>
    <Avatar src="../../../Profile_Image/Model5.jpg"
        sx={{width: { xs: 40, sm: 45,lg: 60}, 
        height: { xs: 40, sm: 45,lg: 60},}}/>
    </React.Fragment>
  )
}

export default AvaterGroup
