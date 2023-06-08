import React from 'react'
import { Typography,Grid} from '@mui/material'
import LoginForm from '../../Components/Shared/LoginForm'
const Login = () => {
  return (
    <Grid sx={{marginTop:{lg:'40px',sm:'49px',md:'49px',xs:'49px'},backgroundColor:'#fff',height:'95vh'} } container component="main">
      <Grid item xs={12} md={6} sx={{display:{xs:'none',lg:'block'}}}>
         <img  style={{height:'660px'}} src={`../../../Profile_Image/login${Math.floor(Math.random() *3) + 1}.jpg`}/>
       </Grid>
       <Grid item xs={12} lg={6}>
        <LoginForm/>
       </Grid>
    </Grid>
  )
}

export default Login
