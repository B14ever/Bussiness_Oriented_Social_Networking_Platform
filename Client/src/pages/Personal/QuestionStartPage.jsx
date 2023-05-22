import React,{useEffect} from 'react'
import { Box,Typography,IconButton, Divider,Button } from '@mui/material/node'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import Wifi1BarRoundedIcon from '@mui/icons-material/Wifi1BarRounded';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../Localazation/LanguageContext';

const QuestionStartPage = () => {
    const TOPIC = localStorage.getItem('TOPIC')
    const TOPIC_DESCRIPTION = localStorage.getItem('TOPIC_DESCRIPTION')
    const navigate = useNavigate()
    const {t} = useLanguage()
    useEffect(() => {
      localStorage.setItem('count',0);
      localStorage.setItem('score',0);
    }, []);
const iconList = [{name:'instruction1',icon:<ListOutlinedIcon sx={{color:'#666'}}/>},{name:'instruction2',icon:<AccessTimeOutlinedIcon sx={{color:'#666'}}/>},{name:'instruction3',icon:<AssignmentTurnedInOutlinedIcon sx={{color:'#666'}}/>}]
const instructionList = ['instruction4','instruction5','instruction6']
  return (
    <Box  sx={{height: 'fit-content',marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
        <Box p={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
           height: 'fit-content',width:{xs:'90%',lg:'60%'}}}>
            <Box sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                <IconButton size="large"  onClick={()=>navigate(-1)} aria-label="upload picture">
                <KeyboardBackspaceOutlinedIcon fontSize="inherit"/>
                </IconButton>
              <Typography variant='subtitle2'>{t("ChangeTopics")}</Typography>
            </Box>
            <Divider/>
            <Box mt={1} p={1}>
            <img src={`../../../Profile_Image/skill${Math.floor(Math.random() *4)}.png`}/>
            <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{TOPIC}</Typography>
            <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t('topics')}: {TOPIC_DESCRIPTION}</Typography>
            <Box mt={3} mb={2} >
            {iconList.map((item,index)=>{
                return <Box key={index} mt={1} sx={{width:'100%',height:'fit-content',display:'flex',alignItems:'center',gap:'.5rem'}}>
                {item.icon}
                <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t(`${item.name}`)}</Typography>
               </Box>}) } 
            </Box> 
            <Divider/>
             <Box mt={2}>
               <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{t("beforeStart")}</Typography>
               <Box mt={2} mb={2} >
                {instructionList.map((item,index)=>{
                return <Box key={index} sx={{width:'100%'}}>
                 <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem',alignSelf:'flex-end'}}}>
                <Wifi1BarRoundedIcon fontSize='small'/>{t(`${item}`)}</Typography>
               </Box>}) } 
              </Box>
              <Divider/>
              <Box mt={2} sx={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                <Button variant='contained' onClick={()=>{navigate('exam')}}>{t("Start")}</Button>
              </Box>
             </Box>
            </Box>
        </Box>
   </Box>
  )
}

export default QuestionStartPage
