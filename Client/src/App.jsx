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
import EditAssessment from "./pages/Admin/EditAssessment"
import NewAssessmentPage from "./pages/Admin/NewAssessmentPage"
import EditQuestions from "./pages/Admin/EditQuestions"
import TakeSkillAssessment from "./pages/Personal/TakeSkillAssessment"
import QuestionStartPage from "./pages/Personal/QuestionStartPage"
import Exam from "./pages/Personal/Exam"
import PeoplesDeatail from "./pages/Personal/PeoplesDeatail"
import Connection from "./pages/Personal/Connection"
import PendingRequest from "./pages/Personal/PendingRequest"
import CompanyAccountLayout from "./Components/Company/CompanyAccountLayout"
import CompanyAccountNotification from "./pages/Company/CompanyAccountNotification"
import CompanyAccontJobsPages from "./pages/Company/CompanyAccountJobsPages"
import CompanyProfileDetail from "./pages/Company/CompanyProfileDetail"
import CompanyAccountSetting from "./pages/Company/CompanyAccountSetting"
import PageDetailes from './pages/Personal/PageDetailes'
import Pages from "./pages/Personal/Pages"
import FollowerDeatail from './pages/Company/FollowersDetail'
import Applicant from "./pages/Company/Applicant"
import PenddingJobs from "./pages/Personal/PenddingJobs"
import Page from "./pages/Company/Page"
import MyPosts from "./pages/Company/MyPosts"
import Myposts from "./pages/Personal/Myposts"
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
                     <Route path="PersonalNetwork/:userId" element={<PeoplesDeatail/>}/>
                     <Route path="PersonalNotification" element={<PersonalAccountNotification/>}/>
                     <Route path="PersonalProfileDetail" element={<PersonalAccountProfileDetail/>}/>
                     <Route path="PersonalProfileSetting" element={<PersonalAccountSetting/>}/>
                     <Route path="PersonalProfileDetail/EditExprience" element={<EditExprience/>}/>
                     <Route path="PersonalProfileDetail/EditEducation" element={<EditEducation/>}/>
                     <Route path="PersonalProfileDetail/EditSkill" element={<EditSkill/>}/>
                    <Route path="PersonalProfileDetail/takeAssessment" element={<TakeSkillAssessment/>}/>
                     <Route path="PersonalProfileDetail/takeAssessment/qs" element={<QuestionStartPage/>}/>
                     <Route path="PersonalProfileDetail/takeAssessment/exam" element={<Exam/>}/>
                     <Route path="connection" element={<Connection/>}/>
                     <Route path="pendingRequest" element={<PendingRequest/>}/>
                     <Route path="jobs" element={<Jobs/>}/>
                     <Route path="jobs/pending" element={<PenddingJobs/>}/>
                     <Route path='PersonalNetwork/pages/:pagesId' element={<PageDetailes/>} />
                     <Route path='pages' element={<Pages/>} />
                     <Route path='myposts' element={<Myposts/>} />
                </Route>
              </Route>
              <Route element={<ProtectedRoutes Autherazetion={["company"]}/>}>
                <Route path="/ComapnyAccountProfile" element={<CompanyAccountLayout/>}>
                  <Route path="/ComapnyAccountProfile" element={<CompanyProfileAccount/>}/>
                  <Route path="notification" element={<CompanyAccountNotification/>}/>
                  <Route path="job" element={<CompanyAccontJobsPages/>}/>
                  <Route path="profile" element={<CompanyProfileDetail/>}/>
                  <Route path="setting" element={<CompanyAccountSetting/>}/>
                  <Route path="profile/followers/:userId" element={<FollowerDeatail/>}/>
                  <Route path="job/applicant/:jobId" element={<Applicant/>}/>
                  <Route path='pages/:pagesId' element={<Page/>} />
                  <Route path='myposts' element={<MyPosts/>} />
                </Route>
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
                  <Route path="editAssesment" element={<EditAssessment/>}/>
                  <Route path="newAssessment/creatQuetion" element={<NewAssessmentPage/>}/>
                  <Route path="editAssesment/editQuestion" element={<EditQuestions/>}/>
                  
                </Route>
              </Route>
         </Route>
      </Routes>
  )
}

export default App
