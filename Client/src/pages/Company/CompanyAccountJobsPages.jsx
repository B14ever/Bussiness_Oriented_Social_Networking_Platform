import React,{useEffect,useState} from 'react'
import { Box,Typography,IconButton,Tooltip,Dialog,DialogActions,DialogContent,Divider,LinearProgress,DialogContentText,DialogTitle,TextField,Button,Grid,MenuItem} from '@mui/material/node'
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import  { Main_One, Section_One } from '../../Components/Company/Css'
import {useLanguage} from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
const WorKPlaceType = ['OnSite','Remote']
const JobType=['FullTime','PartTime','SelfEmployed','Freelance','Contract','Intership','Apprenticeship','Seasonal']
const CompanyAccountJobsPages = () => {
  const {t} = useLanguage()
  const [open,setOpen] = useState(false)
  const {user} = useAthuContext()
  const id = user.user._id
  const [laoding,setLoading] = useState(false)
  const [jobs,setJobs] = useState([])
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
}, [])
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
      </Section_One>
      }
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{t("PostJobs")}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
               <TextField required fullWidth label={t("jobTitle")} variant="standard"/>
            </Grid>
            <Grid item xs={12}>
               <TextField required fullWidth label={t("Description")} variant="standard"/>
            </Grid>
            <Grid item xs={12}>
               <TextField required fullWidth label={t("jobLocation")} variant="standard"/>
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth select label={('jobType')} required variant="standard">
               {JobType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
           </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField fullWidth select label={t('workPlaceType')} required variant="standard">
               {WorKPlaceType.map((option,i) => (
              <MenuItem key={i} value={option}>{t(`${option}`)}</MenuItem>))}
           </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" sx={{textTransform:'none',borderRadius:'10px'}} onClick={handleClose}>Cancel</Button>
          <Button variant="contained" sx={{textTransform:'none',borderRadius:'10px'}} onClick={handleClose}>{t('post')}</Button>
        </DialogActions>
      </Dialog>
  </Main_One>
  )
}

export default CompanyAccountJobsPages
