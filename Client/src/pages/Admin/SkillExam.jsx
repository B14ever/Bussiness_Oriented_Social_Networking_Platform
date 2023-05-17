import React, { useEffect,useState} from 'react'
import { Box,Typography,LinearProgress, Divider,TextField,FormHelperText,Button} from '@mui/material/node'
import { useSkillAssesmentContext } from '../../Context/Admin/SkillAssesmentContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
const SkillExam = () => {
  const {t} = useLanguage()
  const {assesments,dispatch} = useSkillAssesmentContext()
  const [error,setError] = useState(false)
  useEffect(() => {
       const GetData = async ()=>{
        try{
          dispatch({ type: 'ASSESSMENT_LODNING'})
          const responce = await axios.get('/skillAssessment')
          const data = responce.data
          setTimeout(()=>{dispatch({ type: 'GET_ASSESSMENT',payload:data})} ,2000)
        }
        catch(err){
            console.error(err)
        }
    }
    GetData()
  .catch(console.error);
  }, []);
  useEffect(()=>{
    console.log(assesments.assesments)
  })
  const checkProgram = ()=>{
    console.log('next')
  }
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
              <TextField fullWidth label={t("Program")} id="fullWidth" />
              <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>Error</FormHelperText>
              <TextField   label={t("Content")} fullWidth variant="filled" rows={2} multiline/>
              <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>Error</FormHelperText>
              <Typography variant='subtitle1' sx={{color:'#A4A4A4'}}>{t("DescribeTheContentofAssesment")}</Typography>
               <Button sx={{alignSelf:'flex-end'}} variant="contained">Next</Button>
          </Box>
        </Box>
      } 
      </Box>
    </Box>
  )
}

export default SkillExam
