import React,{useEffect,useState} from 'react'
import { Box,Typography,Divider,LinearProgress,Avatar,Button,Grid} from '@mui/material/node'
import { styled } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import { useAthuContext } from '../../Context/Shared/AthuContext'
const Buttons = styled(Button)(({ theme }) => ({
 textTransform:'none',borderRadius:'1rem'}));
const Invitation = () => {
    const {user} = useAthuContext()
     const id = user.user._id
    const {t} = useLanguage()
    const [loading,setLoading] = useState(false)
    const [invitation,setInvitation] = useState([])
    useEffect(() => {
      const GetData = async ()=>{
      try{
      setLoading(true)
      const responce = await axios.post(`/Peoples/invitation`,{id})
      const data = responce.data.invitation
      console.log(data)
      setInvitation(data)
      setTimeout(()=>{setLoading(false)},1200)
      }
      catch(err){
          console.error(err)
      }
  }
      GetData()
      .catch(console.error);
  }, [])
  return (
    <Box p={2} sx={{borderRadius:'6px',backgroundColor:'#fff'}}>
      {loading?
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px'}}>
        <LinearProgress />
        <Typography  variant='subtitle2'>{t("Invitation")}</Typography>
      </Box>: invitation?.length === 0 ?
              <Box>
                <Typography>{t("Noinvitations")}</Typography>
              </Box>:
              <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                {
                  invitation.map((item,index) => {
                   return <Grid key={index} container>
                             <Grid item xs={12} sm={6} sx={{display:'flex'}}>
                               <Avatar  sx={{ width: 40, height: 40}}   alt="Remy Sharp" src={`../../../Profile_Image/${item.profilePhoto?item.profilePhoto:'Avater.png'}`} />
                                <Typography pl={1} sx={{marginTop:'.5rem'}}>{item.FirstName} {item.LastName}</Typography>
                              </Grid>
                              <Grid item xs={12} sm={6} sx={{display:'flex',justifyContent:{sm:'flex-end',xs:'center',gap:'.5rem'}}}>
                                 <Buttons size="medium" variant='outlined'>Accept</Buttons>
                                 <Buttons size="medium" variant='outlined'>Accept</Buttons>
                              </Grid>      
                          </Grid>
                  })
                }
              </Box>
               
      }
    </Box> 
  )
}

export default Invitation
