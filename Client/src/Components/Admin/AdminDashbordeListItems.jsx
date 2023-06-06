import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import WysiwygOutlinedIcon from '@mui/icons-material/WysiwygOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ReportOutlinedIcon from '@mui/icons-material/ReportOutlined';
import AddModeratorOutlinedIcon from '@mui/icons-material/AddModeratorOutlined';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import MapsUgcOutlinedIcon from '@mui/icons-material/MapsUgcOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
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
        Name:'Reports',
        Icon:<ReportOutlinedIcon color='primary'/>,
        Path:'reports'
    },
    {
        id:7,
        Name:'SkillAssessment',
        Icon:<QuizOutlinedIcon color='primary'/>,
        upArrow:<KeyboardArrowUpIcon color='primary'/>,
        downArrow:<KeyboardArrowDownIcon color='primary'/>,
        lefrArrow:<KeyboardArrowLeftIcon color='primary'/>,
        rightArrow:<KeyboardArrowRightIcon color='primary'/>,
        Path:'skillExams',
        Submenu:[
            {
                id:1,
                Name:'NewProgram',
                Icon:<MapsUgcOutlinedIcon color='primary'/>,
                Path:'newAssessment',
            },
            {
                id:2,
                Name:'ExstingProgram',
                Icon:<EditNoteOutlinedIcon color='primary'/>,
                Path:'editAssesment',
            }
        ]
    },
    {
        id:9,
        Name:'AddAdmin',
        Icon:<AddModeratorOutlinedIcon color='primary'/>,
        Path:'addAdmin'
    }
]