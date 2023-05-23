import React,{useEffect, useState} from 'react'
import {Grid,Box,TextField,Typography,Button,FormControl,FormHelperText,MenuItem,Link} from '@mui/material'
import axios from '../../api/axios';
import { useNavigate,useLocation} from 'react-router-dom'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import {useLanguage} from '../../Localazation/LanguageContext'
const COMPANY_SIGNUP_URL = '/ComapnyAccountSignUp'
const CompanySignupform = () => {
  const {t,i18next} = useLanguage()
  const {dispatch} = useAthuContext()
  const [data,setData] = useState({companyName:'', organizationSize:'', organizationType:'', industry:'',tagline:'', Email:'', PhoneNumber:'', Country:'',City:'',Password:'',confirmPassword:''})
  const [Errors, setErrors] = useState({companyName:'', organizationSize:'',organizationType:'', industry:'',tagline:'', Email:'', PhoneNumber:'', Country:'',City:'',Password:'',confirmPassword:''});
  const [errorMsg,setErrorMsg] = useState('')
  const navigate = useNavigate()
  const location = useLocation()
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
      console.log('i the try block')
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
      formErrors.PhoneNumber = 'Phone Number is required';
    }

    if (!data.Password) {
      formErrors.Password = 'PasswordRequired';
    }
    if (!data.Country) {
      formErrors.Country = 'Country is required';
    }
    if (!data.City) {
      formErrors.City = 'City is required';
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
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.industry}>
          <TextField  onChange={handleChange} margin="normal" required fullWidth id="industry" label={t("industry")} name="industry" autoFocus/>
          <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.industry?t(`${Errors.industry}`):''}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.organizationSize}>
         <TextField onChange={handleChange}  margin="normal" required fullWidth id="organizationSize" label={t("OrganizationSize")} name="organizationSize" autoFocus/>
         <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.organizationSize?t(`${Errors.organizationSize}`):''}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.organizationType}>
         <TextField onChange={handleChange} margin="normal" required fullWidth id="Organizationtype" label={t("OrganizationType" )}name="organizationType" autoFocus/>
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
         <TextField onChange={handleChange} margin="normal" required fullWidth id="city" label={t("City")} name="City" autoFocus/>
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
