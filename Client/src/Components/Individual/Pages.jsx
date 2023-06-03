import React,{useEffect,useState} from 'react'
import { Box,Typography,Divider,LinearProgress,Grid,Avatar,Button,Alert,Snackbar,InputBase} from '@mui/material/node'
import { styled,alpha } from '@mui/material/styles';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { useNavigate} from 'react-router-dom';
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
  fontSize:'0.85rem',
  "&:hover": {
    textDecoration:'underline'
  },
}));
const Photos = styled(Avatar)(({ theme }) => ({
  position: 'absolute',width:'100px',height:"100px",top: '20%',left:'25%',
  [theme.breakpoints.down('sm')]: {
    width:'80px',height:"80px",top: '20%',left:'30%',},
    [theme.breakpoints.down('460')]: {
      width:'70px',height:"70px",top: '20%',left:'25%',},
}));
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor:'#E7EBF0',
  '&:hover': {
    backgroundColor:'#E7EBF0',
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
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
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));
const Buttons = styled(Button)(({ theme }) => ({
  marginTop:'1rem',marginBottom:'.5rem',textTransform:'none',borderRadius:'1rem',width:'50%'}));
const Pages = () => {
    const {user,dispatch} = useAthuContext()
    const id = user.user._id
    const {t} = useLanguage()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const [warnnig,setWaring] = useState(false)
    const [warnnigMsg,setWaringMsg] = useState('')
    const [pages,setPages] = useState([{_id:'',companyName:'',Country:'',City:'',logo:''}])
    const [pending,setPendig] = useState()
    const [search,setSearch] = useState('')
    const [limit,setLimit] = useState(8)
  useEffect(() => {
      const GetData = async ()=>{
      try{
      setLoading(true)
      const responce = await axios.post(`/pages`,{id})
      const data = responce.data.Pages
      setPages(data)
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
      navigate(`pages/${id}`)
  }
  const SnedRequest = async  (pageId) =>{
    try{
      const responce = await axios.post('/pages/follow',{userId:id,pageId:pageId})
       if(responce.status === 200){
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setPendig(pageId)
      } 
    }catch(err){
      setWaringMsg('InvitationNotSent')
      setWaring(true)
    }
  }
  const CancleRequest = async (pageId) =>{
    try{
      const responce = await axios.post('/pages/unfollow',{userId:id,pageId:pageId})
       if(responce.status === 200){
        localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
        dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
        setPendig()
      } 
      }catch(err){
      setWaringMsg('InvitationNotCancled')
      setWaring(true)
       }
     }
  return (
    <Box p={2} sx={{borderRadius:'6px',backgroundColor:'#fff'}}>
      {loading?
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px'}}>
        <LinearProgress />
        <Typography  variant='subtitle2'>{t("Pages")}</Typography>
      </Box>:
      <Box sx={{ width: '100%',backgroundColor:'#fff',borderRadius:'6px',display:'flex',flexDirection:'column'}}>
         <Grid container spacing={1}>
           <Grid item xs={12} sm={6}>
            <Typography  sx={{ flexGrow: 1}}  variant='subtitle2'>{t("Pages")}</Typography>
           </Grid>
           <Grid item xs={12} sm={6} mb={1}>
            <Search onChange={(e)=>setSearch(e.target.value)}>
              <SearchIconWrapper><SearchIcon /></SearchIconWrapper>
              <StyledInputBase placeholder={t("Search")} inputProps={{ 'aria-label': 'search' }}/>
            </Search>
           </Grid>
         </Grid>
        <Divider/>
        <Grid mt={2} container spacing={2}>
          {pages.filter(item=>{
                   return item.companyName.toLowerCase().includes(search.toLowerCase())
                }).slice(0,limit).map((item,index)=>
          <Grid key={index} item lg={3} xs={6} sm={4}>
           <Peoples>
             <Box onClick={()=>handleClick(item._id)} sx={{ borderRadius:'6px',position: 'relative',}}>
                <img src="../../../Profile_Image/coverPhoto.png" style={{ width: '100%',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
              <Photos src={`../../../Profile_Image/${item.logo}`}/>
              </Box>
              <Box  sx={{display:'flex',flexDirection:'column',alignItems:'center',mt:{xs:5,sm:7,lg:8}}}>
                <Herf onClick={()=>handleClick(item._id)}>{item.companyName}</Herf>
                <Typography sx={{color:'#666',fontSize:{xs:'.84rem',sm:'.9rem'}}}>{item.Country},{item.City}</Typography>
                { pending === item._id?
                <Buttons onClick={()=>CancleRequest(item._id)} startIcon={<CheckOutlinedIcon/>} variant='outlined'>{t("Following")}</Buttons>:
                <Buttons onClick={()=>SnedRequest(item._id)} variant='outlined'>{t("Follow")}</Buttons>}
              </Box>
           </Peoples>                      
          </Grid>
           )}
        </Grid>
        <Divider textAlign='center' sx={{marginTop:'1rem'}}>
            {limit>8?<KeyboardArrowUpOutlinedIcon onClick={()=>setLimit(prev=>prev-4)}/>:null}
          </Divider>
          <Box  sx={{display:'flex',justifyContent:'center'}}>
            <Button startIcon={<ExpandMoreOutlinedIcon/>} sx={{textTransform:'none'}} onClick={()=>setLimit(prev=>prev + 4)}>
              {t('seeMore')}
            </Button>
          </Box> 
        <Snackbar anchorOrigin={{ vertical:'top', horizontal:'center'}}
                  open={warnnig} autoHideDuration={800} onClose={()=>setWaring(false)}>
          <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
             {t(`${warnnigMsg}`)}
          </Alert>
        </Snackbar>
      </Box>}
    </Box> 
  )
}

export default Pages