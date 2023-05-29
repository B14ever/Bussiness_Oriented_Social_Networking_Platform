import React,{useEffect,useState} from 'react'
import { Box,Typography,Divider,Button,Grid,LinearProgress,Avatar,Alert,Snackbar} from '@mui/material/node'
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useNavigate } from 'react-router-dom';
const Buttons = styled(Button)(({ theme }) => ({
 textTransform:'none',borderRadius:'1rem'}));
const Invitation = () => {
    const {user} = useAthuContext()
    const navigate = useNavigate()
     const id = user.user._id
    const {t} = useLanguage()
    const [loading,setLoading] = useState(false)
    const [invitation,setInvitation] = useState([])
    const [warnnig,setWaring] = useState(false)
    const [success,setSuccess] = useState(false)
    const [warnnigMsg,setWaringMsg] = useState('')
    const [successMsg,setSuccessMsg] = useState('')
    const [accepted,setAccepted] = useState(false)
    const [action,setAction] = useState()
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
  const handleAcceptRequest = async (senderId) =>{
    setAccepted(false)
    try{
      const responce = await axios.post('/friendRequest/AcceptRequest',{senderId:senderId,reciverId:id})
       if(responce.status === 200){
        setSuccessMsg('InvitationAccepted')
        setSuccess(true)
        setAction(senderId)
        setAccepted(true)
      } 
    }catch(err){
      setWaringMsg('InvitationNotAccepted')
      setWaring(true)
      
    }
  }
  const handleIgnoreRequest = async (senderId) =>{
    setAccepted(false)
    try{
      const responce = await axios.post('/friendRequest/cancleRequest',{senderId:senderId,reciverId:id})
       if(responce.status === 200){
        setSuccessMsg('RejectedInvitation')
        setSuccess(true)
        setAction(senderId)
      } 
    }catch(err){
      setWaringMsg('InvitationNotRejected')
      setWaring(true)
    }
  }
  const handleClick =(id)=>{
    navigate(`${id}`)
}
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
              <Box sx={{display:'flex',flexDirection:'column'}}>
                <Typography variant='subtitle2'>{t("Invitation")}</Typography>
                <Divider/>
                {
                  invitation.map((item,index) => {
                   return <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
                        <Grid key={index} container spacing={1} mt={1}>
                             <Grid onClick={()=>handleClick(item._id)} item xs={12} sm={6} sx={{display:'flex',alignItems:'flex-start',cursor:'pointer',}}>
                               <Avatar  sx={{ width: 70, height: 70,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",}}   alt="Remy Sharp" src={`../../../Profile_Image/${item.profilePhoto?item.profilePhoto:'Avater.png'}`} />
                               <Box>
                               <Typography pl={1}  sx={{marginTop:'.2rem',color:'#000',fontWeight:'600'}} >{item.FirstName} {item.LastName}</Typography>
                               <Typography pl={1} sx={{fontSize:'.9rem',color:'#777'}}>{item.education[0]?.fildeOfStudy}</Typography>
                               </Box>
                              </Grid>
                              <Grid item xs={12} sm={6} sx={{display:'flex',justifyContent:{sm:'flex-end',xs:'flex-start',gap:'.5rem',alignItems:'center'}}}>
                                 {
                                  item._id === action ?
                                  <Box>
                                     {
                                      accepted?
                                      <Typography>{t("YouAreKnowFriends")} {item.FirstName} </Typography>:
                                      <Typography>{t("YouHaveDclined")} {item.FirstName} {("Invitation")}</Typography>
                                     }
                                  </Box>:
                                   <Box>
                                    <Buttons onClick={()=>handleIgnoreRequest(item._id)} sx={{color:'#777',fontWeight:'600',marginRight:'.5rem'}}  size="medium">{t("Ignore")}</Buttons>
                                    <Buttons onClick={()=>handleAcceptRequest(item._id)} startIcon={<CheckIcon/>} size="medium" variant='outlined'>{t("Accept")}</Buttons>
                                   </Box>
                                 }
                              </Grid>      
                          </Grid>
                          <Divider/>
                   </Box>
                  })
                }
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                open={warnnig} autoHideDuration={800} onClose={()=>setWaring(false)}>
                  <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                  {t(`${warnnigMsg}`)}
                  </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                open={success} autoHideDuration={800} onClose={()=>setSuccess(false)}>
                  <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                  {t(`${successMsg}`)}
                  </Alert>
                </Snackbar>
              </Box>
               
      }
    </Box> 
  )
}

export default Invitation
