import React,{useState} from 'react'
import { Box,Typography,IconButton,Divider,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,Button,TextField,Snackbar,Alert} from '@mui/material/node'
import { InfoBox,Section_One} from './Css'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
const Mission = () => {
  const {user,dispatch} = useAthuContext()
  const Email = user.user.Email
  const {t} = useLanguage()
  const [open,setOpen] = useState(false)
  const [warnnig,setWaring] = useState(false)
  const [success,setSuccess] = useState(false)
  const [warnnigMsg,setWaringMsg] = useState('')
  const [successMsg,setSuccessMsg] = useState('')
  const [mission,setMission] = useState(user.user.mission)
  const handleVision = async ()=>{
    try{
      const responce = await axios.post('/Profile/vision',{Email,mission})
       if(responce.status === 200){
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setSuccessMsg('VisionUpdated')
        setSuccess(true)
        setOpen(false)
      } 
    }catch(err){
      setWaringMsg('VisionNotUpdated')
      setWaring(true)
    }
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };
  return (
     <InfoBox>
       <Box p={1} sx={{display:'flex',alignItems:'center'}}>
       <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("Mession")}</Typography>
        {
          user.user.mission?.length > 0 ?
          <IconButton sx={{marginLeft:'auto'}} onClick={handleClickOpen}>
             <EditIcon/>
          </IconButton>:
          <IconButton sx={{marginLeft:'auto'}} onClick={handleClickOpen}>
            <AddIcon/>
         </IconButton>
        }
       </Box>
       { 
        user.user.mission?.length > 0 ?
         <Box p={1}>
          <Typography sx={{color:'#555'}}>
          {
            user.user.mission
          }
        </Typography>
         </Box>:
         null
       }
       <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogContent>
          <TextField label={mission?.length === 0?t("MissionCompany"):t("MissionCompany")} onChange={(e)=>setMission(e.target.value)}
            multiline maxRows={8} autoFocus margin="dense" defaultValue={mission} fullWidth variant="standard"/>
        </DialogContent>
        <DialogActions>
          <Button sx={{textTransform:'none'}} onClick={handleClose}>{t("Cancel")}</Button>
          <Button sx={{textTransform:'none'}} onClick={handleVision}>{t("Save")}</Button>
         </DialogActions>
       </Dialog>
       <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
        open={warnnig} autoHideDuration={800} onClose={()=>setWaring(false)}>
          <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
          {t(`${warnnigMsg}`)}
          </Alert>
         </Snackbar>
          <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
          open={success} autoHideDuration={800} onClose={()=>setSuccess(false)}>
            <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
            {t(`${successMsg}`)}
            </Alert>
        </Snackbar>
     </InfoBox>
  )
}

export default Mission

