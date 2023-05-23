import React from 'react'
import {Avatar,Box,Typography,Divider,Link,Tooltip} from '@mui/material'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import {useLanguage} from '../../Localazation/LanguageContext'
import {useNavigate} from 'react-router-dom'
const NetworkBox = () => {
    const {user} = useAthuContext()
    const {t} = useLanguage()
    const navigate = useNavigate()
  return (
    <Box sx={{borderRadius:'6px',backgroundColor: '#fff',width:{md: '70%', lg: '57%' },margin:'10px 0 10px'}}>
      <Box>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse veritatis ut vero consequatur, sed quam illo! Voluptatibus natus eius aliquam veniam quia vero dolorum facilis et perspiciatis, voluptate nesciunt excepturi!
      </Box>
    </Box>
  )
}

export default NetworkBox