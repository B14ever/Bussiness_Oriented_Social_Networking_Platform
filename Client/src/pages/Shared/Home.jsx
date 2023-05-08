import React, { useEffect } from 'react'
import {Button, Grid, Typography} from '@mui/material'
import find from '../../assets/find.png'
import talent from '../../assets/R.png'
import skill from '../../assets/skills.png'
import company from '../../assets/Recruitment_Image.png'
import {useLanguage} from '../../Localazation/LanguageContext'
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
    <React.Fragment>
       <Grid style={styles.container}  sx={{marginTop:{lg:'64px',sm:'64px',md:'64px',xs:'56px'}}}  container>
            <Grid style={styles.box} xs={12} lg={6} md={6} sm={6} item>
                    <Typography variant='h3'>Find a Job With</Typography>
                    <Typography  variant='h3'>Your Interest and</Typography>
                    <Typography   variant='h3'>Ablity</Typography>
                    <Button size="small" variant="contained" sx={{marginTop:'1rem'}}>Start know</Button>
            </Grid>
            <Grid xs={12} lg={6} md={6} sm={6} sx={{display:'flex',justifyContent:'center'}} item>
              <img src={find} style={{height:'auto',marginTop:'1rem',width:'50%',maxWidth:'540px'}}/>
            </Grid>
       </Grid>
       <Grid  sx={{marginTop:'60px'}} container>
       <Grid xs={12} lg={6} md={6} sm={6} sx={{display:'flex',justifyContent:'center'}}   item>
           <img src={talent} style={{height:'auto',marginTop:'1rem',width:'50%'}}/>
        </Grid>
        <Grid style={styles.box} xs={12} lg={6} md={6} sm={6} item>
                <Typography variant='h3'>Talk To Other Profetionals</Typography>
                <Typography variant='h3'>Develop Comnnucatin And</Typography>
                <Typography variant='h3'>Share Idea</Typography>
         </Grid>
       </Grid>
       <Grid container>
       <Grid style={styles.box} xs={12} lg={6} md={6} sm={6} item>
                <Typography variant='h3'>Take Skill Exam</Typography>
                <Typography variant='h3'>In Your Profession</Typography>
                <Typography variant='h3'>Bost Your Chance To Get Oportunity</Typography>
         </Grid>
       <Grid xs={12} lg={6} md={6} sm={6} sx={{display:'flex',justifyContent:'center'}}   item>
           <img src={skill} style={{height:'auto',marginTop:'1rem',width:'50%'}}/>
        </Grid>
       </Grid>
       <Grid container  >
       <Grid xs={12} lg={6} md={6} sm={6} sx={{display:'flex',justifyContent:'center'}}   item>
           <img src={company} style={{height:'auto',marginTop:'1rem',width:'50%'}}/>
        </Grid>
       <Grid style={styles.box} xs={12} lg={6} md={6} sm={6} item>
                <Typography sx={{color:'#263238'}} variant='h3'>Are You A Bussines Company</Typography>
                <Typography sx={{color:'#263238'}} variant='h3'>Or Recuraters</Typography>
                <Typography sx={{color:'#263238'}} variant='body'>Find The Best Emplpoyee That Suits You</Typography>
         </Grid>
       </Grid>
    </React.Fragment>
    
  )
}

export default Home
