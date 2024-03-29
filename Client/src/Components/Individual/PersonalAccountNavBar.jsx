import React,{useState} from 'react'
import { AppBar,Toolbar,IconButton, Box, Grid,Badge,Tooltip,Menu,MenuItem,Typography,Avatar,Divider} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import CircleNotificationsOutlinedIcon from '@mui/icons-material/CircleNotificationsOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import Logout from '../Shared/Logout'
import {useLanguage} from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
const PersonalAccountNavBar = () => { 
  const {user} = useAthuContext()
  const {t} = useLanguage()
  const navigate = useNavigate()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar  position="fixed" sx={{background:'#fff',marginTop:'46px',paddingTop:'5px',boxShadow:'none'}}>
      <Toolbar variant='dense' >
       <Grid container >
         <Grid  item   xs={10}>
          <Box sx={{display: { xs: 'flex', sm: 'flex',},justifyContent:'space-around' }}>
            <Tooltip title={t("Home")}>
             <IconButton onClick={()=>navigate('/PersonalAccountProfile')}>
              <HomeOutlinedIcon/>
             </IconButton>
            </Tooltip>
           <Tooltip title={t("Message")}>
             <IconButton onClick={()=>navigate('PersonalMessage')}>
              <Badge  color="error">
                <MessageOutlinedIcon/>
              </Badge>
             </IconButton>
           </Tooltip>
            <Tooltip title={t("Network")}>
              <IconButton onClick={()=>navigate('PersonalNetwork')} >
                <Badge badgeContent={user.user.recivedFriendRequest.length} color="error">
                  <GroupOutlinedIcon/>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("Notification")}>
              <IconButton onClick={()=>navigate('PersonalNotification')}>
                <Badge  color="error">
                  <CircleNotificationsOutlinedIcon/>
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={t("job")}>
             <IconButton onClick={()=>navigate('jobs')}>
              <WorkOutlineOutlinedIcon/>
             </IconButton>
            </Tooltip>
          </Box>
        </Grid>
        <Grid  item   xs={2}>
          <Box sx={{display:'flex',justifyContent:'flex-end'}}  >
           <Divider orientation="vertical" flexItem />
              <Tooltip title="Open settings">
                <IconButton  sx={{marginRight:'1rem'}} onClick={handleOpenUserMenu} >
                  <Avatar  sx={{ width: 30, height: 30}}   alt="Remy Sharp" src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`} />
                </IconButton>
              </Tooltip>
                <Menu sx={{ mt: '50px' }} anchorEl={anchorElUser} keepMounted open={Boolean(anchorElUser)} 
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{vertical: 'top',horizontal: 'center',}}
                  transformOrigin={{vertical: 'top',horizontal: 'center',}}>
                  <MenuItem sx={{display:'flex',gap:'.5rem'}}  onClick={()=>navigate('PersonalProfileDetail')}>
                    <Avatar sx={{ width: 30, height: 30,}}  alt="Remy Sharp" src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`} />
                    <Typography textAlign="center">{t("Profile")}</Typography>
                  </MenuItem>
                  <Divider mt='0' light />
                  <MenuItem  onClick={()=>navigate('PersonalProfileSetting')}>
                    <Avatar sx={{width: 30, height: 30,marginRight:'.5rem'}}>
                    <SettingsIcon/>
                    </Avatar>
                    <Typography textAlign="center">{t("SettingAndPrivacy")}</Typography>
                  </MenuItem>
                  <MenuItem>
                    <Avatar sx={{width: 30, height: 30,marginRight:'.5rem'}}>
                      <ExitToAppIcon/>
                    </Avatar>
                      <Logout/>
                  </MenuItem>
                </Menu>
          </Box>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
  )
}

export default PersonalAccountNavBar

