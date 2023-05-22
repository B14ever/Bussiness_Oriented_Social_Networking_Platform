import React,{useState} from 'react'
import { Alert,Box, Typography,Button,TextField,Tooltip
,Dialog,DialogActions,DialogTitle,DialogContent,IconButton,Divider} from '@mui/material'
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
const EditSkill = () => {
    const {user,dispatch} = useAthuContext()
    const Email = user.user.Email
    const navigate = useNavigate()
    const {t} = useLanguage()
    const [open, setOpen] = useState(false);
    const [userSkill,setUserSkill] = useState(user.user.skill)
    const [skillId,setSkillId] = useState('')
    const [errorMsg,setErrorMsg] = useState('')
    const handleClickOpen = (Skill) => {
        setSkillId(Skill._id)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
      const handleDelete = async (id) => {
        const DeleteSkill = userSkill.filter((item)=> item._id !== id)
        try {
            const responce = await axios.post('/PersonalAccountProfile/DeleteSkill',{userSkill:DeleteSkill,Email})
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            location.reload(true)  
        } catch (error) {
            if (!err?.response) {
                setErrorMsg('Failde');
              } else if (err.response?.status === 403) {
                setErrorMsg('Deletefailde');
              } 
        }
        
      }
  return (
    <Box sx={{marginTop:'100px',backgroundColor:"#E7EBF0",display:'flex',justifyContent:'center'}}>
      <Box pl={2}  sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '10px 0 5px', height: 'fit-content', 
                         width: {xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
        <Box sx={{display:'flex',alignItems:'center',gap:'2rem'}}>
        <IconButton size="large"  onClick={()=>navigate(-1)} aria-label="upload picture">
          <KeyboardBackspaceOutlinedIcon fontSize="inherit"/>
        </IconButton>
        <Typography  variant='subtitle2' mt={.5} sx={{color:'#666',fontSize:'1.5rem'}} >{t("skill")}</Typography>
        </Box>
        <Divider></Divider>
        { 
       user.user.skill.map((Skill)=>{
        return <Box  key={Skill._id} >
                  <Divider></Divider>
                  <Box mt={1} mb={1} pl={1}>
                    <Box sx={{display:'flex',gap:'.1rem',alignItems:'center'}}>
                      <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{Skill.skillName}</Typography>
                      <Tooltip title={t('Delete')} placement="right-start">
                        <IconButton  size="medium" onClick={()=>handleClickOpen(Skill)} >
                            <HighlightOffOutlinedIcon fontSize="inherit"/>
                        </IconButton>
                      </Tooltip>
                    </Box>
                    {Skill.badge?<Box sx={{display:'flex',gap:'.5rem'}}><VerifiedOutlinedIcon color='primary'/><Typography>{t("PassedSkillAssissment")}</Typography></Box>:''}
                </Box>
               </Box>})}
         <Dialog open={open} onClose={handleClose}>
            <DialogTitle textAlign='center'>{t("DeleteSkill")}</DialogTitle>
            <Divider></Divider>
            <DialogContent>
             <Typography>{t("skillDeleteWarning")}</Typography>
             {errorMsg?<Alert severity='error'>{t(`${errorMsg}`)}</Alert>:''}
           </DialogContent>
          <DialogActions sx={{justifyContent:'center'}}>
            <Button onClick={handleClose}>{t("Cancel")}</Button>
            <Button onClick={()=>handleDelete(skillId)} variant='outlined' size='small' color="error" autoFocus>{t("Yes")}</Button>
          </DialogActions>
         </Dialog>
        </Box>
   </Box>
  )
}

export default EditSkill
