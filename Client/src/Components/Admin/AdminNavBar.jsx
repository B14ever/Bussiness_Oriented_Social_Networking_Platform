import React,{useState} from 'react';
import { AppBar,Box,Drawer,ListItem,List,Toolbar,Typography
,ListItemButton,ListItemIcon,ListItemText,Divider,IconButton,Avatar,Tooltip,Menu,MenuItem} from '@mui/material/node';
import CssBaseline from '@mui/material/CssBaseline'
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {DashBordeListItems} from './AdminDashbordeListItems';
import { useNavigate} from 'react-router-dom';
import {useLanguage} from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import Logout from '../Shared/Logout';
const drawerWidth = 240;
function ResponsiveDrawer(props) {
  const {user} = useAthuContext()
  const navigate = useNavigate()
  const {t} = useLanguage()
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [hideDrawer,setHideDrawer] = useState(false)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <List>
        {DashBordeListItems.map((items) => (
          <ListItem key={items.id} disablePadding>
            <ListItemButton onClick={()=>navigate(`${items.Path}`)} >
              <ListItemIcon>
                {items.Icon}
              </ListItemIcon>
              <ListItemText primary={t(`${items.Name}`)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <AppBar position="fixed" sx={{background:'#fff',marginTop:'49px',boxShadow:'none'}}>
        <Toolbar variant='dense'>
          <IconButton color="primary" aria-label="open drawer" edge="start" onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{marginLeft:'auto',display:'flex'}} >
             <Divider orientation="vertical" color='primary' flexItem />
              <Tooltip title="Open settings">
                <IconButton  sx={{marginRight:'1rem'}} onClick={handleOpenUserMenu} >
                  <Avatar  sx={{ width: 30, height: 30}}   alt="Remy Sharp" src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`} />
                </IconButton>
              </Tooltip>
              <Menu sx={{ mt: '50px' }} anchorEl={anchorElUser} keepMounted open={Boolean(anchorElUser)} 
                  onClose={handleCloseUserMenu}
                  anchorOrigin={{vertical: 'top',horizontal: 'center',}}
                  transformOrigin={{vertical: 'top',horizontal: 'center',}}>
                  <Divider mt='0' light />
                  <MenuItem  onClick={()=>navigate('AdminProfileSetting')}>
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
        </Toolbar>
      </AppBar>
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }} aria-label="mailbox folders">
        <Drawer container={container} variant="temporary" open={mobileOpen} onClose={handleDrawerToggle}
          ModalProps={{keepMounted: true,}}
          sx={{display:{ xs: 'block', sm: 'none' },'& .MuiDrawer-paper':{ boxSizing: 'border-box', width: drawerWidth,top:'95px'},}}>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" open anchor='left'
          sx={{display: { xs: 'none', sm:'block' },'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth,top:'95px'},}}>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default ResponsiveDrawer