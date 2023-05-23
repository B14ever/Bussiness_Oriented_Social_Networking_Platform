import React,{useEffect,useState} from 'react'
import { Box,Typography,Divider,LinearProgress,Grid,Avatar, Button} from '@mui/material/node'
import { styled } from '@mui/material/styles';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
const Peoples = styled(Box)(({ theme }) => ({
  borderRadius:'6px',
  display:'flex',
  flexDirection:'column',
  height:'fit-content',
  boxShadow:"rgba(149, 157, 165, 0.1) 0px 8px 24px",
  cursor:'pointer',
  "&:hover": {
    boxShadow:"none",
    transform: "scale(1.099)",
  },
}));
const Herf = styled(Typography)(({ theme }) => ({
  "&:hover": {
    textDecoration:'underline'
  },
}));
const People = () => {
    const {user} = useAthuContext()
    const Email = user.user.Email
    const {t} = useLanguage()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [people,setPeople] = useState([{_id:'',FirstName:'',LastName:'',Country:'',City:''}])
  useEffect(() => {
      const GetData = async ()=>{
      try{
      setLoading(true)
      const responce = await axios.post(`/Peoples`,{Email})
      const data = responce.data.PersonalAccounts
      setPeople(data)
      setTimeout(()=>{setLoading(false)},1200)
      }
      catch(err){
          console.error(err)
      }
  }
      GetData()
      .catch(console.error);
  }, [])
  const handleClick =(id)=>{
      navigate(`${id}`)
  }
  return (
    <Box p={2} sx={{borderRadius:'6px',backgroundColor:'#fff'}}>
      {loading?
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px'}}>
        <LinearProgress />
        <Typography  variant='subtitle2'>{t("PeopleYouMayKnow")}</Typography>
      </Box>:
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px',display:'flex',flexDirection:'column'}}>
        <Typography  variant='subtitle2'>{t("PeopleYouMayKnow")}</Typography>
        <Divider/>
        <Grid mt={2} container spacing={2}>
          {people.map((item,index)=>
          <Grid key={index} item lg={3} xs={6} sm={4}>
           <Peoples>
             <Box onClick={()=>handleClick(item._id)} sx={{ borderRadius:'6px',position: 'relative'}}>
                <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
              <Avatar src={`../../../Profile_Image/${item.profilePhoto?item.profilePhoto:'Avater.png'}`}
                sx={{ position: 'absolute',width:'100px',height:"100px",top: '20%',left:'25%'}}/>
              </Box>
              <Box  sx={{display:'flex',flexDirection:'column',alignItems:'center',mt:{xs:8,lg:8}}}>
                <Herf onClick={()=>handleClick(item._id)}>{item.FirstName} {item.LastName}</Herf>
                <Typography sx={{color:'#666',fontSize:{xs:'.84rem',sm:'.9rem'}}}>{item.Country},{item.City}</Typography>
                <Button startIcon={<PersonAddAltOutlinedIcon/>} sx={{marginTop:'1rem',mb:'.5rem',textTransform:'none'}} variant='outlined'>{t("Connect")}</Button>
              </Box>
           </Peoples>                      
          </Grid>
           )}
        </Grid>
      </Box>}
    </Box> 
  )
}

export default People
