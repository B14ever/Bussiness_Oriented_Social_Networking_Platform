import React,{useEffect,useState} from 'react'
import {Box,Card,CardActions,CardHeader,CardMedia,CardContent,Avatar,IconButton,Typography,LinearProgress, Divider,Tooltip,Snackbar,Alert,Dialog,DialogContent,DialogActions,DialogTitle,DialogContentText,Button} from "@mui/material"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { styled, useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { red } from '@mui/material/colors';
import axios from '../../api/axios'
import { useLanguage } from '../../Localazation/LanguageContext';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
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
  width:'50%',
  [theme.breakpoints.down('sm')]: {width: '100%'},
  [theme.breakpoints.down('md')]: {width: '85%'},
  [theme.breakpoints.down('lg')]: {width: '80%'},
}));
const ReportDashborde = () => {
  const navigate = useNavigate()
  const {t} = useLanguage()
  const [posts,setPosts] = useState([{authorId:'',authorName:'',authorPhoto:'',authorType:'',content:'', photo:'',like:''}])
  const [loading,setLoading] = useState(false)
  const [action,setAction] = useState(false)
  const [warnnig,setWaring] = useState(false)
  const [warnnigMsg,setWaringMsg] = useState('')
  const [deleteOpen,setDeleteOpen] = useState(false)
  const [post,setPost] = useState({})
useEffect(() => {
  const GetPosts = async ()=>{
  try{
  setLoading(true)
  const responce = await axios.get(`/usersPosts/report`)
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
     }, [action])
const formatDate = (date) => {
const newDate = new Date(date);
return newDate.toDateString();
     };
     const handleDeleteOpen = (post) => {
      setPost(post)
      setDeleteOpen(true);
    };
    const handleDeleteClose = () => {
      setDeleteOpen(false);
    };
  const handleDelte = async (e)=>{
      e.preventDefault();
            try{
              await axios.post('/usersPosts/delete',post)
              setDeleteOpen(false)
              setAction(!action)
            }
            catch(err){
              setWaring(true)
              setWaringMsg('PostNotDeleted')
            }
    }
const handelNaivgate = async (post) =>{
      const authorId  = post.authorId
        if(post.authorType === 'company'){
          navigate(`/ComapnyAccountProfile/pages/${authorId}`)
        }
        if(post.authorType === 'personal'){
          navigate(`/ComapnyAccountProfile/profile/followers/${authorId}`)
        }
}

return (
  <Main>
    {
      loading?
     <Section p={1}>
      <LinearProgress />
      <Typography  variant='subtitle2'>{t("ReportedPosts")}</Typography>
     </Section>:
       <Section>
        <Box sx={{backgroundColor:"#E7EBF0"}}>
           <Tooltip title={t('Back')}>
             <IconButton onClick={()=>{navigate(-1)}}>
               <KeyboardBackspaceIcon/>
             </IconButton>
           </Tooltip>
       </Box>
       {
        posts.length > 0 ?
       <Box>
        <Box pt={1} pb={1} pr={2} pl={2} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Typography variant='subtitle2'>{t("ReportedPosts")}</Typography>
        </Box>
        <Divider/>
       {
          posts.map((post,i)=>{
           return <Box key={i} sx={{display:'flex',flexDirection:'column'}}>
          <Card  elevation={0} sx={{ width:'100%',elevation:'0',}}>
          <Box sx={{display:'flex',alignItems:'center'}} p={0}>
           <CardHeader 
             avatar={<Avatar sx={{cursor:'pointer', bgcolor: red[500] }} aria-label="recipe"
             src={`../../../Profile_Image/${post.authorPhoto?post.authorPhoto:'Avater.png'}`}
             onClick={()=>handelNaivgate(post)}/>}
             title={post.authorName}
             subheader={formatDate(post.createdAt)}/>
            <IconButton onClick={()=>handleDeleteOpen(post)} sx={{marginLeft:'auto'}} >
              <HighlightOffIcon/>
            </IconButton>
            </Box>
           <CardContent>
             <Typography variant="body2" color="text.secondary">{post.content}</Typography>
           </CardContent>
           { post.photo?
            <CardMedia component="img" style={{ objectFit: 'contain' }} height="250"  image={`../../../Profile_Image/${post.photo}`}/>:
            null
            }
            <Stack direction="row" p={1} spacing={1}>
                { post.report?.map((report,i)=><Chip key={i} label={t(`${report}`)}/>
                )}
             </Stack>
           </Card>
           <Box p={1} sx={{backgroundColor:'#E7EBF0'}} ></Box>
           </Box>
          })
       }
       </Box>:
      <Box 
      sx={{height:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
      <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/EmptyReport.jpg`}/>
      <Typography variant='subtitle2'>{t("EmptyReport")}</Typography>
    </Box>
       }
      <Dialog fullWidth open={deleteOpen} onClose={handleDeleteClose}>
          <DialogTitle variant='subtitle2' id="alert-dialog-title">{t('DeletePost')}</DialogTitle>
          <DialogContent >
            <DialogContentText textAlign='center'>
              {t('DeletePostWarnnigs')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button  sx={{textTransform:'none'}} onClick={handleDeleteClose}>{t('Cancle')}</Button>
            <Button  sx={{textTransform:'none'}} onClick={handleDelte} autoFocus >{t('Delete')}</Button>
          </DialogActions>
       </Dialog>
      <Snackbar open={warnnig} anchorOrigin={{ vertical:'top', horizontal:'center'}} 
          autoHideDuration={1000} onClose={()=>setWaring(false)}>
        <Alert 
        onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
        {t(`${warnnigMsg}`)}
        </Alert>
      </Snackbar>
      </Section>
    }
  </Main>
)
}

export default ReportDashborde
