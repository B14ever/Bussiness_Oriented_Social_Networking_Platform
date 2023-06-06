import React,{useEffect,useState} from 'react'
import {Box,Card,CardActions,CardHeader,CardMedia,CardContent,Avatar,IconButton,Typography,LinearProgress, Divider,Dialog,DialogContent,DialogActions,DialogTitle, Button,TextField,Snackbar,Alert,DialogContentText } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { red } from '@mui/material/colors';
import axios from '../../api/axios'
import {useAthuContext} from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext';
import { Post_Section,Main_One } from '../../Components/Company/Css'
import { styled } from '@mui/material/styles';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
const PostInput = styled(TextField)(({ theme }) => ({
  backgroundColor:'#E7EBF0',
  color:'#555',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
}))
const IconicBotton = styled(IconButton)(({ theme }) => ({
  boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",backgroundColor:'#E7EBF0',marginTop:'.5rem'
}))
const MyPosts = () => {
    const {user} = useAthuContext()
    const userId = user.user._id
    const {t} = useLanguage()
    const [posts,setPosts] = useState([{authorId:'',authorName:'',authorPhoto:'',authorType:'',content:'', photo:'',like:''}])
    const [data,setData] = useState({content:'',photo:''})
    const [loading,setLoading] = useState(false)
    const [editOpen,setEditOpen] = useState(false)
    const [deleteOpen,setDeleteOpen] = useState(false)
    const [postID,setPostID] = useState('')
    const [action,setAction] = useState(false)
    const [warnnig,setWaring] = useState(false)
    const [warnnigMsg,setWaringMsg] = useState('')
    const handleEditOpen = (post) => {
      setEditOpen(true);
      setData({content:post.content,photo:post.photo})
      setPostID(post._id)
    };
    const handleEditClose = () => {
      setEditOpen(false);
    };
    const handleDeleteOpen = (postId) => {
      setPostID(postId)
      setDeleteOpen(true);
    };
    const handleDeleteClose = () => {
      setDeleteOpen(false);
    };
  useEffect(() => {
    const GetPosts = async ()=>{
    try{
    setLoading(true)
    const responce = await axios.get(`/posts/${userId}`)
    const data = responce.data.posts
    setPosts(data)
    console.log(data)
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
    const handleEdit = async (e) =>{
      e.preventDefault();
      try{
        await axios.post(`/posts/editPosts/${postID}`,{data})
        setEditOpen(false)
        setAction(!action)
      }
      catch(err){
        setWaring(true)
        setWaringMsg('PostNotEdited')
      }
    }
    const handleDelte = async (e)=>{
      e.preventDefault();
            try{
              await axios.post('/posts/deletePosts',{postId:postID})
              setDeleteOpen(false)
              setAction(!action)
            }
            catch(err){
              setWaring(true)
              setWaringMsg('PostNotDeleted')
            }
    }
       return (
        <Main_One>
          <Box>
          {
            loading?
           <Post_Section pl={1}>
            <LinearProgress />
            <Typography  variant='subtitle2'>{t("YourPost")}</Typography>
           </Post_Section>:posts.length > 0 ?
           <Post_Section>
           {
              posts.map((post,index)=>{
               return <Box key={index} sx={{display:'flex',flexDirection:'column'}}>
              <Card  elevation={0} sx={{ width:'100%',elevation:'0',}}>
               <Box sx={{display:'flex',alignItems:'center'}} p={0}>
               <CardHeader 
                 avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                 src={`../../../Profile_Image/${post.authorPhoto?post.authorPhoto:'Avater.png'}`}
                 />}
                 title={post.authorName}
                 sx={{cursor:'pointer','&:hover': {textDecoration: 'underline'}}}
                 onClick={()=>handelNaivgate(post)}
                 subheader={formatDate(post.createdAt)}/>
                 <IconButton sx={{marginLeft:'auto'}} onClick={()=>handleEditOpen(post)}>
                   <EditOutlinedIcon/>
                 </IconButton>
                 <IconButton sx={{marginRight:'1rem'}} onClick={()=>handleDeleteOpen(post._id)}>
                    <RemoveCircleOutlineOutlinedIcon/>
                 </IconButton>
               </Box>
               <CardContent>
                 <Typography variant="body2" color="text.secondary">{post.content}</Typography>
               </CardContent>
               { post.photo?
                <CardMedia component="img" style={{ objectFit: 'contain' }} height="300" image={`../../../Profile_Image/${post.photo}`}/>:
                null
                }
                <CardActions sx={{display:'flex',alignItems:'center'}} >
                  <Typography variant='subtitle1' ml={2}>{post.like >  0 ? post.like : null}</Typography>
                 <IconButton aria-label="add to favorites" onClick={()=>handleLike(post.id)}>
                  <FavoriteIcon color={post.like?.length>0?'primary':''}/>
                 </IconButton>
                </CardActions>
               </Card>
               <Box p={1} sx={{backgroundColor:'#E7EBF0'}} ></Box>
               </Box>
              })
           }
          </Post_Section>:
          <Post_Section pb={1} sx={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
            <Box 
             component='img'  
             sx={{height:{md:'500px',xs:'300px'},width:{xs:'50%',md:'60%'},borderRadius:'10px'}} 
             src={`../../../Profile_Image/EmpytPost.jpg`} />
            <Typography variant='subtitle2'>{t("EmptyPost")}</Typography>
          </Post_Section>   
          }
        </Box>
        <Dialog open={editOpen} onClose={handleEditClose} fullWidth maxWidth={'md'} >
         <DialogTitle sx={{display:'flex',alignItems:'center',gap:'1rem'}}>
           <Avatar  sx={{ width: 50, height:50}} src={`../../../Profile_Image/${user.user.logo}`}  />
           <Typography sx={{color:'#000'}} variant='subtitle2'>
               {user.user.companyName}
           </Typography>
         </DialogTitle>
        <DialogContent>
          <Box >
            <PostInput defaultValue={data.content}
              multiline rows={4} fullWidth onChange={(e)=>setData({ ...data ,content:e.target.value })} />
          </Box>
            { data.photo?
              <Box mt={2} sx={{display:'flex'}}>
                 <img src={`../../../Profile_Image/${data.photo}`} style={{width:'100%',height:'200px',objectFit: 'contain'}}/>
              </Box>:null}
          <Box>
            <IconicBotton  component="label"  size='large' >
              <PhotoOutlinedIcon/>
              <input hidden accept="image/*" multiple type="file"
                onChange={(e)=>setData({ ...data , photo:e.target.files[0].name })}/>
            </IconicBotton>
          </Box>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Box p={2}>
            <Button  variant="contained" onClick={handleEdit}  sx={{textTransform:'none', borderRadius:'2rem',}}>{t("Edit")}</Button>
          </Box>
        </DialogActions>
        </Dialog>
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
        </Main_One>
      )
}

export default MyPosts
