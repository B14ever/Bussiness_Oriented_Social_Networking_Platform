import React,{useEffect, useState} from 'react'
import { Box,TextField,Snackbar,Backdrop,CircularProgress,Alert,FormHelperText,Divider, Grid,Button,FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
const organizationTypes = ['Public','Private']
const industryTypes = ['Education','Bank','Healthcare','Retail','Manufacturing','Construction','InformationTechnology',"Travel"]
const organizationSizes = ['OneUpTOFiftyEmploye','FityUpToHundredEmploye','HundredUp','Above200']
const AccountPerference = () => {
  const {t} = useLanguage()
  const {user,dispatch} = useAthuContext()
  const [data,setData] = useState(
     {
      Email:`${user.user.Email}`,
      companyName:`${user.user.companyName}`,
     organizationSize:`${user.user.organizationSize}`,
     organizationType:`${user.user.organizationType}`,
     industry:`${user.user.industry}`,
     PhoneNumber:`${user.user.PhoneNumber}`,
     Country:`${user.user.Country}`,
     City:`${user.user.City}`})
  const [Errors, setErrors] = useState({companyName:false,organizationSize:false,
                 organizationType:false,industry:false,Country:false,PhoneNumber:false,City:false});
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
            const responce = await axios.post('/Profile/updateProfile',data)
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setTimeout(()=>{setOpen(false)},500)
          }
          catch(err){
            setOpen(false)
            setWaring(true)
          }
  }
  const isDisabled = Errors.companyName || Errors.industry || Errors.City || Errors.Country || Errors.PhoneNumber || Errors.organizationSize || Errors.organizationType 
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{display:'flex',flexDirection:'column',gap:'2rem'}}mt={2}ml={2}mr={2}>
       <Grid spacing={1} container >
        <Grid item xs={12}>
         <TextField  onChange={handleChange} onBlur={handleError} name='companyName' label={t('OrganizationName')} defaultValue={user.user.companyName} fullWidth />
        <FormHelperText sx={{color:'red'}}>{Errors.FirstName?`${t("OrganizationNameRequired")}`:''}</FormHelperText> 
        </Grid>
       </Grid>
       <Grid spacing={1} container>
         <Grid item sm={6} xs={12}>
         <FormControl  fullWidth size="large">
                <InputLabel id="demo-select-small-label">{t('industry')}</InputLabel>
                <Select labelId="demo-select-small-label"  onChange={handleChange}
                      defaultValue={user.user.industry} name='industry'
                      label={t('industry')}>
                      {industryTypes.map((name) => (
                      <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>))}
                </Select>
          </FormControl>
         </Grid>
         <Grid item sm={6} xs={12}>
         <FormControl  fullWidth size="large">
                <InputLabel id="demo-select-small-label">{t("OrganizationType")}</InputLabel>
                <Select labelId="demo-select-small-label" onChange={handleChange}
                      defaultValue={user.user.organizationType} name='organizationType'
                      label={t('OrganizationType')}>
                      {organizationTypes.map((name) => (
                      <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>))}
                </Select>
          </FormControl>
         </Grid>
       </Grid>
       <Grid spacing={1} container>
         <Grid item sm={6} xs={12}>
         <FormControl  fullWidth size="large">
                <InputLabel id="demo-select-small-label">{t('OrganizationSize')}</InputLabel>
                <Select labelId="demo-select-small-label" onChange={handleChange}
                      defaultValue={user.user.organizationSize} name='organizationSize'
                      label={t('OrganizationSize')}>
                      {organizationSizes.map((name) => (
                      <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>))}
                </Select>
          </FormControl>
         </Grid>
         <Grid sm={6} xs={12} item>
         <TextField  onChange={handleChange} onBlur={handleError} name='PhoneNumber'  label={t('Phone')} defaultValue={user.user.PhoneNumber} fullWidth />
         <FormHelperText sx={{color:'red'}}>{Errors.PhoneNumber?`${t("PhoneNumberRequired")}`:''}</FormHelperText> 
         </Grid>
       </Grid>
     
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
     <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}
             onClick={handleClose}>
       <CircularProgress color="inherit" />
      </Backdrop>
        <Snackbar open={warnnig} anchorOrigin={{ vertical:'top', horizontal:'center'}} 
                 autoHideDuration={3000} onClose={()=>setWaring(false)}>
          <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
            {t("unableToChangePRofile")}
          </Alert>
        </Snackbar>
    </Box>
  )
}

export default AccountPerference

