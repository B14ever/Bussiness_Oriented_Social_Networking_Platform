import { useState } from 'react';
import { Box,Typography,Tabs,Tab} from '@mui/material';
import Security from '../../Components/Shared/Security';
import AdminProfileGeneralSeting from '../../Components/Admin/AdminProfileGeneralSetting'
import { useLanguage } from '../../Localazation/LanguageContext';
const AdminProfileSetting = () => {
  const {t} = useLanguage()
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box  sx={{marginTop:'100px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
    <Box sx={{backgroundColor:'#fff',margin:'10px 0 10px',height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
    <Tabs value={value}  variant="fullWidth" onChange={handleChange} centered>
      <Tab label={t("General")} />
      <Tab label={t("Security")} />
    </Tabs>
    <Typography component="div" role="tabpanel" hidden={value !== 0}>
      <AdminProfileGeneralSeting/>
    </Typography>
    <Typography component="div" role="tabpanel" hidden={value !== 1}>
      <Security/>
    </Typography>
    </Box>
  </Box>
  )
}

export default AdminProfileSetting
