import React,{useState} from 'react'
import { Alert,Box, Typography,Button,TextField,Grid,
Dialog,DialogActions,DialogTitle,DialogContent,IconButton,
FormHelperText, Divider} from '@mui/material'
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import AddIcon from '@mui/icons-material/Add';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import {useNavigate} from 'react-router-dom'
import axios from '../../api/axios'
const Skill = () => {
    const {user,dispatch} = useAthuContext()
    const Email = user.user.Email
    const navigate = useNavigate()
    const {t} = useLanguage()
    const [open, setOpen] = useState(false);
    const [data,setData] = useState({skillName:''})
    const [Errors,setErrors] = useState({skillName:''})
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
            const responce = await axios.post('/PersonalAccountProfile/addSkill',{data,Email})
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
        if(!data.skillName){
          formsErrors.skillName = 'skillRequired'
        }
      return formsErrors
      }
  return (
    <Box pl={2} sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '5px 0 5px', height: 'fit-content', width: { xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
    <Box sx={{display:'flex',alignItems:'center'}}>
     <Typography  variant='subtitle2' sx={{color:'#666',fontSize:'1.5rem'}} >{t("skill")}</Typography>
     <Button onClick={()=>navigate('takeAssessment')} size='medium' variant="outlined" sx={{marginLeft:'auto',textTransform: "none",borderRadius:'1rem'}}>{t("DemonestrateSkill")}</Button>
     <IconButton size="large"  onClick={handleClickOpen} aria-label="upload picture">
        <AddIcon fontSize="inherit"/>
      </IconButton>
      <IconButton size="large" sx={{marginRight:'1rem'}} onClick={()=>navigate('EditSkill')} aria-label="upload picture">
        <ModeOutlinedIcon fontSize="inherit"/>
      </IconButton>
     </Box>
    { 
      user.user.skill.map((Skill)=>{
      return <Box  key={Skill._id}>
                <Divider></Divider>
                <Box mt={1} mb={1} pl={1}>
                  <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{Skill.skillName}</Typography>
                  {Skill.badge?<Box sx={{display:'flex',gap:'.5rem'}}><VerifiedOutlinedIcon color='primary'/><Typography>{t("PassedSkillAssissment")}</Typography></Box>:''}
              </Box>
             </Box>})}
      <Dialog open={open} onClose={handleClose} fullWidth >
        <DialogTitle>{t("AddSkill")}</DialogTitle>
      <Box component="form" onSubmit={handleSubmit} mt={1}>
      <DialogContent >
          <TextField  label={t("skill")} fullWidth  name="skillName" onChange={handleChange}/>
          <FormHelperText sx={{color:'red'}}>{Errors.skillName?t(`${Errors.skillName}`):''}</FormHelperText>
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

export default Skill
