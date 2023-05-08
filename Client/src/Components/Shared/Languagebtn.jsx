import React from 'react'
import { Button,Menu,MenuItem,Typography,Tooltip} from '@mui/material'
import { useState} from 'react';
import { useLanguage } from '../../Localazation/LanguageContext';
import IconButton from '@mui/material/IconButton';
import LanguageIcon from '@mui/icons-material/Language';
const Languagebtn = () => {
  const {t,i18n} = useLanguage()
  const [anchorElUser, setAnchorElUser] = useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    }
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    }
  return (
    <React.Fragment>
        <Tooltip title={t("Language")}>
         <IconButton onClick={handleOpenUserMenu} sx={{marginLeft:'auto'}}>
            <LanguageIcon sx={{color:'#fff'}}/>
         </IconButton>
        </Tooltip>
        <Menu
        sx={{p:0, mt: '35px' }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{vertical: 'top',horizontal: 'center',}}
        keepMounted
        transformOrigin={{vertical: 'top',horizontal: 'center',}}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}>
            <MenuItem  onClick={handleCloseUserMenu}>
            <Button size="small"  onClick={()=>i18n.changeLanguage("am")}>አማረኛ</Button>
            </MenuItem>
            <MenuItem  onClick={handleCloseUserMenu}>
            <Button size="small" sx={{textTransform:'capitalize'}} onClick={()=>i18n.changeLanguage("en")}>English</Button>
            </MenuItem>
        </Menu>
    </React.Fragment>
  )
}

export default Languagebtn
