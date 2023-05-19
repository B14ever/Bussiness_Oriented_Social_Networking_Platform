import React,{useState} from 'react';
import {Box,ListItem,List,Toolbar,Typography
,ListItemButton,ListItemIcon,ListItemText,Divider,IconButton,Avatar,Tooltip,Menu,MenuItem} from '@mui/material/node';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CssBaseline from '@mui/material/CssBaseline'
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {DashBordeListItems} from './AdminDashbordeListItems';
import { useNavigate} from 'react-router-dom';
import {useLanguage} from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import DropDawnMenu from './DropDawnMenu';
import Logout from '../Shared/Logout';
const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
function ResponsiveDrawer(props) {
  const theme = useTheme();
  const {user} = useAthuContext()
  const navigate = useNavigate()
  const {t} = useLanguage()
  const [anchorElUser, setAnchorElUser] = useState(null)
  const [open, setOpen] = useState(false);
  const [dropdawn,setDropdawn] = useState(false)
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
 const hanlDropdawn=()=>{
    setDropdawn(!dropdawn)
 }
 const handlDropdawnClose = ()=> {
    setDropdawn(false)
 }
  const drawer = (
    <div>
      <List>
        {DashBordeListItems.map((items) => (
          <React.Fragment key={items.id}>
            {
            items.Submenu?<> 
          <ListItem disablePadding>
            <Tooltip  title={!open?t(`${items.Name}`):''} placement="right-end">
              <ListItemButton onClick={hanlDropdawn}>
                 <ListItemIcon>
                 {items.Icon}
                 </ListItemIcon>
                 <ListItemText primary={t(`${items.Name}`)} />
             </ListItemButton>
           </Tooltip> 
         </ListItem>
         <DropDawnMenu item={items.Submenu} Dropdawn={dropdawn} handlDropdawnClose={handlDropdawnClose}/>
         </>:
            <ListItem sx={{marginTop:'.5rem'}}  disablePadding>
             <Tooltip  title={!open?t(`${items.Name}`):''} placement="right-end">
              
               <ListItemButton onClick={()=>navigate(`${items.Path}`)} >
                  <ListItemIcon>
                  {items.Icon}
                  </ListItemIcon>
                  <ListItemText primary={t(`${items.Name}`)} />
              </ListItemButton>
            </Tooltip>
          </ListItem>
         
           }
          </React.Fragment>
        ))}
      </List>
    </div>
  );

  return (
    <Box>
      <CssBaseline />
      <AppBar open={open} position="fixed" sx={{background:'#fff',marginTop:'49px',boxShadow:'none'}}>
        <Toolbar variant='dense'>
        <IconButton color="primary" aria-label="open drawer" onClick={handleDrawerOpen} edge="start"
            sx={{marginRight: 5,...(open && { display: 'none' }),}}>
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
                  <MenuItem sx={{display:'flex',gap:'.5rem'}}  onClick={()=>navigate('AdminProfileDetail')}>
                    <Avatar sx={{ width: 30, height: 30,}}  alt="Remy Sharp" src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`} />
                    <Typography textAlign="center">{t("Profile")}</Typography>
                  </MenuItem>
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
    <Box component="nav"  aria-label="mailbox folders">
        <Drawer  sx={{'& .MuiDrawer-paper': {top:'49px'},
          }} variant="permanent" open={open} anchor='left'>
           <DrawerHeader>
           <IconButton color='primary' onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          </DrawerHeader>
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
export default ResponsiveDrawer