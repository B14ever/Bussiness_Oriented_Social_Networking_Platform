import React,{useState} from 'react'
import { Box,TextField,Snackbar,Backdrop,CircularProgress,Alert,FormHelperText,Divider, Grid,Button} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
const AdminProfileGeneralSetting = () => {
  const {t} = useLanguage()
  const {user,dispatch} = useAthuContext()
  const [data,setData] = useState({FirstName:`${user.user.FirstName}`,LastName:`${user.user.LastName}`,Email:`${user.user.Email}`,PhoneNumber:`${user.user.PhoneNumber}`,Country:`${user.user.Country}`,City:`${user.user.City}`})
  const [Errors, setErrors] = useState({FirstName:false,LastName:false,Country:false,PhoneNumber:false,City:false});
  const [open, setOpen] = useState(false);
  const [warnnig,setWaring] = useState(false)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({...Errors,[name]:false})
  };
  const handleClose = () => {
    setOpen(false);
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
            setOpen(true)
            const responce = await axios.post('/admins/update',data)
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setTimeout(()=>{setOpen(false)},500)
          }
          catch(err){
            setOpen(false)
            setWaring(true)
          }
  }
  const isDisabled = Errors.FirstName || Errors.LastName || Errors.City || Errors.Country || Errors.PhoneNumber
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
         <TextField  onChange={handleChange} onBlur={handleError} name='PhoneNumber'  label={t('Phone')} defaultValue={user.user.PhoneNumber} fullWidth />
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
     <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar open={warnnig} anchorOrigin={{ vertical:'top', horizontal:'center'}} autoHideDuration={3000} onClose={()=>setWaring(false)}>
              <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                {t("unableToChangePRofile")}
              </Alert>
        </Snackbar>
    </Box>
  )
}

export default AdminProfileGeneralSetting
