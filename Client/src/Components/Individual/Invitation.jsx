import React from 'react'
import { Box,Typography,Divider,LinearProgress} from '@mui/material/node'
import { useLanguage } from '../../Localazation/LanguageContext'
const Invitation = () => {
    const {t} = useLanguage()
  return (
    <Box p={2} sx={{borderRadius:'6px',display:'flex',flexDirection:'column',backgroundColor:'#fff'}}>
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px'}}>
                <LinearProgress />
      </Box>
     <Typography  variant='subtitle2'>{t("Invitations")}</Typography>
      <Divider/>
    </Box> 
  )
}

export default Invitation
