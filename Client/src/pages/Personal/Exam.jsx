import React,{useState,useEffect} from 'react'
import PropTypes from 'prop-types';
import { Box,Typography,Divider,Button,FormControl,FormControlLabel,RadioGroup,Radio,Dialog,DialogContent,DialogActions,Backdrop,CircularProgress} from '@mui/material/node'
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../../Localazation/LanguageContext'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import axios from '../../api/axios'
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));
  const Item = styled(FormControlLabel)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: 'left',
    paddingLeft:'16px',
    color: theme.palette.text.secondary,
    height: 60,
    lineHeight: '60px',
    fontSize:'1rem',
    margin:'1rem 1rem 0',
    boxShadow: " 0 3px 6px rgb(0 0 0 / 0.2)",
    borderRadius:'.5rem'
  }));
function CircularProgressWithLabel(props) {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" {...props} />
        <Box sx={{top: 0,left: 0,bottom: 0,right: 0,position: 'absolute',display: 'flex',alignItems: 'center',   justifyContent: 'center',}}>
          <Typography variant="caption" component="div" color="text.secondary">
            {`${Math.round(props.value)}`}
          </Typography>
        </Box>
      </Box>
    );
  }
  CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate variant.
     * Value between 0 and 100.
     * @default 0
     */
    value: PropTypes.number.isRequired,
  };
