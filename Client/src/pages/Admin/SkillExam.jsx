import React, { useEffect } from 'react'
import { Box,Typography,LinearProgress} from '@mui/material/node'
import { useSkillAssesmentContext } from '../../Context/Admin/SkillAssesmentContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
const SkillExam = () => {
  const {t} = useLanguage()
  const {assesments,dispatch} = useSkillAssesmentContext()
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
  return (
    <Box  sx={{marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
    { assesments.loading?
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>:
      <Box p={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
         height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
       <Typography variant='subtitle2'>{t("SkillAssessment")}</Typography>
      </Box>
    }
    </Box>
  )
}

export default SkillExam
