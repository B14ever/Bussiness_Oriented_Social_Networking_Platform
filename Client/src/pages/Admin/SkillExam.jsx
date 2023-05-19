import React, { useEffect,useState} from 'react'
import { Box,Typography,LinearProgress, Divider,TextField,FormHelperText,Button,Link} from '@mui/material/node'
import { useSkillAssesmentContext } from '../../Context/Admin/SkillAssesmentContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
const SkillExam = () => {
  const {t} = useLanguage()
  const {assesments,dispatch} = useSkillAssesmentContext()
  const navigate = useNavigate()
  const [data,setData] = useState({Program:'',Description:''})
  const [error,setError] = useState({Program:'',Description:''})
  useEffect(() => {
       const GetData = async ()=>{
        try{
          dispatch({ type: 'ASSESSMENT_LODNING'})
          const responce = await axios.get('/skillAssessment')
          const data = responce.data.Assessment
          setTimeout(()=>{dispatch({ type: 'GET_ASSESSMENT',payload:data})} ,1000)
        }
        catch(err){
            console.error(err)
        }
    }
    GetData()
  .catch(console.error);
  }, []);
  const clear = () =>{
    setData({Program:'',Description:''})
    setError({Program:'',Description:''})
}
  const checkProgram = (e)=>{
    const {name , value} = e.target
    const check = assesments.assesments.some(list => list.typeOfStudy === value)
    if(check){
      setError({...error,[name]:'ProgrmaAlreadyExsist'})
    }
  }
  const handleChange = (e)=>{
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setError({...error,[name]:false})
  }
  const handleSubmit = (e) =>{
    e.preventDefault()
    setError('')
    const errors = validateForm()
        if (Object.keys(errors).length === 0) {
          localStorage.setItem('PROGRAM_TYPE',data.Program)
          localStorage.setItem('Description',data.Description)
          navigate('creatQuetion')
        }
        else {
          setError(errors);
         }
  }
  const validateForm =()=>{
    const formsErrors ={}
    if(!data.Program){
      formsErrors.Program = 'ProgramTypeRequired'
    }
    if(!data.Description){
      formsErrors.Description= 'DescriptionRequired'
    }
  return formsErrors
  }
  const disable = error.Program
  return (
    <Box  sx={{marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
      <Box p={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
         height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
      {
         assesments.loading?
         <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Typography mt={1} variant='subtitle2'>{t("NewAssessment")}</Typography>
        </Box>:
        <Box sx={{display:'flex',mt:1,flexDirection:'column'}}>
            <Typography variant='subtitle2'>{t("NewAssessment")}</Typography>
            <Divider/>
            <Box mt={2} sx={{width:{lg:'60%',xs:'100%',md:'80%'},alignSelf:'center',display:'flex',flexDirection:'column',gap:1}}>
              <TextField name='Program' fullWidth label={t("Program")} id="fullWidth"
              onChange={handleChange} onBlur={checkProgram}  value={data.Program || ''} />
              <FormHelperText 
                 sx={{color:'red',width:{xs:'100%',md:'50%'}}}>
                {error.Program?`${t(`${error.Program}`)}`:''}
              </FormHelperText>
              <TextField onChange={handleChange} name='Description'  label={t("Content")} fullWidth variant="filled" value={data.Description || ''} rows={2} multiline/>
              <FormHelperText 
                sx={{color:'red',width:{xs:'100%',md:'50%'}}}>
                {error.Description?`${t(`${error.Description}`)}`:''}
              </FormHelperText>
              <Typography variant='subtitle1' sx={{color:'#A4A4A4'}}>{t("DescribeTheContent")}</Typography>
              <Box pt={1} sx={{display:'flex',justifyContent:'flex-end',gap:'1rem'}}>
               <Button  color="error" onClick={clear} variant="outlined">{t("Clear")}</Button>
               <Button onClick={handleSubmit} disabled={disable}  sx={{alignSelf:'flex-end'}} variant="contained">{t("Next")}</Button>
              </Box>
          </Box>
        </Box>
      } 
      </Box>
    </Box>
  )
}

export default SkillExam
