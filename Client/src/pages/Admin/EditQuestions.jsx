import React, {useState,useReducer, useEffect} from 'react'
import { Box,Typography,Divider,TextField, Grid, Button,MenuItem,Paper,IconButton,Alert,Snackbar,Backdrop,LinearProgress,CircularProgress, Tooltip, Dialog, DialogTitle, DialogContent,DialogContentText,DialogActions} from '@mui/material/node'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import {styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useSkillAssesmentContext } from '../../Context/Admin/SkillAssesmentContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    fontSize:'1rem'
  }));
  const intialstate ={
    questionText:"",
    optionOne:"",
    optionTwo:"",
    optionThree:"",
    optionFour:"",
    correctAnswer:"", 
};
const reducer = (currentState, action) => {
    switch (action.type) {
      case `setQuestionText`:
        return {
          ...currentState,
          questionText: action.value,
        };
      case `setOptionOne`:
        return {
          ...currentState,
          optionOne: action.value,
        };
      case `setOptionTwo`:
        return {
          ...currentState,
          optionTwo: action.value,
        };
      case `setOptionThree`:
        return {
          ...currentState,
          optionThree: action.value,
        };
      case `setOptionFour`:
        return {
          ...currentState,
          optionFour: action.value,
        };
      case `setCorrectAnswer`:
        return {
          ...currentState,
          correctAnswer: action.value,
        };
     case `clear`:
            return {};
      default:
        return currentState;
    }
  };
