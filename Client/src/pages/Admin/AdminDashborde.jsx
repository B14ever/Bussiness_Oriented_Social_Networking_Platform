import React,{useEffect,useState} from 'react'
import { Box,Grid, Typography} from '@mui/material/node'
import { styled,alpha } from '@mui/material/styles';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import {useLanguage} from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext';
import axios from '../../api/axios'
export const Boxs = styled(Box)(({ theme }) => ({
  borderRadius:'10px',
  backgroundColor: '#fff',
  boxShadow: ' rgba(0, 0, 0, 0.24) 0px 3px 8px',
  width:'100%',
  height: 148,
  padding:'1rem',
  display:'flex',
  alignItems:'center',
  gap:'1rem'

}));

const AdminDashborde = () => {
  const {user} = useAthuContext()
  const id = user.user._id
  const [PersonalAccount,setPersonalAccount] = useState([])
  const [CompanyAccount,setCompanyAccount] = useState([])
  const [Post,setPost] = useState([])
  const [Job,setJobs] = useState([])
  const [Quetion,setQuetion] = useState([])
  useEffect(() => {
    const GetData = async ()=>{
    try{
     const responce = await axios.post(`/Peoples`)
     const data = responce.data.PersonalAccounts
     setPersonalAccount(data)
     }
     catch(err){
        console.error(err)}}
     GetData()
    .catch(console.error);}, [])
  useEffect(() => {
      const GetData = async ()=>{
      try{
        const responce = await axios.get(`/users/pageusers`)
       const data = responce.data.Pages
       setCompanyAccount(data)
       }
       catch(err){
          console.error(err)}}
       GetData()
      .catch(console.error);}, [])
  useEffect(() => {
        const GetPosts = async ()=>{
        try{
        const responce = await axios.get(`/usersPosts`)
        const data = responce.data.posts
        setPost(data)
        }
        catch(err){
            console.error(err)
        }
      }
       GetPosts()
        .catch(console.error);
           }, [])
    useEffect(() => {
    const GetData = async ()=>{
    try{
      const responce = await axios.get(`/vacanices/${id}`)
      const data = responce.data.jobs
      setJobs(data)
      }
      catch(err){
        console.error(err)}}
      GetData()
    .catch(console.error);}, [])
    useEffect(() => {
      const GetData = async ()=>{
      try{
        const responce = await axios.get('/skillAssessment')
        const data = responce.data.Assessment
        setQuetion(data)
        }
        catch(err){
          console.error(err)}}
        GetData()
      .catch(console.error);}, [])
    
  return (
    <Box p={1} sx={{ marginTop: '100px',width:'100%', display: 'flex',flexDirection:'column',backgroundColor:"#E7EBF0" ,alignItems: 'center' }}>
      <Grid container fullwidth spacing={2}>
        <Grid item xs={12} md={4}>
           <Boxs>
             <PeopleAltOutlinedIcon fontSize='large'color='primary'/>
             <Typography variant='subtitle2' sx={{fontSize:'1.7rem'}}>Personal Accounts Users</Typography>
             <Typography variant='subtitle2' sx={{fontSize:'2rem',marginLeft:'auto'}} color='primary'>{PersonalAccount.length}</Typography>
           </Boxs>
        </Grid>
        <Grid item xs={12} md={4}>
        <Boxs>
             <ApartmentOutlinedIcon fontSize='large'color='primary'/>
             <Typography variant='subtitle2' sx={{fontSize:'1.7rem'}}>Company Page</Typography>
             <Typography variant='subtitle2' sx={{fontSize:'2rem',marginLeft:'auto'}} color='primary'>{CompanyAccount.length}</Typography>
        </Boxs>
        </Grid>
        <Grid item xs={12} md={4}>
        <Boxs>
              <WysiwygOutlinedIcon fontSize='large'color='primary'/>
             <Typography variant='subtitle2' sx={{fontSize:'1.7rem'}}>Posts</Typography>
             <Typography variant='subtitle2' sx={{fontSize:'2rem',marginLeft:'auto'}} color='primary'>{Post.length}</Typography>
        </Boxs>
        </Grid>
        <Grid item xs={12} md={6}>
        <Boxs>
          <WorkOutlineOutlinedIcon fontSize='large'color='primary'/>
          <Typography variant='subtitle2' sx={{fontSize:'1.7rem'}}>Posts</Typography>
          <Typography variant='subtitle2' sx={{fontSize:'2rem',marginLeft:'auto'}} color='primary'>{Job.length}</Typography>
        </Boxs>
        </Grid>
        <Grid item xs={12} md={6}>
        <Boxs>
           <QuizOutlinedIcon fontSize='large'color='primary'/>
          <Typography variant='subtitle2' sx={{fontSize:'1.7rem'}}>Skill Assessments</Typography>
          <Typography variant='subtitle2' sx={{fontSize:'2rem',marginLeft:'auto'}} color='primary'>{Quetion.length}</Typography>
        </Boxs>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AdminDashborde
