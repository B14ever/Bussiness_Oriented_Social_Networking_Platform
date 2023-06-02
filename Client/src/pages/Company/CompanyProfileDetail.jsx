import React from 'react'
import { Section_One,Main_One } from '../../Components/Company/Css'
import LogoBox from '../../Components/Company/LogoBox'
import {Typography,Box,Tab,Tabs,Grid} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import About from '../../Components/Company/About'
import Mission from '../../Components/Company/Mission'
import Workes from '../../Components/Company/Workes'
import Partners from '../../Components/Company/Partners'
import Followers from '../../Components/Company/Followers'
const CompanyProfileDetail = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Main_One>
     <Section_One>
       <LogoBox/>
       <Box sx={{mt:{md:8,xs:6}}} pl={2}>
            <Grid container>
              <Grid item xs={12} sm={6}>
               <Typography variant='h5'>{user.user.companyName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{display:'flex',alignItems:'center'}}>
                <LocationOnIcon sx={{color:'#999'}}/>
                <Typography>{user.user.City}, {user.user.Country}</Typography> 
              </Grid>
              <Grid item xs={12} sm={6} mt={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                <Groups2OutlinedIcon sx={{color:'#999'}}/>
                <Typography>{t(`${user.user.organizationSize}`)}</Typography> 
              </Grid>   
            </Grid>
        </Box>
       <Box sx={{mt:{md:4,xs:3}}} pl={1}>
       <Tabs value={value} onChange={handleChange} textColor="primary"
            indicatorColor="primary"
            variant="scrollable"scrollButtons allowScrollButtonsMobile
            aria-label="scrollable force tabs example">
          <Tab sx={{textTransform:'none'}} value={1} label={t('About')} />
          <Tab sx={{textTransform:'none'}} value={2} label={t("Mession")} />
          <Tab sx={{textTransform:'none'}} value={3} label={("Workes")} />
          <Tab sx={{textTransform:'none'}} value={4} label={t("Followers")} />
          <Tab sx={{textTransform:'none'}} value={5} label={("Parnters")} />
        </Tabs>
       </Box>
     </Section_One>
      <Typography  component="div" role="tabpanel" hidden={value !== 1}>
        <About/>
      </Typography>
       <Typography component="div" role="tabpanel" hidden={value !== 2}>
        <Mission/>
      </Typography>
      <Typography component="div" role="tabpanel" hidden={value !== 3}>
        <Workes/>
      </Typography>
       <Typography component="div" role="tabpanel" hidden={value !== 4}>
        <Followers/>
      </Typography>
      <Typography component="div" role="tabpanel" hidden={value !== 5}>
        <Partners/>
      </Typography>
    </Main_One>
  )
}

export default CompanyProfileDetail
