import React,{useState,useEffect} from 'react'
import { Box, Typography,Grid,IconButton,Divider,Drawer,List,ListItem,ListItemButton,ListItemAvatar,ListItemText,Avatar,LinearProgress,TextField,Button,InputBase} from '@mui/material/node'
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import { styled, useTheme } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import { useNavigate } from 'react-router-dom';
import Messages from '../../Components/Individual/Messages';
import axios from '../../api/axios'
import io from 'socket.io-client'
var socket , selectedChatCompare;
const Section = styled(Box)(({ theme }) => ({
  width:'100%',
}));
const Main= styled(Box)(({ theme }) => ({
  marginTop:'97px',backgroundColor:"#E7EBF0",
  padding:'1rem'
}));
const SideBar= styled(Box)(({ theme }) => ({
   display:'flex',
   flexDirection:'column',
   backgroundColor:"#fff",
   borderRadius:'6px',
}));
const Head= styled(Box)(({ theme }) => ({
  display:'flex',height:'3.5rem',alignItems:'center',paddingLeft:'1rem'
  ,gap:'1rem'
}));
const Slider= styled(Drawer)(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    boxSizing: 'border-box',
    top:'180px',
   
  },
}));
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 50, height: 50,boxShadow:"rgba(149, 157, 165, 0.1) 0px 6px 22px",
}));
const MessageBox= styled(Box)(({ theme }) => ({
  display:'flex',
  flexDirection:'column',
  backgroundColor:"#fff",
  borderRadius:'6px',
}));
const MessageHeader= styled(Box)(({ theme }) => ({
  display:'flex',height:'3.5rem',alignItems:'center',gap:'.5rem',backgroundColor:"#fff", borderRadius:'6px',
  paddingLeft:'1rem'
}));
const StartChatBox= styled(Box)(({ theme }) => ({
  display:'flex',
  flexDirection:'column',
  height:'70vh',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:"#fff", 
  borderRadius:'6px',
}));
const EmptyChatBox= styled(Box)(({ theme }) => ({
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
}));
const ChatBox= styled(Box)(({ theme }) => ({
  height:'55vh',
  backgroundColor:"#fff", 
  borderRadius:'6px'
}));
const SendMessage= styled(Box)(({ theme }) => ({
  backgroundColor:"#fff", 
  borderRadius:'6px',
  display:'flex',
  alignItems:'center',
  gap:'1rem',
  padding:'10px'
}));
const PostInput = styled(TextField)(({ theme }) => ({
  marginLeft:'2rem',
  backgroundColor:'#E7EBF0',
  color:'#555',
  borderRadius:'10px',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
}))
const DialogButton = styled(Button)(({ theme }) => ({
  flexGrow:1,
  backgroundColor:'#E7EBF0',
  textTransform:'none',
  justifyContent: "flex-start",
  padding:12,
  borderRadius:'2rem',
  color:'#555'
}))
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:'#E7EBF0',
  '&:hover': {
    backgroundColor:'#E7EBF0',
  },
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));
const NoFriendsBox = styled(Box)(({ theme }) => ({
  height:'70vh',
  display:'flex',
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center',
  backgroundColor:'#fff',
  boxShadow:"rgba(149, 157, 165, 0.3) 0px 6px 22px",borderRadius:'10px',
  width:'70%',
  [theme.breakpoints.down('sm')]: {width: '100%%'},
  }))
