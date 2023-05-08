import React, { useState} from 'react'
import { Box,TextField,FormHelperText,Button,Divider,Typography,Alert} from '@mui/material'
import axios from '../../api/axios'
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import DeleteAccount from './DeleteAccount'
const Security = () => {
  const {user} = useAthuContext()
  const {t} = useLanguage()
  const [data,setData] = useState({Password:'',newPassword:'',confirmPassword:''})
  const [Errors,setErrors] = useState({Password:'',newPassword:'',confirmPassword:''})
  const [errorMsg,setErrorMsg] = useState('')
  const [success,setSuccess] = useState(false)
  const handleChange = (e) =>{
    const {name,value} = e.target
    setData({...data,[name]:value})
  }
  const handleSubmit = async (e) =>{
    e.preventDefault()
    setErrorMsg('')
    setErrors('')
    const errors = validateForm()
    if (Object.keys(errors).length === 0) {
      try {
       const responce = await axios.post('/ChangePassword',data,{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        })
        setSuccess(true)
        setData('')
        } catch (err) {
           if (!err?.response) {
             setErrorMsg('Failde');
           } else if (err.response?.status === 409) {
             setErrorMsg(err.response.data.error);
           } else if (err.response?.status === 403){
             setErrorMsg(err.response.data.error)
           }
       }
     } else {
        setErrors(errors);
       }
  }
  const validateForm =()=>{
    const formsErrors ={}
    if(!data.Password){
      formsErrors.Password = 'PleaseEnterOldPassword'
    }
    if(!data.newPassword){
      formsErrors.newPassword = 'PleaseEnterNewPassword'
    }
    if(!data.confirmPassword){
      formsErrors.confirmPassword = 'PleaseConfrimNewPassword'
    }
    if( data.confirmPassword !== data.newPassword){
      formsErrors.confirmPassword = 'ConfrimPassworNotMatch'
    }
  return formsErrors
  }
  return (
      <React.Fragment>
       <Divider  sx={{marginTop:'20px'}}>{t("ChangePassword")}</Divider>
      <Box component="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:'.5rem',alignItems:'center'}}mt={2}ml={2}mr={2}>
      <TextField sx={{width:{xs:'100%',md:'50%'}} } onChange={handleChange} label={t("OldPassword")} type='password' name="Password" />
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Password?t(`${Errors.Password}`):''}</FormHelperText>
      <TextField sx={{width:{xs:'100%',md:'50%'}}} onChange={handleChange} label={t("NewPassword")} type='password' name="newPassword" />
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.newPassword?t(`${Errors.newPassword}`):''}</FormHelperText>
      <TextField sx={{width:{xs:'100%',md:'50%'}}} onChange={handleChange} label={t("ConfirmPassword")} type='password' name="confirmPassword"/>
      <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.confirmPassword?t(`${Errors.confirmPassword}`):''}</FormHelperText>
      {success?<Alert severity='info' sx={{width:{xs:'100%',md:'50%'}}}>{t("PasswordChanged")}</Alert>:''}
      {errorMsg?<Alert severity='error' sx={{width:{xs:'100%',md:'50%'}}}>{t(`${errorMsg}`)}</Alert>:''}
      <Box sx={{width:{xs:'100%',md:'50%'},display:'flex',justifyContent:'flex-end'}}><Button type="submit"  variant="contained" size='large' sx={{width:{xs:'100%',sm:'50%'}}}>{t("save")}</Button></Box>
      </Box>
      <DeleteAccount/>
      </React.Fragment>
  )
}

export default Security
