import React,{useEffect,useState} from 'react'
import { styled, useTheme } from '@mui/material/styles';
import {Box,Grid,Typography,Divider,IconButton,Tooltip, Avatar,LinearProgress,Button,Snackbar,Alert,FormHelperText,FormControl,TextField} from '@mui/material'
import { useLanguage } from '../../Localazation/LanguageContext';
import { useAthuContext } from '../../Context/Shared/AthuContext';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'
export const Main_One = styled(Box)(({ theme }) => ({
    marginTop: '100px', 
    display: 'flex',
    backgroundColor:"#E7EBF0",
  }));
export const Section_One = styled(Box)(({ theme }) => ({
    borderRadius:'6px',
    backgroundColor: '#fff',
    margin: '10px auto 5px', 
    height: 'fit-content', 
    width:'100%',
    
  }));
  const HoverBox = styled(Box)(({ theme }) => ({
    '&:hover': {
      background: "#E7EBF0",
      },
  }));
  const ProfilePhoto= styled(Avatar)(({ theme }) => ({
    width: 45, height: 45,boxShadow:"rgba(149, 157, 165, 0.2) 0px 6px 22px",
  }));
  const AddAdmin = () => {
    const {user} = useAthuContext()
    const {t} = useLanguage()
    const navigate = useNavigate()
    const id = user.user._id
    const [action,setAction] = useState(false)
    const [admins,setAdmins] = useState([])
    const [loading,setLoading] = useState(false)
    const [limit,setLimit] = useState(5)
    const [warnnig,setWaring] = useState(false)
    const [warnningMsg,setWarnningMsg] = useState('')
    const [Errors, setErrors] = useState({FirstName:'',LastName:'',Country:'',City:'',Email:'',PhoneNumber:'',Password:'', confirmPassword:''});
    const [data, setData] = useState({FirstName:'',Email:'',LastName:'',Country:'',PhoneNumber:'',City:'',Password:'',confirmPassword:'',adminType:'admin'});
  useEffect(() => {
    const GetData = async ()=>{
    try{
     setLoading(true)
     const responce = await axios.get(`/admins/${id}`)
     const data = responce.data.Admins
     setAdmins(data)
     setTimeout(()=>{setLoading(false)},1200)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [action]) 
  const handleClick = (id) =>{
    navigate(`${id}`)
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    setErrors({...Errors,[name]:false})
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('')
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      try {
         await axios.post('/AdminAccount',data)
         setAction(!action)
      } catch (err) {
        if (!err?.response) {
          setWarnningMsg('Registartion Failde');
        } else if (err.response?.status === 400) {
          setWarnningMsg('User already Exists');
        } 
        setWaring(true)  
     }finally{
      setData('')
    }
    } else {
      setErrors(errors);
    }
  };
  const validateForm = () => {
    const formErrors = {};

    // Validation logic
    if (!data.FirstName) {
      formErrors.FirstName = 'FNameRequired';
    }

    if (!data.LastName) {
      formErrors.LastName = 'LNameRequired';
    }

    if (!data.Country) {
      formErrors.Country = 'CountryNameRequired';
    }

    if (!data.City) {
      formErrors.City = 'CityNameRequired';
    }

    if (!data.Email) {
      formErrors.Email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(data.Email)) {
      formErrors.Email = 'InvalidEmail';
    }

    if (!data.PhoneNumber) {
      formErrors.PhoneNumber = 'PhoneNumberRequired';
    }

    if (!data.Password) {
      formErrors.Password = 'PasswordRequired';
    }

    if (!data.confirmPassword) {
      formErrors.confirmPassword = 'PleaseConfrimNewPassword';
    } else if (data.confirmPassword !== data.Password) {
      formErrors.confirmPassword = 'ConfrimPassworNotMatch';
    }

    return formErrors;
  };

  return (
     
      <Grid container p={1} spacing={2}>
        <Grid item xs={12} lg={4}>
        <Main_One>
            { 
        loading?
          <Section_One>
            <LinearProgress/>
            <Box p={.5} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
              <Typography variant='subtitle2'>{t("Admins")}</Typography>
            </Box>
          </Section_One>:
           <Section_One>
            <Box>
        <Box p={.5} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
        <Typography variant='subtitle2'>{t("Admins")}</Typography>
        </Box>
        <Divider/>
        {
           admins.slice(0,limit).map((user,i)=>{
            return <HoverBox  sx={{cursor:'pointer'}} key={i} onClick={()=>handleClick(user._id)}>
            <Box p={1} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
              <ProfilePhoto
              src={`../../../Profile_Image/${user.profilePhoto?user.profilePhoto:'Avater.png'}`}/>
              <Typography  >{user.FirstName} {user.LastName} </Typography>
              </Box>
             { <Divider/>}
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
         </Section_One>
         
          }
        </Main_One>
        </Grid>
        <Grid item xs={12} lg={8}>
        <Main_One>
          <Section_One>
          <Box p={.5} sx={{display:'flex',alignItems:'center',gap:'.5rem'}}>
            <Typography variant='subtitle2'>{t("AddAdmin")}</Typography>
          </Box>
          <Divider/>
          <Box component="form" onSubmit={handleSubmit} noValidate  sx={{display:'flex',flexDirection:'column',gap:'.5rem'}}mt={2}ml={2}mr={2}>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.FirstName}>
            <TextField onChange={handleChange}  margin="normal" required fullWidth id="FirtsName" label={t("FirstName")} name="FirstName" value={data.FirstName || ''}  variant="outlined" autoFocus/>
            <FormHelperText sx={{color:'red'}}>{Errors.FirstName?`${t("FNameRequired")}`:''}</FormHelperText> 
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.LastName}>
            <TextField onChange={handleChange} margin="normal" required fullWidth id="lastName" label={t("LastName")} value={data.LastName || ''} name="LastName"  variant="outlined" autoFocus/>
            <FormHelperText sx={{color:'red'}}>{Errors.LastName?`${t("LNameRequired")}`:''}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.Country}>
            <TextField onChange={handleChange} margin="normal" required fullWidth id="country" label={t("Country")} value={data.Country || ''} name="Country" autoFocus/>
            <FormHelperText sx={{color:'red'}}>{Errors.Country?`${t("CountryNameRequired")}`:''}</FormHelperText> 
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.City}>
            <TextField onChange={handleChange} margin="normal" required fullWidth id="city" label={t("City")} name="City" value={data.City || ''} autoFocus/>
            <FormHelperText sx={{color:'red'}}>{Errors.City?`${t("CityNameRequired")}`:''}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.Email}>
            <TextField onChange={handleChange} margin="normal" required fullWidth id="email" label={t("Email")} name="Email" value={data.Email|| ''} autoFocus/>
            <FormHelperText sx={{color:'red'}}>{Errors.Email?`${t("EmailRequired")}`:''}</FormHelperText> 
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.PhoneNumber}>
            <TextField onChange={handleChange} margin="normal" required fullWidth id="phone" label={t("Phone")} name="PhoneNumber" value={data.PhoneNumber || ''} autoFocus/>
            <FormHelperText sx={{color:'red'}}>{Errors.PhoneNumber?`${t("PhoneNumberRequired")}`:''}</FormHelperText> 
          </FormControl>
        </Grid>
      </Grid>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.Password}>
            <TextField onChange={handleChange} margin="normal" required fullWidth name="Password" label={t("Password")} value={data.Password || ''} type="Password" id="password"/>
            <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.Password?t(`${Errors.Password}`):''}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid xs={12} sm={6} item>
          <FormControl fullWidth error={!!Errors.confirmPassword}>
            <TextField  onChange={handleChange} margin="normal" required fullWidth name="confirmPassword" label={t("ConfirmPassword")} value={data.confirmPassword || ''} type="password" id="password"/>
            <FormHelperText sx={{color:'red',width:{xs:'100%',md:'50%'}}}>{Errors.confirmPassword?t(`${Errors.confirmPassword}`):''}</FormHelperText>
          </FormControl>
        </Grid>
      </Grid>
      <Box sx={{display:'flex',justifyContent:{sm:'flex-end',xs:'center'}}}>
     <Button type="submit"  variant="contained" size='large' sx={{ mt: 2, mb: 2,width:{xs:'100%',sm:'25%'},textTransform:'none' }}>{t("Add")}</Button>
    </Box>
    </Box>
    </Section_One>
    <Snackbar open={warnnig} anchorOrigin={{ vertical:'top', horizontal:'center'}} autoHideDuration={3000} onClose={()=>setWaring(false)}>
              <Alert onClose={()=>setWaring(false)} severity="info" sx={{ width: '100%' }}>
                {t(`${warnningMsg}`)}
              </Alert>
    </Snackbar>
        </Main_One>
        </Grid>
      </Grid>
     
  )
}

export default AddAdmin
