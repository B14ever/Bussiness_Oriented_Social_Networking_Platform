import React, { useEffect,useState} from 'react'
import { Box,Typography,LinearProgress} from '@mui/material/node'
import { useSkillAssesmentContext } from '../../Context/Admin/SkillAssesmentContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
const EditQuestion = () => {
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
      <Box p={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
         height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
      {
         assesments.loading?
         <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Typography variant='subtitle2'>{t("EditAssessment")}</Typography>
        </Box>:
        <Box>
            <Typography variant='subtitle2'>{t("EditAssessment")}</Typography>
        </Box>
      } 
      </Box>
    </Box>
  )
}

export default EditQuestion
