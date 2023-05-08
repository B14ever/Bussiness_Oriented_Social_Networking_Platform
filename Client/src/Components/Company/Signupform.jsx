import React,{useEffect, useState} from 'react'
import {Grid,Box,TextField,Typography,Button,FormControl,FormHelperText} from '@mui/material'
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
      formErrors.companyName = 'Name is required';
    }

    if (!data.organizationSize) {
      formErrors.LastName = 'Organization size is required';
    }

    if (!data.organizationType) {
      formErrors.organizationType = 'Organization Type is required';
    }

    if (!data.industry) {
      formErrors.industry = 'Idustry is required';
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
      formErrors.Password = 'Password is required';
    }
    if (!data.Country) {
      formErrors.Country = 'Country is required';
    }
    if (!data.City) {
      formErrors.City = 'City is required';
    }
    if (!data.confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
    } else if (data.confirmPassword !== data.Password) {
      formErrors.confirmPassword = 'Confirm Password must match Password';
    }

    return formErrors;
  }
  return (
    <Box  component="form" onSubmit={handleSubmit}  noValidate  sx={{ mt: 1 }}>
      <Grid container spacing={1}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.companyName}>
          <TextField onChange={handleChange} margin="normal" required fullWidth id="name" label={t("OrganizationName")} name="companyName" autoFocus/>
          <FormHelperText>{Errors.companyName}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.industry}>
          <TextField  onChange={handleChange} margin="normal" required fullWidth id="industry" label={t("industry")} name="industry" autoFocus/>
          <FormHelperText>{Errors.industry}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.organizationSize}>
         <TextField onChange={handleChange}  margin="normal" required fullWidth id="organizationSize" label={t("OrganizationSize")} name="organizationSize" autoFocus/>
         <FormHelperText>{Errors.organizationSize}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.organizationType}>
         <TextField onChange={handleChange} margin="normal" required fullWidth id="Organizationtype" label={t("OrganizationType" )}name="organizationType" autoFocus/>
         <FormHelperText>{Errors.organizationType}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.Country}>
         <TextField onChange={handleChange} margin="normal" required fullWidth id="country" label={t("Country")} name="Country" autoFocus/>
         <FormHelperText>{Errors.Country}</FormHelperText>
         </FormControl> 
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.City}>
         <TextField onChange={handleChange} margin="normal" required fullWidth id="city" label={t("City")} name="City" autoFocus/>
         <FormHelperText>{Errors.City}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.Email}>
          <TextField onChange={handleChange} margin="normal" required fullWidth id="email" label={t("Email")} name="Email" autoFocus/>
          <FormHelperText>{Errors.Email}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.PhoneNumber}>
          <TextField onChange={handleChange} margin="normal" required fullWidth id="phone" label={t("Phone")} name="PhoneNumber" autoFocus/>
          <FormHelperText>{Errors.PhoneNumber}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12}  item>
        <TextField onChange={handleChange}  label={t("Tagline")} fullWidth
          variant="filled"
          rows={2}
          multiline
        />
        <Typography variant='subtitle1' sx={{color:'#A4A4A4'}}>Use your tagline to briefly describe what your organization does. This can be changed later.</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.Password}>
          <TextField onChange={handleChange} margin="normal" required fullWidth name="Password" label={t("Password")} type="password" id="password"/>
          <FormHelperText>{Errors.Password}</FormHelperText>
        </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
        <FormControl fullWidth error={!!Errors.confirmPassword}>
        <TextField onChange={handleChange} margin="normal" required fullWidth name="confirmPassword" label={t("ConfirmPassword")} type="password" id="password"/>
        <FormHelperText>{Errors.confirmPassword}</FormHelperText>
        </FormControl>
        </Grid>
      </Grid>
      {errorMsg && <Typography sx={{color:"#DA0037"}}>{errorMsg}</Typography>}
     <Box sx={{display:'flex',justifyContent:'center'}}>
      <Button type="submit" variant="contained" size='large' sx={{ mt: 1, mb: 2,width:'50%' }}>{t("Signup")}</Button>
    </Box>
    </Box>
  )
}

export default CompanySignupform
