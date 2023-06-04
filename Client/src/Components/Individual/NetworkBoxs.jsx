import React from 'react'
import {Avatar,Box,Typography,Divider,Link,Tooltip} from '@mui/material'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
import {useNavigate} from 'react-router-dom'
const NetworkBox = () => {
    const {user} = useAthuContext()
    const friends = user.user.friends
    const pending = user.user.sentFriendRequest
    const pages = user.user.pages
    const {t} = useLanguage()
    const navigate = useNavigate()
  return (
    <Box sx={{borderRadius:'6px',backgroundColor: '#fff',width:{md: '70%', lg: '57%' },margin:'10px 0 10px'}}>
     <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',borderRadius:'10px'}}>
     <nav aria-label="main mailbox folders">
        <List disablePadding>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/PersonalAccountProfile/connection')}>
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <Typography p={1}>{t("Connection")}</Typography>
              <Typography sx={{marginLeft:'auto'}} p={1}>{friends.length}</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/PersonalAccountProfile/pendingRequest')}>
              <ListItemIcon>
                <AccessTimeOutlinedIcon />
              </ListItemIcon>
              <Typography p={1}>{t("PendingRequest")}</Typography>
              <Typography sx={{marginLeft:'auto'}} p={1}>{pending.length}</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/PersonalAccountProfile/pages')}>
              <ListItemIcon>
                <ArticleOutlinedIcon />
              </ListItemIcon>
              <Typography p={1}>{t("Pages")}</Typography>
              <Typography sx={{marginLeft:'auto'}} p={1}>{pages.length}</Typography>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
     </Box>
    </Box>
  )
}

export default NetworkBox