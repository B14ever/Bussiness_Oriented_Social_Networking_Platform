import React,{useState,useEffect, useReducer} from 'react'
import { Box,Avatar,LinearProgress,IconButton,Tooltip,Grid,Typography,Divider, Button,Alert,Snackbar} from '@mui/material/node'
import { styled } from '@mui/material/styles';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import WorkIcon from '@mui/icons-material/Work';
import SchoolIcon from '@mui/icons-material/School';
import CheckIcon from '@mui/icons-material/Check';
import {useParams,useNavigate} from 'react-router-dom'
import axios from '../../api/axios'
import { useLanguage } from '../../Localazation/LanguageContext';
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
  marginTop: '100px',display: 'flex',flexDirection:'column',backgroundColor:"#E7EBF0" ,alignItems: 'center' 
}));
const Buttons = styled(Button)(({ theme }) => ({
  textTransform:'none',borderRadius:'1rem',marginTop:'1rem',marginBottom:'.5rem'}));
const intialState = {
  educationLimt:1,
  exprienceLimt:1,
  skillLimt:1,
}
const reducer = (currentState,action)=>{
  switch (action.type) {
    case `educationMore`:
      return {
        ...currentState,
        educationLimt: currentState.educationLimt+1,
      };
      case `educationLess`:
      return {
        ...currentState,
        educationLimt: currentState.educationLimt - 1,
      };
      case `exprienceMore`:
      return {
        ...currentState,
        exprienceLimt: currentState.exprienceLimt + 1,
      };
      case `exprienceLess`:
        return {
          ...currentState,
          exprienceLimt: currentState.exprienceLimt - 1,
        };
      case `skillMore`:
      return {
        ...currentState,
        skillLimt:currentState.skillLimt+1,
      };
      case `skillLess`:
        return {
          ...currentState,
          skillLimt:currentState.skillLimt-1,
        };
      default:
        return currentState;
    }
}
const PeoplesDeatail = () => {
 const {user,dispatch} = useAthuContext()
 const id = user.user._id
 const {userId} = useParams()
 const navigate = useNavigate()
 const {t} = useLanguage()
 const [userInfo,setUserInfo] = useState({})
 const [warnnig,setWaring] = useState(false)
 const [success,setSuccess] = useState(false)
 const [warnnigMsg,setWaringMsg] = useState('')
 const [successMsg,setSuccessMsg] = useState('')
 const [loading,setLoading] = useState(true)
 const [person,setPerson] = useState({})
 const [action,setAction] = useState(false)
 const [limit,Limitdispatch] = useReducer(reducer,intialState)
 useEffect(() => {
  const GetData = async ()=>{
  try{
   setLoading(true)
   const responce = await axios.get(`/Peoples/${userId}`)
   const data = responce.data.PersonalAccounts[0]
   setPerson(data)
   setTimeout(()=>{setLoading(false)},1200)}
   catch(err){
      console.error(err)}}
   GetData()
  .catch(console.error);}, [])
  useEffect(() => {
    const GetData = async ()=>{
    try{
     const responce = await axios.post(`/friendRequest/CheckRequest`,{id})
     console.log(responce.data)
     const data = responce.data.PersonalAccounts[0]
     setUserInfo(data)}
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [action])
const handlExpand = (limitType)=>{
 Limitdispatch({type:limitType})
}
const handleAcceptRequest = async (senderId) =>{
  try{
    const responce = await axios.post('/friendRequest/AcceptRequest',{senderId:senderId,reciverId:user.user._id})
     if(responce.status === 200){
      localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
      dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
      setSuccessMsg('InvitationAccepted')
      setSuccess(true)
      setAction(!action)
    } 
  }catch(err){
    setWaringMsg('InvitationNotAccepted')
    setWaring(true)
    
  }
}
const handleIgnoreRequest = async (senderId) =>{
  try{
    const responce = await axios.post('/friendRequest/declineInvitation',{senderId:senderId,reciverId:user.user._id})
     if(responce.status === 200){
      localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
      dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
      setSuccessMsg('RejectedInvitation')
      setSuccess(true)
      setAction(!action)
    } 
  }catch(err){
    setWaringMsg('InvitationNotRejected')
    setWaring(true)
  }
}
const SnedRequest = async  (reciverId) =>{
  try{
    const responce = await axios.post('/friendRequest',{senderId:id,reciverId:reciverId})
     if(responce.status === 200){
      localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
      dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
      setSuccessMsg('InvitationSent')
      setSuccess(true)
      setAction(!action)
    } 
  }catch(err){
    setWaringMsg('InvitationNotSent')
    setWaring(true)
  }
}
const CancleRequest = async (reciverId) =>{
  try{
    const responce = await axios.post('/friendRequest/cancleRequest',{senderId:id,reciverId:reciverId})
     if(responce.status === 200){
      localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
      dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
      setSuccessMsg('InvitationCancled')
      setSuccess(true)
      setAction(!action)  
    } 
    }catch(err){
    setWaringMsg('InvitationNotCancled')
    setWaring(true)
     }
   }
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
            <Grid container>
              <Grid item xs={12} md={6}>
               <Typography variant='subtitle2'>{person.FirstName} {person.LastName}</Typography>
              </Grid>
              <Grid item xs={12} md={6} sx={{display:'flex',alignItems:'center'}}>
                <Typography>{t("location")} {person.City}, {person.Country}</Typography>
                <LocationOnIcon sx={{color:'#999'}}/>
              </Grid>    
            </Grid>
            <Grid container>
            {person.education.length > 0?
              <Grid item xs={12} md={6} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
              <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t('GraduateOf')} {person.education[0]?.fildeOfStudy}</Typography>
              <SchoolIcon sx={{color:'#999'}}/>
              </Grid>
              :null}
              {person.exprience.length > 0?
              <Grid item xs={12} md={6} sx={{display:'flex',alignItems:'center',gap:'.5rem',warp:'warp'}}>
              <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t('WorksAt')} {person.exprience[0]?.companyName}</Typography>
                <WorkIcon sx={{color:'#999'}}/>
              </Grid>
              :null}   
            </Grid>
             {
                userInfo.sentFriendRequest.includes(userId)?
                <Buttons onClick={()=>CancleRequest(person._id)} startIcon={<PersonAddAltOutlinedIcon/>} variant='outlined'>{t("Pending")}</Buttons>:
                userInfo.recivedFriendRequest.includes(userId)?
                <Box sx={{display:'flex',alignItems:'center'}}>
                <Buttons onClick={()=>handleIgnoreRequest(person._id)}>{t("Ignore")}</Buttons>
                <Buttons onClick={()=>handleAcceptRequest(person._id)} startIcon={<CheckIcon/>} variant='outlined'>{t("Accept")}</Buttons>
                </Box>:
                userInfo.friends.includes(userId)?
                <Buttons startIcon={<PersonAddAltOutlinedIcon/>} variant='outlined'>{t("Message")}</Buttons>:
                <Buttons onClick={()=>SnedRequest(person._id)} startIcon={<PersonAddAltOutlinedIcon/>}variant='outlined'>{t("Connect")}</Buttons>
             }
        </Box>
       </Section>
       {person.education.length > 0 ?
       <Section pl={2}>
        <Box sx={{display:'flex',alignItems:'center'}}>
            <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("Education")}</Typography>
        </Box>
       { 
      person.education.slice(0,limit.educationLimt).map((Education,index)=>
         <Box mb={1} key={index}>
                <Divider></Divider>
               <Box sx={{display:'flex',mt:1.3}}>
                <img src="../../../Profile_Image/webIcon.png" style={{ width: '50px', height: '50px',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                <Box mt={.5} pl={1}>
                  <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{t("StudiedAt")} {Education.institution}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("GraduteOf")} {Education.fildeOfStudy}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("yearOfStudy")} {Education.startedDate} - {Education.endDate}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("Grade")} {Education.Grade}</Typography>
                </Box>
              </Box>
            </Box>)}
          <Divider textAlign='center'>
            {limit.educationLimt>1?<KeyboardArrowUpOutlinedIcon onClick={()=>handlExpand('educationLess')}/>:null}
          </Divider>
          <Box p={.5} sx={{display:'flex',justifyContent:'center'}}>
            <Button startIcon={<ExpandMoreOutlinedIcon/>} sx={{textTransform:'none'}} onClick={()=>handlExpand('educationMore')}>
              {t('seeMore')}
            </Button>
          </Box>  
        </Section>:null}
        {person.exprience.length > 0 ?
       <Section pl={2}>
        <Box sx={{display:'flex',alignItems:'center'}}>
          <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >
            {t("Experience")}
          </Typography>
        </Box>
       { 
      person.exprience.slice(0,limit.exprienceLimt).map((Exprience,index)=>
        <Box key={index}>
            <Divider/>
          <Box sx={{display:'flex',mt:1.3}} >
            <img src="../../../Profile_Image/webIcon.png" style={{ width: '50px', height: '50px',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
            <Box mt={.5} pl={1}>
              <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{t("workedAs")} {Exprience.title}</Typography>
              <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("Workedat")} {Exprience.companyName}</Typography>
              <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("yearOfExprience")} {Exprience.startedDate} - {Exprience.endDate}</Typography>
              <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("workType")} {Exprience.employmentType}</Typography>
            </Box>
          </Box>
        </Box>)}
          <Divider textAlign='center'>
            {limit.exprienceLimt>1?<KeyboardArrowUpOutlinedIcon onClick={()=>handlExpand('exprienceLess')}/>:null}
          </Divider>
          <Box p={.5} sx={{display:'flex',justifyContent:'center'}}>
            <Button startIcon={<ExpandMoreOutlinedIcon/>} sx={{textTransform:'none'}} onClick={()=>handlExpand('exprienceMore')}>
              {t('seeMore')}
            </Button>
          </Box>  
        </Section>:null}
        {person.skill.length > 0 ?
       <Section pl={2}>
        <Box sx={{display:'flex',alignItems:'center'}}>
          <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("skill")}</Typography>
        </Box>
       { 
      person.skill.slice(0,limit.skillLimt).map((Skill,index)=>
      <Box  key={index}>
        <Divider/>
        <Box mt={1} mb={1} pl={1}>
            <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{Skill.skillName}</Typography>
            {Skill.badge?<Box sx={{display:'flex',gap:'.5rem'}}><VerifiedOutlinedIcon color='primary'/><Typography>{t("PassedSkillAssissment")}</Typography></Box>:''}
        </Box>
       </Box>)}
          <Divider textAlign='center'>
            {limit.skillLimt>1?<KeyboardArrowUpOutlinedIcon onClick={()=>handlExpand('skillLess')}/>:null}
          </Divider>
          <Box p={.5} sx={{display:'flex',justifyContent:'center'}}>
            <Button startIcon={<ExpandMoreOutlinedIcon/>} sx={{textTransform:'none'}} onClick={()=>handlExpand('skillMore')}>
              {t('seeMore')}
            </Button>
          </Box>  
        </Section>:null}
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
       </Container>}
    </React.Fragment>
   
  )
}

export default PeoplesDeatail
