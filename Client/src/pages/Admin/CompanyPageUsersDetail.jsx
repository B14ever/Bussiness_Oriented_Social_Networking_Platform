import React,{useEffect} from 'react'
import { styled,alpha } from '@mui/material/styles';
import {Typography,Box,Tab,Tabs,Grid,LinearProgress,IconButton,Tooltip,Divider,Button,Avatar,Snackbar,Alert} from '@mui/material'
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import LocationOnIcon from '@mui/icons-material/LocationOn'
import Groups2OutlinedIcon from '@mui/icons-material/Groups2Outlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import { useParams,useNavigate} from 'react-router-dom';
import { InfoBox} from '../../Components/Company/Css'
import axios from '../../api/axios'

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

const HoverBox = styled(Box)(({ theme }) => ({ 
      '&:hover': {
        background: "#E7EBF0",
        },
}));
const ProfilePhoto= styled(Avatar)(({ theme }) => ({
  width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
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
const Main = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor:"#E7EBF0",
  justifyContent:'center'
}));
const CompanyPageUsersDetail = () => {
  const {t} = useLanguage()
  const {pagesId} = useParams()
  const navigate = useNavigate()
  const [value, setValue] = React.useState(1);
  const [loading,setLoading] =  React.useState(true)
  const [page,setPage] = React.useState({})
  const [limit,setLimit] = React.useState(1)
 
const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.get(`/users/page/${pagesId}`)
     const data = responce.data.Pages[0]
     console.log(data)
     setPage(data)
     setTimeout(()=>{setLoading(false)},1200)}
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [])

const handleNavigate = async (userId) =>{
   navigate(`/AdminDashborde/PersonalAccounts/${userId}`)
}
  return (
    <React.Fragment>
    {loading?
    <Main_One > 
      <Section_One>
        <LinearProgress />
      </Section_One>
    </Main_One>
    :
    <Main_One>
     <Section_One>
     <Box sx={{backgroundColor:"#E7EBF0"}}>
           <Tooltip title={t('Back')}>
             <IconButton onClick={()=>{navigate(-1)}}>
               <KeyboardBackspaceIcon/>
             </IconButton>
           </Tooltip>
        </Box>
        <Box sx={{ position: 'relative'}}>
      <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%', height: 'auto',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
        <Avatar
        sx={{width: { xs: 80, sm: 130, md: 150, lg: 190 }, 
        height: { xs: 80, sm: 130, md: 150, lg: 190 },
        position: 'absolute',
        top: {lg:'calc(100% - 130px)',sm:'calc(100% - 85px)',xs:'calc(100% - 50px)'},
        left: {xs:'calc(19% - 40px)',sm:'calc(19% - 80px)',md:'calc(19% - 100px)',lg:'calc(13% - 100px)'}}}
        src={`../../../Profile_Image/${page.logo}`}/>
      </Box>
       <Box sx={{mt:{md:8,xs:6}}} pl={2}>
            <Grid container>
              <Grid item xs={12} sm={6}>
               <Typography variant='h5'>{page.companyName}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} sx={{display:'flex',alignItems:'center'}}>
                <LocationOnIcon sx={{color:'#999'}}/>
                <Typography>{page.City}, {page.Country}</Typography> 
              </Grid>
              <Grid item xs={12} sm={6} mt={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                <Groups2OutlinedIcon sx={{color:'#999'}}/>
                <Typography>{t(`${page.organizationSize}`)}</Typography> 
              </Grid>   
            </Grid>
        </Box>
       <Box sx={{mt:{md:4,xs:3}}} pl={1}>
       <Tabs value={value} onChange={handleChange} textColor="primary"
            indicatorColor="primary"
            variant="scrollable"scrollButtons allowScrollButtonsMobile
            aria-label="scrollable force tabs example">
          <Tab sx={{textTransform:'none'}} value={1} label={t('About')} />
          <Tab sx={{textTransform:'none'}} value={2} label={t("Mession")} />
          <Tab sx={{textTransform:'none'}} value={3} label={t("Vision")} />
          <Tab sx={{textTransform:'none'}} value={4} label={("Workes")} />
          <Tab sx={{textTransform:'none'}} value={5} label={t("Followers")} />
        </Tabs>
       </Box>
     </Section_One>
      {page.tagline?
        <Typography  component="div" role="tabpanel" hidden={value !== 1}>
        <InfoBox>
        <Box p={1}>
          <Typography sx={{color:'#555'}}>
          {
            page.tagline
          }
        </Typography>
         </Box>
        </InfoBox>
      </Typography>:null}
      {page.mission?<Typography component="div" role="tabpanel" hidden={value !== 2}>
      <InfoBox>
        <Box p={1}>
          <Typography sx={{color:'#555'}}>
          {
            page.mission
          }
        </Typography>
         </Box>
        </InfoBox>
      </Typography>:null}
      {page.vision?<Typography component="div" role="tabpanel" hidden={value !== 3}>
      <InfoBox>
        <Box p={1}>
          <Typography sx={{color:'#555'}}>
          {
            page.vision
          }
        </Typography>
         </Box>
        </InfoBox>
      </Typography>:null}
      {page.workes.length > 0 ?<Typography component="div" role="tabpanel" hidden={value !== 4}>
      <InfoBox>
      {
       page.workes.slice(0,limit).map((work,i)=>{
              return <Box key={work._id} sx={{display:'flex',flexDirection:'column'}}>
                      <Divider/>
                      <Box mt={1} sx={{display:"flex",alignItems:'center'}}>
                      <Typography variant='subtitle2'>{work.title}</Typography>
                      </Box>
                       <Box sx={{width:'100%'}}>
                       <Typography>{work.describtion}</Typography>
                      </Box>
                 </Box>
            })
        }
                   <Divider textAlign='center'>
            {limit > 1 ?<KeyboardArrowUpOutlinedIcon onClick={()=>setLimit(prev=>prev-1)}/>:null}
          </Divider>
           <Box p={.5} sx={{display:'flex',justifyContent:'center'}}>

            {limit === page.workes.length ? null :
              <Button startIcon={<ExpandMoreOutlinedIcon/>} 
                  sx={{textTransform:'none'}} 
                  onClick={()=>setLimit(prev=> prev + 1)}>
                  { t('seeMore')}
              </Button>
            }
              </Box>
        </InfoBox>
      </Typography>:null}
       <Typography component="div" role="tabpanel" hidden={value !== 5}>
        <Main>
          <Section>
          {
            page.followers.map((follower,i)=>{
              return <HoverBox sx={{cursor:'pointer'}} key={i} onClick={()=>handleNavigate(follower._id)}>
                      <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
                        <ProfilePhoto
                        src={`../../../Profile_Image/${follower.profilePhoto?follower.profilePhoto:'Avater.png'}`}/>
                        <Typography  >{follower.FirstName} {follower.LastName} </Typography>
                        </Box>
                        <Divider/>
                    </HoverBox>})}
          </Section>
        </Main>
      </Typography>
    </Main_One>
    }
    </React.Fragment>
  )
}

export default CompanyPageUsersDetail

