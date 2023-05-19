import React, { useEffect,useState} from 'react'
import { Box,Typography,LinearProgress,IconButton} from '@mui/material/node'
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { useSkillAssesmentContext } from '../../Context/Admin/SkillAssesmentContext'
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
const EditAssessment = () => {
    const navigate = useNavigate()
    const {t} = useLanguage()
  const {assesments,dispatch} = useSkillAssesmentContext()
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
  const handleNavigate = (typeOfStudy) =>{
    localStorage.setItem('PROGRAM_TYPE',typeOfStudy)
    navigate('editQuestion')
  }
  return (
    <Box  sx={{marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
      
      {
         assesments.loading?
         <Box p={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
         height: 'fit-content',width:{xs:'90%',lg:'80%'}}}>
         <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <Typography variant='subtitle2'>{t("EditAssessment")}</Typography>
         </Box>
        </Box>:<Box sx={{display:'flex',flexDirection:'column',width:{xs:'90%',lg:'80%'}}}>
            <Box p={1} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
                  height: 'fit-content',}}>
              <Typography variant='subtitle2'>{t("EditAssessment")}</Typography>
            </Box>
            {
             assesments.assesments.map((item,index)=>{
                return <Box key={index} p={1} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
                       height: 'fit-content',display:'flex'}}>
                       <Box>
                          <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{item.typeOfStudy}</Typography>
                          <Typography ml={1} sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>
                            {item.questions.map((element) => element).length} {t("Question")}</Typography>
                       </Box>
                      <IconButton size="large" sx={{marginLeft:'auto'}} onClick={()=>handleNavigate(item.typeOfStudy)}  aria-label="upload picture">
                        <ModeOutlinedIcon fontSize="inherit"/>
                      </IconButton>
                      </Box>
              })
            }
               </Box>
       
        
      } 
      </Box>
   
  )
}

export default EditAssessment
