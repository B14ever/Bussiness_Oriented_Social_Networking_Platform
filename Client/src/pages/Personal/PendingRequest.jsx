import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,IconButton,Tooltip, Avatar,LinearProgress,Snackbar,Alert} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
const Main = styled(Box)(({ theme }) => ({
  marginTop: '100px', 
  display: 'flex',
  backgroundColor:"#E7EBF0",
  justifyContent:'center'
}));
const Section = styled(Box)(({ theme }) => ({
  borderRadius:'6px',
  backgroundColor: '#fff',
  margin: '10px 0 5px',
  height: 'fit-content',
  width:'57%',
  [theme.breakpoints.down('sm')]: {width: '100%'},
  [theme.breakpoints.down('md')]: {width: '85%'},
  [theme.breakpoints.down('lg')]: {width: '80%'},
}));
const HoverBox = styled(Box)(({ theme }) => ({
  '&:hover': {
    background: "#E7EBF0",
    },
}));
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
}));
const PendingRequest = () => {
  const {t} = useLanguage()
  const {user,dispatch} = useAthuContext()
  const id = user.user._id
  const navigate = useNavigate()
  const [pendings,setPendings] = useState([])
  const [loading,setLoading] = useState(false)
  const [action,setAction] = useState(false)
  const [warnnig,setWaring] = useState(false)
 const [success,setSuccess] = useState(false)
 const [warnnigMsg,setWaringMsg] = useState('')
 const [successMsg,setSuccessMsg] = useState('')
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.post(`/Peoples/pendingRequest`,{id})
     console.log(responce.data)
     const data = responce.data.PenddigRequest[0].sentFriendRequest
     setPendings(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [action]) 
  const handleClick = (id) =>{
    navigate(`/PersonalAccountProfile/PersonalNetwork/${id}`)
  }
  const CancleRequest = async (reciverId) =>{
    try{
      const responce = await axios.post('/friendRequest/cancleRequest',{senderId:id,reciverId:reciverId})
       if(responce.status === 200){
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setSuccessMsg('RequestCancled')
        setSuccess(true)
        setAction(!action)  
      } 
      }catch(err){
      setWaringMsg('RequestCancled')
      setWaring(true)
       }
     }
  return (
    <Main>
     { 
     loading?
      <Section>
        <LinearProgress/>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Typography variant='subtitle2'>{t("PendingRequest")}</Typography>
        </Box>
      </Section>
       :
      <Section>
         {
          pendings.length > 0 ?
        <Box>
         <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Tooltip title={t("Back")}>
            <IconButton onClick={()=>navigate(-1)}>
              <KeyboardBackspaceIcon/>
            </IconButton>
          </Tooltip>
          <Typography variant='subtitle2'>{t("PendingRequest")}</Typography>
         </Box>
        <Divider/>
         {
           pendings.map((pending,i)=>{
             return <HoverBox key={i}>
                     <Box p={1.5} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                       <ProfilePhoto  onClick={()=>handleClick(pending._id)}
                       src={`../../../Profile_Image/${pending.profilePhoto?pending.profilePhoto:'Avater.png'}`}/>
                       <Typography onClick={()=>handleClick(pending._id)}>{pending.FirstName} {pending.LastName} </Typography>
                       <Tooltip title={t('Remove')}>
                         <IconButton sx={{marginLeft:'auto'}} onClick={()=>CancleRequest(pending._id)}>
                           <RemoveCircleOutlineIcon/>
                         </IconButton>
                       </Tooltip>
                      </Box>
                      <Divider/>
                   </HoverBox>})}
         </Box>:
         <Box>
          <Box p={1} sx={{display:'flex',alignItems:'center'}}>
            <Tooltip title={t("Back")}>
              <IconButton onClick={()=>navigate(-1)}>
                <KeyboardBackspaceIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          <Divider/>
          <Box sx={{height:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/NoPendingRequest.jpg`}/>
          <Typography onClick={()=>navigate(-1)} >{t("NoPendingRequest")}</Typography>
          </Box>
         </Box>
        }
      </Section>}
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
    </Main>
  )
}

export default PendingRequest
