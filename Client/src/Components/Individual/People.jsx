import React,{useEffect,useState} from 'react'
import { Box,Typography,Divider,LinearProgress,Grid,Avatar,Button,Alert,Snackbar} from '@mui/material/node'
import { styled } from '@mui/material/styles';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
const Peoples = styled(Box)(({ theme }) => ({
  borderRadius:'6px',
  display:'flex',
  flexDirection:'column',
  height:'fit-content',
  boxShadow:"rgba(149, 157, 165, 0.1) 0px 8px 24px",
  cursor:'pointer',
  "&:hover": {
    boxShadow:"none",
    transform: "scale(1.099)",
  },
}));
const Herf = styled(Typography)(({ theme }) => ({
  "&:hover": {
    textDecoration:'underline'
  },
}));
const Buttons = styled(Button)(({ theme }) => ({
  marginTop:'1rem',marginBottom:'.5rem',textTransform:'none',borderRadius:'1rem'}));
const People = () => {
    const {user} = useAthuContext()
    const id = user.user._id
    const {t} = useLanguage()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [warnnig,setWaring] = useState(false)
    const [success,setSuccess] = useState(false)
    const [warnnigMsg,setWaringMsg] = useState('')
    const [successMsg,setSuccessMsg] = useState('')
    const [people,setPeople] = useState([{_id:'',FirstName:'',LastName:'',Country:'',City:''}])
    const [pending,setPendig] = useState()
  useEffect(() => {
      const GetData = async ()=>{
      try{
      setLoading(true)
      const responce = await axios.post(`/Peoples`,{id})
      const data = responce.data.PersonalAccounts
      setPeople(data)
      setTimeout(()=>{setLoading(false)},1200)
      }
      catch(err){
          console.error(err)
      }
  }
      GetData()
      .catch(console.error);
  }, [])
  const handleClick =(id)=>{
      navigate(`${id}`)
  }
  const SnedRequest = async  (reciverId) =>{
    try{
      const responce = await axios.post('/friendRequest',{senderId:id,reciverId:reciverId})
       if(responce.status === 200){
        setPendig(reciverId)
        setSuccessMsg('InvitationSent')
        setSuccess(true)
      } 
    }catch(err){
      setWaringMsg('InvitationNotSent')
      setWaring(true)
    }
  }
  const CancleRequest = async (reciverId) =>{
    try{
      const responce = await axios.post('/friendRequest//cancleRequest',{senderId:id,reciverId:reciverId})
       if(responce.status === 200){
        setPendig()
        setSuccessMsg('InvitationCancled')
        setSuccess(true)  
      } 
      }catch(err){
      setWaringMsg('InvitationNotCancled')
      setWaring(true)
       }
     }
  return (
    <Box p={2} sx={{borderRadius:'6px',backgroundColor:'#fff'}}>
      {loading?
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px'}}>
        <LinearProgress />
        <Typography  variant='subtitle2'>{t("PeopleYouMayKnow")}</Typography>
      </Box>:
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px',display:'flex',flexDirection:'column'}}>
        <Typography  variant='subtitle2'>{t("PeopleYouMayKnow")}</Typography>
        <Divider/>
        <Grid mt={2} container spacing={2}>
          {people.map((item,index)=>
          <Grid key={index} item lg={3} xs={6} sm={4}>
           <Peoples>
             <Box onClick={()=>handleClick(item._id)} sx={{ borderRadius:'6px',position: 'relative'}}>
                <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
              <Avatar src={`../../../Profile_Image/${item.profilePhoto?item.profilePhoto:'Avater.png'}`}
                sx={{ position: 'absolute',width:'100px',height:"100px",top: '20%',left:'25%'}}/>
              </Box>
              <Box  sx={{display:'flex',flexDirection:'column',alignItems:'center',mt:{xs:8,lg:8}}}>
                <Herf onClick={()=>handleClick(item._id)}>{item.FirstName} {item.LastName}</Herf>
                <Typography sx={{color:'#666',fontSize:{xs:'.84rem',sm:'.9rem'}}}>{item.Country},{item.City}</Typography>
                { pending === item._id?
                <Buttons onClick={()=>CancleRequest(item._id)} startIcon={<WatchLaterOutlinedIcon/>} variant='outlined'>{t("pending")}</Buttons>:
                <Buttons onClick={()=>SnedRequest(item._id)} startIcon={<PersonAddAltOutlinedIcon/>} variant='outlined'>{t("Connect")}</Buttons>}
              </Box>
           </Peoples>                      
          </Grid>
           )}
        </Grid>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                  open={warnnig} autoHideDuration={500} onClose={()=>setWaring(false)}>
          <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
             {t(`${warnnigMsg}`)}
          </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                open={success} autoHideDuration={500} onClose={()=>setSuccess(false)}>
          <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
              {t(`${successMsg}`)}
          </Alert>
        </Snackbar>
      </Box>}
    </Box> 
  )
}

export default People
