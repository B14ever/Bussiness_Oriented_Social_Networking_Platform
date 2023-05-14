import React,{useState} from 'react'
import { Alert,Box, Typography,Button,TextField,Grid
,Dialog,DialogActions,DialogTitle,DialogContent,IconButton,FormHelperText, Divider} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
const Education = () => {
    const {user,dispatch} = useAthuContext()
    const Email = user.user.Email
    const navigate = useNavigate()
    const {t} = useLanguage()
    const [open, setOpen] = useState(false);
    const [data,setData] = useState({institution:'',fildeOfStudy:'',startedDate:'',endDate:'',Grade:''})
    const [Errors,setErrors] = useState({institution:'',fildeOfStudy:'',startedDate:'',endDate:'',Grade:''})
    const [errorMsg,setErrorMsg] = useState('')
    const handleClickOpen = () => {
      setData('')
      setErrors('')
      setErrorMsg('')
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    const handleChange = (e) =>{
        const {name,value} = e.target
        setData({...data,[name]:value})
    }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setErrorMsg('')
        setErrors('')
        const errors = validateForm()
        if (Object.keys(errors).length === 0) {
          try {
            const responce = await axios.post('/PersonalAccountProfile/addEducation',{data,Email})
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setOpen(false);
            } catch (err) {
               if (!err?.response) {
                 setErrorMsg('Failde');
               } else if (err.response?.status === 403) {
                 setErrorMsg(err.response.data.error);
               } 
           }
         } else {
            setErrors(errors);
           }
      }
    const validateForm =()=>{
        const formsErrors ={}
        if(!data.institution){
          formsErrors.institution = 'InstitionRequired'
        }
        if(!data.fildeOfStudy){
          formsErrors.fildeOfStudy = 'fildeOfStudyRequired'
        }
        if(!data.startedDate){
          formsErrors.startedDate = 'startedDateRequired'
        }
        if(!data.endDate){
            formsErrors.endDate = 'endDateRequired'
          }
          if(!data.Grade){
            formsErrors.Grade = 'GradeRequired'
          }
      return formsErrors
      }
  return (
    <Box pl={2} sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '5px 0 5px', height: 'fit-content', width: { xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
    <Box sx={{display:'flex',alignItems:'center'}}>
     <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("Education")}</Typography>
     <IconButton size="large" sx={{marginLeft:'auto'}} onClick={handleClickOpen} aria-label="upload picture">
        <AddIcon fontSize="inherit"/>
      </IconButton>
      <IconButton size="large" sx={{marginRight:'1rem'}} onClick={()=>navigate('EditEducation')} aria-label="upload picture">
        <ModeOutlinedIcon fontSize="inherit"/>
      </IconButton>
    </Box>
    { 
      user.user.education.map((Education)=>{
      return <Box  key={Education._id}>
                <Divider></Divider>
               <Box sx={{display:'flex',mt:1.3}}>
                <img src="../../../Profile_Image/webIcon.png" style={{ width: '50px', height: '50px',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                <Box mt={.5} pl={1}>
                  <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{t("StudiedAt")} {Education.institution}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("GraduteOf")} {Education.fildeOfStudy}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("yearOfStudy")} {Education.startedDate} - {Education.endDate}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("Grade")} {Education.Grade}</Typography>
                </Box>
              </Box>
             </Box>})}
      <Dialog open={open} onClose={handleClose} fullWidth >
        <DialogTitle>{t("AddEducation")}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} mt={1}>
      <DialogContent >
          <TextField  label={t("institution")} fullWidth  name="institution" onChange={handleChange}/>
          <FormHelperText sx={{color:'red'}}>{Errors.institution?t(`${Errors.institution}`):''}</FormHelperText>
          <TextField sx={{marginTop:"5px"}} label={t("fieldOfStudy")} fullWidth  name="fildeOfStudy" onChange={handleChange}/>
          <FormHelperText sx={{color:'red'}}>{Errors.fildeOfStudy?t(`${Errors.fildeOfStudy}`):''}</FormHelperText>
          <Grid fullWidth container spacing={2}>
            <Grid item xs={12} sm={6}>
             <TextField sx={{marginTop:"5px"}}  label={t("startedDate")} fullWidth  name="startedDate" type="number" inputProps={{min:1900,max:2500,step: 1,}} onChange={handleChange}/>
             <FormHelperText sx={{color:'red'}}>{Errors.startedDate?t(`${Errors.startedDate}`):''}</FormHelperText>
            </Grid>
            <Grid item xs={12} sm={6}>
             <TextField sx={{marginTop:"5px"}} label={t("endDate")} fullWidth  name="endDate" type="number"
                       inputProps={{min:1900,max:2500,step: 1,}} onChange={handleChange}/>
             <FormHelperText sx={{color:'red'}}>{Errors.endDate?t(`${Errors.endDate}`):''}</FormHelperText>
            </Grid>
          </Grid>
          <TextField sx={{marginTop:"5px"}} label={t("Grade")} fullWidth   name="Grade" 
                     onChange={handleChange}/>
          <FormHelperText sx={{color:'red'}}>{Errors.Grade?t(`${Errors.Grade}`):''}</FormHelperText>
          {errorMsg?<Alert severity='error'>{t(`${errorMsg}`)}</Alert>:''}
        </DialogContent>
        <DialogActions >
          <Button onClick={handleClose}>{t("Cancel")}</Button>
          <Button  variant='contained' type="submit" >{t("save")}</Button>
        </DialogActions>
        </Box>
      </Dialog>
  </Box>
  )
}

export default Education
