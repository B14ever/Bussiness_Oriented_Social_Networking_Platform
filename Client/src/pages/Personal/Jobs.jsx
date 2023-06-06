import  { Main_One, Section_One } from '../../Components/Company/Css'
import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,Avatar,LinearProgress,
   Button,Dialog,DialogActions,DialogContent,DialogTitle,Snackbar,Alert,Backdrop,CircularProgress,IconButton, TextField,Tooltip} from '@mui/material'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { styled, useTheme } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
}));
const Jobs = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const id = user.user._id
  const navigate = useNavigate()
  const [jobs,setJobs] = useState([])
  const [loading,setLoading] = useState(false)
  const [jobId,setJobId] = useState('')
  const [warnnig,setWaring] = useState(false)
  const [bOpen,setBopen] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [action, setAction] = React.useState(false);
  const [data,setData]  = useState({applicant:id,cv:''})
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.get(`/vacanices/${id}`)
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
    setData({applicant:id,cv:''})
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
    const ExternalNavigate = (webSite) =>{
      console.log(webSite)
      window.open(`${webSite}`, "_blank");
    }
    useEffect(()=>{
      console.log(data)
    },[data])
    const handleApply = async () =>{
      try{
        setBopen(true)
        await axios.post(`/vacanices/apply/${jobId}`,{data})
        setOpen(false)
        setAction(!action)
        setTimeout(()=>{setBopen(false)},500)
      }catch(err){
        setWaring(true) 
      }
    }
    const handleNavigate = async (pagesId) =>{
      navigate(`/PersonalAccountProfile/PersonalNetwork/pages/${pagesId}`)
   }
    const disable = data.cv.length === 0
  return (
    <Main_One>
      { loading?
        <Section_One>
          <Box p={1}>
          <LinearProgress/>
          <Typography variant='subtitle2'>{t("job")}</Typography>
          </Box>
          <Divider/>
       </Section_One>:
       <Section_One>
          <Box p={1} sx={{display:'flex',alignItems:'center'}}>
            <Typography ml={1} variant='subtitle2'>{t("job")}</Typography>
            <Tooltip placement="left-start" title={t('AppliedJobs')}>
                <IconButton sx={{marginLeft:'auto'}} onClick={()=>navigate('pending')}>
                  <WorkHistoryIcon color='primary'/>
                </IconButton>
            </Tooltip>
          </Box>
          <Divider/>
          <Box>
              {
                jobs.map((job,i)=>{
                  return <Box key={i} p={1} sx={{display:'flex',flexDirection:'column'}}>
                     <Box sx={{display:'flex',alignItems:'center',gap:'.5rem'}}
                       onClick={()=>handleNavigate(job.recureter._id)}>
                      <ProfilePhoto  onClick={()=>handleClick(friend._id)}
                       src={`../../../Profile_Image/${job.recureter.logo}`}/>
                       <Typography variant='subtitle2' sx={{cursor:'pointer','&:hover': {textDecoration: 'underline'}}}>{job.recureter.companyName}</Typography>
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
                         { job.form.includes("OnBOSBN")?
                         <Button startIcon={<CallMadeIcon />} onClick={()=>handleClickOpen(job._id)} sx={{width:'25%',borderRadius:'25px',textTransform:'none'}} variant="contained" >{t('Apply')}</Button>
                         :
                         <Button startIcon={<CallMadeIcon />} sx={{width:'25%',borderRadius:'25px',textTransform:'none'}}  variant="outlined" onClick={()=>ExternalNavigate(job.webSite)} >Apply</Button>
                         }
                        </Box>
                      {i !== jobs.length - 1 ? <Divider/>:null}
                  </Box>
                })
              }
             </Box>
             <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"sm"}>
                `<DialogTitle>{t('ApplyForJob')}</DialogTitle>
                <DialogContent sx={{display:'flex',flexDirection:'column',justifyContent:'center'}}>
                <Box component="img"
                  sx={{height:'400px',width:'100%',borderRadius:'10px'}} 
                  src={`../../../Profile_Image/uploadCv.jpg`} />
                  <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:'.5rem'}}>
                    <IconButton  component="label"  size='large' sx={{backgroundColor:'#E7EBF0'}}>
                       <AttachFileOutlinedIcon color='primary'/>
                      <input hidden  multiple type="file" 
                      onChange={(e)=>setData({...data,cv:e.target.files[0].name})}/>
                    </IconButton>
                    <TextField value={data.cv || ' '} fullWidth  label='Upload cv' disabled/>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Button variant="outlined" sx={{textTransform:'none'}} onClick={handleClose}>{t('Cancel')}</Button>
                  <Button variant="contained" sx={{textTransform:'none'}} disabled={disable} onClick={handleApply}>{('Apply')}</Button>
                </DialogActions>`
           </Dialog>
             <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                open={warnnig} autoHideDuration={800} onClose={()=>setWaring(false)}>
                  <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                  {t(`Application Falide`)}
                  </Alert>
            </Snackbar>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={bOpen} onClick={()=>setBopen(false)}>
            <CircularProgress color="inherit" />
        </Backdrop>
      </Section_One>
      }
  </Main_One>
  )
}

export default Jobs
