import React,{useEffect,useState}from 'react'
import { styled,alpha } from '@mui/material/styles';
import {Typography,Box,Tab,Tabs,Grid,LinearProgress,IconButton,Tooltip,Divider,Button,Avatar,Snackbar,Alert} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
const HoverBox = styled(Box)(({ theme }) => ({ 
  '&:hover': {
    background: "#E7EBF0",
    },
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
display: 'flex',
backgroundColor:"#E7EBF0",
justifyContent:'center'
}));
const Followers = () => {
  const {user,dispatch} = useAthuContext()
  const pageId = user.user._id
  const [followers,setFollowers] = useState([])
  const navigate = useNavigate()
  useEffect(() => {
    const GetData = async ()=>{
    try{
     const responce = await axios.post('/Profile/follower',{pageId})
     const data = responce.data.followees[0].followers
     console.log(data)
     setFollowers(data)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [])
  const handleNavigate = async (userId) =>{
    navigate(`followers/${userId}`)
 }
  return (
    <Main>
    <Section>
    {
          followers.map((follower,i)=>{
        return <HoverBox sx={{cursor:'pointer'}} key={i} onClick={()=>handleNavigate(follower._id)}>
                <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                  <ProfilePhoto
                  src={`../../../Profile_Image/${follower.profilePhoto?follower.profilePhoto:'Avater.png'}`}/>
                  <Typography  >{follower.FirstName} {follower.LastName} </Typography>
                  </Box>
                  <Divider/>
              </HoverBox>})}
    </Section>
  </Main>
  )
}

export default Followers
