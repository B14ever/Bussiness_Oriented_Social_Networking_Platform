import React from 'react'
import {Avatar,Box,Typography,Divider,Link,Tooltip} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
import {useNavigate} from 'react-router-dom'
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
const ProfileBox = () => {
    const {user} = useAthuContext()
    const {t} = useLanguage()
    const navigate = useNavigate()
  return (
    <Box sx={{borderRadius:'6px',backgroundColor: '#fff',width: {sm:'90%',md: '70%', lg: '57%' },display:'flex',flexDirection:'column',alignItem:'center'}}>
      <Box sx={{ borderRadius:'6px',position: 'relative'}}>
      <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
       <Avatar src={`../../../Profile_Image/${user.user.logo}`}
         sx={{ position: 'absolute',width: {md:90, lg: 110}
              ,height: {md:90, lg: 110}
              ,top: '20%'
              ,left:'30%'}}/>
      </Box>
      <Box sx={{mt:{md:5,lg:6,display:'flex',justifyContent:'center'}}}>
        <Tooltip title={t("Profile")} placement="bottom">
         <Link onClick={()=>navigate('profile')} underline="hover" variant='subtitle2' color="inherit">{user.user.companyName}</Link>
        </Tooltip>
      </Box>
      <Divider/>
      <Box pb={1} sx={{display:'flex',alignItem:'center',gap:'.3rem',paddingLeft:'3.4rem',marginTop:'.5rem'}}>
        <BookmarkBorderOutlinedIcon/>
        <Typography sx={{cursor:'pointer','&:hover': {textDecoration: 'underline'}}}
          onClick={()=>navigate('myposts')}>{t('YourPost')}</Typography>
      </Box>
    </Box>
  )
}

export default ProfileBox
