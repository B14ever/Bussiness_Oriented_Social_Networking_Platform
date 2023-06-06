import React,{useEffect, useState} from 'react'
import {Box,Typography,Avatar,IconButton,TextField,Dialog,DialogContent,DialogActions,DialogTitle, Button, Divider,Backdrop,Snackbar,Alert,CircularProgress} from "@mui/material"
import { styled } from '@mui/material/styles';
import PhotoOutlinedIcon from '@mui/icons-material/PhotoOutlined';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
const DialogButton = styled(Button)(({ theme }) => ({
  flexGrow:1,
  backgroundColor:'#E7EBF0',
  textTransform:'none',
  justifyContent: "flex-start",
  padding:12,
  borderRadius:'2rem',
  color:'#555'
}))
const PostInput = styled(TextField)(({ theme }) => ({
  backgroundColor:'#E7EBF0',
  color:'#555',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
  },
}))
const Main = styled(Box)(({ theme }) => ({
  width:'70%',
  backgroundColor:'#fff',
  borderRadius:'6px',
  [theme.breakpoints.down('lg')]:{width: '100%'}
}))
const Section = styled(Box)(({ theme }) => ({
  display:'flex',alignItems:'center'
}))
const IconicBotton = styled(IconButton)(({ theme }) => ({
  boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",backgroundColor:'#E7EBF0',marginTop:'.5rem'
}))
const CreatePost = ({setState}) => {
  const {user} = useAthuContext()
  const FirstName = user.user.FirstName
  const LastName = user.user.LastName
  const FullName = FirstName.concat(" ", LastName)
  const {t} = useLanguage()
  const [open,setOpen] = useState(false)
  const [data,setData] = useState({authorId:user.user._id,authorName:FullName,authorPhoto:user.user. profilePhoto, authorType:'personal',content:' ',photo:' '})
  const [warnnig,setWaring] = useState(false)
  const [success,setSuccess] = useState(false)
  const [backdrop,setBackdropOpen] = useState(false)
  const handleOpen =()=>{
    setData({authorId:user.user._id,authorName:FullName,authorPhoto:user.user. profilePhoto, authorType:'personal',content:'',photo:''})
    setOpen(true)
  }
  const handleClose = () =>{
    
    setOpen(false)
  }
 
const handlePost = async ()=>{
  try{
  
    const responce = await axios.post('/posts',{data})
    if(responce.status === 200){
      setOpen(false)
      setSuccess(true)
      setState((prev)=>!prev)
    } 
  }catch(err){
    setWaring(true)
  }
}

  const Userphoto =`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`
  return (
    <Main p={1}>
       <Section>
         <IconButton sx={{marginRight:'1rem'}}>
            <Avatar  sx={{ width: 50, height:50}}   
              alt="U" 
              src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avaterpng'}`}/>
         </IconButton>
        <DialogButton onClick={handleOpen} textAlign='left' size='large'>{t("StartPost")}</DialogButton>
       </Section>
       <Dialog open={open} onClose={handleClose} fullWidth >
         <DialogTitle sx={{display:'flex',alignItems:'center',gap:'1rem'}}>
           <Avatar  sx={{ width: 50, height:50}}src={Userphoto} />
           <Typography sx={{color:'#000'}} variant='subtitle2'>
               {user.user.FirstName} {user.user.LastName}
           </Typography>
         </DialogTitle>
        <DialogContent>
          <Box >
            <PostInput  fullWidth placeholder={t("WhatToPost")} 
             onChange={(e)=>setData({ ...data ,content:e.target.value })} />
          </Box>
            { data.photo?
              <Box mt={2} sx={{display:'flex'}}>
                 <img src={`../../../Profile_Image/${data.photo}`} style={{width:'100%',height:'350px',objectFit: 'contain'}}/>
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
            <Button onClick={handlePost} variant="contained"  sx={{textTransform:'none', borderRadius:'2rem',}}>{t("Post")}</Button>
          </Box>
        </DialogActions>
       </Dialog>
       <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={warnnig} 
                 autoHideDuration={2000} onClose={()=>setWaring(false)}>
         <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
           {t("PostNotAdd")}
          </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={success} 
                  autoHideDuration={2000} onClose={()=>setSuccess(false)}>
          <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
            {t('PostAdd')}
          </Alert>
        </Snackbar>
    </Main>
  )
}

export default CreatePost
