import React from 'react'
import { Typography,Grid} from '@mui/material'
import LoginForm from '../../Components/Shared/LoginForm'
const Login = () => {
  return (
    <Grid sx={{marginTop:{lg:'64px',sm:'64px',md:'64px',xs:'56px'}} } container component="main">
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
