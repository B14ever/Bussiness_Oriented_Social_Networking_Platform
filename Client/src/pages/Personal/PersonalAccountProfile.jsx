import React from 'react'
import {Avatar,Box, Grid,Paper,Typography,Divider} from '@mui/material'
import ProfileBox from '../../Components/Individual/ProfileBox'
import CreatePost from '../../Components/Shared/CreatePost'
import Posts from '../../Components/Shared/Posts'
const PersonalAccountProfile = () => {
  return (
        <Box sx={{marginTop:'97px',backgroundColor:"#E7EBF0"}}>
          <Grid p={2}  container direction="row">
            <Grid item md={4} sx={{display:{xs:'none',md:'block'}}}>
              <ProfileBox/>  
            </Grid>
            <Grid item xs={12} md={8}>
             <CreatePost/>
             <Posts/>
            </Grid>
          </Grid>
        </Box>
  )
}

export default PersonalAccountProfile
