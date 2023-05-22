import React, { useEffect,useState} from 'react'
import { Box,Typography,LinearProgress, Divider,InputBase,IconButton} from '@mui/material/node'
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { styled, alpha } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import { useLanguage } from '../../Localazation/LanguageContext'
import axios from '../../api/axios'
import { useNavigate } from 'react-router-dom'
const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor:'#E7EBF0',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
const TakeSkillAssessment = () => {
    const {t} = useLanguage()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [assesments,setAssessments] = useState([{typeOfStudy:'',description:''}])
    const [search,setSearch] = useState('')
useEffect(() => {
        const GetData = async ()=>{
         try{
           setLoading(true)
           const responce = await axios.get('/skillAssessment')
           const data = responce.data.Assessment
           setAssessments(data)
           setTimeout(()=>{setLoading(false)},2000)
           
         }
         catch(err){
             console.error(err)
         }
     }
        GetData()
        .catch(console.error);
     }, []);
const handleChoice = (topic,description) =>{
   localStorage.setItem('TOPIC',topic)
   localStorage.setItem('TOPIC_DESCRIPTION',description)
   navigate('qs')
}
    return (
      <Box  sx={{height: 'fit-content',marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
        <Box p={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
           height: 'fit-content',width:{xs:'90%',lg:'60%'}}}>
        {
           loading?
           <Box sx={{ width: '100%' }}>
          <LinearProgress />
          <Typography mt={1} variant='subtitle2'>{t("Skillassessments")}</Typography>
          </Box>:
          <Box p={1} sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
             <Box sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                <IconButton size="large"  onClick={()=>navigate(-1)} aria-label="upload picture">
                <KeyboardBackspaceOutlinedIcon fontSize="inherit"/>
                </IconButton>
              <Typography variant='subtitle2'>{t("Skillassessments")}</Typography>
              </Box>
              <Typography variant='body2'>{t("checkSkills")}</Typography>
              <Divider/>
              <Search  onChange={(e)=>setSearch(e.target.value)}>
                <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
                <StyledInputBase placeholder={t("SearchTopic")} inputProps={{ 'aria-label': 'search' }}/>
              </Search>
              
              <Box>
               {
                assesments.filter(item=>{
                   return item.typeOfStudy.toLowerCase().includes(search.toLowerCase())
                }).map((item,index)=>{
                  return <Box key={index} sx={{display:'flex',flexDirection:'column',gap:'.5rem'}} mt={3}>
                    <Box onClick={()=>handleChoice(item.typeOfStudy,item.description)}  sx={{display:'flex',cursor:'pointer'}} >
                  <img src={`../../../Profile_Image/skill${Math.floor(Math.random() *4)}.png`} style={{ width: '50px', height: '50px',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                  <Box  pl={1} sx={{onMouseEnter: () => {textDecoration:" underline red"},}} >
                      <Typography sx={{fontSize:{xs:'.96rem',sm:'1.2rem'}}}>{item.typeOfStudy}</Typography>
                      <Typography sx={{fontSize:{xs:'.84rem',sm:'.9rem'}}}>{t('topics')}: {item.description}</Typography>
                  </Box>
                    </Box>
                     <Divider/>
                  </Box>
                })
               }
            </Box>
          </Box>
          
        } 
        </Box>
      </Box>
    )
}

export default TakeSkillAssessment
