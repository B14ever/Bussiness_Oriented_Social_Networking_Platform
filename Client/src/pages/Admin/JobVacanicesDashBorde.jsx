import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,Avatar,LinearProgress,Button,} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom';
export const Main_One = styled(Box)(({ theme }) => ({
  width:'100%',
  marginTop: '100px', 
  display: 'flex',
  flexDirection:'column',
  backgroundColor:"#E7EBF0",
}));
export const Section_One = styled(Box)(({ theme }) => ({
  borderRadius:'6px',
  backgroundColor: '#fff',
  margin: '10px auto 5px', 
  height: 'fit-content', 
  width:'57%',
 [theme.breakpoints.down('sm')]: {width: '90%'},
 [theme.breakpoints.down('md')]: {width: '80%'},
 [theme.breakpoints.down('lg')]: {width: '70%'},
}));

const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius:'10px',
  backgroundColor:'#E7EBF0',
  '&:hover': {
    backgroundColor:'#E7EBF0',
  },
 marginRight:'1rem',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));
const JobVacanicesDashBorde = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const id = user.user._id
  const navigate = useNavigate()
  const [jobs,setJobs] = useState([])
  const [loading,setLoading] = useState(false)
  const [limit,setLimit] = useState(3)
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.get(`/vacanices/${id}`)
     const data = responce.data.jobs
     setJobs(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [])
    
    const handleNavigate = async (pagesId) =>{
      navigate(`/AdminDashborde/companyPages/${pagesId}`)
   }
  return (
    <Main_One>
      { loading?
        <Section_One>
          <Box p={1}>
          <LinearProgress/>
          <Typography variant='subtitle2'>{t("job")}</Typography>
          </Box>
          <Divider/>
       </Section_One>:
       <Section_One>
          <Box p={1} sx={{display:'flex',alignItems:'center'}}>
            <Typography ml={1} variant='subtitle2'>{t("job")}</Typography>
            <Typography sx={{marginLeft:'auto'}} variant='subtitle2'>{jobs.length} {t("JobVacancies")}</Typography>
          </Box>
          <Divider/>
          <Box>
              {
                jobs.slice(0,limit).map((job,i)=>{
                  return <Box key={i} p={1} sx={{display:'flex',flexDirection:'column'}}>
                     <Box sx={{display:'flex',alignItems:'center',gap:'.5rem'}}
                       onClick={()=>handleNavigate(job.recureter._id)}>
                      <ProfilePhoto  onClick={()=>handleClick(friend._id)}
                       src={`../../../Profile_Image/${job.recureter.logo}`}/>
                       <Typography variant='subtitle2' sx={{cursor:'pointer','&:hover': {textDecoration: 'underline'}}}>{job.recureter.companyName}</Typography>
                      </Box>
                      <Box pl={6}>
                          <Box sx={{display:'flex',flexDirection:'column'}}>
                          <Typography >{t("Job")} : {job.jobTitle}</Typography>
                          <Typography>{t('jobRequirements')} : {job.jobRequirements}</Typography>
                          <Typography>{t('jobResponsibilities')} : {job.jobResponsibilities}</Typography>
                          <Typography>{t('jobLocation')} : {job.jobLocation}</Typography>
                          <Typography>{t('workPlaceType')} : {job.workType}</Typography>
                          <Typography>{t('jobType')} : {job.jobType}</Typography>
                          </Box>
                        </Box>
                     <Divider/>
                  </Box>
                })
              }
              <Box  sx={{display:'flex',justifyContent:'center'}}>
               {limit>3?<KeyboardArrowUpOutlinedIcon onClick={()=>setLimit(prev=>prev-3)}/>:null}
            </Box> 
               <Box  sx={{display:'flex',justifyContent:'center'}}>
               <Button startIcon={<ExpandMoreOutlinedIcon/>} sx={{textTransform:'none'}} onClick={()  =>setLimit(prev=>prev + 3)}>
              {t('seeMore')}
               </Button>
             </Box> 
             </Box>
      </Section_One>
      }
  </Main_One>
  )
}

export default JobVacanicesDashBorde
