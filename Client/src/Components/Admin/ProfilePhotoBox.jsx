import React,{useState} from 'react'
import { Avatar,Box,Button,Typography,Dialog,DialogActions,DialogTitle,DialogContent,DialogContentText,Divider,Badge} from '@mui/material'
import {useLanguage} from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import axios from '../../api/axios'
const ProfilePhotoBox = () => {
    const {t} = useLanguage()
    const {user,dispatch} = useAthuContext()
    const Email = user.user.Email
    const [open, setOpen] = useState(false);
    const [data,setData] = useState({profilePhoto:''})
    const handleClickOpen = () => {
        setOpen(true);
      };
    const handleClose = () => {
        setData('')
        setOpen(false);
      };
     const changePhoto = async (e)=>{
      e.preventDefault();
       try{
        const responce = await axios.post('/admins/ChangePhoto',{data,Email})
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setTimeout(handleClose,500)
      }
         catch(err){
         console.log(err)
         }
      }
  return (
     <React.Fragment>
    <Box sx={{ position: 'relative'}}>
      <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%', height: 'auto',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
        <Avatar src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`}
         sx={{ width: { xs: 110, sm: 130, md: 150, lg: 190 }, 
               height: { xs: 110, sm: 130, md: 150, lg: 190 },
               position: 'absolute',
               top: {lg:'calc(100% - 130px)',sm:'calc(100% - 85px)',xs:'calc(100% - 70px)'},
               left: {xs:'calc(19% - 60px)',sm:'calc(19% - 80px)',md:'calc(19% - 100px)',lg:'calc(13% - 100px)'}
                  }}
               onClick={handleClickOpen}/>
    </Box>
    <Dialog open={open} onClose={handleClose} fullWidth >
      <DialogTitle>{t("Addphoto")}</DialogTitle>
      <Divider></Divider>
      <Box component="form" onSubmit={changePhoto} >
        {data.profilePhoto?<Box mt={1} mb={1} sx={{display:'flex',gap:'.5rem',flexDirection:'column',alignItems:'center'}}>
            <Avatar src={`../../../Profile_Image/${data.profilePhoto}`} 
               sx={{ width:190, height:190, borderRadius: '50%'}} />
            <Button sx={{textTransform:'none'}} variant='outlined' type='submit' >{t("save")}</Button>
          </Box>:<DialogContent>
            <Box  
            sx={{width:'100%',display:"flex",justifyContent:'center',alignItems:'center',gap:'1rem'}}>
                
                  <Avatar 
                        src={`../../../Profile_Image/${user.user.profilePhoto?user.user.profilePhoto:'Avater.png'}`}
                        sx={{ width: { xs: 110, sm: 130, md: 150, lg: 190 }, 
                        height: { xs: 110, sm: 130, md: 150, lg: 190 },}}/>         
            </Box>
        </DialogContent>}
        <Divider></Divider>
        <DialogActions >
          <Button sx={{textTransform:'none'}} onClick={handleClose}>{t("Cancel")}</Button>
          <Button sx={{textTransform:'none'}} variant='contained' component="label">
            {data.profilePhoto || user.user.profilePhoto ?t("changePhoto"):t("uploadPhoto")}
            <input hidden accept="image/*" multiple type="file" onChange={(e)=>setData({profilePhoto:e.target.files[0].name})}/>
         </Button>
        </DialogActions>
        </Box>
    </Dialog>
     </React.Fragment>
  )
}

export default ProfilePhotoBox
