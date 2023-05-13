import React,{useEffect, useState} from 'react'
import { Alert,Box, Typography,Button,TextField,Grid,
Dialog,DialogActions,DialogTitle,DialogContent,IconButton,
FormHelperText, Divider,FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import {useNavigate} from 'react-router-dom'
const companyNames = ['FullTime','PartTime','SelfEmployed','Freelance','Contract','Intership','Apprenticeship','Seasonal']
const Exprience = () => {
    const {user,dispatch} = useAthuContext()
    const navigate = useNavigate()
    const Email = user.user.Email
    const {t} = useLanguage()
    const [open, setOpen] = useState(false);
    const [data,setData] = useState({title:'',employmentType:'',companyName:'',startedDate:'',endDate:''})
    const [Errors,setErrors] = useState({title:'',employmentType:'',companyName:'',startedDate:'',endDate:''})
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
            const responce = await axios.post('/PersonalAccountProfile/addExprience',{data,Email})
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setOpen(false)
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
        if(!data.title){
          formsErrors.title = 'ExprienceTitileRequired'
        }
        if(!data.employmentType){
          formsErrors.employmentType = 'SelectEmployementType'
        }
        if(!data.companyName){
            formsErrors.companyName= 'companyNameRequired'
          }
        if(!data.startedDate){
          formsErrors.startedDate = 'ExpriencestartedDateRequired'
        }
        if(!data.endDate){
            formsErrors.endDate = 'ExprienceendDateRequired'
          }
      return formsErrors
      }
  return (
    <Box pl={2} sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '5px 0 5px', height: 'fit-content', width: { xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
    <Box sx={{display:'flex',alignItems:'center'}}>
     <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("Experience")}</Typography>
     <IconButton size="large" sx={{marginLeft:'auto'}} onClick={handleClickOpen} aria-label="upload picture">
        <AddIcon fontSize="inherit"/>
      </IconButton>
      <IconButton size="large" sx={{marginRight:'1rem'}} onClick={()=>navigate('EditExprience')} aria-label="upload picture">
        <ModeOutlinedIcon fontSize="inherit"/>
      </IconButton>
    </Box>
    { 
      user.user.exprience.map((Exprience)=>{
      return <Box key={Exprience._id}>
                <Divider></Divider>
               <Box sx={{display:'flex',mt:1.3}} >
                <img src="../../../Profile_Image/webIcon.png" style={{ width: '50px', height: '50px',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                <Box mt={.5} pl={1}>
                  <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{t("workedAs")} {Exprience.title}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("Workedat")} {Exprience.companyName}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("yearOfExprience")} {Exprience.startedDate} - {Exprience.endDate}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("workType")} {Exprience.employmentType}</Typography>
                </Box>
               </Box>
             </Box>})}
      <Dialog open={open} onClose={handleClose} fullWidth  >
        <DialogTitle>{t("AddExperience")}</DialogTitle>
        <Divider></Divider>
      <Box component="form" onSubmit={handleSubmit} mt={1}>
      <DialogContent >
          <TextField  label={t("title")} fullWidth  name="title" onChange={handleChange}/>
          <FormHelperText sx={{color:'red'}}>{Errors.title?t(`${Errors.title}`):''}</FormHelperText>
          <TextField sx={{marginTop:"5px"}} label={t("companyName")} fullWidth  name="companyName" onChange={handleChange}/>
          <FormHelperText sx={{color:'red'}}>{Errors.companyName?t(`${Errors.companyName}`):''}</FormHelperText>
          <FormControl sx={{marginTop:"5px"}} fullWidth size="large">
           <InputLabel id="demo-select-small-label">{t("employmentType")}</InputLabel>
           <Select labelId="demo-select-small-label" 
                 value={data.employmentType || ''} 
                 name ='employmentType'
                 id="demo-select-small" 
                 onChange={handleChange}
                 label={t("employmentType")} >
                 {companyNames.map((name) => (
                <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>
               ))}
           </Select>
          </FormControl>
          <FormHelperText sx={{color:'red'}}>{Errors.employmentType?t(`${Errors.employmentType}`):''}</FormHelperText>
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

export default Exprience
