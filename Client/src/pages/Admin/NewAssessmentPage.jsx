import React, {useState,useReducer, useEffect} from 'react'
import { Box,Typography,Divider,TextField, Grid, Button,MenuItem,Paper,IconButton,Alert,Snackbar,Backdrop,CircularProgress} from '@mui/material/node'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
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
const NewAssessmentPage = ({}) => {
    const typeofStudy = localStorage.getItem("PROGRAM_TYPE")
    const description = localStorage.getItem("Description")
    const navigate = useNavigate()
    const {t} = useLanguage()
    const [questions,setQuetions] = useState([])
    const [data,updateData] = useReducer(reducer, intialstate)
    const [open, setOpen] = useState(false);
    const [warnnig,setWaring] = useState(false)
    const [success,setSuccess] = useState(false)
const onAdd = () =>{
    const optionArray = [data.optionOne,data.optionTwo,data.optionThree,data.optionFour]
    setQuetions([...questions,{question:data.questionText,options:optionArray,correctAnswer:data.correctAnswer}])
}
const handleChange = (e) => {
    const {name,value} = e.target
    updateData({ type:name, value:value })
}
const clear = () =>{
    updateData({type:'clear'})
}
const handlDelete = (question) =>{
  const update = questions.filter((item) => item.question !== question)
  setQuetions(update);
}
const handleClose = () => {
  setOpen(false);
};
const hanleSubmit = async () =>{
  try{
    setOpen(true)
    const responce = await axios.post('/skillAssessment',{typeofStudy,questions,description})
    .then(setTimeout(()=>{setOpen(false)},500)) 
    if(responce.status === 200){
      updateData({type:'clear'})
      setQuetions([])
      setSuccess(true)
    } 
  }
  catch (err) {
        setWaring(true)
  }
}
 const Select = data.optionOne && data.optionTwo && data.optionThree && data.optionFour
 const button = Select && data.questionText && data.correctAnswer
  return (
    <Box  sx={{marginTop:'97px',width:'100%',display:'flex',flexDirection:'column',alignItems:'center',backgroundColor:"#E7EBF0",height: 'fit-content'}}>
      <Box p={2} sx={{backgroundColor:'#fff',display:'flex',flexDirection:'column',gap:'.9rem'
                    ,margin:'10px 0 10px',height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
         <Box sx={{display:'flex',alignItems:'center',gap:'2rem'}}>
         <IconButton size="large"  onClick={()=>navigate(-1)} aria-label="upload picture">
          <KeyboardBackspaceOutlinedIcon fontSize="inherit"/>
         </IconButton>
         <Typography variant='subtitle2'  mt={.5} sx={{color:'#666',fontSize:'1.5rem'}}>{t("AddQeutionAssessment")}</Typography>
        </Box>
        <Divider textAlign='left'>{t('For')} {typeofStudy}</Divider>
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
            <Button  color="error" onClick={clear} variant="outlined">{t("Clear")}</Button>
            <Button disabled={!button} variant="outlined" onClick={onAdd}>{t("Add")}</Button>
            </Box>
         </Grid>
        </Grid>
        </Box>
      </Box>
       {
      questions.length > 0?
      <Box  p={2} sx={{backgroundColor:'#fff',display:'flex',flexDirection:'column',
           gap:'.9rem',margin:'10px 0 10px',height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
          {questions.map((item,index)=>{
            return <Box key={index} sx={{widht:'100%',display:'flex',flexDirection:'column',gap:'1rem'}}>
              <Box  sx={{widht:'100%',height: 'fit-content',display:'flex',alignItems:'center'}}>
                <Typography>{index + 1}.  {item.question}</Typography>
                <IconButton color="primary" sx={{marginLeft:'auto'}} aria-label="delete" onClick={()=>handlDelete(item.question)}>
                  <DeleteIcon />
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
            <Button variant="contained" onClick={hanleSubmit} sx={{marginLeft:'auto'}}><CheckIcon/></Button>
      </Box>:null}
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={warnnig} autoHideDuration={500} onClose={()=>setWaring(false)}>
              <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                {t("unableToaddQuestions")}
              </Alert>
        </Snackbar>
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}} open={success} autoHideDuration={500} onClose={()=>setSuccess(false)}>
              <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                {t("quesdtionAdded")}
              </Alert>
        </Snackbar>
        </Box>
  )
}

export default NewAssessmentPage
