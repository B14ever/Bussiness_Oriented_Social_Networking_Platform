import { styled, useTheme } from '@mui/material/styles';
import {Box} from '@mui/material'
export const Main_One = styled(Box)(({ theme }) => ({
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
  export const InfoBox = styled(Box)(({ theme }) => ({
    borderRadius:'6px',
    backgroundColor: '#fff',
    margin: '5px auto 5px', 
    height: 'fit-content',
    padding:2, 
    width:'57%',
    [theme.breakpoints.down('sm')]: {width: '90%'},
    [theme.breakpoints.down('md')]: {width: '80%'},
    [theme.breakpoints.down('lg')]: {width: '70%'},
  }));