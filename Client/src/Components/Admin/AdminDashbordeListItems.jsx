import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
export const DashBordeListItems = [
    {
        id:1,
        Name:'Dashboard',
        Icon:<DashboardCustomizeOutlinedIcon color='primary'/>,
        Path:'/AdminDashborde'
    },
    {
        id:2,
        Name:'PersonalAccounts',
        Icon:<AccountBoxOutlinedIcon color='primary'/>,
        Path:'PersonalAccounts'
    },
    {
        id:3,
        Name:'CompanyPages',
        Icon:<CopyrightOutlinedIcon color='primary'/>,
        Path:'companyPages'
    },
    {
        id:4,
        Name:'JobVacancies',
        Icon:<WorkOutlineOutlinedIcon color='primary'/>,
        Path:'jobVacancies'
    },
    {
        id:5,
        Name:'Post',
        Icon:<WysiwygOutlinedIcon color='primary'/>,
        Path:'posts'
    },
    {
        id:6,
        Name:'Events',
        Icon:<CalendarMonthOutlinedIcon color='primary'/>,
        Path:'events'
    },
    {
        id:7,
        Name:'Reports',
        Icon:<ReportOutlinedIcon color='primary'/>,
        Path:'reports'
    },
    {
        id:8,
        Name:'SkillAssessment',
        Icon:<QuizOutlinedIcon color='primary'/>,
        Path:'skillExams'
    },
    {
        id:9,
        Name:'AddAdmin',
        Icon:<AddModeratorOutlinedIcon color='primary'/>,
        Path:'addAdmin'
    }
]