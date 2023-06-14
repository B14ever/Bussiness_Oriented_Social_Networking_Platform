import React from 'react'
import { Box, Typography,Grid} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ProfilePhotoBox from '../../Components/Admin/ProfilePhotoBox'
const AdminProfileDetail = () => {
  const {user} = useAthuContext()
  const {t} = useLanguage()
  return (
    (
      <Box sx={{ marginTop: '100px', display: 'flex',flexDirection:'column',backgroundColor:"#E7EBF0" ,alignItems: 'center',width:'100%' }}>
      <Box sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '10px 0 5px', height: 'fit-content', width: { xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
         <ProfilePhotoBox/>
          <Box sx={{mt:{md:8,xs:6}}} pl={2}>
              <Grid container>
                <Grid item xs={12} sm={6}>
                 <Typography variant='h5'>{user.user.FirstName} {user.user.LastName}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} sx={{display:'flex',alignItems:'center'}}>
                  <LocationOnIcon sx={{color:'#999'}}/>
                  <Typography>{t("location")} {user.user.City}, {user.user.Country}</Typography> 
                </Grid>
                <Grid item xs={12} sm={6} sx={{display:'flex',alignItems:'center'}}>
                  <Typography variant='body2'>{user.user.Email}</Typography> 
                </Grid>
              </Grid>
          </Box>
      </Box>
    </Box>
    
    )
  )
}

export default AdminProfileDetail
