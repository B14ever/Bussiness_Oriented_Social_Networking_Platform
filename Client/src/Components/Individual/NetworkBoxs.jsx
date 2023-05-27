import React from 'react'
import {Avatar,Box,Typography,Divider,Link,Tooltip} from '@mui/material'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
import {useNavigate} from 'react-router-dom'
const NetworkBox = () => {
    const {user} = useAthuContext()
    const {t} = useLanguage()
    const navigate = useNavigate()
  return (
    <Box sx={{borderRadius:'6px',backgroundColor: '#fff',width:{md: '70%', lg: '57%' },margin:'10px 0 10px'}}>
     <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
     <nav aria-label="main mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/PersonalAccountProfile/connection')}>
              <ListItemIcon>
                <PeopleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t("Connection")}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <AccessTimeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t("PendingRequest")}/>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ArticleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary={t("Pages")} />
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
     </Box>
    </Box>
  )
}

export default NetworkBox