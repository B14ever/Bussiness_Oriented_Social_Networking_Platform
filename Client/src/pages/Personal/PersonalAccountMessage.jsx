import React,{useState,useEffect} from 'react'
import { Box, Typography,Grid,IconButton,Divider,Drawer,List,ListItem,ListItemButton,ListItemAvatar,ListItemText,Avatar} from '@mui/material/node'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import { styled, useTheme } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
const Section = styled(Box)(({ theme }) => ({
  borderRadius:'6px',
  backgroundColor: '#fff',
  width:'75%',
  [theme.breakpoints.down('sm')]: {width: '100%'},
  [theme.breakpoints.down('md')]: {width: '85%'},
  [theme.breakpoints.down('lg')]: {width: '80%'},
  margin:'10px 0 10px'
}));
const Main= styled(Box)(({ theme }) => ({
  marginTop:'97px',backgroundColor:"#E7EBF0",display:'flex',justifyContent:'center'
}));
const SideBar= styled(Box)(({ theme }) => ({
   display:'flex',
   flexDirection:'column',
   
}));
const Head= styled(Box)(({ theme }) => ({
  display:'flex',alignItems:'center',paddingLeft:'1rem',gap:'1rem'
}));
const Slider= styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    top:'146px',
    left:'192px'
  },
}));
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 50, height: 50,boxShadow:"rgba(149, 157, 165, 0.1) 0px 6px 22px",
}));
const ChatBar= styled(Box)(({ theme }) => ({

}));
const drawerWidth = 300;
const PersonalAccountMessage = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const id = user.user._id
  const [open, setOpen] = useState(false)
  const [friends,setFriends] = useState([])
  const [chat,setChat] = useState([])
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    const GetData = async ()=>{
    try{
     const responce = await axios.post(`/Peoples/friends`,{id})
     const data = responce.data.Friends[0].friends
      setFriends(data)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [])
    
  useEffect(() => {
      const GetData = async ()=>{
      try{
       const responce = await axios.post(`/ChatRoom/fetchChats`,{id})
       const data = responce.data
       console.log(data)
       setChat(data)
       }
       catch(err){
          console.error(err)}}
       GetData()
  .catch(console.error);}, [])
  return (
    <Main>
      <Section >
        <Grid container >
           <Grid item xs={12} sm={4}>
              <SideBar>
                 <Head>
                  {
                    !open?
                    <IconButton onClick={handleDrawerOpen} color="primary" aria-label="open drawer"  edge="start">
                    <MenuIcon />
                   </IconButton>:
                   <IconButton onClick={handleDrawerClose} color="primary" aria-label="open drawer"  edge="start" >
                   <MenuOpenOutlinedIcon />
                  </IconButton>

                  }
                  <Typography variant='subtitle2'>{t("Messaging")}</Typography>
                 </Head>
                 <Divider/>
                 <ChatBar>
                  <List disablePadding >
                    {chat.map((info, index) => (
                      <Box  key={index} >
                        <ListItem  disablePadding>
                        <ListItemButton>
                          <ListItemAvatar>
                            <ProfilePhoto src={`../../../Profile_Image/${info.users[0]._id === id ? info.users[1].profilePhoto?info.users[1].profilePhoto:'Avater.png':info.users[0].profilePhoto?info.users[0].profilePhoto:'Avater.png'}`}/>
                          </ListItemAvatar>
                          <ListItemText
                            primary={info.users[0]._id === id ? 
                              `${info.users[1].FirstName} ${info.users[1].LastName}`: 
                              `${info.users[0].FirstName} ${info.users[0].LastName}`}
                            secondary={<Typography sx={{ display: 'inline' }} component="span" variant="body2"      
                                        color="text primary"> {info.latestMessage?.content}</Typography>}/>
                        </ListItemButton>
                      </ListItem>
                      <Divider/>
                      </Box>
                    ))}
                  </List>
              </ChatBar>
              </SideBar>
              <Slider variant="persistent" anchor="left" open={open}>
                <List disablePadding >
                  {friends.map((info, index) => (
                    <Box  key={index} >
                      <ListItem disablePadding>
                       <ListItemButton>
                        <ListItemAvatar>
                         <ProfilePhoto src={`../../../Profile_Image/${info.profilePhoto?info.profilePhoto:'Avater.png'}`}/>
                        </ListItemAvatar>
                         <Typography>{info.FirstName} {info.LastName}</Typography>
                       </ListItemButton>
                     </ListItem>
                     <Divider/>
                    </Box>
                  ))}
                </List>
              </Slider>
           </Grid>
           <Divider  orientation="vertical" flexItem />
           <Grid item sm={8}>

           </Grid>
        </Grid>
     </Section>
    </Main>
  )
}

export default PersonalAccountMessage
