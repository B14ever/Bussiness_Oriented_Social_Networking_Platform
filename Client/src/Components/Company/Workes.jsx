import React,{useState} from 'react'
import { Box,Typography,IconButton,Divider,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,Button,TextField,Snackbar,Alert} from '@mui/material/node'
import { InfoBox,Section_One} from './Css'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import AddIcon from '@mui/icons-material/Add';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
const Workes = () => {
  const {user,dispatch} = useAthuContext()
  const Email = user.user.Email
  const {t} = useLanguage()
  const [open,setOpen] = useState(false)
  const [warnnig,setWaring] = useState(false)
  const [success,setSuccess] = useState(false)
  const [warnnigMsg,setWaringMsg] = useState('')
  const [successMsg,setSuccessMsg] = useState('')
  const [data,setData] = useState({title:'',describtion:''})
  const [workId,setWorkId] = useState('')
  const [alertOpen, setAlertOpen] = useState(false);
  const [limit,setLimit] = useState(1)
  const addWork = async ()=>{
    try{
      const responce = await axios.post('/Profile/addWorkes',{data,Email})
       if(responce.status === 200){
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setSuccessMsg('WorkAdd')
        setSuccess(true)
        setOpen(false)
      } 
    }catch(err){
      setWaringMsg('WorkNotAdd')
      setWaring(true)
    }
    }
    const RemoveWork = async ()=>{
      try{
        const responce = await axios.post('/Profile/removeWorkes',{workId,Email})
         if(responce.status === 200){
          localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
          dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
          setSuccessMsg('WorkRemoved')
          setSuccess(true)
          setAlertOpen(false)
        } 
      }catch(err){
        setWaringMsg('WorkNotRemoved')
        setWaring(true)
      }
      }
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({ ...data, [name]: value });
    };
    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const openAlert = (work_Id) => {
      setWorkId(work_Id)
      setAlertOpen(true);
    };
  
    const closeAlert = () => {
      setAlertOpen(false);
    };
    const disable = data.title.length > 0 && data.describtion.length > 0
  return (
     <InfoBox>
       <Box p={1} sx={{display:'flex',alignItems:'center'}}>
       <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("Workes")}</Typography>
          <IconButton sx={{marginLeft:'auto'}} onClick={handleClickOpen}>
            <AddIcon/>
         </IconButton>
       </Box>
       { 
        user.user.workes.length > 0 ?
         <Box p={1}>
          {
            user.user.workes.slice(0,limit).map((work,i)=>{
              return <Box key={work._id} sx={{display:'flex',flexDirection:'column'}}>
                  <Divider/>
                  <Box mt={1} sx={{display:"flex",alignItems:'center'}}>
                     <Typography variant='subtitle2'>{work.title}</Typography>
                     <IconButton sx={{marginLeft:'auto'}} onClick={()=>openAlert(work._id)}>
                       <RemoveCircleOutlineOutlinedIcon/>
                     </IconButton>
                  </Box>
                  <Box sx={{width:'100%'}}>
                    <Typography>{work.describtion}</Typography>
                  </Box>
                  </Box>
            })
          }
           <Divider textAlign='center'>
            {limit > 1 ?<KeyboardArrowUpOutlinedIcon onClick={()=>setLimit(prev=>prev-1)}/>:null}
          </Divider>
           <Box p={.5} sx={{display:'flex',justifyContent:'center'}}>

            {limit === user.user.workes.length ? null :
              <Button startIcon={<ExpandMoreOutlinedIcon/>} 
                  sx={{textTransform:'none'}} 
                  onClick={()=>setLimit(prev=> prev + 1)}>
                  { t('seeMore')}
              </Button>
            }
           </Box>
         </Box>
          :
         null
       }
       <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle variant='subtitle2'>{t("AddWorkes")}</DialogTitle>
        <DialogContent>
          <TextField label={t("WorkTitle")} name='title' onChange={handleChange} margin="dense"  fullWidth variant="outlined"/>
          <TextField label={t("Description")} name="describtion" onChange={handleChange}
          multiline maxRows={8} autoFocus margin="dense"  fullWidth variant="outlined"/>
        </DialogContent>
        <DialogActions>
          <Button sx={{textTransform:'none'}} onClick={handleClose}>{t("Cancel")}</Button>
          <Button sx={{textTransform:'none'}} disabled={!disable} onClick={addWork}>{t("Add")}</Button>
         </DialogActions>
       </Dialog>
       <Dialog open={alertOpen} onClose={closeAlert}  fullWidth
           aria-labelledby="alert-dialog-title"   aria-describedby="alert-dialog-description">
         <DialogTitle textAlign='center' id="alert-dialog-title">{t("DeleteWork")}</DialogTitle>
         <DialogContent>
           <DialogContentText id="alert-dialog-description">{t("SureDeleteWork")}</DialogContentText>
         </DialogContent>
         <DialogActions>
          <Button onClick={closeAlert}>{t("Cancle")}</Button>
          <Button onClick={RemoveWork}>{t("Delete")}</Button>
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

export default Workes
