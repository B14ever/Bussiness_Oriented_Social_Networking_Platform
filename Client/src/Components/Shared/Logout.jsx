import React from 'react'
import {Typography} from '@mui/material'
import {useAthuContext} from '../../Context/Shared/AthuContext'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../../Localazation/LanguageContext'
const Logout = () => {
    const {t} = useLanguage()
    const {dispatch} = useAthuContext()
    const navigate = useNavigate()
    const HandleLogout=()=>{
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('USER_DATA')
        dispatch({type:'LOGOUT'})
        navigate('/')
    }
  return (
    <Typography sx={{width:'100%'}} onClick={HandleLogout} variant="contained">{t("LogOut")}</Typography>
  )
}

export default Logout
