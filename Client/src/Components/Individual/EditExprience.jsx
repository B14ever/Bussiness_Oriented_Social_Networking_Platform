import React,{useEffect, useRef,useState} from 'react'
import { Alert,Box, Typography,Button,TextField,Grid,
Dialog,DialogActions,DialogTitle,DialogContent,IconButton,
FormHelperText, Divider,FormControl,Select,InputLabel,MenuItem} from '@mui/material'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import {useNavigate} from 'react-router-dom'
const companyNames = ['FullTime','PartTime','SelfEmployed','Freelance','Contract','Intership','Apprenticeship','Seasonal']
const EditExprience = () => {
    const {user,dispatch} = useAthuContext()
    const navigate = useNavigate()
    const Email = user.user.Email
    const {t} = useLanguage()
    const [openEdit , setOpenEdit] = useState(false)
    const [dialogText,setDialogText] = useState({})
    const [userExprience,setUserExprience] = useState(user.user.exprience)
    const [errorMsg,setErrorMsg] = useState('')
    const [errors, seterrors] = useState({title:false,employmentType:false,companyName:false,startedDate:false,endDate:false});
    const handleEditOpen = (Exprience) => {
        setDialogText(Exprience)
        setErrorMsg('')
        seterrors({title:false,employmentType:false,companyName:false,startedDate:false,endDate:false})
        setOpenEdit(true);
      };
      const handleEditClose = () => {
        setOpenEdit(false);
        setDialogText({})
      };
      const EditExprience = async (e) =>{
        e.preventDefault()
        setErrorMsg('')
          try {
            const responce = await axios.post('/PersonalAccountProfile/EditExprience',{userExprience,Email})
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setOpenEdit(false);
            } catch (err) {
               if (!err?.response) {
                 setErrorMsg('Failde');
               } else if (err.response?.status === 403) {
                 setErrorMsg(err.response.data.error);
               } 
           } 
      }
      const updateExprience = (e) => {
        const {id,name,value} = e.target
        setUserExprience(
          userExprience.map((item) => (item._id === id ? { ...item, [name] : value } : item))
        );
        seterrors({...errors,[name]:false})
      };
      const handleError = (e)=>{
        const {name,value} = e.target
        if(!value){
          seterrors({...errors,[name]:true})
        }
      }
      const handleDelete = async (id) => {
        const DeleteExprience = userExprience.filter((item)=> item._id !== id)
        try {
            const responce = await axios.post('/PersonalAccountProfile/EditExprience',{userExprience:DeleteExprience,Email})
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
      const isDisabled = errors.title || errors.companyName || errors.employmentType || errors.startedDate || errors.endDate
  return (
    <Box sx={{marginTop:'100px',backgroundColor:"#E7EBF0",display:'flex',justifyContent:'center'}}>
       <Box pl={2}  sx={{borderRadius:'6px',backgroundColor: '#fff', margin: '10px 0 5px', height: 'fit-content', width: { xs: '90%', sm: '80%', md: '70%', lg: '57%' } }}>
       <Box sx={{display:'flex',alignItems:'center',gap:'2rem'}}>
       <IconButton size="large"  onClick={()=>navigate(-1)} aria-label="upload picture">
        <KeyboardBackspaceOutlinedIcon fontSize="inherit"/>
      </IconButton>
       <Typography  variant='subtitle2' mt={.5} sx={{color:'#666',fontSize:'1.5rem'}} >{t("Experience")}</Typography>
       </Box>
       <Divider></Divider>
       { 
      user.user.exprience.map((Exprience)=>{
      return <Box key={Exprience._id}>
                <Divider></Divider>
               <Box sx={{display:'flex',mt:1.3}} >
                <img src="../../../Profile_Image/webIcon.png" style={{ width: '50px', height: '50px',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                <Box mt={.5} pl={1} >
                  <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{t("workedAs")} {Exprience.title}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("Workedat")} {Exprience.companyName}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("yearOfExprience")} {Exprience.startedDate} - {Exprience.endDate}</Typography>
                  <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t("workType")} {Exprience.employmentType}</Typography>
                </Box>
                <IconButton  size="large" sx={{alignSelf:'flex-start',marginLeft:'auto',marginRight:'1rem'}}  onClick={()=>handleEditOpen(Exprience)} aria-label="upload picture">
                <ModeOutlinedIcon fontSize="inherit"/>
                </IconButton>
               </Box>
            </Box>})}
          <Dialog open={openEdit}  onClose={handleEditClose} fullWidth >
            <DialogTitle>{t("EditExperience")}</DialogTitle>
            <Divider></Divider>
            <Box component="form" onSubmit={EditExprience} mt={1}>
            <DialogContent >
             <TextField  label={t("title")} fullWidth id={dialogText._id} name="title" defaultValue={dialogText.title} onChange={updateExprience} onBlur={handleError}/>
                <FormHelperText sx={{color:'red'}}>{errors.title?`${t("ExprienceTitileRequired")}`:''}</FormHelperText>
                <TextField sx={{marginTop:"10px"}} id={dialogText._id} label={t("companyName")} fullWidth  name="companyName" defaultValue={dialogText.companyName} onChange={updateExprience} onBlur={handleError}/>
                <FormHelperText sx={{color:'red'}}>{errors.companyName?`${t("companyNameRequired")}`:''}</FormHelperText>
                <FormControl sx={{marginTop:"10px"}} fullWidth size="large">
                <InputLabel id="demo-select-small-label">{t("employmentType")}</InputLabel>
                <Select labelId="demo-select-small-label" 
                      defaultValue={dialogText.employmentType}
                      name ="employmentType"
                      id={dialogText._id}
                      onChange={updateExprience}
                      onBlur={handleError}
                      label={t("employmentType")} >
                      {companyNames.map((name) => (
                      <MenuItem key={name} value={name}>{t(`${name}`)}</MenuItem>
                    ))}
                </Select>
                </FormControl>
                <FormHelperText sx={{color:'red'}}>{errors.employmentType?`${t("SelectEmployementType")}`:''}</FormHelperText>
                <Grid fullWidth container spacing={2}>
                  <Grid item xs={12} sm={6}>
                  <TextField sx={{marginTop:"10px"}} id={dialogText._id} label={t("startedDate")} fullWidth defaultValue={dialogText.startedDate}  name="startedDate" type="number" inputProps={{min:1900,max:2500,step: 1,}} onChange={updateExprience} onBlur={handleError}/>
                  <FormHelperText sx={{color:'red'}}>{errors.startedDate?`${t("ExpriencestartedDateRequired")}`:''}</FormHelperText>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                  <TextField sx={{marginTop:"10px"}} id={dialogText._id} label={t("endDate")} fullWidth defaultValue={dialogText.endDate}         name="endDate" type="number" onBlur={handleError}
                            inputProps={{min:1900,max:2500,step: 1,}} onChange={updateExprience}/>
                <FormHelperText sx={{color:'red'}}>{errors.endDate?`${t("ExprienceendDateRequired")}`:''}</FormHelperText>
                  </Grid>
                </Grid>
                {errorMsg?<Alert severity='error'>{t(`${errorMsg}`)}</Alert>:''}
            </DialogContent>
            <DialogActions>
            <IconButton sx={{marginRight:'auto'}} size="medium" onClick={()=>handleDelete(dialogText._id)}>
              <DeleteIcon fontSize="inherit"/>
            </IconButton>
              <Button onClick={handleEditClose}>{t("Cancel")}</Button>
              <Button disabled={isDisabled} size='small'  variant='contained' type="submit" >{t("Update")}</Button>
            </DialogActions>
            </Box>
       </Dialog>
       </Box>
    </Box>
  )
}

export default EditExprience
