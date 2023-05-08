import React from 'react'
import { Avatar,Box, Typography,Grid,Divider} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Education from '../../Components/Individual/Education'
const PersonalAccountProfileDetail = () => {
  const {user} = useAthuContext()
  const {t} = useLanguage()
  return (
    <Box sx={{ marginTop: '100px', display: 'flex',flexDirection:'column',backgroundColor:"#E7EBF0" ,alignItems: 'center' }}>
    <Box sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '10px 0 5px', height: 'fit-content', width: { xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
        <Box sx={{ position: 'relative'}}>
          <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%', height: 'auto',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
          <Avatar src="../../../Profile_Image/Avater.png"
          sx={{ width: { xs: 110, sm: 180, md: 200, lg: 200 }, height: { xs: 110, sm: 180, md: 200, lg: 200 },
          position: 'absolute', top: {sm:'calc(100% - 130px)',xs:'calc(100% - 70px)'}, left: {md:'calc(19% - 110px)',lg:'calc(13% - 110px)'} }} />
        </Box>
        <Box  item sx={{mt:{md:7,xs:4}}} pl={2}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
               <Typography variant='h5'>{user.user.FirstName} {user.user.LastName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{display:'flex',alignItems:'center'}}>
                <LocationOnIcon sx={{color:'#999'}}/>
                <Typography>{t("location")} {user.user.City}, {user.user.Country}</Typography> 
              </Grid>    
            </Grid>
        </Box>
    </Box>
    <Education/>
  </Box>
  
  )
}

export default PersonalAccountProfileDetail
