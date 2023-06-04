import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,IconButton,Tooltip, Avatar,LinearProgress,
  Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,Button} from '@mui/material'
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
const Connection = () => {
  const {t} = useLanguage()
  const {user,dispatch} = useAthuContext()
  const id = user.user._id
  const navigate = useNavigate()
  const [friends,setFriends] = useState([])
  const [friendsId,setFriendsId] = useState('')
  const [loading,setLoading] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.post(`/Peoples/friends`,{id})
     const data = responce.data.Friends[0].friends
     setFriends(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [reload]) 
  
  const handleClick = (id) =>{navigate(`/PersonalAccountProfile/PersonalNetwork/${id}`)}
  const openAlert = (work_Id) => {
    setFriendsId(work_Id)
    setAlertOpen(true);
  };

  const closeAlert = () => {
    setAlertOpen(false);
  };
  const handleDeleteFriends = async () =>{
    try{
      const responce = await axios.post('/Peoples/remove',{userId:id,friendsId})
       if(responce.status === 200){
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setAlertOpen(false)
        setReload(!reload)
      } 
    }catch(err){
      console.log(err)
    }
  }
  return (
    <Main>
     { 
     loading?
      <Section>
        <LinearProgress/>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Typography variant='subtitle2'>{t("YourConnection")}</Typography>
        </Box>
      </Section>
       :
      <Section>
        {
          friends.length > 0 ?
        <Box>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Tooltip title={t("Back")}>
            <IconButton onClick={()=>navigate(-1)}>
              <KeyboardBackspaceIcon/>
            </IconButton>
          </Tooltip>
          <Typography variant='subtitle2'>{t("YourConnection")}</Typography>
        </Box>
        <Divider/>
        {
          friends.map((friend,i)=>{
            return <HoverBox key={i}>
                     <Box p={1.5} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                       <ProfilePhoto  onClick={()=>handleClick(friend._id)}
                       src={`../../../Profile_Image/${friend.profilePhoto?friend.profilePhoto:'Avater.png'}`}/>
                       <Typography sx={{cursor:'pointer'}} onClick={()=>handleClick(friend._id)}>{friend.FirstName} {friend.LastName} </Typography>
                       <Tooltip title={t('Remove')}>
                         <IconButton sx={{marginLeft:'auto'}} onClick={()=>openAlert(friend._id)}>
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
          <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/NoConnection.jpg`}/>
          <Typography  onClick={()=>navigate(-1)} >{t("MakeFriends")}</Typography>
          </Box>
         </Box>
        }
        <Dialog open={alertOpen} onClose={closeAlert}  fullWidth
           aria-labelledby="alert-dialog-title"   aria-describedby="alert-dialog-description">
         <DialogTitle textAlign='center' id="alert-dialog-title">{t("RemoveConnection")}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">{t("DeleteConnectionWarnning")}</DialogContentText>
         </DialogContent>
         <DialogActions>
          <Button onClick={closeAlert}>{t("Cancle")}</Button>
          <Button onClick={handleDeleteFriends}>{t("Delete")}</Button>
        </DialogActions>
      </Dialog>
      </Section>}
    </Main>
  )
}

export default Connection
