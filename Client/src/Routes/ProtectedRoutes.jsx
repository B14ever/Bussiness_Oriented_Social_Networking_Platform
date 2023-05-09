import { useAthuContext } from '../Context/Shared/AthuContext'
import { Outlet,Navigate} from 'react-router-dom'
import jwtDecode from "jwt-decode";
const ProtectedRoutes = ({Autherazetion}) => {
    const {user} = useAthuContext()
    const decodedToken = jwtDecode(user.token)
    return <>
       {
       user.token?(Autherazetion.includes(decodedToken.role)?
       <Outlet/>:<Navigate to="/pageNotFound"/>):<Navigate to="/"/>
       }
    </>
}

export default ProtectedRoutes
