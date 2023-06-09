import React,{useEffect,useState}from 'react'
import { styled,alpha } from '@mui/material/styles';
import {Typography,Box,Divider,Button,Avatar,LinearProgress,Tooltip,IconButton} from '@mui/material'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../Localazation/LanguageContext';
const Main = styled(Box)(({ theme }) => ({
  marginTop: '100px', 
  display: 'flex',
  backgroundColor:"#E7EBF0",
  justifyContent:'center',
  width:'100%'
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
const PersonalAccountUsers = () => {
  const {t} = useLanguage()
  const {user,dispatch} = useAthuContext()
  const id = user.user._id
  const [users,setUsers] = useState([])
  const [loading,setLoading] = useState(false)
  const [limit,setLimit] = useState(8)
  const navigate = useNavigate()
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.post(`/Peoples`,{id})
     const data = responce.data.PersonalAccounts
     setUsers(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [])
  const handleNavigate = async (userId) =>{
    navigate(`${userId}`)
 }
  return (
    <Main>
     { 
     loading?
      <Section>
        <LinearProgress/>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Typography variant='subtitle2'>{t("PersonalAccounts")}</Typography>
        </Box>
      </Section>
       :
    <Section>
      <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
      <Tooltip title={t("Back")}>
            <IconButton onClick={()=>navigate(-1)}>
              <KeyboardBackspaceIcon/>
            </IconButton>
          </Tooltip>
          <Typography variant='subtitle2'>{t("PersonalAccounts")}</Typography>
          <Typography sx={{marginLeft:'auto'}} variant='subtitle2'>{users.length} {t("TotalUsers")}</Typography>
      </Box>
      <Divider/>
    {
        users.slice(0,limit).map((user,i)=>{
        return <HoverBox sx={{cursor:'pointer'}} key={i} onClick={()=>handleNavigate(user._id)}>
                <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                  <ProfilePhoto
                  src={`../../../Profile_Image/${user.profilePhoto?user.profilePhoto:'Avater.png'}`}/>
                  <Typography  >{user.FirstName} {user.LastName} </Typography>
                  </Box>
                 { <Divider/>}
              </HoverBox>})}
            <Box  sx={{display:'flex',justifyContent:'center'}}>
            {limit>8?<KeyboardArrowUpOutlinedIcon onClick={()=>setLimit(prev=>prev-4)}/>:null}
            </Box> 
          <Box  sx={{display:'flex',justifyContent:'center'}}>
            <Button startIcon={<ExpandMoreOutlinedIcon/>} sx={{textTransform:'none'}} onClick={()=>setLimit(prev=>prev + 4)}>
              {t('seeMore')}
            </Button>
          </Box> 
    </Section>
    }
  </Main>
  )
}

export default PersonalAccountUsers
