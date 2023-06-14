import React,{useState,useEffect, useReducer} from 'react'
import { Box,Avatar,LinearProgress,IconButton,Tooltip,Grid,Typography,Divider, Button,Alert,Snackbar} from '@mui/material/node'
import { styled } from '@mui/material/styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import {useParams,useNavigate} from 'react-router-dom'
import axios from '../../api/axios'
import { useLanguage } from '../../Localazation/LanguageContext';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useAthuContext } from '../../Context/Shared/AthuContext';
const ProfilePhoto = styled(Avatar)(({ theme }) => ({
  position: 'absolute',
  width: 150,height: 150,top:'calc(100% - 100px)',left:'calc(13% - 100px)',
  [theme.breakpoints.down('lg')]: {
    width: 130,height: 130,top:'calc(100% - 85px)',left:'calc(19% - 100px)',
  },
  [theme.breakpoints.down('md')]: {
    width: 120,height: 120,top:'calc(100% - 85px)',left:'calc(19% - 80px)'
  },
  [theme.breakpoints.down('sm')]: {
    width: 110,height: 110,top:'calc(100% - 60px)',left:'calc(19% - 40px)',
  },
}));
const Section =styled(Box)(({ theme }) => ({
  borderRadius:'6px',
  backgroundColor: '#fff',
  margin: '10px 0 5px', 
  height:'fit-content',
  width:'57%',
  [theme.breakpoints.down('sm')]: {width: '100%'},
  [theme.breakpoints.down('md')]: {width: '85%'},
  [theme.breakpoints.down('lg')]: {width: '80%'},
}));
const Container = styled(Box)(({ theme }) => ({
 width:'100%', marginTop: '100px',display: 'flex',flexDirection:'column',backgroundColor:"#E7EBF0" ,alignItems: 'center' 
}));
const AdminsDetail = () => {
    const {userId} = useParams()
    const navigate = useNavigate()
    const {t} = useLanguage()
    const [loading,setLoading] = useState(true)
    const [person,setPerson] = useState({})
   
    useEffect(() => {
     const GetData = async ()=>{
     try{
      setLoading(true)
      const responce = await axios.get(`/admins/admin/${userId}`)
      const data = responce.data.Admins[0]
      setPerson(data)
      setTimeout(()=>{setLoading(false)},1200)}
      catch(err){
         console.error(err)}}
      GetData()
     .catch(console.error);}, [])
     return (
       <React.Fragment>
        {loading?
         <Container>
           <Section>
               <LinearProgress />
           </Section>
         </Container>:
         <Container>
         <Section>
           <Box sx={{backgroundColor:"#E7EBF0"}}>
              <Tooltip title={t('Back')}>
                <IconButton onClick={()=>{navigate(-1)}}>
                  <KeyboardBackspaceIcon/>
                </IconButton>
              </Tooltip>
           </Box>
           <Box sx={{ position: 'relative'}}>
             <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%', height: 'auto',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
             <ProfilePhoto src={`../../../Profile_Image/${person.profilePhoto?person.profilePhoto:'Avater.png'}`}/>
           </Box>
           <Box sx={{mt:{md:8,xs:6}}} pl={2}>
               <Grid container spacing={2}>
                 <Grid item xs={12} md={6}>
                  <Typography variant='subtitle2'>{person.FirstName} {person.LastName}</Typography>
                 </Grid>
                 <Grid item xs={12} md={6} sx={{display:'flex',alignItems:'center'}}>
                   <Typography>{t("location")} {person.City}, {person.Country}</Typography>
                   <LocationOnIcon sx={{color:'#999'}}/>
                 </Grid> 
                 <Grid item xs={12}  sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                 <AlternateEmailIcon sx={{color:'#999'}}/>
                   <Typography>{person.Email}</Typography> 
                 </Grid>
                 <Grid item xs={12}  sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                   <LocalPhoneIcon sx={{color:'#999'}}/>
                   <Typography>{person.PhoneNumber}</Typography>
                 </Grid>  
               </Grid>
           </Box>
          </Section>
          </Container>}
       </React.Fragment>
      
     )
   }

export default AdminsDetail
