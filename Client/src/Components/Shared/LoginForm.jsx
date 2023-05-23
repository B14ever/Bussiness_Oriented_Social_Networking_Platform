import {useEffect, useState} from 'react'
import { Box,Grid,Link,TextField,Typography,Avatar,Button,FormControl,FormHelperText} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import jwtDecode from "jwt-decode";
import axios from '../../api/axios'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import {useAthuContext} from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
const LOGIN_URL = '/Login'
const LoginForm = () => {
const {t} = useLanguage()
const {dispatch} = useAthuContext()
const [data,setData] = useState({Email:'',Password:''})
const [Errors,setErrors] = useState({Email:'',Password:''})
const [errorMsg,setErrorMsg] = useState('')
const navigate = useNavigate()
const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')
    setErrorMsg('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
         const responce =  await axios.post(LOGIN_URL,data,
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )
        const {user,token} = responce.data
        localStorage.setItem('TOKEN',token)
        localStorage.setItem('USER_DATA',JSON.stringify(user))
        dispatch({ type: 'AUTHENTICATE', payload: {user,token}})
        const decodedToken = jwtDecode(token);
        if(decodedToken.role === 'admin')
        {
          navigate('/AdminDashborde')
        }
        if(decodedToken.role === 'company')
        {
          navigate('/ComapnyAccountProfile')
        }
        if(decodedToken.role === 'personal')
        {
          
          navigate('/PersonalAccountProfile')
        }
    } catch (err) {
        if (!err?.response) {
          setErrorMsg('Login Failde');
        } else if (err.response?.status === 409) {
          setErrorMsg(err.response.data.error);
        } else if (err.response?.status === 403){
          setErrorMsg('Login Failde')
        }
    }finally{
      setData('')
    }
    } else {
      setErrors(errors);
    }
  };
const validateForm = () => {
    const formErrors = {};
    if (!data.Email) {
        formErrors.Email = 'EmailRequired';
      } else if (!/^\S+@\S+\.\S+$/.test(data.Email)) {
        formErrors.Email = 'EmailRequired';
      }
      if (!data.Password) {
        formErrors.Password = 'PasswordRequired';
      }   
    return formErrors;
}
    return (
    <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><LockOutlinedIcon /></Avatar>
        <Typography component="h1" variant="h5">{t("Login")}</Typography>
    <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1,pl:2,pr:2}}>
      <FormControl fullWidth error={!!Errors.Email}>
      <TextField onChange={handleChange} margin="normal" required fullWidth id="email" label={t("Email")} name="Email"/>
      <FormHelperText>{Errors.Email?t(`${Errors.Email}`):''}</FormHelperText>
      </FormControl>
      <FormControl fullWidth error={!!Errors.Password}>
      <TextField onChange={handleChange}  margin="normal" required fullWidth name="Password" label={t("Password")} type="password" id="password"/>
      <FormHelperText>{Errors.Password?t(`${Errors.Password}`):''}</FormHelperText>
      </FormControl>
      {errorMsg && <Typography sx={{color:"#DA0037"}}>{errorMsg}</Typography>}
      <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
        <Box sx={{width:'100%',display:'flex'}}> 
          <Link href="/forgetPassword" variant="body2">{t("ForgetPassword")}?</Link>
          <Link sx={{marginLeft:'auto'}} href="/signup" variant="body2">{t("CreateAccount")}</Link>
        </Box>
        <Button type="submit" variant="contained" size='large' sx={{ mt: 1, mb: 2,width:'50%',alignSelf:'center' }}>{t("Login")}</Button>
      </Box>
    </Box>
  </Box>
  )
}

export default LoginForm
