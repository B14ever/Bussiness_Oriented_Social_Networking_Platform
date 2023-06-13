import React,{useEffect,useState} from 'react'
import {Box,Card,CardActions,CardHeader,CardMedia,CardContent,Avatar,IconButton,Typography,LinearProgress, Divider,Button,Dialog,DialogActions,DialogContentText,DialogContent,DialogTitle,Chip,Stack,CircularProgress,Backdrop} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import { red } from '@mui/material/colors';
import axios from '../../api/axios'
 import {useAthuContext} from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext';
import { useNavigate } from 'react-router-dom';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import jwtDecode from "jwt-decode";
const Posts = ({state}) => {
    const {user} = useAthuContext()
    const id = user.user._id
    const token = user.token
    const decodedToken = jwtDecode(token);
    const navigate = useNavigate()
    const {t} = useLanguage()
    const [posts,setPosts] = useState([{authorId:'',authorName:'',authorPhoto:'',authorType:'',content:'', photo:'',like:''}])
    const [loading,setLoading] = useState(false)
    const [backdrop,setBackDrop] = useState(false)
    const [report,setReport] = useState('')
    const [reportID,setReportID] = useState('')
    const [check,setCheck] = useState(0)
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (postId) => {
      setOpen(true);
      setReportID(postId)
      setCheck(0)
    };
    const handleClose = () => {
      setOpen(false);
    };
  useEffect(() => {
    const GetPosts = async ()=>{
    try{
    setLoading(true)
    const responce = await axios.get(`/posts`)
    const data = responce.data.posts
    setPosts(data)
    setTimeout(()=>{setLoading(false)},1200)
    }
    catch(err){
        console.error(err)
    }
}
   GetPosts()
    .catch(console.error);
       }, [state])
  const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toDateString();
       };
  const handleLike = async (postID) =>{
    try{
      const responce =  await axios.post(`/posts/likePosts/${postID}`,{id})
      const data = responce.data.posts
      setPosts(data)
    }
    catch(err){
      setWaring(true)
      setWaringMsg('PostNotLiked')
    }
  }
  const  handleUnLike  = async (postID) =>{
    try{
      const responce = await axios.post(`/posts/unlikePosts/${postID}`,{id})
      const data = responce.data.posts
      setPosts(data)
    }
    catch(err){
      setWaring(true)
      setWaringMsg('PostNotUnLiked')
    }
  }
  const handelNaivgate = async (post) =>{
        const authorId  = post.authorId
        if(decodedToken.role === 'company')
        {
          if(authorId === user.user._id){
            return  navigate(`/ComapnyAccountProfile/profile`)
           }
          if(post.authorType === 'company'){
            navigate(`/ComapnyAccountProfile/pages/${authorId}`)
          }
          if(post.authorType === 'personal'){
            navigate(`/ComapnyAccountProfile/profile/followers/${authorId}`)
          }
        }
        if(decodedToken.role === 'personal')
        {
          if(authorId === user.user._id){
           return  navigate(`/PersonalAccountProfile/PersonalProfileDetail`)
          }
          if(post.authorType === 'company'){
            navigate(`/PersonalAccountProfile/PersonalNetwork/pages/${authorId}`)
          }
          if(post.authorType === 'personal'){
            navigate(`/PersonalAccountProfile/PersonalNetwork/${authorId}`)
          }
        }
  }
  const handleClick = (i,word) =>{
    setCheck(i)
    setReport(word)
  }
  const hadleUnCLick = () =>{
    setCheck(0)
    setReport('')
  }
  const handleReport = async () =>{
    try{
      setBackDrop(true)
      await axios.post(`/posts/report/${reportID}`,{report})
      setOpen(false)
      setTimeout(()=>{setBackDrop(false)},700)   
    }
    catch(err){
      setWaring(true)
      setWaringMsg('NotReported')
      setBackDrop(false)
    }
  }
  const disable = report.length === 0 ? true : false
  return (
    <Box mt={4} sx={{ width:{xs:'100%',lg:'70%'},backgroundColor:'#fff',borderRadius:'6px'}}>
      {
        loading?
       <Box p={1} sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px'}}>
        <LinearProgress />
        <Typography  variant='subtitle2'>{t("Posts")}</Typography>
       </Box>:
         <Box>
         {
            posts.map((post,i)=>{
             return <Box key={i} sx={{display:'flex',flexDirection:'column'}}>
            <Card  elevation={0} sx={{ width:'100%',elevation:'0',}}>
             <CardHeader 
               avatar={<Avatar sx={{cursor:'pointer', bgcolor: red[500] }} aria-label="recipe"
               src={`../../../Profile_Image/${post.authorPhoto?post.authorPhoto:'Avater.png'}`}
               onClick={()=>handelNaivgate(post)}/>}
               title={post.authorName}
               subheader={formatDate(post.createdAt)}
               action={<Button sx={{textTransform:'none'}} onClick={()=>handleClickOpen(post._id)}
                startIcon={<FlagIcon/>}>{t("Report")}</Button>}/>
             <CardContent>
               <Typography variant="body2" color="text.secondary">{post.content}</Typography>
             </CardContent>
             { post.photo?
              <CardMedia component="img" style={{ objectFit: 'contain' }} height="300" image={`../../../Profile_Image/${post.photo}`}/>:
              null
              }
              <CardActions sx={{display:'flex',alignItems:'center'}} >
                <Typography variant='subtitle1' ml={2}>{post.like.length >  0 ? post.like.length : null}</Typography>
               {
                post.like.includes(id) ?
                <IconButton aria-label="add to favorites" onClick={()=>handleUnLike(post._id,i)}>
                <FavoriteIcon color={post.like?.length > 0 ? 'primary':''}/>
               </IconButton>:
                <IconButton aria-label="add to favorites" onClick={()=>handleLike(post._id,i)}>
                 <FavoriteIcon color={post.like?.length>0?'primary':''}/>
               </IconButton>
               }
              </CardActions>
             </Card>
             <Box p={1} sx={{backgroundColor:'#E7EBF0'}} ></Box>
             </Box>
            })
         }
        </Box>
      }
     <Dialog open={open} onClose={handleClose} fullWidth maxWidth={'sm'}>
        <DialogTitle  id="alert-dialog-title">
          {t("Reportthispost")}
        </DialogTitle>
        <Divider/>
        <DialogContent display>
          <DialogContentText mb={1}>
          {t('SelectReasone')}
          </DialogContentText>
         <Stack spacing={2}>
          <Stack  direction="row" spacing={1}>
            <Chip onClick={()=>handleClick(1,'Harassment')}  label={t("Harassment" )}color={check === 1 ?'success':'default'} onDelete={hadleUnCLick} deleteIcon={check !== 1 ?<DoneIcon/> :<ClearIcon/>}/>
            <Chip onClick={()=>handleClick(2,'Scam')}  label={t("Scam")}  color={check === 2 ?'success':'default'}
                  onDelete={hadleUnCLick} deleteIcon={check !== 2 ?<DoneIcon/> :<ClearIcon/>}/>
            <Chip onClick={()=>handleClick(3,'Spam')} label={t("Spam")} color={check === 3 ?'success':'default'}     onDelete={hadleUnCLick} deleteIcon={check !== 3 ?<DoneIcon/> :<ClearIcon/>}/>
            <Chip onClick={()=>handleClick(4,'Misinformation')} label={t("Misinformation")} color={check === 4 ?'success':'default'}  onDelete={hadleUnCLick} deleteIcon={check !== 4 ?<DoneIcon/> :<ClearIcon/>}/>
            <Chip  onClick={()=>handleClick(8,'Illegal goods and services')} label={t("illegalGoods")} color={check ===  8 ?'success':'default'}  onDelete={hadleUnCLick} deleteIcon={check !== 5 ?<DoneIcon/> :<ClearIcon/>} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Chip onClick={()=>handleClick(5,'Hacked Account')} label={t("HackedAccount")} color={check === 5 ?'success':'default'}  onDelete={hadleUnCLick} deleteIcon={check !== 6 ?<DoneIcon/> :<ClearIcon/>}/>
            <Chip onClick={()=>handleClick(6,'Hacked Account')} label={t("TreatOrViolence")} color={check === 6 ?'success':'default'}  onDelete={hadleUnCLick} deleteIcon={check !== 7 ?<DoneIcon/> :<ClearIcon/>} />
            <Chip onClick={()=>handleClick(7,'Fake Account')} label={t("FakeAccount")} color={check === 7 ?'success':'default'}  onDelete={hadleUnCLick} deleteIcon={check !== 8 ?<DoneIcon/> :<ClearIcon/>}/>
          </Stack>
         </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{textTransform:'none'}}>{t('Cancle')}</Button>
          <Button onClick={handleReport} variant="contained" disabled={disable} sx={{textTransform:'none',borderRadius:'10px'}}autoFocus>
            {t('Report')}</Button>
        </DialogActions>
      </Dialog>
      <Backdrop sx={{color:'#fff',zIndex: (theme) => theme.zIndex.drawer + 1 }} open={backdrop} 
                onClick={()=>setBackDrop(false)}>
           <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}

export default Posts
