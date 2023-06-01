import React, {useState} from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Tooltip,Avatar,Typography,Box} from '@mui/material/node'
import { useAthuContext } from '../../Context/Shared/AthuContext'
import { isSameSender,isLastMessage,isSameSenderMargin,isOwnerSenderMargin} from './MessageConfig'

const Messages = ({Msg}) => {
    const {user} = useAthuContext()
    const id = user.user._id
    const openPdf = (file) =>{
      window.open(`../../../Files/${file}`, "_blank");
    }
  return (
    <ScrollableFeed>
    {Msg &&
      Msg.map((m, i) =>{ 
    return <React.Fragment key={i}>
          { id === m.sender._id ?
            <div style={{ display: "flex",gap:'.5rem'}}>
              {
                Msg[i].content.includes('.jpg')?
                <Box component='img'
                sx={{height:'300px',
                boxShadow:"rgba(149, 157, 165, 0.2) 0px 4px 15px",
                  marginBottom:2,
                  marginTop: 1,
                  borderRadius:"10px",
                  marginLeft:'auto',
                  marginRight:isOwnerSenderMargin(Msg, m, i, id),
                   maxWidth: "75%"}}  
                  src={`../../../Profile_Image/${Msg[i].content}`}/>:
                  Msg[i].content.includes('.pdf')?
                 <Box onClick={()=>openPdf(Msg[i].content)}
                 sx={{backgroundColor:"#1e88e5",padding: "5px 15px",marginLeft: 'auto',marginTop: 1,
                 marginRight:isOwnerSenderMargin(Msg, m, i, id),borderRadius: "10px",maxWidth: "75%",
                 color:'#fff',display:'flex',alignItems:'center',gap:'1rem'}}>
                  <InsertDriveFileIcon/>
                   <Typography>{Msg[i].content}</Typography>
                 </Box>:
                <Typography component='span'
                  sx={{backgroundColor:"#1e88e5",padding: "5px 15px",marginLeft: 'auto',marginTop: 1,
                   marginRight:isOwnerSenderMargin(Msg, m, i, id),borderRadius: "10px",maxWidth: "75%",
                   color:'#fff'}}>
               {Msg[i].content}
              </Typography>}
              {(isSameSender(Msg, m, i, id) ||isLastMessage(Msg, i, id)) && 
              (<Tooltip title={m.sender.FirstName} placement="bottom-start">
                <Avatar sx={{marginRight:1,marginTop:1,}}cursor="pointer"
                 src={`../../../Profile_Image/${m.sender.profilePhoto?m.sender.profilePhoto:'Avater.png'}`}/>
              </Tooltip>)}
           </div>:
            <div style={{ display: "flex"}}>
               {(isSameSender(Msg, m, i, id) ||isLastMessage(Msg, i, id)) && 
               (<Tooltip title={m.sender.FirstName} placement="bottom-start">
                  <Avatar
                   sx={{marginLeft:1,marginRight:1,marginTop:1,}} size="sm" cursor="pointer"
                   src={`../../../Profile_Image/${m.sender.profilePhoto?m.sender.profilePhoto:'Avater.png'}`}/>
                </Tooltip>)}
              {
              Msg[i].content.includes('.jpg')?
                <Box component='img'
                sx={{height:'300px',
                boxShadow:"rgba(149, 157, 165, 0.3) 0px 6px 15px",
                  marginTop: 1,borderRadius:"10px",
                  marginLeft: isSameSenderMargin(Msg, m, i, id),
                   maxWidth: "75%"}}  
                   src={`../../../Profile_Image/${Msg[i].content}`}/>:
              Msg[i].content.includes('.pdf')?
                <Box onClick={()=>openPdf(Msg[i].content)}
                  sx={{backgroundColor:"#E7EBF0",padding: "5px 15px",
                  marginLeft:isSameSenderMargin(Msg, m, i, id),marginTop: 1,
                  borderRadius: "10px",maxWidth: "75%",color: "#000",
                  display:'flex',alignItems:'center',gap:'1rem'}}>
                  <InsertDriveFileIcon color='primary'/>
                    <Typography>{Msg[i].content}</Typography>
                </Box>:
              <Typography component='span'
                sx={{backgroundColor: "#E7EBF0",marginTop: 1,borderRadius:"10px",padding:"5px 15px",
                     marginLeft: isSameSenderMargin(Msg, m, i, id), maxWidth: "75%",color: "#000"}}>
                {Msg[i].content}
              </Typography>}
           </div>
          }
        </React.Fragment>
      }
      )}
  </ScrollableFeed>
  )
}

export default Messages
