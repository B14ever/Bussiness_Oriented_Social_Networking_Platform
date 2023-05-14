import React,{useState} from 'react'
import { Alert,Box, Typography,Button,TextField,Grid
,Dialog,DialogActions,DialogTitle,DialogContent,IconButton,FormHelperText, Divider} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
const EditEducation = () => {
    const {user,dispatch} = useAthuContext()
    const Email = user.user.Email
    const navigate = useNavigate()
    const {t} = useLanguage()
    const [openEdit , setOpenEdit] = useState(false)
    const [dialogText,setDialogText] = useState({})
    const [userEducation,setUserEducation] = useState(user.user.education)
    const [errors, seterrors] = useState({institution:false,fildeOfStudy:false,startedDate:false,endDate:false,Grade:false});
    const [errorMsg,setErrorMsg] = useState('')
    const handleEditOpen = (Exprience) => {
        setDialogText(Exprience)
        setErrorMsg('')
        seterrors({title:false,employmentType:false,companyName:false,startedDate:false,endDate:false})
        setOpenEdit(true);
      };
      const handleEditClose = () => {
        setOpenEdit(false);
        
      };
      const updateEducation = (e) => {
        const {id,name,value} = e.target
        setUserEducation(
          userEducation.map((item) => (item._id === id ? { ...item, [name] : value } : item))
        );
        seterrors({...errors,[name]:false})
      };
    const handleError = (e)=>{
        const {name,value} = e.target
        if(!value){
          seterrors({...errors,[name]:true})
        }
      }
    const handleSubmit = async (e) =>{
        e.preventDefault()
        setErrorMsg('')
          try {
            const responce = await axios.post('/PersonalAccountProfile/EditEducation',{userEducation,Email})
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setOpenEdit(false)
            } catch (err) {
               if (!err?.response) {
                 setErrorMsg('Failde');
               } else if (err.response?.status === 403) {
                 setErrorMsg(err.response.data.error);
               } 
           }
         }
    const handleDelete = async (id) => {
            const DeleteEducation = userEducation.filter((item)=> item._id !== id)
            try {
                const responce = await axios.post('/PersonalAccountProfile/EditEducation',{userEducation:DeleteEducation,Email})
                localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
                dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
                setOpenEdit(false); 
            } catch (error) {
                if (!err?.response) {
                    setErrorMsg('Failde');
                  } else if (err.response?.status === 403) {
                    setErrorMsg('Delete failde');
                  } 
            }
            
          }
    const isDisabled = errors.institution || errors.fildeOfStudy || errors.startedDate || errors.endDate || errors.Grade
  return (
    <Box sx={{marginTop:'100px',backgroundColor:"#E7EBF0",display:'flex',justifyContent:'center'}}>
      <Box pl={2}  sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '10px 0 5px', height: 'fit-content', 
                         width: {xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
        <Box sx={{display:'flex',alignItems:'center',gap:'2rem'}}>
        <IconButton size="large"  onClick={()=>navigate(-1)} aria-label="upload picture">
          <KeyboardBackspaceOutlinedIcon fontSize="inherit"/>
        </IconButton>
        <Typography  variant='subtitle2' mt={.5} sx={{color:'#666',fontSize:'1.5rem'}} >{t("Education")}</Typography>
        </Box>
        <Divider></Divider>
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
                        <IconButton  size="large" sx={{alignSelf:'flex-start',marginLeft:'auto',marginRight:'1rem'}}  onClick={()=>handleEditOpen(Education)} aria-label="upload picture">
                        <ModeOutlinedIcon fontSize="inherit"/>
                        </IconButton>
                    </Box>
                </Box>})}
                <Dialog open={openEdit} onClose={handleEditClose} fullWidth >
                    <DialogTitle>{t("AddEducation")}</DialogTitle>
                    <Box component="form" onSubmit={handleSubmit} mt={1}>
                    <DialogContent >
                    <TextField  label={t("institution")} fullWidth  name="institution" id={dialogText._id} defaultValue={dialogText.institution} onChange={updateEducation} onBlur={handleError}/>
                    <FormHelperText sx={{color:'red'}}>{errors.institution?`${t("InstitionRequired")}`:''}</FormHelperText>
                    <TextField sx={{marginTop:"10px"}} label={t("fieldOfStudy")} fullWidth id={dialogText._id} defaultValue={dialogText.fildeOfStudy} name="fildeOfStudy" onChange={updateEducation} onBlur={handleError}/>
                    <FormHelperText sx={{color:'red'}}>{errors.fildeOfStudy?`${t("fildeOfStudyRequired")}`:''}</FormHelperText>
                    <Grid fullWidth container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <TextField sx={{marginTop:"10px"}}  label={t("startedDate")} fullWidth id={dialogText._id} defaultValue={dialogText.startedDate}  name="startedDate" type="number" inputProps={{min:1900,max:2500,step: 1,}} onChange={updateEducation} onBlur={handleError}/>
                        <FormHelperText sx={{color:'red'}}>{errors.startedDate?`${t("startedDateRequired")}`:''}</FormHelperText>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField sx={{marginTop:"10px"}} label={t("endDate")} fullWidth id={dialogText._id} defaultValue={dialogText.endDate}  name="endDate" type="number"
                                inputProps={{min:1900,max:2500,step: 1,}} onChange={updateEducation} onBlur={handleError}/>
                        <FormHelperText sx={{color:'red'}}>{errors.endDate?`${t("endDateRequired")}`:''}</FormHelperText>
                        </Grid>
                    </Grid>
                    <TextField sx={{marginTop:"10px"}} label={t("Grade")} fullWidth id={dialogText._id} defaultValue={dialogText.Grade}  name="Grade" 
                                onChange={updateEducation} onBlur={handleError}/>
                    <FormHelperText sx={{color:'red'}}>{errors.Grade?`${t("GradeRequired")}`:''}</FormHelperText>
                    {errorMsg?<Alert severity='error'>{t(`${errorMsg}`)}</Alert>:''}
                    </DialogContent>
                    <DialogActions >
                    <IconButton sx={{marginRight:'auto'}} size="medium" onClick={()=>handleDelete(dialogText._id)}>
                     <DeleteIcon fontSize="inherit"/>
                    </IconButton>
                    <Button onClick={handleEditClose}>{t("Cancel")}</Button>
                    <Button disabled={isDisabled}  variant='contained' type="submit" >{t("Update")}</Button>
                    </DialogActions>
                    </Box>
               </Dialog>
        </Box>
   </Box>
  )
}

export default EditEducation
