import React from 'react'
import {Grid,Box,Avatar,Divider,TextField,FormHelperText,Button} from '@mui/material/node'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
import {useNavigate} from 'react-router-dom'
const AdminProfileGeneralSetting = () => {
  const {user} = useAthuContext()
  const {t} = useLanguage()
  const navigate = useNavigate()
  return (
    <Grid container spacing={3} >
      <Grid item lg={6} xs={12}>
      <Box mt={1}  sx={{backgroundColor: '#fff',width:`100%`, display:'flex',justifyContent:'center'}}>
      <Box sx={{ borderRadius:'6px',position: 'relative'}}>
      <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%',borderTopRightRadius:'6px' }} />
       <Avatar src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`}
         sx={{ width: { xs: 110, sm: 130, md: 150, lg: 150 }, 
         height: { xs: 110, sm: 130, md: 150, lg: 150 },
         position: 'absolute',
         top: {lg:'calc(100% - 100px)',sm:'calc(100% - 85px)',xs:'calc(100% - 70px)'},
         left: {xs:'calc(19% - 60px)',sm:'calc(19% - 80px)',md:'calc(19% - 100px)',lg:'calc(13% - 60px)'}
            }}/>
      </Box>
      </Box>
      </Grid>
      <Grid sx={{marginTop:{xs:'25px',lg:'0px'}}} item lg={6} xs={12}>
        <Box pr={1} pl={1} sx={{display:'flex',flexDirection:'column'}}>
        <TextField sx={{marginTop:'1rem'}}  name='FirstName'  label={t('FirstName')} defaultValue={user.user.FirstName} fullWidth />
        <FormHelperText sx={{color:'red'}}>Error</FormHelperText> 
        <TextField sx={{marginTop:'1rem'}} name='LastName'  label={t('LastName')} defaultValue={user.user.LastName} fullWidth />
        <FormHelperText sx={{color:'red'}}>Erros</FormHelperText>
        <Button type="submit"  variant="contained" size='large' sx={{ mt: 1, mb: 2,width:{xs:'100%',sm:'25%'},marginLeft:'auto' }}>{t("save")}</Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default AdminProfileGeneralSetting
