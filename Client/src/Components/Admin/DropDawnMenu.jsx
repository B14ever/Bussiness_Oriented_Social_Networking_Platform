import React,{useState,useEffect,useRef} from 'react'
import { Tooltip,ListItem,ListItemIcon,ListItemText,ListItemButton,Collapse,ClickAwayListener} from '@mui/material/node'
import {useNavigate} from  'react-router-dom'
import { useLanguage } from '../../Localazation/LanguageContext'
const DropDawnMenu = ({item,Dropdawn,handlDropdawnClose}) => {
  const {t} = useLanguage()
  const navigate = useNavigate()
  useEffect(()=>{
    console.log(Dropdawn)
  },[Dropdawn])
  
  return (
      
         <Collapse in={Dropdawn}  timeout="auto">
            {
               item.map((list)=>{
                return <ListItem key={list.id} disablePadding>
                  <Tooltip  title={t(`${list.Name}`)} placement="right-end">
                   <ListItemButton onClick={()=>navigate(`${list.Path}`)} >
                   <ListItemIcon>
                     {list.Icon}
                   </ListItemIcon>
                   <ListItemText primary={t(`${list.Name}`)} />
                   </ListItemButton>
                   </Tooltip>
                 </ListItem>
            
             })
            }
         </Collapse>
        
  )
}

export default DropDawnMenu
