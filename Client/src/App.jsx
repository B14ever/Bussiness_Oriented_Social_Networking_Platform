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
import EditExprience from "./Components/Individual/EditExprience"
import EditEducation from "./Components/Individual/EditEducation"
import EditSkill from "./Components/Individual/EditSkill"
import Jobs from './pages/Personal/Jobs'
import PageNotFound from './pages/Shared/PageNotFound'
import AdminLayout from "./Components/Admin/AdminLayout"
import AddAdmin from './pages/Admin/AddAdmin'
import CompanyPageUsers from './pages/Admin/CompanyPageUsers'
import EventesDashborde from './pages/Admin/EventesDashborde'
import JobVacanicesDashborde from './pages/Admin/JobVacanicesDashBorde'
import PersonalAccountUsers from './pages/Admin/PersonalAccountUsers'
import PostsDashborde from './pages/Admin/PostsDashboarde'
import ReportDashborde from './pages/Admin/ReportDashborde'
import AdminProfileDetail from "./pages/Admin/AdminProfileDetail"
import AdminProfileSetting from "./pages/Admin/AdminProfileSetting"
import SkillExam from "./pages/Admin/SkillExam"
import EditQuestion from "./pages/Admin/EditQuestion"
import NewAssessmentPage from "./pages/Admin/NewAssessmentPage"
function App() {
  return (
      <Routes>
         <Route path="/" element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signin/>}/>
              <Route path="/forgetPassword" element={<ForgetPassword/>}/>
              <Route path="/pageNotFound" element={<PageNotFound/>}/>
              <Route element={<ProtectedRoutes Autherazetion={["personal","admin","company"]}/>}>
                <Route path="/emailVerification" element={<EmailVerification/>}/>
                <Route path="/RecoverPassword" element={<RecoverPassword/>}/>
              </Route>
              <Route element={<ProtectedRoutes Autherazetion={["personal"]}/>}>
                <Route path="/PersonalAccountProfile" element={<PersonalAccountLayout/>}>
                     <Route path="/PersonalAccountProfile" element={<PersonalAccountProfile/>}/>
                     <Route path="PersonalMessage" element={<PersonalAccountMessage/>}/>
                     <Route path="PersonalNetwork" element={<PersonalAccountNetwork/>}/>
                     <Route path="PersonalNotification" element={<PersonalAccountNotification/>}/>
                     <Route path="PersonalProfileDetail" element={<PersonalAccountProfileDetail/>}/>
                     <Route path="PersonalProfileSetting" element={<PersonalAccountSetting/>}/>
                     <Route path="PersonalProfileDetail/EditExprience" element={<EditExprience/>}/>
                     <Route path="PersonalProfileDetail/EditEducation" element={<EditEducation/>}/>
                     <Route path="PersonalProfileDetail/EditSkill" element={<EditSkill/>}/>
                     <Route path="jobs" element={<Jobs/>}/>
                </Route>
              </Route>
              <Route element={<ProtectedRoutes Autherazetion={["company"]}/>}>
                <Route path="/ComapnyAccountProfile" element={<CompanyProfileAccount/>}/>
              </Route>
              <Route element={<ProtectedRoutes Autherazetion={["admin"]}/>}>
                <Route path="/AdminDashborde" element={<AdminLayout/>}>
                  <Route path="/AdminDashborde" element={<AdminDashborde/>}/>
                  <Route path="addAdmin" element={<AddAdmin/>}/>
                  <Route path="companyPages" element={<CompanyPageUsers/>}/>
                  <Route path="PersonalAccounts" element={<PersonalAccountUsers/>}/>
                  <Route path="jobVacancies" element={<JobVacanicesDashborde/>}/>
                  <Route path="posts" element={<PostsDashborde/>}/>
                  <Route path="events" element={<EventesDashborde/>}/>
                  <Route path="reports" element={<ReportDashborde/>}/>
                  <Route path="AdminProfileDetail" element={<AdminProfileDetail/>}/>
                  <Route path="AdminProfileSetting" element={<AdminProfileSetting/>}/>
                  <Route path="newAssessment" element={<SkillExam/>}/>
                  <Route path="editAssesment" element={<EditQuestion/>}/>
                  <Route path="newAssessment/creatQuetion" element={<NewAssessmentPage/>}/>
                </Route>
              </Route>
         </Route>
      </Routes>
  )
}

export default App
