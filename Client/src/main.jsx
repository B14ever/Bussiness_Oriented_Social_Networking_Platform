import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { ThemeProvider, createTheme} from '@mui/material/styles';
import App from './App'
import './Localazation/LanguageConfig'
import AthuContext from './Context/Shared/AthuContext';
import LanguageContext from './Localazation/LanguageContext'
import SkillAssesmentContext from './Context/Admin/SkillAssesmentContext';
import './indexs.css'
const theme = createTheme({
  typography: {
    h5:{
      fontFamily:'Roboto, sans-serif;'
    },
    h3: {
      fontSize: '2rem',
      '@media (max-width: 600px)': {
        fontSize: '0.999rem',
      },
    },
    subtitle2:{
      fontSize:'1.5rem',
      fontFamily:'Teko, sans-serif',
      color:"#666",
    },
    body1:{
      fontFamily:'Exo, sans-serif',
     },
    },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LanguageContext>
        <AthuContext>
            <SkillAssesmentContext>
              <Routes>
                <Route path='/*' element={<App/>}/>
              </Routes>
            </SkillAssesmentContext>
        </AthuContext>
      </LanguageContext>
    </ThemeProvider>
  </React.StrictMode>
  </BrowserRouter>
)
