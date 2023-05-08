import { useState } from 'react';
import { Container,Box,Typography,Tabs,Tab} from '@mui/material';
import Security from '../../Components/Shared/Security';
import AccountPerference from '../../Components/Individual/AccountPerference';
import { useLanguage } from '../../Localazation/LanguageContext';
const PersonalAccountSetting = (props) => {
  const {t} = useLanguage()
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return(
    <Box  sx={{marginTop:'100px',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
      <Box sx={{backgroundColor:'#fff',margin:'10px 0 10px',height: 'fit-content',width:{xs:'90%',lg:'60%'}}}>
      <Tabs value={value}  variant="fullWidth" onChange={handleChange} centered>
        <Tab label={t("General")} />
        <Tab label={t("Security")} />
      </Tabs>
      <Typography component="div" role="tabpanel" hidden={value !== 0}>
        <AccountPerference/>
      </Typography>
      <Typography component="div" role="tabpanel" hidden={value !== 1}>
        <Security/>
      </Typography>
      </Box>
    </Box>
  )
}

export default PersonalAccountSetting
