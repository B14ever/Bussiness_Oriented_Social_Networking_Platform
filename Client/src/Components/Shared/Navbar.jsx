import { AppBar, Toolbar, Typography,Grid,Box,Button,Menu,MenuItem} from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate,useLocation } from 'react-router-dom'
import { useState} from 'react';
import { useLanguage } from '../../Localazation/LanguageContext';
import Languagebtn from './Languagebtn';
const Navbar = () => {
    const {t,i18n} = useLanguage()
    const navigate = useNavigate()
    const location = useLocation()
    const theme = useTheme()
    const isMatch = useMediaQuery(theme.breakpoints.down('sm'))
    const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }
  return (
        <AppBar sx={{backgroundColor:'#fff',boxShadow:'none'}} component="nav">
        <Toolbar variant='dense' sx={{boxShadow:'none',background: '#1e88e5'}}>
                <Grid sx={{placeItems:'center'}} container>
                    <Grid xs={8} sm={6}  item>
                        <Typography  sx={{textAlign:'center',color:'#fff',fontSize:'1.5rem'}}>BOSNP</Typography>
                    </Grid>
                    {
                    (location.pathname === '/')?isMatch?
                    <Grid item xs={4} >
                        <Box  sx={{ display:'flex',alignItems:'center'}}>
                            <Languagebtn/>
                            <IconButton size="large" onClick={handleOpenUserMenu} >
                               <MenuIcon sx={{color:'#fff'}}/>
                            </IconButton>
                            <Menu sx={{p:0, mt: '35px' }} id="menu-appbar" anchorEl={anchorElUser}
                            anchorOrigin={{vertical: 'top',horizontal: 'center',}}
                            keepMounted
                            transformOrigin={{vertical: 'top',horizontal: 'center',}}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}>
                                <MenuItem  onClick={handleCloseUserMenu}>
                                <Button size="small"  onClick={()=>navigate('/login')}>{t("Login")}</Button>
                                </MenuItem>
                                <MenuItem  onClick={handleCloseUserMenu}>
                                <Button size="small" onClick={()=>navigate('/signup')}>{t("Signup")}</Button>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Grid>:
                    <Grid sm={6}  item>
                        <Box  sx={{ display: { xs: 'none', sm: 'flex', } }}>
                            <Languagebtn/>
                            <Button   onClick={()=>navigate('/login')} sx={{marginLeft:'10px',color:'#fff'}}>{t("Login")}</Button>
                            <Button  onClick={()=>navigate('/signup')} sx={{marginLeft:'10px'}}  variant="contained">{t("Signup")}</Button>
                         </Box>
                    </Grid>:<Grid xs={4}sm={6}  item ><Box sx={{display:'flex',justifyContent:'flex-end'}}><Languagebtn/></Box></Grid>
                    }
                </Grid>
        </Toolbar>
        </AppBar>
  )
}

export default Navbar
