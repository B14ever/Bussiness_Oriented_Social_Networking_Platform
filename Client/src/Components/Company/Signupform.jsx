import React,{useEffect, useState} from 'react'
import {Grid,Box,TextField,Typography,Button,FormControl,FormHelperText,MenuItem,Link,Select,InputLabel} from '@mui/material'
import axios from '../../api/axios';
import { useNavigate,useLocation} from 'react-router-dom'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import {useLanguage} from '../../Localazation/LanguageContext'
const COMPANY_SIGNUP_URL = '/ComapnyAccountSignUp'
const organizationTypes = ['Public','Private']
const industryTypes = ['Education','Bank','Healthcare','Retail','Manufacturing','Construction','InformationTechnology',"Travel"]
const organizationSizes = ['OneUpTOFiftyEmploye','FityUpToHundredEmploye','HundredUp','Above200']
const CompanySignupform = () => {
  const {t} = useLanguage()
  const {dispatch} = useAthuContext()
  const [data,setData] = useState({companyName:'', organizationSize:'', organizationType:'', industry:'',tagline:' ', Email:'', PhoneNumber:'', Country:'',City:'',Password:'',confirmPassword:''})
  const [Errors, setErrors] = useState({companyName:'', organizationSize:'',organizationType:'', industry:'',tagline:'', Email:'', PhoneNumber:'', Country:'',City:'',Password:'',confirmPassword:''});
  const [errorMsg,setErrorMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({...Errors,[name]:''})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')
    setErrorMsg('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
         const responce =  await axios.post(COMPANY_SIGNUP_URL,data,
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
          setErrorMsg('Registartion Failde');
        } else if (err.response?.status === 409) {
          setErrorMsg(err.response.data.error);
        } else if (err.response?.status === 403){
          setErrorMsg('Registartion Failde')
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

    // Validation logic
    if (!data.companyName) {
      formErrors.companyName = 'OrganizationNameRequierd';
    }

    if (!data.organizationSize) {
      formErrors.organizationSize = 'OrganizationSizeRequierd';
    }

    if (!data.organizationType) {
      formErrors.organizationType = 'OrganizationTypeRequierd';
    }

    if (!data.industry) {
      formErrors.industry = 'industryRequierd';
    }

    if (!data.Email) {
      formErrors.Email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.Email)) {
      formErrors.Email = 'Email is invalid';
    }

    if (!data.PhoneNumber) {
      formErrors.PhoneNumber = 'PhoneNumberRequired';
    }

    if (!data.Password) {
      formErrors.Password = 'PasswordRequired';
    }
    if (!data.Country) {
      formErrors.Country = 'Countryisrequired';
    }
    if (!data.City) {
      formErrors.City = 'Cityisrequired';
    }
    if (!data.confirmPassword) {
      formErrors.confirmPassword = 'PleaseConfrimNewPassword';
    } else if (data.confirmPassword !== data.Password) {
      formErrors.confirmPassword = 'ConfrimPassworNotMatch';
    }

    return formErrors;
  }
  return (
    <Box  component="form" onSubmit={handleSubmit}  noValidate  sx={{ mt: .5}}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.companyName}>
          <TextField onChange={handleChange} margin="normal" required fullWidth id="name" label={t("OrganizationName")} name="companyName" autoFocus/>
          <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.companyName?t(`${Errors.companyName}`):''}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} mt={2} item>
        <FormControl  fullWidth error={!!Errors.industry}>
               <InputLabel id="demo-select-small-label">{t('industry')}</InputLabel>
                <Select labelId="demo-select-small-label"  onChange={handleChange}
                        name='industry'
                        value={data.industry || ''}
                      label={t('industry')}>
                      {industryTypes.map((name) => (
                      <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>))}
                </Select>
          <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.industry?t(`${Errors.industry}`):''}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item mt={2}>
        <FormControl  fullWidth error={!!Errors.organizationSize}>
        <InputLabel id="demo-select-small-label">{t('OrganizationSize')}</InputLabel>
                <Select  labelId="demo-select-small-label" onChange={handleChange}
                      name='organizationSize'
                      value={data.organizationSize || ''}
                      label={t('OrganizationSize')}>
                      {organizationSizes.map((name) => (
                      <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>))}
              </Select>
         <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.organizationSize?t(`${Errors.organizationSize}`):''}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} mt={2} item>
        <FormControl  fullWidth error={!!Errors.organizationType}>
        <InputLabel id="demo-select-small-label">{t("OrganizationType")}</InputLabel>
                <Select labelId="demo-select-small-label" onChange={handleChange}
                       name='organizationType'
                      label={t('OrganizationType')}
                      value={data.organizationType || ''}
                      >
                      {organizationTypes.map((name) => (
                      <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>))}
          </Select>
         <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.organizationType?t(`${Errors.organizationType}`):''}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.Country}>
         <TextField onChange={handleChange} margin="normal" required fullWidth id="country" label={t("Country")} name="Country" autoFocus/>
         <FormHelperText sx={{color:'red'}}>{Errors.Country?`${t("CountryNameRequired")}`:''}</FormHelperText> 
         </FormControl> 
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.City}>
         <TextField onChange={handleChange} margin="normal" value={data.City} required fullWidth id="city" label={t("City")} name="City" autoFocus/>
         <FormHelperText sx={{color:'red'}}>{Errors.City?`${t("CityNameRequired")}`:''}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.Email}>
          <TextField onChange={handleChange} margin="normal" required fullWidth id="email" label={t("Email")} name="Email" autoFocus/>
          <FormHelperText sx={{color:'red'}}>{Errors.Email?`${t("EmailRequired")}`:''}</FormHelperText> 
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.PhoneNumber}>
          <TextField onChange={handleChange} margin="normal" required fullWidth id="phone" label={t("Phone")} name="PhoneNumber" autoFocus/>
          <FormHelperText sx={{color:'red'}}>{Errors.PhoneNumber?`${t("PhoneNumberRequired")}`:''}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12}  item>
        <TextField onChange={handleChange}  label={t("Tagline")} fullWidth
          variant="filled"
          rows={1}
          multiline
          name="tagline"
        />
        <Typography variant='subtitle1' sx={{color:'#A4A4A4'}}>{t("taglineDescription")}</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.Password}>
          <TextField onChange={handleChange} margin="normal" required fullWidth name="Password" label={t("Password")} type="password" id="password"/>
          <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Password?t(`${Errors.Password}`):''}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.confirmPassword}>
        <TextField onChange={handleChange} margin="normal" required fullWidth name="confirmPassword" label={t("ConfirmPassword")} type="password" id="password"/>
        <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.confirmPassword?t(`${Errors.confirmPassword}`):''}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Link sx={{marginLeft:'auto'}} href="/login" variant="body2">{t("Already have an account login")}</Link>
      {errorMsg && <Typography sx={{color:"#DA0037"}}>{errorMsg}</Typography>}
     <Box sx={{display:'flex',justifyContent:'center'}}>
      <Button type="submit" variant="contained" size='large' sx={{ mt: 1, mb: 2,width:'50%' }}>{t("Signup")}</Button>
    </Box>
    </Box>
  )
}

export default CompanySignupform
