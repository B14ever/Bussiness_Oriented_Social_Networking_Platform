import React,{useState} from 'react'
import {Box, Grid} from '@mui/material'
import ProfileBox from '../../Components/Individual/ProfileBox'
import CreatePost from '../../Components/Individual/CreatePost'
import Posts from '../../Components/Shared/Posts'
const PersonalAccountProfile = () => {
  const [action,setAction] = useState(false)
  return (
        <Box sx={{marginTop:'97px',backgroundColor:"#E7EBF0"}}>
          <Grid p={2}  container direction="row">
            <Grid item md={4} sx={{display:{xs:'none',md:'block'}}}>
              <ProfileBox/>  
            </Grid>
            <Grid item xs={12} md={8}>
             <CreatePost setState={setAction}/>
             <Posts state={action}/>
            </Grid>
          </Grid>
        </Box>
  )
}

export default PersonalAccountProfile
