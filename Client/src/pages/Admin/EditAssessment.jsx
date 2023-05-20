import React, { useEffect,useState} from 'react'
import { Box,Typography,LinearProgress,Alert,Snackbar,Backdrop,CircularProgress,IconButton,Dialog, DialogTitle, DialogContent,DialogContentText,DialogActions,Button} from '@mui/material/node'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { useSkillAssesmentContext } from '../../Context/Admin/SkillAssesmentContext'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
const EditAssessment = () => {
    const navigate = useNavigate()
    const {t} = useLanguage()
  const {assesments,dispatch} = useSkillAssesmentContext()
  const [open, setOpen] = useState(false);
  const [warnnig,setWaring] = useState(false)
  const [success,setSuccess] = useState(false)
  const [deleteId,setDeleteId] = useState()
  const [deleteDialog,setDeleteDialog] = useState(false)
  useEffect(() => {
       const GetData = async ()=>{
        try{
          dispatch({ type: 'ASSESSMENT_LODNING'})
          const responce = await axios.get('/skillAssessment')
          const data = responce.data.Assessment
          setTimeout(()=>{dispatch({ type: 'GET_ASSESSMENT',payload:data})} ,1000)
        }
        catch(err){
            console.error(err)
        }
    }
    GetData()
  .catch(console.error);
  }, []);
  const handleNavigate = (typeOfStudy) =>{
    localStorage.setItem('PROGRAM_TYPE',typeOfStudy)
    navigate('editQuestion')
  }
  const OpenDeleteDialog = (id) =>{
    setDeleteId(id)
    setDeleteDialog(true)
  }
  const closeDeleteDialog = () =>{
    setDeleteDialog(false)
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {
        setOpen(true)
        const responce = await axios.post('/skillAssessment/deleteAssessment',{deleteId})
        .then(setDeleteDialog(false))
        .then(setTimeout(()=>{setOpen(false)},1000)) 
        const data = responce.data.Assessment
        setTimeout(()=>{dispatch({ type: 'GET_ASSESSMENT',payload:data})} ,1000)
        if(responce.status === 200){
           setTimeout(()=>{ setSuccess(true)},1000)  
        }
    } catch (error) {
        if (!err?.response) {
            setErrorMsg('Failde');
          } else if (err.response?.status === 403) {
            setErrorMsg('Delete failde');
          } 
    }
    }
  return (
    <Box  sx={{marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
      
      {
         assesments.loading?
         <Box p={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
         height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
         <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Typography variant='subtitle2'>{t("EditAssessment")}</Typography>
         </Box>
        </Box>:<Box sx={{display:'flex',flexDirection:'column',width:{xs:'90%',lg:'80%'}}}>
            <Box p={1} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
                  height: 'fit-content',}}>
              <Typography variant='subtitle2'>{t("EditAssessment")}</Typography>
            </Box>
            {
             assesments.assesments.map((item,index)=>{
                return <Box key={index} p={1} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
                       height: 'fit-content',display:'flex',alignItems:'center'}}>
                       <Box>
                          <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{item.typeOfStudy}</Typography>
                          <Typography ml={1} sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>
                            {item.questions.map((element) => element).length} {t("Question")}</Typography>
                       </Box>
                      <IconButton size="large" sx={{marginLeft:'auto'}} onClick={()=>handleNavigate(item.typeOfStudy)}  aria-label="upload picture">
                        <ModeOutlinedIcon fontSize="inherit"/>
                      </IconButton>
                      <IconButton size="large" sx={{marginRight:'1rem'}} onClick={()=>OpenDeleteDialog(item._id)}  aria-label="upload picture">
                        <DeleteOutlineOutlinedIcon fontSize="inherit"/>
                      </IconButton>
                      </Box>
              })
            }
                <Dialog fullWidth open={deleteDialog} onClose={closeDeleteDialog}>
                  <DialogTitle id="alert-dialog-title">{t("DeleteAssessment")}</DialogTitle>
                  <DialogContent >
                   <DialogContentText textAlign='center'>{t("ConfirmDeleteAssessment")}</DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={closeDeleteDialog}>{t('Cancle')}</Button>
                     <Button onClick={handleDelete} autoFocus>{t('Delete')}</Button>
                 </DialogActions>
                </Dialog>
                <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
               </Backdrop>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={warnnig} autoHideDuration={2000} onClose={()=>setWaring(false)}>
                      <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                      {t("unableToDeleteAssessment")}
                      </Alert>
                </Snackbar>
                <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={success} autoHideDuration={2000} onClose={()=>setSuccess(false)}>
                      <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                        {t('assessmentDeleted')}
                      </Alert>
                </Snackbar>
               </Box>  
      } 
      </Box>
   
  )
}

export default EditAssessment