const Exam = () => {
    const {user,dispatch} = useAthuContext()
    const Email = user.user.Email
    const navigate = useNavigate()
    const TOPIC = localStorage.getItem('TOPIC')
    const [loading,setLoading] = useState(true)
    const [questions,setQuestions] = useState([{question:'',options:[''],correctAnswer:''}])
    const QNo = Number(localStorage.getItem('count'));
    const [index,setIndex] = useState( Number.isInteger(QNo) ? QNo : 0)
    const [progress,setProgress] = useState((index + 1)*20)
    const Score = Number(localStorage.getItem('score'));
    const [score,setScore] = useState(Number.isInteger(Score) ? Score : 0)
    const [answer,setAnswers] = useState('')
    const {t} = useLanguage()
    const [open,setOpen] = useState(false)
    const [Backdropopen,setBackDropOpen] = useState(false)
    const [radioRisable,setradioRisable] = useState(false)
    const [buttonDisable,setButtonDisable] = useState(true)
    const [counter,setCounter] = useState(0)
    const [timeOut,setTimeOut] = useState(false)
    useEffect(() => {
     localStorage.setItem('count', String(index));      
    }, [index]);
    useEffect(() => {
        localStorage.setItem('score', String(score));
    },[score]);
    useEffect(() => {
            const GetData = async ()=>{
            try{
            setLoading(true)
            const responce = await axios.post('/questions',{TOPIC})
            const data = responce.data.Questions[0].questions
            setQuestions(data)
            setTimeout(()=>{setLoading(false)},1000)
            }
            catch(err){
                console.error(err)
            }
        }
            GetData()
            .catch(console.error);
        }, []);
    useEffect(() => {
        const timer = setInterval(() => {
         setCounter((prevCounter) => prevCounter + 10);
          }, 3000);
          return () => {
            clearInterval(timer);
          };
        }, [])
    useEffect(()=>{
        if(counter === 100)
        {
          setradioRisable(true)
          setButtonDisable(false)
          setTimeOut(true)
        }
    },[counter])
  const handleNext =  async () =>{
        if(index < 4){
          setTimeOut(false)
          setCounter(0)
          setButtonDisable(true)
          setradioRisable(false)
          setIndex((prev)=> prev + 1)
          setProgress((prev)=>prev+20)
          if(questions[index].correctAnswer === answer){
          setScore( (prev) => prev + 1 )
            }
        }
        if (index === 4)
        {
          if(score > 2)
          {
            setBackDropOpen(true)
            try{
            const responce = await axios.post('/PersonalAccountProfile/addBadge',{skillName:TOPIC,Email})
            localStorage.setItem('USER_DATA',JSON.stringify(responce.data.user))
            dispatch({type:"AUTHENTICATE",payload:{user:responce.data.user,token:localStorage.getItem('TOKEN')}})
            setTimeout(()=>{setBackDropOpen(false)},1000)
            setTimeout(()=>{setOpen(true)},1000)
            } catch (err) {
               console.log(err)
               }  
          }
          else{
            setBackDropOpen(true)
            setTimeout(()=>{setBackDropOpen(false)},1000)
            setTimeout(()=>{setOpen(true)},1000)
          }
        }  
  }
  const handleClose =()=>{
    setOpen(false)
  }
  const handleChange = (e) =>{
    setAnswers(e.target.value)
    setButtonDisable(false)
  }
  return (
    <Box  sx={{height: 'fit-content',marginTop:'97px',width:'100%',display:'flex',justifyContent:'center',backgroundColor:"#E7EBF0"}}>
    <Box pt={2} sx={{backgroundColor:'#fff',margin:'10px 0 10px',
       height: 'fit-content',width:{xs:'90%',lg:'60%'},display:'flex',flexDirection:'column'}}>
       { loading?
        <Box pl={2} pr={2} sx={{ width: '100%' }}>
          <LinearProgress />
          <Typography textAlign="center" variant='subtitle2' >{TOPIC} {t("Assessment")}</Typography>
        </Box>:
        <Box>
            <Typography textAlign="center" variant='subtitle2' >{TOPIC} {t("Assessment")}</Typography>
            <Divider/>
            <Box  p={2} sx={{widht:'100%',display:'flex',flexDirection:'column'}}>
              <Box  sx={{widht:'100%',height: 'fit-content',display:'flex',alignItems:'center'}}>
                <Typography>{index + 1.} {questions[index].question}</Typography>
              </Box>
            <FormControl  margin='dense' size='small'>
            <RadioGroup   value={answer} onChange={handleChange}>
                {
                    questions[index].options.map((item,indexs)=>{
                    return <Item disabled={radioRisable} key={indexs}  value={item} control={<Radio />} label={item}/>
                    })
                }     
            </RadioGroup>
            </FormControl>  
            </Box>
            <BorderLinearProgress  variant="determinate" value={progress} />
            <Box p={2} sx={{display:'flex',width:'100%'}}>
            <Box  sx={{display:'flex',height:'fit-content',alignItems:'center',width:'100%',justifyContent:'flex-start',gap:'1rem'}}>
                <Typography>Q{index + 1}/5</Typography>
                {
                   timeOut?
                  <Typography>{t('timeExpired')}</Typography>:
                  <CircularProgressWithLabel value={counter} />
                } 
            </Box>
            <Box sx={{display:'flex',justifyContent:'flex-end',height: 'fit-content',alignItems:'center'}}>
            <Button size='small' disabled={buttonDisable} onClick={handleNext} variant='contained'>{ index < 4 ? t("Next"):t('viweResult')}</Button>
            </Box>   
            </Box>
        <Dialog open={open} onClose={handleClose}>
           {
            score > 2?
            <DialogContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <img src="../../../../Profile_Image/OIP.png" style={{ width: '50%', height: 'auto',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                <Typography variant='subtitle2'>{t("Congratulations")}</Typography>
                <Typography>{t("youEarnBadge")} {TOPIC} {t("badge")}</Typography>
            </DialogContent>:
            <DialogContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                 <img src="../../../../Profile_Image/failed.png" style={{ width: '50%', height: 'auto',borderTopLeftRadius:'6px',borderTopRightRadius:'6px' }} />
                <Typography variant='subtitle2'>{t("Sorry")}</Typography>
                <Typography>{t("didntEarnBadge")}</Typography>
            </DialogContent>
           }
           <DialogActions>
             <Button variant="contained" sx={{textTransform:'none'}} onClick={()=>{navigate(-2)}}>{t("tryAgain")}</Button>
             <Button variant="outlined" sx={{textTransform:'none'}}  onClick={()=>{navigate(-3)}}>{t("BackToProfile")}</Button>
           </DialogActions>
        </Dialog>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={Backdropopen} >
            <CircularProgress color="inherit" />
         </Backdrop>
        </Box>
          }
    </Box>
    </Box>
  )
}

export default Exam
