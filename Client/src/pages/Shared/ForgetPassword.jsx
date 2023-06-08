import {useState}from 'react'
import { Box,Container,TextField, Typography,Button,FormControl,FormHelperText} from '@mui/material'
import {useNavigate,useLocation} from 'react-router-dom'
import axios from '../../api/axios'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
const FORGET_PASSWORD_URL = '/Login/forgotenPassword'
const ForgetPassword = () => {
  const {t} = useLanguage()
  const {dispatch} = useAthuContext()
  const navigate = useNavigate()
  const location = useLocation()
  const [Email,setEmail] = useState('')
  const [Errors,setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
        const responce = await axios.post(FORGET_PASSWORD_URL,{Email},
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        localStorage.setItem('TOKEN',responce.data.token)
        dispatch({type:'AUTHENTICATE',payload: {user:null,token:responce.data.token}})
        navigate("/emailVerification",{ state: { from: location } })
    } catch (err) {
        if (!err?.response) {
          setError('Server Error');
        } else if (err.response?.status === 409) {
          setError(err.response.data.error);
        }
    }finally{
      setEmail('')
    }
    } else {
      setError(errors);
    }
  };
  const validateForm = () => {
    let formErrors = '';
    if (!Email) {
         formErrors = 'EmailRequired';
      } else if (!/^\S+@\S+\.\S+$/.test(Email)) {
        formErrors = 'Email is invalid';
      } 
    return formErrors;
}
  return (
    <Box  sx={{backgroundColor:'#fff',height:'100vh',display:'flex',alignItems:'flex-start',justifyContent:'center'}} >
    <Box sx={{marginTop:20,display: 'flex',flexDirection: 'column',alignItems: 'center',boxShadow:2, p:2,
      borderRadius: 3,width:'30%'}}>
        <Typography component="h1" variant="h5">{t("ResetPassword")}</Typography>
        <Typography>{t("enterEmail")}</Typography>
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
       <FormControl fullWidth error={!!Errors}>
        <TextField onChange={(e)=>setEmail(e.target.value)} margin="normal" required fullWidth id="Email" label={t("Email")} name="Email"/>
        <FormHelperText >{Errors?t(`${Errors}`):''}</FormHelperText>
       </FormControl>
        <Button type="submit" fullWidth  variant="contained" sx={{ mt: 3, mb: 2 }}>{t("Next")}</Button>
        <Box sx={{display:'flex',justifyContent:'center'}}>
         <Button onClick={()=>navigate('/login')}>{t("Back")}</Button>
        </Box>
    </Box>
   </Box>
</Box>
  )
}

export default ForgetPassword
