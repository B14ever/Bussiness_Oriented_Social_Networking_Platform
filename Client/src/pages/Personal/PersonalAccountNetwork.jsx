import React,{useEffect,useState} from 'react'
import { Box,Typography,Divider,Button, Grid} from '@mui/material/node'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../Localazation/LanguageContext'
import NetworkBox from '../../Components/Individual/NetworkBoxs';
import Invitation from '../../Components/Individual/Invitation';
import People from '../../Components/Individual/People';
const PersonalAccountNetwork = () => {
  const navigate = useNavigate()
  const {t} = useLanguage()
  return (
     <Box sx={{marginTop:'97px',backgroundColor:"#E7EBF0"}}>
       <Grid p={2} container  direction="row" >
      <Grid item md={4}  sx={{display:{xs:'none',md:'block'}}}> 
        <NetworkBox/>
      </Grid>
      <Grid item xs={12} md={8}>
            <Box  sx={{display:'flex',flexDirection:'column', gap:'.9rem',
                           width:'100%',margin:'10px 0 10px'}}>
                 <Invitation/>
                 <People/>    
              </Box>
              <Box>
          </Box>
      </Grid>
  
    </Grid>
     </Box>
  )
}

export default PersonalAccountNetwork
