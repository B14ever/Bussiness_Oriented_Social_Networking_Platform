import React,{useEffect,useState}from 'react'
import { styled,alpha } from '@mui/material/styles';
import {Typography,Box,LinearProgress,IconButton,Tooltip,Divider,Button,Avatar,Snackbar,Alert} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckIcon from '@mui/icons-material/Check';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import { useNavigate,useParams } from 'react-router-dom';
import {useLanguage} from '../../Localazation/LanguageContext'
const HoverBox = styled(Box)(({ theme }) => ({ 
 
}));
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
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
const Main = styled(Box)(({ theme }) => ({
marginTop: '100px', 
display: 'flex',
backgroundColor:"#E7EBF0",
justifyContent:'center'
}));
const Applicant = () => {
    const {user,dispatch} = useAthuContext()
    const pageId = user.user._id
    const {t} = useLanguage()
    const {jobId} = useParams()
    const [applicants,setApplicants] = useState([])
    const [loading,setLoading] = useState(false)
    const [warnnig,setWaring] = useState(false)
    const [action,setAction] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
      const GetData = async ()=>{
      try{
        setLoading(true)
       const responce = await axios.get(`/jobs/applicant/${jobId}`)
       const data = responce.data.applicant.applicants
       setApplicants(data)
       setTimeout(()=>{setLoading(false)},1200)
       }
       catch(err){
          console.error(err)}}
       GetData()
      .catch(console.error);}, [action])
    const handleNavigate = async (userId) =>{
      navigate(`/ComapnyAccountProfile/profile/followers/${userId}`)
   }
   const handleAccept = async (applicantId) =>{
    try{
      await axios.post(`/jobs/accept/${jobId}`,{applicantId})
      setAction(!action)
    }catch(err){
      setWaring(true) 
    }
  }
  const handleUnAccept = async (applicantId) =>{
    try{
      await axios.post(`/jobs/unaccept/${jobId}`,{applicantId})
      setAction(!action)
    }catch(err){
      setWaring(true) 
    }
  }
   const openPdf = (file) =>{
    console.log(file)
    window.open(`../../../Files/${file}`, "_blank");
  }
    return (
      <Main>
        {
          loading?
        <Section>
         <Box p={1}>
          <LinearProgress/>
          <Typography variant='subtitle2'>{t("Applicant")}</Typography>
        </Box>
        </Section>:
      <Section>
        {applicants.length > 0 ?
        <Box>
        <Box sx={{backgroundColor:"#E7EBF0"}}>
           <Tooltip title={t('Back')}>
             <IconButton onClick={()=>{navigate(-1)}}>
               <KeyboardBackspaceIcon/>
             </IconButton>
           </Tooltip>
         </Box>
      {
            applicants.map((applicant,i)=>{
          return <HoverBox sx={{cursor:'pointer'}} key={i}>
                  <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                    <ProfilePhoto onClick={()=>handleNavigate(applicant.applicant._id)}
                    src={`../../../Profile_Image/${applicant.applicant.profilePhoto?applicant.applicant.profilePhoto:'Avater.png'}`}/>
                    <Typography sx={{'&:hover': {textDecoration: 'underline'}}} onClick={()=>handleNavigate(applicant.applicant._id)}  >
                      {applicant.applicant.FirstName} {applicant.applicant.LastName} 
                    </Typography>
                    <Tooltip title={t('Cv')} onClick={()=>openPdf(applicant.cv)}>
                      <IconButton sx={{marginLeft:'auto'}}>
                        <TextSnippetIcon color='primary'/>
                      </IconButton>
                    </Tooltip>
                    {
                      applicant.accepetd?
                      <Button  sx={{textTransform:'none',borderRadius:'20px',width:'20%'}}
                       variant="contained" onClick={()=>handleUnAccept(applicant.applicant._id)}
                       >Accepted</Button>:
                      <Button sx={{textTransform:'none',borderRadius:'20px',width:'20%'}}
                       onClick={()=>handleAccept(applicant.applicant._id)} variant="contained">
                        Accept
                        </Button>
                    }
                    </Box>
                    <Divider/>
                </HoverBox>})}
                </Box>:
                <Box>
                  <Box sx={{backgroundColor:"#E7EBF0"}}>
                    <Tooltip title={t('Back')}>
                      <IconButton onClick={()=>{navigate(-1)}}>
                        <KeyboardBackspaceIcon/>
                      </IconButton>
                    </Tooltip>
                 </Box>
                  <Box 
                  sx={{height:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
                  <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/EmptyApplicant.jpg`}/>
                  <Typography variant='subtitle2'>{t("EmptyApplicant")}</Typography>
                </Box>
               </Box>
                }
                 <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                  open={warnnig} autoHideDuration={800} onClose={()=>setWaring(false)}>
                   <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                     {t(`Accepting Faild`)}
                    </Alert>
                  </Snackbar>
      </Section>
      }
    </Main>
    )
}

export default Applicant
