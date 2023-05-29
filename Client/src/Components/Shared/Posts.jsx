import React,{useEffect,useState} from 'react'
import {Box,Card,CardActions,CardHeader,CardMedia,CardContent,Avatar,IconButton,Typography,LinearProgress, Divider} from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { red } from '@mui/material/colors';
import axios from '../../api/axios'
import { useLanguage } from '../../Localazation/LanguageContext';
const Posts = () => {
    const {t} = useLanguage()
    const [posts,setPosts] = useState([{authorId:'',content:'',photo:''}])
    const [loading,setLoading] = useState(false)
  useEffect(() => {
    const GetPosts = async ()=>{
    try{
    setLoading(true)
    const responce = await axios.get(`/posts`)
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
}, [])
const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toDateString();
};
  return (
    <Box mt={4} sx={{ width:{xs:'100%',lg:'70%'},backgroundColor:'#fff',borderRadius:'6px'}}>
      {
        loading?
       <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px'}}>
        <LinearProgress />
        <Typography  variant='subtitle2'>{t("PeopleYouMayKnow")}</Typography>
       </Box>:
         <Box>
         {
            posts.map((post,index)=>{
             return <Box key={index} sx={{display:'flex',flexDirection:'column'}}>
            <Card  elevation={0} sx={{ width:'100%',elevation:'0',}}>
             <CardHeader 
               avatar={<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>}
               title="Natnail Getachew"
               subheader={formatDate(post.createdAt)}/>
             <CardContent>
               <Typography variant="body2" color="text.secondary">{post.content}</Typography>
             </CardContent>
             { post.photo?
              <CardMedia component="img" height="auto" image={`../../../Profile_Image/${post.photo}`}/>:
              null
              }
              <CardActions >
               <IconButton aria-label="add to favorites">
                 <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                 <ShareIcon />
                 </IconButton>
              </CardActions>
             </Card>
             <Divider/>
             </Box>
            })
         }
        </Box>
      }
    </Box>
  )
}

export default Posts
