import React,{useState,useEffect} from 'react'
import { Tooltip,ListItem,ListItemIcon,ListItemText,ListItemButton,Collapse} from '@mui/material/node'
import {useNavigate} from  'react-router-dom'
import { useLanguage } from '../../Localazation/LanguageContext'
const DropDawnMenu = ({item,Dropdawn}) => {
  const {t} = useLanguage()
  const navigate = useNavigate()
  return (
         <Collapse in={Dropdawn} timeout="auto" unmountOnExit>
            {
               item.map((list)=>{
                return <ListItem key={list.id} disablePadding>
                  <Tooltip  title={t(`${list.Name}`)} placement="right-end">
                   <ListItemButton >
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
