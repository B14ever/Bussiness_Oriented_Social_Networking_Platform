import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,IconButton,Tooltip, Avatar,LinearProgress,Button} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
const Main = styled(Box)(({ theme }) => ({
  marginTop: '100px', 
  display: 'flex',
  backgroundColor:"#E7EBF0",
  justifyContent:'center',
  width:'100%'
}));
const Section = styled(Box)(({ theme }) => ({
  borderRadius:'6px',
  backgroundColor: '#fff',
  margin: '10px 0 5px',
  height: 'fit-content',
  width:'57%',
  [theme.breakpoints.down('sm')]: {width: '100%'},
  [theme.breakpoints.down('md')]: {width: '85%'},
  [theme.breakpoints.down('lg')]: {width: '80%'},
}));
const HoverBox = styled(Box)(({ theme }) => ({
  '&:hover': {
    background: "#E7EBF0",
    },
}));
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
}));
const CompanyPageUsers = () =>  {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const id = user.user._id
  const navigate = useNavigate()
  const [pages,setPages] = useState([])
  const [loading,setLoading] = useState(false)
  const [limit,setLimit] = useState(5)
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.get(`/users/pageusers`)
     console.log(responce.data)
     const data = responce.data.Pages
     setPages(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, []) 
  const handleClick = (id) =>{
    navigate(`${id}`)
  }
  return (
    <Main>
     { 
     loading?
      <Section>
        <LinearProgress/>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Typography variant='subtitle2'>{t("PageUsers")}</Typography>
        </Box>
      </Section>
       :
      <Section>
        <Box>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Tooltip title={t("Back")}>
            <IconButton onClick={()=>navigate(-1)}>
              <KeyboardBackspaceIcon/>
            </IconButton>
          </Tooltip>
          <Typography variant='subtitle2'>{t("PageUsers")}</Typography>
          <Typography sx={{marginLeft:'auto'}} variant='subtitle2'>{pages.length} {t("TotalUsers")}</Typography>
        </Box>
        <Divider/>
        {
           pages.slice(0,limit).map((page,i)=>{
            return <HoverBox sx={{cursor:'pointer'}} key={i}>
                     <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                       <ProfilePhoto  onClick={()=>handleClick(page._id)}
                       src={`../../../Profile_Image/${page.logo}`}/>
                       <Typography onClick={()=>handleClick(page._id)}>{page.companyName}</Typography>
                      </Box>
                      <Divider/>
                   </HoverBox>})}
                   <Box  sx={{display:'flex',justifyContent:'center'}}>
            {limit>5?<KeyboardArrowUpOutlinedIcon onClick={()=>setLimit(prev=>prev-5)}/>:null}
            </Box> 
          <Box  sx={{display:'flex',justifyContent:'center'}}>
            <Button startIcon={<ExpandMoreOutlinedIcon/>} sx={{textTransform:'none'}} onClick={()=>setLimit(prev=>prev + 5)}>
              {t('seeMore')}
            </Button>
          </Box> 
        </Box>
      </Section>}
    </Main>
  )
}
export default CompanyPageUsers
