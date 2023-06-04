import React, { useEffect,useState} from 'react'
import {Box, Typography,Divider,IconButton,Tooltip, Avatar,LinearProgress} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
const Main = styled(Box)(({ theme }) => ({
  marginTop: '100px', 
  display: 'flex',
  backgroundColor:"#E7EBF0",
  justifyContent:'center'
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
const Pages = () => {
  const {t} = useLanguage()
  const {user} = useAthuContext()
  const id = user.user._id
  const navigate = useNavigate()
  const [pages,setPages] = useState([])
  const [loading,setLoading] = useState(false)
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.post(`/pages/myPages`,{id})
     const data = responce.data.pages[0].pages
     setPages(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, []) 
  const handleClick = (id) =>{
    navigate(`/PersonalAccountProfile/PersonalNetwork/pages/${id}`)
  }
  return (
    <Main>
     { 
     loading?
      <Section>
        <LinearProgress/>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Typography variant='subtitle2'>{t("YourPages")}</Typography>
        </Box>
      </Section>
       :
      <Section>
        {
          pages.length > 0 ?
        <Box>
        <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
          <Tooltip title={t("Back")}>
            <IconButton onClick={()=>navigate(-1)}>
              <KeyboardBackspaceIcon/>
            </IconButton>
          </Tooltip>
          <Typography variant='subtitle2'>{t("YourPages")}</Typography>
        </Box>
        <Divider/>
        {
           pages.map((page,i)=>{
            return <HoverBox sx={{cursor:'pointer'}} key={i}>
                     <Box p={1.5} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                       <ProfilePhoto  onClick={()=>handleClick(page._id)}
                       src={`../../../Profile_Image/${page.logo}`}/>
                       <Typography onClick={()=>handleClick(page._id)}>{page.companyName}</Typography>
                      </Box>
                      <Divider/>
                   </HoverBox>})}
        </Box>:
         <Box>
          <Box p={1} sx={{display:'flex',alignItems:'center'}}>
            <Tooltip title={t("Back")}>
              <IconButton onClick={()=>navigate(-1)}>
                <KeyboardBackspaceIcon/>
              </IconButton>
            </Tooltip>
          </Box>
          <Divider/>
          <Box sx={{height:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
          <Box component='img'  sx={{height:{md:'460px',xs:'300px'},width:{xs:'50%',md:'100'}}} src={`../../../Profile_Image/pagesNews.jpg`}/>
          <Typography  onClick={()=>navigate(-1)} >{t("FollowCompanies")}</Typography>
          </Box>
         </Box>
        }
      </Section>}
    </Main>
  )
}

export default Pages
