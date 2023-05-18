import React, {useState,useReducer, useEffect} from 'react'
import { Box,Typography,Divider,TextField, Grid, Button,MenuItem} from '@mui/material/node'
import { useLanguage } from '../../Localazation/LanguageContext'
const PROGRAM_TYPE = localStorage.getItem("PROGRAM_TYPE")
const Description = localStorage.getItem("Description")
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
    const {t} = useLanguage()
    const [questions,setQuetions] = useState([{question:'',options:[],correctAnswer:''}])
    const [data,updateData] = useReducer(reducer, intialstate)
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
useEffect(()=>{
    console.log(questions)
},[questions])
  return (
    <Box  sx={{marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
      <Box p={2} sx={{backgroundColor:'#fff',display:'flex',flexDirection:'column',gap:'.9rem'
                    ,margin:'10px 0 10px',height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
         <Box sx={{ width: '100%' }}>
        <Typography variant='subtitle2'>{t("AddQeutionAssessment")}</Typography>
        </Box>
        <Divider textAlign='left'>{t('For')} {PROGRAM_TYPE}</Divider>
        <Box sx={{width:'100%',display:'flex',flexDirection:'column',gap:'1rem'}}>
         <TextField  name='setQuestionText' defaultValue={data.questionText} onChange={handleChange} label={t("Question")} fullWidth variant="standard"/>
         <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <TextField name='setOptionOne' defaultValue={data.optionOne} onChange={handleChange} fullWidth label={t('OptionOne')} variant="outlined"/>
          </Grid>
          <Grid item xs={12} md={6}>
           <TextField name='setOptionTwo' defaultValue={data.optionTwo} onChange={handleChange} fullWidth label={t('OptionTwo')} variant="outlined"/>
         </Grid>
        </Grid>
        <Grid container spacing={1}>
         <Grid item xs={12} md={6}>
          <TextField name='setOptionThree' defaultValue={data.optionThree} onChange={handleChange} fullWidth label={t('OptionThree')} variant="outlined"/>
         </Grid>
         <Grid item xs={12} md={6}>
          <TextField name='setOptionFour' defaultValue={data.optionFour} onChange={handleChange} fullWidth label={t('OptionFour')} variant="outlined"/>
         </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
           <TextField fullWidth select label="Select" defaultValue={data.correctAnswer}>
             <MenuItem value={data.optionOne}>{data.optionOne}</MenuItem>
             <MenuItem value={data.optionTwo}>{data.optionTwo}</MenuItem>
             <MenuItem value={data.optionThree}>{data.optionThree}</MenuItem>
             <MenuItem value={data.optionFour}>{data.optionFour}</MenuItem>
          </TextField>
         </Grid>
         <Grid item xs={12} md={6}>
            <Box pt={1} sx={{display:'flex',justifyContent:'flex-end',gap:'1rem'}}>
            <Button  color="error" onClick={clear} variant="outlined">{t("Clear")}</Button>
            <Button variant="outlined" onClick={onAdd}>{t("Add")}</Button>
            </Box>
         </Grid>
        </Grid>
        </Box>
      </Box>
    </Box>
  )
}

export default NewAssessmentPage
