import React,{useEffect, useState} from 'react'
import { Box,Container,TextField, Typography,Button,Backdrop,CircularProgress} from '@mui/material'
import {useNavigate,useLocation} from 'react-router-dom'
import MarkEmailReadOutlinedIcon from '@mui/icons-material/MarkEmailReadOutlined'
import axios from '../../api/axios'
import jwtDecode from "jwt-decode";
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
const EMAIL_VERIFICATION_URL = '/emailVerification'
const RESEND_CODE_URL = '/emailVerification/RequestCode'
const EmailVerification = () => {
  const token = localStorage.getItem('TOKEN')
    const {t} = useLanguage()
    const {user,dispatch} = useAthuContext()
    const navigate = useNavigate()
    const location = useLocation();
    const prevLocation = location.state && location.state.from
   const [Code,setCode] = useState()
   const [error,setError] = useState('')
   const [open, setOpen] = useState(false);
   const HandleSubmit = async (e)=>{
    e.preventDefault();
    setError('')
    if(Code){
        try{
        setOpen(true)
         const responce = await axios.post(EMAIL_VERIFICATION_URL,{Code},
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
              withCredentials: true,
            })
        setTimeout(()=>{setOpen(false),500})
        setCode()
        if(prevLocation.pathname === '/signup'){
          const decodedToken = jwtDecode(user.token);
          if(decodedToken.role === 'admin')
            {
              const {user} = responce.data
              localStorage.setItem('USER_DATA',JSON.stringify(user))
              dispatch({ type: 'AUTHENTICATE', payload: {user,token}})
              navigate('/AdminDashborde')
            }
          if(decodedToken.role === 'company')
            {
              const {user} = responce.data
              localStorage.setItem('USER_DATA',JSON.stringify(user))
              dispatch({ type: 'AUTHENTICATE', payload: {user,token}})
              navigate('/ComapnyAccountProfile')
             
            }
          if(decodedToken.role === 'personal')
            {
              const {user} = responce.data
              localStorage.setItem('USER_DATA',JSON.stringify(user))
              dispatch({ type: 'AUTHENTICATE', payload: {user,token}})
              navigate('/PersonalAccountProfile')
            }
        }
        if(prevLocation.pathname === '/forgetPassword'){ 
           navigate("/RecoverPassword")  
        }
        
        }catch(err){
            setTimeout(()=>{setOpen(false)},500) 
             if (!err?.response) {
                setError('Verification Failde');
              } else if (err.response?.status === 400) {
                setError(err.response.data.err);
              } 
        }
    }
    else{
        setError('InvalidCode')
    }
   }
   const ResendCode = async () =>{
       try{
        setOpen(true)
        await axios.post(RESEND_CODE_URL, null, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        })
      setTimeout(()=>{setOpen(false),500})
       }catch(err){
        if (!err?.response) {
          setError('Verification Failde');
        } else if (err.response?.status === 400) {
          setError(err.response.data.err);
        } 
       }
      }
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <Box  sx={{backgroundColor:'#fff',height:'100vh',display:'flex',alignItems:'flex-start',justifyContent:'center'}} >
        <Box sx={{marginTop:20,display: 'flex',flexDirection: 'column',alignItems: 'center',boxShadow:2, p:2,
          borderRadius: 3,width:'30%'}}>
            <MarkEmailReadOutlinedIcon/>
            <Typography component="h1" variant="h5">{t("VerifyEmail")}</Typography>
            <Typography>{t("EnterCode")}</Typography>
        <Box component="form" onSubmit={HandleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField margin="normal" required fullWidth id="code" label={t("Code")} name="code" onChange={(e)=>setCode(e.target.value)}/>
            {error && <Typography sx={{color:"#DA0037"}}>{t(`${error}`)}</Typography>}
            <Button type="submit" fullWidth  variant="contained" sx={{ mt: 3, mb: 2 }}>{t("Verify")}</Button>
            <Typography variant='body2'>{t("DidntReceiveCode")}?<Button onClick={ResendCode}>{t("ResendCode")}</Button></Typography>
        </Box>
       </Box>
       <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
        </Backdrop>
   </Box>
  )
}

export default EmailVerification
