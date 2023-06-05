import React,{useEffect,useState} from 'react'
import { Box,Typography,IconButton,Tooltip,Dialog,DialogActions,DialogContent,Divider,LinearProgress,DialogContentText,DialogTitle,TextField,Button,Grid,MenuItem,Snackbar,Alert} from '@mui/material/node'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import  { Main_One, Section_One } from '../../Components/Company/Css'
import {useLanguage} from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
const WorKPlaceType = ['OnSite','Remote']
const FormType = ['OnBOSBN','ExternalWeb']
const JobType=['FullTime','PartTime','Freelance','Contract','Intership','Apprenticeship','Seasonal']
const CompanyAccountJobsPages = () => {
  const {t} = useLanguage()
  const navigate = useNavigate()
  const [open,setOpen] = useState(false)
  const [editOpen,setEditOpen] = useState(false)
  const [deleteOpen,setDeleteOpen] = useState(false)
  const {user} = useAthuContext()
  const id = user.user._id
  const [laoding,setLoading] = useState(false)
  const [jobs,setJobs] = useState([])
  const [newJobs,setNewJobs] = useState({recureter:id, jobTitle:'', workType:'', jobLocation:'', jobType:'',form:'',jobRequirements:'', jobResponsibilities:'',webSite:' '})
  const [editJobs,setEditJobs] = useState({recureter:'',applicants:'',jobTitle:'', workType:'', jobLocation:'', jobType:'',form:'',jobRequirements:'', jobResponsibilities:'',_id:'',webSite:' '})
  const [warnnig,setWaring] = useState(false)
  const [warnnigMsg,setWaringMsg] = useState('')
  const [action,setAction] = useState(false)
  const [jobId,setJobId] = useState('')
  const handleClickOpen = () => {
    setNewJobs({recureter:id, jobTitle:'', workType:'', jobLocation:'', jobType:'',form:'',jobRequirements:'', jobResponsibilities:''})
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleEditOpen = (jobInfo) => {
    setEditJobs(jobInfo)
    setEditOpen(true);
  };
  const handleEditClose = () => {
    setEditOpen(false);
  };
  const handleDeleteOpen = (jobId) => {
    setJobId(jobId)
    setDeleteOpen(true);
  };
  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  useEffect(() => {
    const GetData = async ()=>{
    try{
    setLoading(true)
    const responce = await axios.get(`/jobs/${id}`)
    const data = responce.data.Jobs
    console.log(data)
    setJobs(data)
    setTimeout(()=>{setLoading(false)},1200)
    }
    catch(err){
        console.error(err)
    }
}
    GetData()
    .catch(console.error);
}, [action])
const handleSubmit = async (e)=>{
  e.preventDefault();
        try{
          await axios.post('/jobs',newJobs)
          setOpen(false)
          setAction(!action)
        }
        catch(err){
          setWaring(true)
          setWaringMsg('JobNotAdd')
        }
}
const handleDelte = async (e)=>{
  e.preventDefault();
        try{
          await axios.post('/jobs/delete',{jobId})
          setDeleteOpen(false)
          setAction(!action)
        }
        catch(err){
          setWaring(true)
          setWaringMsg('JobNotDeleted')
        }
}
const handleEdit = async (e) =>{
  e.preventDefault();
  try{
    await axios.post('/jobs/edit',editJobs)
    setEditOpen(false)
    setAction(!action)
  }
  catch(err){
    setWaring(true)
    setWaringMsg('JobNotAdd')
  }
}
const newDisable = newJobs.form && newJobs.jobLocation &&  newJobs.jobRequirements && newJobs.jobResponsibilities && newJobs.jobTitle && newJobs.workType && newJobs.jobType &&
(newJobs.form.includes('ExternalWeb')?newJobs.webSite : true)
const EditDisable = editJobs.form && editJobs.jobLocation &&  editJobs.jobRequirements && editJobs.jobResponsibilities && editJobs.jobTitle && editJobs.workType && editJobs.jobType
  return (
    <Main_One>
      { laoding?
        <Section_One>
        <Box p={1}>
        <LinearProgress/>
        <Typography variant='subtitle2'>{t("job")}</Typography>
        </Box>
        <Divider/>
      </Section_One>
       :
      <Section_One>
        <Box p={1} sx={{display:'flex',alignItems:'center'}}>
        <Typography variant='subtitle2'>{t("job")}</Typography>
        <Tooltip title={t('PostJobs')}>
          <IconButton onClick={handleClickOpen} sx={{marginLeft:'auto'}}>
            <ControlPointOutlinedIcon/>
          </IconButton>
        </Tooltip>
        </Box>
        <Divider/>
        <Box>
          {
            jobs.length > 0 ? 
             <Box>
              {
                jobs.map((job,i)=>{
                  return <Box key={i} p={1} sx={{display:'flex',flexDirection:'column',gap:'.5rem'}}>
                     <Box sx={{display:'flex',width:'100%',alignItems:'flex-start'}}>
                        <img src="../../../Profile_Image/webIcon.png" style={{ width: '50px', height: '50px',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                         <Box pl={1}>
                          <Box sx={{display:'flex',flexDirection:'column',width:'100%'}}>
                          <Typography >{t("Job")} : {job.jobTitle}</Typography>
                          <Typography>{t('jobRequirements')} : {job.jobRequirements}</Typography>
                          <Typography>{t('jobResponsibilities')} : {job.jobResponsibilities}</Typography>
                          <Typography>{t('jobLocation')} : {job.jobLocation}</Typography>
                          <Typography>{t('workPlaceType')} : {job.workType}</Typography>
                          <Typography>{t('jobType')} : {job.jobType}</Typography>
                          {
                        job.form.includes("OnBOSBN")?
                        <Typography onClick={()=>navigate('applicant')} sx={{cursor:'pointer','&:hover': {textDecoration: 'underline',},}}>
                          {t('Applicants')} : {job.applicants.length}</Typography>:null}
                          </Box>
                         </Box>
                          <Tooltip  title={t('Delete')}>
                            <IconButton sx={{alignSelf:'flex-start',marginLeft:'auto'}}  onClick={()=>{handleDeleteOpen(job._id)}}>
                              <RemoveCircleOutlineOutlinedIcon/>
                            </IconButton>
                           </Tooltip>
                           <Tooltip title={t('Edit')}>
                            <IconButton onClick={()=>handleEditOpen(job)} >
                              <DriveFileRenameOutlineOutlinedIcon/>
                            </IconButton>
                          </Tooltip> 
                      </Box>
                      {i !== jobs.length - 1 ? <Divider/>:null}
                  </Box>
                })
              }
             </Box>:
             <Box sx={{height:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
              <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/NoConnection.jpg`}/>
             </Box>
          }
        </Box>
      </Section_One>
      }
      <Dialog open={open} onClose={handleClose} maxWidth={"md"}>
        <DialogTitle>{t("PostJobs")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
               <TextField
                  value={newJobs.jobTitle || ''}
                  onChange={(e)=>setNewJobs({...newJobs,jobTitle:e.target.value})}
                  required fullWidth label={t("jobTitle")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  value={newJobs.jobRequirements || ''}
                  onChange={(e)=>setNewJobs({...newJobs,jobRequirements:e.target.value})}
                  required fullWidth label={t("jobRequirements")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  value={newJobs.jobResponsibilities || ''}
                  onChange={(e)=>setNewJobs({...newJobs,jobResponsibilities:e.target.value})}
                  required fullWidth label={t("jobResponsibilities")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={12}>
               <TextField
                  value={newJobs.jobLocation || ''}
                  onChange={(e)=>setNewJobs({...newJobs,jobLocation:e.target.value})}
                  required fullWidth label={t("jobLocation")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
               value={newJobs.jobType || ''}
               onChange={(e)=>setNewJobs({...newJobs,jobType:e.target.value})}
               fullWidth select label={('jobType')} required variant="standard">
               {JobType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
           </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
                value={newJobs.workType || ''}
                onChange={(e)=>setNewJobs({...newJobs,workType:e.target.value})}
               fullWidth select label={t('workPlaceType')} required variant="standard">
               {WorKPlaceType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
           </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
             <TextField 
                value={newJobs.form || ''}
                onChange={(e)=>setNewJobs({...newJobs,form:e.target.value})}
                fullWidth select label={t('form')} required variant="standard">
               {FormType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
             </TextField>
            </Grid>
            { 
              newJobs.form.includes('ExternalWeb') ?
              <Grid item xs={12} md={6}>
             <TextField 
                value={newJobs.webSite || ''}
                onChange={(e)=>setNewJobs({...newJobs,webSite:e.target.value})}
                fullWidth  label={t('Website')} required variant="standard">
             </TextField>
            </Grid>
            :null }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" sx={{textTransform:'none',borderRadius:'10px'}} onClick={handleClose}>Cancel</Button>
          <Button variant="contained" disabled={!newDisable} sx={{textTransform:'none',borderRadius:'10px'}} onClick={handleSubmit}>{t('post')}</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={editOpen} onClose={handleEditClose} maxWidth={"md"}>
        <DialogTitle>{t("PostJobs")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} md={12}>
               <TextField
                  defaultValue={editJobs.jobTitle}
                  onChange={(e)=>setEditJobs({...editJobs,jobTitle:e.target.value})}
                  required fullWidth label={t("jobTitle")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  defaultValue={editJobs.jobRequirements}
                  onChange={(e)=>setEditJobs({...editJobs,jobRequirements:e.target.value})}
                  required fullWidth label={t("jobRequirements")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={6}>
               <TextField
                  defaultValue={editJobs.jobResponsibilities}
                  onChange={(e)=>setEditJobs({...editJobs,jobResponsibilities:e.target.value})}
                  required fullWidth label={t("jobResponsibilities")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={12}>
               <TextField
                  defaultValue={editJobs.jobLocation}
                  onChange={(e)=>setEditJobs({...editJobs,jobLocation:e.target.value})}
                  required fullWidth label={t("jobLocation")} variant="standard"/>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
               defaultValue={editJobs.jobType}
               onChange={(e)=>setEditJobs({...editJobs,jobType:e.target.value})}
               fullWidth select label={('jobType')} required variant="standard">
               {JobType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
           </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
            <TextField
               defaultValue={editJobs.workType}
                onChange={(e)=>setEditJobs({...editJobs,workType:e.target.value})}
               fullWidth select label={t('workPlaceType')} required variant="standard">
               {WorKPlaceType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
           </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
             <TextField 
                defaultValue={editJobs.form}
                helperText={editJobs.applicants.length > 0? t('NotEditJobForm') : null}
                disabled={editJobs.applicants.length > 0? true : false}
                onChange={(e)=>setEditJobs({...editJobs,form:e.target.value})}
                fullWidth select label={t('form')} required variant="standard">
               {FormType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
             </TextField>
            </Grid>
            { 
              editJobs.form.includes('ExternalWeb') ?
              <Grid item xs={12} md={6}>
             <TextField 
                defaultValue={editJobs.webSite}
                onChange={(e)=>setEditJobs({...editJobs,webSite:e.target.value})}
                fullWidth  label={t('Website')} required variant="standard">
             </TextField>
            </Grid>
            :null }
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" sx={{textTransform:'none',borderRadius:'10px'}} onClick={handleEditClose}>Cancel</Button>
          <Button variant="contained" disabled={!EditDisable} sx={{textTransform:'none',borderRadius:'10px'}} onClick={handleEdit}>{t('post')}</Button>
        </DialogActions>
      </Dialog>
      <Dialog fullWidth open={deleteOpen} onClose={handleDeleteClose}>
        <DialogTitle variant='subtitle2' id="alert-dialog-title">{t('DeleteJob')}</DialogTitle>
        <DialogContent >
          <DialogContentText textAlign='center'>
            {t('DeleteJobWarnnigs')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  sx={{textTransform:'none'}} onClick={handleDeleteClose}>{t('Cancle')}</Button>
          <Button  sx={{textTransform:'none'}} onClick={handleDelte} autoFocus >{t('Delete')}</Button>
        </DialogActions>
      </Dialog>
        <Snackbar open={warnnig} anchorOrigin={{ vertical:'top', horizontal:'center'}} 
                 autoHideDuration={1000} onClose={()=>setWaring(false)}>
          <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>{t(`${warnnigMsg}`)}
          </Alert>
        </Snackbar>
  </Main_One>
  )
}

export default CompanyAccountJobsPages
