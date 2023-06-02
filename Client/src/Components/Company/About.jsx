import React from 'react'
import { Box,Typography,IconButton,Divider,Dialog} from '@mui/material/node'
import { InfoBox,Section_One} from './Css'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
const About = () => {
  const {user} = useAthuContext()
  const {t} = useLanguage()
  return (
     <InfoBox>
       <Box p={1} sx={{display:'flex',alignItems:'center'}}>
       <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("About")}</Typography>
        {
          user.user.tagline.length > 0 ?
          <IconButton sx={{marginLeft:'auto'}}>
             <EditIcon/>
          </IconButton>:
          <IconButton sx={{marginLeft:'auto'}}>
            <AddIcon/>
         </IconButton>
        }
       </Box>
       <Divider/>
       { 
        user.user.tagline.length > 0 ?
         <Box p={1}>
          <Typography sx={{color:'#555'}}>
          {
            user.user.tagline
          }
        </Typography>
         </Box>:
         null
       }
     </InfoBox>
  )
}

export default About
