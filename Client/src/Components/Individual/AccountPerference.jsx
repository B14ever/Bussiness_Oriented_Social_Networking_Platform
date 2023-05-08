import React,{useEffect, useState} from 'react'
import { Box, Typography,TextField,FormControl,FormHelperText,Divider, Grid,Button} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
const AccountPerference = () => {
  const {t} = useLanguage()
  const {user,dispatch} = useAthuContext()
  const [data,setData] = useState({FirstName:`${user.user.FirstName}`,LastName:`${user.user.LastName}`,Email:`${user.user.Email}`,PhoneNumber:`${user.user.PhoneNumber}`})
  const [Errors, setErrors] = useState({FirstName:false,LastName:false,Country:false,PhoneNumber:false,City:false});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({...Errors,[name]:false})
  };
  const handleError = (e)=>{
    const {name,value} = e.target
    if(!value){
      setErrors({...Errors,[name]:true})
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault();
          try{
            const responce = await axios.post('/PersonlaProfileUpdateAccount',data)
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            window.location.reload(true)
          }
          catch(err){
            console.log(err)
          }
  }
  const isDisabled = Errors.FirstName || Errors.LastName || Errors.City || Errors.Country
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:'.5rem'}}mt={2}ml={2}mr={2}>
       <Divider textAlign="left">{t("Name")}</Divider>
       <Grid spacing={1} container >
        <Grid item sm={6} xs={12}>
         <TextField  onChange={handleChange} onBlur={handleError} name='FirstName'  label={t('FirstName')} defaultValue={user.user.FirstName} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.FirstName?`${t("FNameRequired")}`:''}</FormHelperText> 
        </Grid>
        <Grid item sm={6} xs={12}>
         <TextField  onChange={handleChange} onBlur={handleError} name='LastName'  label={t('LastName')} defaultValue={user. user.LastName} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.LastName?`${t("LNameRequired")}`:''}</FormHelperText>
        </Grid>
       </Grid>
       <Divider textAlign="left">{t("Contact")}</Divider>
       <Grid spacing={1} container>
         <Grid sm={12} xs={12} item>
         <TextField  onChange={handleChange} onBlur={handleError} name='PhoneNumber'  label={t('Phone Number')} defaultValue={user.user.PhoneNumber} fullWidth />
         <FormHelperText sx={{color:'red'}}>{Errors.PhoneNumber?`${t("PhoneNumberRequired")}`:''}</FormHelperText> 
         </Grid>
       </Grid>
      <Divider textAlign="left">{t("Location")}</Divider>
       <Grid spacing={1} container>
         <Grid sm={6} xs={12} item>
         <TextField   onChange={handleChange} onBlur={handleError} name='Country'  label={t('Country')} defaultValue={user.user.Country} fullWidth />
         <FormHelperText sx={{color:'red'}}>{Errors.Country?`${t("CountryNameRequired")}`:''}</FormHelperText> 
         </Grid>
         <Grid sm={6} xs={12} item>
         <TextField  onChange={handleChange} onBlur={handleError} name='City'  label={t('City')} defaultValue={user.user.City} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.City?`${t("CityNameRequired")}`:''}</FormHelperText>
         </Grid>
       </Grid>
      <Box sx={{display:'flex',justifyContent:{sm:'flex-end',xs:'center'}}}>
      <Button type="submit" disabled={isDisabled} variant="contained" size='large' sx={{ mt: 2, mb: 2,width:{xs:'100%',sm:'25%'} }}>{t("save")}</Button>
     </Box>
    </Box>
  )
}

export default AccountPerference

