import React from 'react'
import {Avatar, Grid,Paper,Typography,Divider} from '@mui/material'
import ProfileBox from '../../Components/Individual/ProfileBox'
const PersonalAccountProfile = () => {
  return (
      <Grid container spacing={2} sx={{marginTop:'100px'}}>
        <Grid item sx={{display:{xs:'none',md:'flex'},justifyContent:'center',marginLeft:'1rem'}} md={4}>
           <ProfileBox/>  
        </Grid>
          <Grid item md={8}>

          </Grid>
      </Grid>
  )
}

export default PersonalAccountProfile
