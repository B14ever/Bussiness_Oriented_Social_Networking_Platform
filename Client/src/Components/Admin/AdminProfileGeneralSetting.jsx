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
         <React.Fragment>
          <Divider  sx={{marginTop:'20px'}}>{t("Name")}</Divider>
          <Box component="form" pr={1} pl={1} sx={{display:'flex',flexDirection:'column',gap:'.5rem',alignItems:'center'}}mt={2}ml={2}mr={2}>
              <TextField sx={{width:{xs:'100%',md:'50%'}}}  name='FirstName'  label={t('FirstName')} defaultValue={user.user.FirstName} fullWidth />
              <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}></FormHelperText> 
              <TextField sx={{width:{xs:'100%',md:'50%'}}} name='LastName'  label={t('LastName')} defaultValue={user.user.LastName} fullWidth />
              <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}></FormHelperText>
              <Box sx={{width:{xs:'100%',md:'50%'},mb:1,display:'flex',justifyContent:'flex-end'}}><Button type="submit"  variant="contained" size='large' sx={{width:{xs:'100%',sm:'50%'}}}>{t("save")}</Button></Box>
          </Box>
        </React.Fragment>
  )
}

export default AdminProfileGeneralSetting
