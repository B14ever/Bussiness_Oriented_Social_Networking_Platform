import  { Main_One, Section_One } from '../../Components/Company/Css'
import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,Avatar,LinearProgress,
   Button,Dialog,DialogActions,DialogContent,DialogTitle,DialogContentText,Snackbar,Alert,Backdrop,CircularProgress,IconButton, TextField,Tooltip} from '@mui/material'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { styled, useTheme } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
}));
const PenddingJobs = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const id = user.user._id
  const navigate = useNavigate()
  const [jobs,setJobs] = useState([])
  const [loading,setLoading] = useState(false)
  const [jobId,setJobId] = useState('')
  const [warnnig,setWaring] = useState(false)
  const [action,setAction] = useState(false)
  const [open, setOpen] = React.useState(false);
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.get(`/vacanices/pending/${id}`)
     const data = responce.data.jobs
     setJobs(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [action])
    
  const handleClickOpen = (jobId) => {
    setJobId(jobId)
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
    
    const handleCancle = async () =>{
      try{
        await axios.post(`/vacanices/cancle/${jobId}`,{id})
        setOpen(false)
        setAction(!action)
      }catch(err){
        setWaring(true) 
      }
    }
    const handleNavigate = async (pagesId) =>{
      navigate(`/PersonalAccountProfile/PersonalNetwork/pages/${pagesId}`)
   }
  return (
    <Main_One>
      { loading?
        <Section_One>
          <Box p={1}>
          <LinearProgress/>
          <Typography variant='subtitle2'>{t("AppliedJobs")}</Typography>
          </Box>
          <Divider/>
       </Section_One>:
       <Section_One>
         <Box sx={{backgroundColor:"#E7EBF0"}}>
           <Tooltip placement="right-end"  title={t('Back')}>
             <IconButton onClick={()=>{navigate(-1)}}>
               <KeyboardBackspaceIcon/>
             </IconButton>
           </Tooltip>
         </Box>
          <Box p={1}>
            <Typography ml={1} variant='subtitle2'>{t("AppliedJobs")}</Typography>
          </Box>
          <Divider/>
          {
            jobs.length > 0 ?
            <Box>
              {
                jobs.map((job,i)=>{
                  return <Box key={i} p={1} sx={{display:'flex',flexDirection:'column'}}>
                     <Box sx={{display:'flex',alignItems:'center',gap:'.5rem'}}
                     onClick={()=>handleNavigate(job.recureter._id)}>
                      <ProfilePhoto  onClick={()=>handleClick(friend._id)}
                       src={`../../../Profile_Image/${job.recureter.logo}`}/>
                       <Typography sx={{cursor:'pointer','&:hover': {textDecoration: 'underline'}}}
                       variant='subtitle2' >{job.recureter.companyName}</Typography>
                      </Box>
                      <Box pl={6}>
                          <Box sx={{display:'flex',flexDirection:'column'}}>
                          <Typography >{t("Job")} : {job.jobTitle}</Typography>
                          <Typography>{t('jobRequirements')} : {job.jobRequirements}</Typography>
                          <Typography>{t('jobResponsibilities')} : {job.jobResponsibilities}</Typography>
                          <Typography>{t('jobLocation')} : {job.jobLocation}</Typography>
                          <Typography>{t('workPlaceType')} : {job.workType}</Typography>
                          <Typography>{t('jobType')} : {job.jobType}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{display:'flex',justifyContent:'flex-end',marginBottom:'1rem'}}>
                      
                         <Button onClick={()=>handleClickOpen(job._id)} sx={{width:'20%',borderRadius:'20px',textTransform:'none'}} variant="outlined" >{t('Cancle')}</Button>
                        </Box>
                      {i !== jobs.length - 1 ? <Divider/>:null}
                  </Box>
                })
              }
             </Box>:
             <Box sx={{height:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
             <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/PendingJob.jpg`}/>
             <Typography variant='subtitle2' onClick={()=>navigate(-1)} >{t("NoPendingApplication")}</Typography>
             </Box>
             }
            <Dialog fullWidth open={open} onClose={handleClose}>
              <DialogTitle variant='subtitle2' id="alert-dialog-title">{t('CancleApplication')}</DialogTitle>
              <DialogContent >
                <DialogContentText textAlign='center'>
                   {t('CancleJobWarnnigs')}
                </DialogContentText>
            </DialogContent>
              <DialogActions>
                <Button  sx={{textTransform:'none'}} onClick={handleClose}>{t('Back')}</Button>
                 <Button  sx={{textTransform:'none'}} onClick={handleCancle} autoFocus >{t('Yes')}</Button>
               </DialogActions>
            </Dialog>
             <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                open={warnnig} autoHideDuration={800} onClose={()=>setWaring(false)}>
                  <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                  {t(`Cancle Application Falide`)}
                  </Alert>
            </Snackbar>
      </Section_One>
      }
  </Main_One>
  )
}

export default PenddingJobs