import React from 'react'
import {Grid,Box,Typography,Tab,Tabs} from '@mui/material'
import PersonalSignupForm from '../../Components/Individual/SignupForm'
import CompanySignupform from '../../Components/Company/Signupform';
import Image from '../../assets/Reg.png'
import { useLanguage } from '../../Localazation/LanguageContext';
const Signin = () => {
  const {t} = useLanguage()
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Grid sx={{marginTop:{lg:'64px',sm:'64px',md:'64px',xs:'56px'}} } container component="main">
      <Grid item xs={12} lg={7} md={7}>
      <Box sx={{my: 8, mx: 4 }}>
      <Typography component="h1" variant="h5" textAlign={'center'}>{t("Signup")}</Typography>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label={t("PersonalAccount")} />
        <Tab label={t("CompanyPage")} />
      </Tabs>
      <Typography component="div" role="tabpanel" hidden={value !== 0}>
        <PersonalSignupForm/>
      </Typography>
      <Typography component="div" role="tabpanel" hidden={value !== 1}>
        <CompanySignupform/>
      </Typography>
      </Box>
      </Grid>
      <Grid item xs={12} lg={5} md={5}>
       
      </Grid>
    </Grid>
  )
}

export default Signin
