import React from 'react'
import {Grid,Box,Typography,Tab,Tabs} from '@mui/material'
import PersonalSignupForm from '../../Components/Individual/SignupForm'
import CompanySignupform from '../../Components/Company/Signupform';
import Image from '../../assets/Reg.png'
import { useLanguage } from '../../Localazation/LanguageContext';
const Signin = () => {
  const {t} = useLanguage()
  const [value, setValue] = React.useState(0);
  const [image,setImage] = React.useState(true)
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setImage(!image)
  };
  return (
    <Grid sx={{marginTop:{lg:'40px',sm:'49px',md:'49px',xs:'49px'},backgroundColor:'#fff',height:'95vh'} } container component="main">
      <Grid item xs={12} lg={6} >
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
      <Grid item xs={12} lg={6}  sx={{display:{xs:'none',lg:'block'}}}>
         <img  style={{height:'auto'}} src={`../../../Profile_Image/register${image?2:0}.jpg`}/>
       </Grid>
    </Grid>
  )
}

export default Signin
