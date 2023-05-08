import { useAthuContext } from '../Context/Shared/AthuContext'
import { Outlet,Navigate} from 'react-router-dom'
const ProtectedRoutes = () => {
    const {user} = useAthuContext()
    if(!user.token){
      return <Navigate to='/' />
    }
    return <Outlet/>
}

export default ProtectedRoutes
