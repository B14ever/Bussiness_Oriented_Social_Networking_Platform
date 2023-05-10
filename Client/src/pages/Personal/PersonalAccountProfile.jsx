import React from 'react'
import {Avatar, Grid,Paper,Typography,Divider} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
const PersonalAccountProfile = () => {
  const {user} = useAthuContext()
  return (
      <Grid container spacing={2} sx={{marginTop:'100px'}}>
           <Grid item sx={{display:{xs:'none',sm:'flex'},justifyContent:'center',marginLeft:'1rem'}} sm={4}>
             <Paper sx={{width: { sm: '100%', md: '70%', lg: '57%' },display:'flex',flexDirection:'column',alignItems:'center'}}>
                <Avatar src='../../../Profile_Image/Avater.png'  sx={{ width: 150, height: 150 }}/>
               <Typography variant='subtitle2'>{user.user.FirstName} {user.user.LastName}</Typography>
                <Divider/>
             </Paper>
          </Grid>
          <Grid item md={8}>

          </Grid>
      </Grid>
  )
}

export default PersonalAccountProfile
