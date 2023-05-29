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
const CreatePost = () => {
  const {user} = useAthuContext()
  const {t} = useLanguage()
  const [open,setOpen] = useState(false)
  const [data,setData] = useState({content:'',photo:''})
  const [warnnig,setWaring] = useState(false)
  const [success,setSuccess] = useState(false)
  const [backdrop,setBackdropOpen] = useState(false)
  const handleOpen =()=>{
    setData({content:'',photo:''})
    setOpen(true)
  }
  const handleClose = () =>{
    setData({content:'',photo:''})
    setOpen(false)
  }
  const handleBackdropClose = () => {
    setBackdropOpen(false);
  };
const handlePost = async ()=>{
  try{
    setBackdropOpen(true)
    const responce = await axios.post('/posts',{authorId:user.user._id,content:data.content,photo:data.photo})
    .then(setTimeout(()=>{ setBackdropOpen(false)},1000)) 
    if(responce.status === 200){
      setOpen(false)
      setSuccess(true)
    } 
  }catch(err){
    setWaring(true)
  }
}
  const Userphoto =`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`
  return (
    <Box p sx={{ width:{xs:'100%',lg:'70%'},backgroundColor:'#fff',borderRadius:'6px'}}>
       <Box sx={{display:'flex',alignItems:'center'}}>
         <IconButton  sx={{marginRight:'1rem'}}  >
            <Avatar  sx={{ width: 50, height:50}}   alt="Remy Sharp" src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`} />
         </IconButton>
        <DialogButton onClick={handleOpen} textAlign='left' size='large'>{t("StartPost")}</DialogButton>
       </Box>
       <Dialog open={open} onClose={handleClose} fullWidth >
         <DialogTitle sx={{display:'flex',alignItems:'center',gap:'1rem'}}>
           <Avatar  sx={{ width: 50, height:50}}src={Userphoto} />
           <Typography sx={{color:'#000'}} variant='subtitle2'>{user.user.FirstName} {user.user.LastName}</Typography>
        </DialogTitle>
        <DialogContent>
          <Box >
            <PostInput  fullWidth placeholder={t("WhatToPost")} onChange={(e)=>setData({...data,content:e.target.value})} />
          </Box>
            {
              data.photo?
              <Box mt={2} sx={{display:'flex'}}>
                 <img src={`../../../Profile_Image/${data.photo}`} style={{width:'100%',height:'auto'}}/>
              </Box>:null
            }
          <Box>
            <IconButton  component="label"  size='large' 
              sx={{boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",backgroundColor:'#E7EBF0',marginTop:'.5rem'}}>
              <PhotoOutlinedIcon />
              <input hidden accept="image/*" multiple type="file" onChange={(e)=>setData({...data,photo:e.target.files[0].name})}/>
            </IconButton>
          </Box>
        </DialogContent>
        <Divider/>
        <DialogActions>
          <Box p={2}>
            <Button onClick={handlePost} variant="contained"  sx={{textTransform:'none', borderRadius:'2rem',}}>{t("Post")}</Button>
          </Box>
        </DialogActions>
       </Dialog>
       <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={backdrop}
            onClick={handleBackdropClose}
          >
            <CircularProgress color="inherit" />
               </Backdrop>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={warnnig} autoHideDuration={2000} onClose={()=>setWaring(false)}>
                      <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                      {t("PostNotAdd")}
                      </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={success} autoHideDuration={2000} onClose={()=>setSuccess(false)}>
                      <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                        {t('PostAdd')}
                      </Alert>
                </Snackbar>

    </Box>
  )
}

export default CreatePost
