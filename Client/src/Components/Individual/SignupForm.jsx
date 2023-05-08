import React,{useState,useEffect} from 'react'
import axios from '../../api/axios';
import {useNavigate,useLocation} from 'react-router-dom'
import {Grid,Box,TextField,Button,  FormControl,FormHelperText, Typography} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import {useLanguage} from '../../Localazation/LanguageContext'
const PERSONALSIGNUP_URL = '/PersonalAccountSignup';
const PersonalSignupForm = () => {
  const {t} = useLanguage()
  const {dispatch} = useAthuContext()
  const [data,setData] = useState({FirstName:'',LastName:'',Country:'',City:'',Email:'',PhoneNumber:'',Password:'', confirmPassword: ''})
  const [Errors, setErrors] = useState({FirstName:'',LastName:'',Country:'',City:'',Email:'',PhoneNumber:'',Password:'', confirmPassword:''});
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
      try {
         const responce =  await axios.post(PERSONALSIGNUP_URL,data,
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
    if (!data.FirstName) {
      formErrors.FirstName = 'First Name is required';
    }

    if (!data.LastName) {
      formErrors.LastName = 'Last Name is required';
    }

    if (!data.Country) {
      formErrors.Country = 'Country is required';
    }

    if (!data.City) {
      formErrors.City = 'City is required';
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

    if (!data.confirmPassword) {
      formErrors.confirmPassword = 'Confirm Password is required';
    } else if (data.confirmPassword !== data.Password) {
      formErrors.confirmPassword = 'Confirm Password must match Password';
    }

    return formErrors;
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate  sx={{ mt: 1 }}>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.FirstName}>
            <TextField onChange={handleChange}  margin="normal" required fullWidth id="FirtsName" label={t("FirstName")} name="FirstName"  variant="outlined" autoFocus/>
            <FormHelperText>{Errors.FirstName}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.LastName}>
            <TextField onChange={handleChange} margin="normal" required fullWidth id="lastName" label={t("LastName")} name="LastName"  variant="outlined" autoFocus/>
            <FormHelperText>{Errors.LastName}</FormHelperText>
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
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.Password}>
            <TextField onChange={handleChange} margin="normal" required fullWidth name="Password" label={t("Password")} type="Password" id="password"/>
            <FormHelperText>{Errors.Password}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.confirmPassword}>
            <TextField  onChange={handleChange} margin="normal" required fullWidth name="confirmPassword" label={t("ConfirmPassword")} type="password" id="password"/>
            <FormHelperText>{Errors.confirmPassword}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
     {errorMsg && <Typography sx={{color:"#DA0037"}}>{errorMsg}</Typography>}
     <Box sx={{display:'flex',justifyContent:'center'}}>
      <Button type="submit" variant="contained" size='large' sx={{ mt: 3, mb: 2,width:'50%' }}>{t("Signup")}</Button>
    </Box>
    </Box>
  )
}

export default PersonalSignupForm
