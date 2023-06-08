import {useState} from 'react'
import { Box,Container,TextField, Typography,Button,FormControl,FormHelperText} from '@mui/material'
import {useNavigate} from 'react-router-dom'
import axios from '../../api/axios'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
const NEW_PASSWORD_URL = '/Login/forgotenPassword/newPassword'
const RecoverPassword = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const [data,setData] = useState({Password:'',confirmPassword: ''})
  const [Errors, setErrors] = useState({Password:'', confirmPassword:''});
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
        await axios.post(NEW_PASSWORD_URL,data, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        })
          navigate("/login")
    } catch (err) {
        if (!err?.response) {
          setErrorMsg('Failde');
        } else if (err.response?.status === 409) {
          setErrorMsg(err.response.data.error);
        } else if (err.response?.status === 403){
          setErrorMsg('Failde')
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
    if (!data.Password) {
      formErrors.Password = 'PleaseEnterNewPassword';
    }

    if(!data.confirmPassword){
      formErrors.confirmPassword = 'PleaseConfrimNewPassword'
    }
    if( data.confirmPassword !== data.Password){
      formErrors.confirmPassword = 'ConfrimPassworNotMatch'
    }

    return formErrors;
  };
  return (
    <Box  sx={{backgroundColor:'#fff',height:'100vh',display:'flex',alignItems:'flex-start',justifyContent:'center'}} >
    <Box sx={{marginTop:20,display: 'flex',flexDirection: 'column',alignItems: 'center',boxShadow:2, p:2,
      borderRadius: 3,width:'30%'}}>
        <Typography component="h1" variant="h5">{t("ResetPassword")}</Typography>
    <Box component="form" onSubmit={handleSubmit}  noValidate sx={{ mt: 1 }}>
       <FormControl fullWidth error={!!Errors.Password}>
          <TextField onChange={handleChange}  margin="normal" required fullWidth id="password" label={t("NewPassword")} name="Password"/>
          <FormHelperText >{Errors.Password?t(`${Errors.Password}`):''}</FormHelperText>
       </FormControl>
       <FormControl fullWidth error={!!Errors.confirmPassword}>
          <TextField onChange={handleChange} margin="normal" required fullWidth id="confirmPassword" label={t("ConfirmPassword")} name="confirmPassword"/>
          <FormHelperText >{Errors.confirmPassword?t(`${Errors.confirmPassword}`):''}</FormHelperText>
       </FormControl>
        {errorMsg && <Typography sx={{color:"#DA0037"}}>{errorMsg}</Typography>}
        <Button type="submit" fullWidth  variant="contained" sx={{ mt: 3, mb: 2 }}>{t("Next")}</Button>
    </Box>
   </Box>
</Box>
  )
}

export default RecoverPassword
