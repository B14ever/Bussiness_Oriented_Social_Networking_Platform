import React, { useEffect } from 'react'
import {Button, Grid, Typography,Box} from '@mui/material'
import find from '../../assets/find.png'
import {useLanguage} from '../../Localazation/LanguageContext'
import { styled, useTheme } from '@mui/material/styles';
import Carousel from 'react-material-ui-carousel'
export const Blue = styled(Box)(({ theme }) => ({
    backgroundColor:"#1e88e5",
    height:"200px",
  }));
const styles = {
 box:{
    width:'100%',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
 },
 container: {
  height:'auto',
  width:'100%',
  position:'relative',
},
};

function Home() {
  return (
    <Box sx={{marginTop:{lg:'40px',sm:'64px',md:'64px',xs:'56px'},backgroundColor:'#fff',height:'95vh'}}>
       <Blue container>
            <Box style={styles.box}>
                <Typography sx={{fontSize:"3.5rem",color:"#fff"}} variant='subtitle2'>Welcome to your</Typography>
                <Typography  sx={{fontSize:"3.5rem",color:"#fff"}} variant='subtitle2'>professional community</Typography>         
            </Box>
            <svg  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
           <path fill="#1e88e5" fill-opacity="1.5" d="M0,64L60,85.3C120,107,240,149,360,154.7C480,160,600,128,720,101.3C840,75,960,53,1080,64C1200,75,1320,117,1380,138.7L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"></path>
        </svg>
       </Blue>
     
      <Grid  sx={{marginTop:'100px'}}  container>
       <Grid style={styles.box} xs={12} lg={6} md={6} sm={6} item>
                <Typography sx={{fontSize:"2.5rem"}} variant='subtitle2'>Find the right job or</Typography>
                <Typography sx={{fontSize:"2.5rem"}} variant='subtitle2'>internship for you</Typography>
         </Grid>
       <Grid xs={12} lg={6} md={6} sm={6} sx={{display:'flex',justifyContent:'center'}}   item>
           <img src={find} style={{height:'auto',marginTop:'1rem',width:'50%'}}/>
        </Grid>
       </Grid>
    
     </Box>
    
  )
}

export default Home
