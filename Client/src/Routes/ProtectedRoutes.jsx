import { useAthuContext } from '../Context/Shared/AthuContext'
import { Outlet,Navigate} from 'react-router-dom'
import jwtDecode from "jwt-decode";
const ProtectedRoutes = ({Autherazetion}) => {
    const {user} = useAthuContext()
    if(user.token){
        const decodedToken = jwtDecode(user.token)
       return  Autherazetion.includes(decodedToken.role)?
       <Outlet/>:<Navigate to="/pageNotFound"/>
    }
    else{
      return <Navigate to="/"/> 
    }
}

export default ProtectedRoutes
