import React,{useEffect,useState} from 'react'
import {Box,Card,CardActions,CardHeader,CardMedia,CardContent,Avatar,IconButton,Typography,LinearProgress, Divider,Tooltip,} from "@mui/material"
import { styled, useTheme } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import { red } from '@mui/material/colors';
import axios from '../../api/axios'
import { useLanguage } from '../../Localazation/LanguageContext';
import { useNavigate } from 'react-router-dom';
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
const PostsDashboarde = () => {
  const navigate = useNavigate()
  const {t} = useLanguage()
  const [posts,setPosts] = useState([{authorId:'',authorName:'',authorPhoto:'',authorType:'',content:'', photo:'',like:''}])
  const [loading,setLoading] = useState(false)
   
useEffect(() => {
  const GetPosts = async ()=>{
  try{
  setLoading(true)
  const responce = await axios.get(`/usersPosts`)
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
     }, [])
const formatDate = (date) => {
const newDate = new Date(date);
return newDate.toDateString();
     };

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
      <Typography  variant='subtitle2'>{t("Posts")}</Typography>
     </Section>:
       <Section>
        <Box pt={1} pb={1} pr={2} pl={2} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Typography variant='subtitle2'>{t("Posts")}</Typography>
          <Tooltip title={t('Reports')}>
            <IconButton onClick={()=>{navigate('reports')}} sx={{marginLeft:'auto'}}>
               <FlagIcon color='error'/>
            </IconButton>
          </Tooltip>
        </Box>
        <Divider/>
       {
          posts.map((post,i)=>{
           return <Box key={i} sx={{display:'flex',flexDirection:'column'}}>
          <Card  elevation={0} sx={{ width:'100%',elevation:'0',}}>
           <CardHeader 
             avatar={<Avatar sx={{cursor:'pointer', bgcolor: red[500] }} aria-label="recipe"
             src={`../../../Profile_Image/${post.authorPhoto?post.authorPhoto:'Avater.png'}`}
             onClick={()=>handelNaivgate(post)}/>}
             title={post.authorName}
             subheader={formatDate(post.createdAt)}/>
           <CardContent>
             <Typography variant="body2" color="text.secondary">{post.content}</Typography>
           </CardContent>
           { post.photo?
            <CardMedia component="img" style={{ objectFit: 'contain' }} height="250" image={`../../../Profile_Image/${post.photo}`}/>:
            null
            }
            <CardActions sx={{display:'flex',alignItems:'center'}} >
              <Typography variant='subtitle1' ml={2}>{post.like.length >  0 ? post.like.length : null}</Typography>
            <IconButton aria-label="add to favorites">
               <FavoriteIcon color={post.like?.length>0?'primary':''}/>
            </IconButton>
            </CardActions>
           </Card>
           <Box p={1} sx={{backgroundColor:'#E7EBF0'}} ></Box>
           </Box>
          })
       }
      </Section>
    }
  </Main>
)
}

export default PostsDashboarde
