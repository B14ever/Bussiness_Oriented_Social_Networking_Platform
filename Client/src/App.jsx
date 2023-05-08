import { Route,Routes } from "react-router-dom"
import Home from "./pages/Shared/Home"
import Layout from "./Components/Shared/Layout"
import Login from "./pages/Shared/Login"
import Signin from "./pages/Shared/Signin"
import EmailVerification from "./pages/Shared/EmailVerification"
import ForgetPassword from "./pages/Shared/ForgetPassword"
import RecoverPassword from "./pages/Shared/RecoverPassword"
import PersonalAccountProfile from './pages/Personal/PersonalAccountProfile'
import CompanyProfileAccount from './pages/Company/CompanyProfileAccount'
import AdminDashborde from './pages/Admin/AdminDashborde'
import ProtectedRoutes from './Routes/ProtectedRoutes'
import PersonalAccountLayout from './Components/Individual/PersonalAccountLayout'
import PersonalAccountSetting from './pages/Personal/PersonalAccountSetting'
import PersonalAccountMessage from './pages/Personal/PersonalAccountMessage'
import PersonalAccountNetwork from './pages/Personal/PersonalAccountNetwork'
import PersonalAccountProfileDetail from './pages/Personal/PersonalAccountProfileDetail'
import PersonalAccountNotification from './pages/Personal/PersonalAccountNotification'
function App() {
  return (
      <Routes>
         <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signin/>}/>
              <Route path="/forgetPassword" element={<ForgetPassword/>}/>
              <Route element={<ProtectedRoutes/>}>
                  <Route path="/emailVerification" element={<EmailVerification/>}/>
                  <Route path="/RecoverPassword" element={<RecoverPassword/>}/>
                  <Route path="/PersonalAccountProfile" element={<PersonalAccountLayout/>}>
                     <Route path="/PersonalAccountProfile" element={<PersonalAccountProfile/>}/>
                     <Route path="PersonalMessage" element={<PersonalAccountMessage/>}/>
                     <Route path="PersonalNetwork" element={<PersonalAccountNetwork/>}/>
                     <Route path="PersonalNotification" element={<PersonalAccountNotification/>}/>
                     <Route path="PersonalProfileDetail" element={<PersonalAccountProfileDetail/>}/>
                     <Route path="PersonalProfileSetting" element={<PersonalAccountSetting/>}/>
                  </Route>
                  <Route path="/ComapnyAccountProfile" element={<CompanyProfileAccount/>}/>
                  <Route path="/AdminDashborde" element={<AdminDashborde/>}/>
              </Route>
         </Route>
      </Routes>
  )
}

export default App