const EditQuestions = () => {
    const typeofStudy = localStorage.getItem("PROGRAM_TYPE")
    const {assesments,dispatch} = useSkillAssesmentContext()
    const [open, setOpen] = useState(false);
    const [warnnig,setWaring] = useState(false)
    const [warnnigMsg,setWaringMsg] = useState('')
    const [success,setSuccess] = useState(false)
    const [successMsg,setSuccessMsg] = useState('')
    const [questions,setQuetions] = useState([])
    const [newQuestions,setNewQuetions] = useState({})
    const [description,setDescription] = useState('')
    const [dialog,setDialog] = useState(false)
    const [deleteDialog,setDeleteDialog] = useState(false)
    const [deleteId,setDeleteId] = useState()
    const [data,updateData] = useReducer(reducer, intialstate)
    const navigate = useNavigate()
    const {t} = useLanguage()
    useEffect(() => {
        const GetData = async ()=>{
         try{
           dispatch({ type: 'ASSESSMENT_LODNING'})
           const responce = await axios.get('/skillAssessment')
           const data = responce.data.Assessment
           setTimeout(()=>{dispatch({ type: 'GET_ASSESSMENT',payload:data})} ,1000)
           const filteredData = data.filter((item) => item.typeOfStudy === typeofStudy)
          
           setQuetions(filteredData[0].questions)
           setDescription(filteredData[0].description)
         }
         catch(err){
             console.error(err)
         }
     }
     GetData()
   .catch(console.error);
   }, []);
 const handleDescriptionSubmit = async () =>{
       setOpen(true)
       try{
        const responce = await axios.post('/skillAssessment/changeDescription',{typeofStudy,description})
        .then(setSuccessMsg('DescriptionChanged'))
         if(responce.status === 200){
            setTimeout(()=>{setOpen(false)},1000)
            setTimeout(()=>{setSuccess(true)},1000)
         }
          
       }catch(err){
        setWaringMsg('unableToUpdateDescription')
        setWaring(true)
        setTimeout(()=>{setOpen(false)},500)
       }
  }
   const handleClose = () => {
    setOpen(false);
  };
  const  OpenDialog= () => {
    updateData({type:'clear'})
    setDialog(true);
  };
  const OpenDeleteDialog = (id) =>{
    setDeleteId(id)
    setDeleteDialog(true)
  }
  const closeDialog = () => {
    setDialog(false);
  };
  const closeDeleteDialog = () =>{
    setDeleteDialog(false)
  }
  const handleChange = (e) => {
    const {name,value} = e.target
    updateData({ type:name, value:value })
}
const clear = () =>{
    updateData({type:'clear'})
}
const NewQuestion = () =>{
    const optionArray = [data.optionOne,data.optionTwo,data.optionThree,data.optionFour]
    setNewQuetions({question:data.questionText,options:optionArray,correctAnswer:data.correctAnswer})
}
const hanleSubmit = async (e) =>{
    e.preventDefault()
    try{
      setOpen(true)
     const responce =  await axios.post('/skillAssessment/newQuestion',{typeofStudy,newQuestions})
     .then(setDialog(false))
     .then(setTimeout(()=>{setOpen(false)},1000)) 
     const data = responce.data.Assessment
     setTimeout(()=>{dispatch({ type: 'GET_ASSESSMENT',payload:data})} ,1000)
     const filteredData = data.filter((item) => item.typeOfStudy === typeofStudy)
     setQuetions(filteredData[0].questions)
     if(responce.status === 200){
        setTimeout(()=>{ setSuccessMsg('newQuestionAdd')},1000)
        setTimeout(()=>{ setSuccess(true)},1000)
        
     }
     
    }
    catch (err) {
        setWaringMsg('newQestionsNotAdd')
        setWaring(true)
        setTimeout(()=>{setOpen(false)},500)
    }
  }
const handleDelete = async () => {
    const deleteQuestion = questions.filter((item)=> item._id !== deleteId)
    try {
        setOpen(true)
        const responce = await axios.post('/skillAssessment/delete',{typeofStudy,deleteQuestion})
        .then(setDeleteDialog(false))
        .then(setTimeout(()=>{setOpen(false)},1000)) 
        const data = responce.data.Assessment
        setTimeout(()=>{dispatch({ type: 'GET_ASSESSMENT',payload:data})} ,1000)
        const filteredData = data.filter((item) => item.typeOfStudy === typeofStudy)
        setQuetions(filteredData[0].questions)
        if(responce.status === 200){
           setTimeout(()=>{ setSuccessMsg('QuestionDelted')},1000)
           setTimeout(()=>{ setSuccess(true)},1000)  
        }
    }  catch (err) {
      setWaringMsg('unableToDeleteQuestion')
      setWaring(true)
      setTimeout(()=>{setOpen(false)},500)
  }
    }
  const descriptionButton = description.length === 0
  const Select = data.optionOne && data.optionTwo && data.optionThree && data.optionFour
  const newQeastionButton = Select && data.questionText && data.correctAnswer
  return (
    <Box  sx={{marginTop:'97px',width:'100%',display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:"#E7EBF0",height: 'fit-content'}}>
    {assesments.loading?
        <Box p={2} sx={{backgroundColor:'#fff',display:'flex',flexDirection:'column',gap:'.9rem'
        ,margin:'10px 0 10px',height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
            <Box sx={{ width: '100%' }}>
            <LinearProgress />
            <Typography mt={1} variant='subtitle2'>{t("EditQeustion")}</Typography>
            </Box>
        </Box>:
        <Box sx={{backgroundColor:'#fff',display:'flex',flexDirection:'column',gap:'.9rem'
        ,margin:'10px 0 3px',height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
            <Box sx={{display:'flex',alignItems:'center',gap:'2rem'}}>
            <IconButton size="large"  onClick={()=>navigate(-1)} aria-label="upload picture">
            <KeyboardBackspaceOutlinedIcon fontSize="inherit"/>
            </IconButton>
            <Typography variant='subtitle2'  mt={.5} sx={{color:'#666',fontSize:'1.5rem'}}>{t("EditQeustion")}</Typography>
            </Box>
            <Divider textAlign='left'>{typeofStudy}</Divider>
            <Box pl={2} pr={2}  sx={{widht:'100%',height: 'fit-content',display:'flex',flexDirection:'column',gap:'1rem'}}>
            <TextField label={t("Description")} multiline rows={3} 
            value={description || ''}
            onChange={(e)=>setDescription(e.target.value)}/>
             <Box sx={{display:'flex',justifyContent:'flex-end',gap:'1rem'}}>
                <Button variant='outlined' disabled={descriptionButton} onClick={()=>{setDescription('')}}>{t("Clear")}</Button>
                <Button variant='outlined' disabled={descriptionButton} onClick={handleDescriptionSubmit}>{t("save")}</Button>
             </Box>
            </Box>
            <Box pl={1} mb={1} sx={{width:'100%',display:'flex',justifyContent:'flex-start'}}>
               <Button variant='outlined' onClick={OpenDialog}>{t("AddQuestion")}</Button>
            </Box>
            {
      questions.length > 0?
      <Box pb={1} pl={1} pr={1} sx={{backgroundColor:'#fff',display:'flex',flexDirection:'column',
           gap:'.9rem',margin:'1px 0 10px',height: 'fit-content',width:'100%'}}>
            <Divider>{t("Question")}</Divider>
          {questions.map((item,index)=>{
            return <Box key={index} sx={{widht:'100%',display:'flex',flexDirection:'column',gap:'1rem'}}>
              <Box  sx={{widht:'100%',height: 'fit-content',display:'flex',alignItems:'center'}}>
                <Typography>{index + 1}.  {item.question}</Typography>
                <IconButton  size="large" sx={{alignSelf:'flex-start',marginLeft:'auto',marginRight:'1rem'}}  onClick={()=>OpenDeleteDialog(item._id)} aria-label="upload picture">
                <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              </Box>
              <Grid   spacing={2} container>
                <Grid item sm={6} xs={12}>
                <Item sx={{color:`${item.options[0] === item.correctAnswer?'green':''}`}} >A. {item.options[0]}</Item>
                </Grid>
                <Grid item sm={6} xs={12}>
                  <Item sx={{color:`${item.options[1] === item.correctAnswer?'green':''}`}}>B. {item.options[1]}</Item>
                </Grid>
              </Grid>
              <Grid   spacing={2} container>
                <Grid item sm={6} xs={12}>
                  <Item sx={{color:`${item.options[2] === item.correctAnswer?'green':''}`}}>C. {item.options[2]}</Item>
                </Grid>
                <Grid item sm={6} xs={12} >
                  <Item sx={{color:`${item.options[3] === item.correctAnswer?'green':''}`}}>D. {item.options[3]}</Item>
                </Grid>
              </Grid>
              <Divider sx={{marginTop:'.5rem',marginBottom:'.5rem'}}></Divider>
            </Box>})}
            <Box sx={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
             <Tooltip title={t("New")}>
              <IconButton size="large" onClick={OpenDialog}   aria-label="upload picture">
                <AddCircleOutlineIcon fontSize="inherit"/>
              </IconButton>
             </Tooltip>
            </Box>
        </Box>:null}
        <Dialog open={dialog} onClose={closeDialog} fullWidth>
                <Box sx={{display:'flex',height:'fit-content',alignItems:'center',width:'100%'}}>
                <DialogTitle>{t("AddNewQuestion")}</DialogTitle>
                <IconButton sx={{marginLeft:'auto'}} onClick={closeDialog}  size="large"   aria-label="upload picture">
                     <CloseIcon fontSize="inherit"/>
                </IconButton>
                </Box>
                 <Box component="form" onSubmit={hanleSubmit}>
                    <DialogContent>
                    <Box sx={{width:'100%',display:'flex',flexDirection:'column',gap:'1rem'}}>
                <TextField  name='setQuestionText' value={data.questionText || ''} onChange={handleChange} label={t("Question")} fullWidth variant="standard"/>
                <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                    <TextField name='setOptionOne' value={data.optionOne || ''} onChange={handleChange} fullWidth label={t('OptionOne')} variant="outlined"/>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField name='setOptionTwo' value={data.optionTwo || ''} onChange={handleChange} fullWidth label={t('OptionTwo')} variant="outlined"/>
                </Grid>
                </Grid>
                <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                <TextField name='setOptionThree' value={data.optionThree || ''} onChange={handleChange} fullWidth label={t('OptionThree')} variant="outlined"/>
                </Grid>
                <Grid item xs={12} md={6}>
                <TextField name='setOptionFour' value={data.optionFour || ''} onChange={handleChange} fullWidth label={t('OptionFour')} variant="outlined"/>
                </Grid>
                </Grid>
                <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                <TextField disabled={!Select} fullWidth select label={("Answer")} name='setCorrectAnswer' onChange={handleChange} value={data.correctAnswer || ''}>
                    <MenuItem value={data.optionOne}>{data.optionOne}</MenuItem>
                    <MenuItem value={data.optionTwo}>{data.optionTwo}</MenuItem>
                    <MenuItem value={data.optionThree}>{data.optionThree}</MenuItem>
                    <MenuItem value={data.optionFour}>{data.optionFour}</MenuItem>
                </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box pt={1} sx={{display:'flex',justifyContent:'flex-end',gap:'1rem'}}>
                    <Button   color="error" onClick={clear} variant="outlined">{t("Clear")}</Button>
                    <Button disabled={!newQeastionButton} type="submit" onClick={NewQuestion} variant="outlined" >{t("Add")}</Button>
                    </Box>
                </Grid>
                </Grid>
                </Box>
                    </DialogContent>
                </Box>
        </Dialog>
        <Dialog fullWidth open={deleteDialog} onClose={closeDeleteDialog}>
          <DialogTitle id="alert-dialog-title">{t("DeleteQuestion")}</DialogTitle>
          <DialogContent >
            <DialogContentText textAlign='center'>{t("ConfirmDeleteQuastion")}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={closeDeleteDialog}>{t('Cancle')}</Button>
            <Button onClick={handleDelete} autoFocus>{t('Delete')}</Button>
          </DialogActions>
        </Dialog>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={warnnig} autoHideDuration={2000} onClose={()=>setWaring(false)}>
              <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
              {t(`${warnnigMsg}`)}
              </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={success} autoHideDuration={2000} onClose={()=>setSuccess(false)}>
              <Alert onClose={()=>setSuccess(false)} severity="info" sx={{ width: '100%' }}>
                {t(`${successMsg}`)}
              </Alert>
        </Snackbar>
      </Box>
        }
    </Box>
  )
}

export default EditQuestions