const drawerWidth = 300;
const PersonalAccountMessage = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const id = user.user._id
  const [open, setOpen] = useState(false)
  const [friends,setFriends] = useState([])
  const [chat,setChat] = useState([])
  const [loading,setLoading] = useState(false)
  const [selectedChat,setSelectedChat] = useState([])
  const [selectedUser,setSelectedUser]  = useState({Fname:'',LName:'',Photo:''})
  const [selectedChatId,setSelectedChatId] = useState()
  const [newMessage,setNewMessage] = useState('')
  const [messageSent,setMessageSent] = useState(true)
  const [displayMessage,setdesplayMessage] = useState('')
  const [socketConnected,setSocketConnected] = useState(false)
  const [search,setSearch] = useState('')
  const navigate = useNavigate()
  useEffect(()=>{
   socket = io('http://localhost:8000')
   socket.emit("setup",id)
   socket.on('connection',()=>setSocketConnected(true))
  },[])
  useEffect( () => {
    socket.on('message recieved',(newMessageRecieved)=>{
    setSelectedChat([...selectedChat,newMessageRecieved])
    setMessageSent(!messageSent)
  })})

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
       setChat(data)
       }
       catch(err){
          console.error(err)}}
       GetData()
  .catch(console.error);}, [messageSent])
  const handleDrawerOpen = () => {
    setOpen(true);
    setSearch('')
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
 const selectChat = async ({chatId,userPic,userFname,userLname}) =>{
  setSelectedUser({Fname:userFname,LName:userLname,Photo:userPic})
  setSelectedChatId(chatId)
  setdesplayMessage('randomWord')
  selectedChatCompare = chatId
  try{
    setLoading(true)
    const responce = await axios.get(`/message/${chatId}`)
    const data = responce.data
    setSelectedChat(data)
    setTimeout(()=>{setLoading(false)},1200)
    socket.emit('join chat',chatId)
    }
    catch(err){
       console.error(err)}
 } 
 const selectFriend = async (userId,userPic,userFname,userLname) => {
  setSelectedUser({Fname:userFname,LName:userLname,Photo:userPic})
  try{
    setLoading(true)
    const responce = await axios.post(`/ChatRoom`,{ownerId:id,userId:userId})
    const data = responce.data
    if (!chat.find((c) => c._id === data._id)) setChat([data, ...chat])
    const res = await axios.get(`/message/${data._id}`)
    const newdata = res.data
    setSelectedChatId(data._id)
    setSelectedChat(newdata)
    setdesplayMessage('randomWord')
    setTimeout(()=>{setLoading(false)},1200)
    }
    catch(err){
       console.error(err)}
 }
 const sendMessage = async (e) =>{
     e.preventDefault();
     try {
       const res=  await axios.post(`/message`,{content:newMessage,chatId:selectedChatId,id:id})
       const responce = await axios.get(`/message/${selectedChatId}`)
       const data = responce.data
       socket.emit('new message',res.data)
       setSelectedChat(data)
       setMessageSent(!messageSent)
       setNewMessage('')
     }catch(err)
     {
      console.log(err)
     }
 }
 const handleChange = (e) =>{
  setNewMessage(e.target.value)
 }
 const disable = newMessage.length > 0
  return (
    <Main>
   {user.user.friends.length > 0 ?
    <Section >
        <Grid container  mt={1} spacing={1} >
           <Grid item xs={12}  sm={4}>
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
                  <Typography variant='subtitle2' >{t("Messaging")}</Typography>
                 </Head>
                 <Divider/>
                 <Box>
                  <List disablePadding >
                    {chat.map((info, index) => (
                      <Box  key={index} >
                        <ListItem  disablePadding>
                        <ListItemButton 
                        onClick={()=>selectChat({
                          chatId:info._id,
                          userPic:info.users[0]._id === id ?  info.users[1].profilePhoto:info.users[0].profilePhoto,
                          userFname:info.users[0]._id === id ?  info.users[1].FirstName:info.users[0].FirstName
                          ,userLname:info.users[0]._id === id ?  info.users[1].LastName:info.users[0].LastName})}>
                          <ListItemAvatar>
                            <ProfilePhoto src={`../../../Profile_Image/${info.users[0]._id === id ? info.users[1].profilePhoto?info.users[1].profilePhoto:'Avater.png':info.users[0].profilePhoto?info.users[0].profilePhoto:'Avater.png'}`}/>
                          </ListItemAvatar>
                          <ListItemText
                            primary={info.users[0]._id === id ? 
                              `${info.users[1].FirstName} ${info.users[1].LastName}`: 
                              `${info.users[0].FirstName} ${info.users[0].LastName}`}
                            secondary={<Typography sx={{ display: 'inline' }} component="span" variant="body2"      
                            color="text primary">
                              {info.latestMessage?.content.includes('.jpg')?'Image':
                              info.latestMessage?.content.includes('.pdf')?'File'
                              :info.latestMessage?.content}
                            </Typography>}/>
                        </ListItemButton>
                      </ListItem>
                      <Divider/>
                      </Box>
                    ))}
                  </List>
              </Box>
              </SideBar>
              <Slider variant="persistent" anchor="left" open={open} >
                <List disablePadding >
                 <ListItem disablePadding >
                  <Search onChange={(e)=>setSearch(e.target.value)} >
                   <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                   <StyledInputBase
                    value={search} placeholder={t("Search")} inputProps={{ 'aria-label': 'search' }}/>
                  </Search>
                 </ListItem>
                  {friends.filter(info=>{
                   return info.FirstName.toLowerCase().includes(search.toLowerCase())}).map((info, index) => (
                    <Box  key={index} >
                      <ListItem disablePadding>
                       <ListItemButton 
                         onClick={()=>selectFriend(info._id,info.profilePhoto,info.FirstName,info.LastName)}>
                        <ListItemAvatar>
                         <ProfilePhoto 
                           src={`../../../Profile_Image/${info.profilePhoto?info.profilePhoto:'Avater.png'}`}/>
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
           <Grid item sm={8} sx={{display:{xs:'none',sm:'block'}}} >
              { selectedChat && displayMessage.length > 0 ?
                loading?
                 <MessageBox>
                  <LinearProgress/>
                  <MessageHeader>
                    <Avatar
                      sx={{width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.1) 0px 6px 22px",}}
                      src={`../../../Profile_Image/${selectedUser.Photo?selectedUser.Photo:'Avater.png'}`}/>
                    <Typography variant='subtitle2'>{selectedUser.Fname} {selectedUser.LName}</Typography>
                 </MessageHeader>
                 </MessageBox>:
                <MessageBox >
                 <MessageHeader>
                  <Avatar
                    sx={{width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.1) 0px 6px 22px",}}
                    src={`../../../Profile_Image/${selectedUser.Photo?selectedUser.Photo:'Avater.png'}`}/>
                  <Typography  variant='subtitle2'>{selectedUser.Fname} {selectedUser.LName}</Typography>
                 </MessageHeader>
                <Divider/>
                <ChatBox>
                    {
                       selectedChat.length > 0 ?
                      <Messages Msg={selectedChat}/>
                      :
                      <EmptyChatBox>
                       <img  style={{height:'460px'}} src={`../../../Profile_Image/Message5.jpg`}/>
                      </EmptyChatBox>
                    }
                </ChatBox>
                <SendMessage>
                   <PostInput  fullWidth value={newMessage} placeholder={t("Type......")} 
                        onChange={handleChange}/>
                    <IconButton  component="label"  size='large' sx={{backgroundColor:'#E7EBF0'}}>
                       <PhotoOutlinedIcon />
                      <input hidden accept="image/*" multiple type="file" 
                      onChange={(e)=>setNewMessage(e.target.files[0].name)}/>
                  </IconButton>
                  <IconButton  component="label"  size='large' sx={{backgroundColor:'#E7EBF0'}}>
                       <AttachFileOutlinedIcon/>
                      <input hidden  multiple type="file" 
                      onChange={(e)=>setNewMessage(e.target.files[0].name)}/>
                  </IconButton>
                   <IconButton size='large' disabled={!disable} onClick={sendMessage}>
                      <SendIcon  color={disable?'primary':'disabled'}/>
                   </IconButton>
                </SendMessage>
              </MessageBox>:
              <StartChatBox>
                <img  style={{height:'460px'}} src={`../../../Profile_Image/Message${Math.floor(Math.random() *5) + 1}.jpg`}/>
                <Typography variant='subtitle2'>{t("SelectChat")}</Typography>
              </StartChatBox>
             }
           </Grid>
        </Grid>
      </Section>
      :
      <Section sx={{display:'flex',justifyContent:'center'}}>
         <NoFriendsBox>
          <Box 
             component='img'  
             sx={{height:{md:'500px',xs:'300px'},width:{xs:'50%',md:'60%'},borderRadius:'10px'}} 
             src={`../../../Profile_Image/Message6.jpg`} />
            <Typography  
              onClick={()=>navigate('/PersonalAccountProfile/PersonalNetwork')}>
              {t("MakeFriendsToChat")}
            </Typography>
          </NoFriendsBox>
      </Section>
      }
    </Main>
  )
}

export default PersonalAccountMessage
