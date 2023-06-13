import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,Avatar,LinearProgress} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import  { Main_One, Section_One } from '../../Components/Company/Css'
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import axios from '../../api/axios'
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
    width: 45, height: 45,
  }));
const HoverBox = styled(Box)(({ theme }) => ({
    '&:hover': {
      background: "#E7EBF0",
      },
  }));
const PersonalAccountNotification = () => {
  const [nottfication,setNottification] = useState([])
  const [loading,setLoading] = useState(false)
  const {t} = useLanguage()
   const {user} = useAthuContext()
  const id = user.user._id
 
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.get(`/notification/${id}`,)
     const data = responce.data.notification[0].nottification
     setNottification(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [])
   return (
     <Main_One>
         { loading?
         <Section_One>
           <Box p={1}>
           <LinearProgress/>
           <Typography variant='subtitle2'>{t("Notification")}</Typography>
           </Box>
           <Divider/>
        </Section_One>:
       <Section_One>   
        {nottfication.length > 0 ? 
        <Box>
        <Box p={1}>
        <Typography variant='subtitle2'>{t("Notification")}</Typography>
        </Box>
        <Divider/>
        {
        nottfication.map((n,i)=>{
          return  <HoverBox key={i} >
          <Box p={1} sx={{display:'flex',alignItems:'flex-start',gap:'.5rem'}}>
            <ProfilePhoto sx={{backgroundColor:"#1e88e5"}}>
              <FormatBoldIcon/>
            </ProfilePhoto>
            <Typography sx={{cursor:'pointer'}}>{n}</Typography>
          </Box>
          <Divider/>
        </HoverBox>
        })}
        </Box>:
        <Box 
          sx={{height:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/EmptyNottification.jpg`}/>
          <Typography variant='subtitle2'>{t("EmptyNottification")}</Typography>
        </Box>}
       </Section_One>
       }
     </Main_One>
   )
 }

export default PersonalAccountNotification
