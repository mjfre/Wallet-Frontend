import React, {Component} from 'react';
import {
    Layout,
    Menu,
} from 'antd';

import {
    //menu
    TeamOutlined,
    IdcardOutlined,
    CalendarOutlined,
    BookOutlined,
    CoffeeOutlined,
    CrownOutlined,
    DotChartOutlined,
    ExclamationCircleOutlined,
    ExperimentOutlined,
    RiseOutlined,
    CalculatorOutlined,
    CloseCircleOutlined,
    CloudServerOutlined,
    //pear submenu
    FundOutlined,
    UserSwitchOutlined,
    GithubOutlined,
    ToolOutlined,
    ContainerOutlined,
    //pear submenu
    DashboardOutlined,
    CodeOutlined,
    DesktopOutlined,
    CommentOutlined,
    MessageOutlined,
    FacebookOutlined,
    TwitterOutlined, LinkOutlined, FileTextOutlined, ReadOutlined, AimOutlined, EnvironmentOutlined

} from '@ant-design/icons';
import './css/AdminView.css';

import "swagger-ui-react/swagger-ui.css"


import AdminService from '../service/AdminService';
import {LoadingOutlined} from '@ant-design/icons';
import AdminContentContainer from '../components/adminViewComponents/AdminContentContainer';
import MenuLogo from './../components/adminViewComponents/MenuLogo';

import './../App.css';

import StudentView from './subpages/StudentView'
import SurveyOrderView from './subpages/SurveyOrderView'
import SurveyEventView from './subpages/SurveyEventView'
import TeacherView from './subpages/TeacherView'
import PearIdView from './subpages/PearIdView'
import UserView from './subpages/UserView'
import ApExamView from './subpages/ApExamView';
import OracleExamView from './subpages/OracleExamView';
import LevelGraduationView from './subpages/LevelGraduationView';
import PartialLevelGraduationView from "./subpages/PartialLevelGraduationView";
import LinkTeacherStudentView from './subpages/TeacherLinkView';
import StudentProfileView from './subpages/StudentProfileView';
import TeacherProfileView from './subpages/TeacherProfileView';
import SurveyHealthView from './subpages/health/SurveyHealthView';
import UserHealthView from './subpages/health/UserHealthView';
import MySurveysView from './subpages/teacher/MySurveysView';
import GraduationFormView from './subpages/GraduationFormView'
import {SubstituteRequestFormView} from './subpages/SubstituteRequestFormView'
import {SubstituteRequestView} from './subpages/SubstituteRequestView'
import LevelTestMaxScoresView from './subpages/LevelTestMaxScoresView';
import SwaggerSubcomponentTemplate from "../components/adminViewComponents/SwaggerSubcomponentTemplate";
import {errorNotification} from "../components/Notification";
import WorkspaceView from "./subpages/WorkspaceView";
import DataView from "./subpages/DataView";
import {AssessmentTestResultsView} from "./subpages/AssessmentTestResultsView";
import {AssessmentTestFormView} from "./subpages/AssessmentTestFormView";
import {FindClassesByLevelFormView} from "./subpages/FindClassesByLevelFormView";
import {GraduationWarningView} from "./subpages/GraduationWarningView";

const {SubMenu} = Menu;
const {Sider} = Layout;
const logoStyle = {height: '32px', background: 'red', margin: '16px'};
let adminMenuTabStyle = {display: 'none'};
let superuserMenuTabStyle = {display: 'none'};
let teacherTabStyle = {display: 'none'};
let sharedAdminAndTeacherMenuTabStyle = {display: 'inherit'};
let testTabStyle = {display: 'none'}

class AdminView extends Component {

    state = {
        tab: 'students',

        workspaces: [],

        students: [],
        selectedStudent: {},

        surveyEvents: [],
        teachers: [],
        linkTeacherStudent: [],
        surveyOrders: [],
        pearIds: [],
        users: [],
        levelTestMaxScores: [],
        studentIdForProfile: null,
        moduleRepositoryInfo: [],
        teacherProfile: null,

        isFetching: false,
        collapsed: false,

        username: '',
        userRole: '',
        userTeacherId: '',

        myActiveSurveyOrders: [],
        myStudents: [],

        surveySwaggerSpec: [],
        applicationUserSwaggerSpec: [],
        //  workspaceSwaggerSpec: []
    }

    componentDidMount() {
        if (window.innerWidth <= 800) {
            this.setState({
                collapsed: true
            });
        }

        this.setState({
            isFetching: true
        });

        this.setRole();
    }

    setRole = () => {
        let username = this.props.location.state.username || localStorage.getItem('username');
        let userRole = this.props.location.state.userRole || localStorage.getItem('userRole');
        let userTeacherId = this.props.location.state.userTeacherId || localStorage.getItem('userTeacherId');

        this.setState({
            username: username,
            userRole: userRole,
            userTeacherId: userTeacherId
        })

        if (userRole === 'ADMIN' || userRole === 'SUPERUSER') {

            const fetchData = [
                this.fetchStudents(),
                this.fetchSurveyEvents(),
                this.fetchSurveyOrders(),
                this.fetchTeachers(),
                this.fetchLinkTeacherStudent(),
                this.fetchPearIds()
            ]

            Promise.all(fetchData).then(() => {
            });

            adminMenuTabStyle = {display: 'inherit'};

        }
        if (userRole === 'SUPERUSER') {

            const fetchData = [
                this.fetchUsers(),
                this.fetchSurveySwagger(),
                this.fetchApplicationUserSwagger(),
            ]

            Promise.all(fetchData).then(() => {
            });

            superuserMenuTabStyle = {display: 'inherit'};

        }

        if (userRole === 'TEACHER' || userTeacherId !== 'null') {
            this.fetchStudents();
            this.fetchActiveSurveyOrdersByTeacherId(userTeacherId);
            this.fetchStudentsByTeacherId(userTeacherId);
            teacherTabStyle = {display: 'inherit'};
            this.setState({
                tab: "myStudents"
            })
        }

        if (username === 'matt' || username === "Matt") {
            testTabStyle = {display: 'inherit'};
        }

        this.setState({
            isFetching: false
        })

    }

    showStudentProfileView = (studentId) => {
        this.setState({
            studentIdForProfile: studentId,
            tab: "studentProfile"
        });
    }


    showTeacherProfileView = (teacherId) => {
        AdminService.fetchTeacherProfile(teacherId)
            .then(response =>
                response.json()
            )
            .then(data => {
                console.log("teacher profile:")
                console.log(data);
                this.setState({
                    teacherProfile: data,
                    tab: "teacherProfile"
                })
            });
    }


    fetchStudents = () => {
        AdminService.getPearSurveyApi("/student")
            .then(response => {
                if (response.status === 403) {
                    errorNotification("Authentication Token Expired", "Please login to receive a new token")
                    this.setTabState("logout");
                    return false;
                } else {
                    return response.json();
                }
            })
            .then(data => {
                // console.log("students:")
                // console.log(data);
                this.setState({
                    students: data
                })
            });
    }

    fetchSurveyEvents = () => {
        AdminService.getPearSurveyApi("/survey/event")
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log('survey events:')
                //console.log(data);
                this.setState({
                    surveyEvents: data
                })
            });
    }

    fetchTeachers = () => {
        AdminService.getPearSurveyApi("/teacher")
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log("teachers:")
                //console.log(data);
                this.setState({
                    teachers: data,
                    isFetching: false
                })

            });
    }

    fetchLinkTeacherStudent = () => {
        AdminService.getPearSurveyApi("/teacherLink/domainObject")
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log('teacher links:')
                //console.log(data);
                this.setState({
                    linkTeacherStudent: data,
                    isFetching: false
                })

            });
    }

    fetchSurveyOrders = () => {
        AdminService.getPearSurveyApi("/survey/order/domainObject")
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log("survey orders:")
                //console.log(data);
                this.setState({
                    surveyOrders: data
                })
            });
    }

    fetchPearIds = () => {
        AdminService.getPearSurveyApi("/pearId/domainObject")
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log("pear ids:")
                //console.log(data);
                this.setState({
                    pearIds: data
                })
            });
    }

    fetchActiveSurveyOrdersByTeacherId = (teacherId) => {
        AdminService.fetchActiveSurveyOrdersByTeacherId(teacherId)
            .then(response =>
                response.json()
            )
            .then(data => {
                // console.log("teacher profile:")
                // console.log(data);
                this.setState({
                    myActiveSurveyOrders: data,
                })
            });
    }

    fetchStudentsByTeacherId = (teacherId) => {
        AdminService.fetchStudentsByTeacherId(teacherId)
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log("My Students:")
                //console.log(data);
                this.setState({
                    myStudents: data,
                })
            });
    }

    fetchLevelTestMaxScores = () => {
        AdminService.fetchLevelTestMaxScores()
            .then(response =>
                response.json()
            )
            .then(data => {
                console.log("Level Test Max Scores:")
                console.log(data);
                this.setState({
                    levelTestMaxScores: data,
                })
            });
    }

    fetchUsers = () => {
        AdminService.getUsers()
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log("users:")
                //console.log(data);
                this.setState({
                    users: data
                })
            });
    }

    fetchSurveySwagger = () => {
        AdminService.getSurveySwagger()
            .then(response =>
                response.json()
            )
            .then(data => {
                this.setState({
                    surveySwaggerSpec: data
                })
            });
    }

    fetchApplicationUserSwagger = () => {
        AdminService.getAuthenticationSwagger()
            .then(response =>
                response.json()
            )
            .then(data => {
                this.setState({
                    applicationUserSwaggerSpec: data
                })
            });
    }

    fetchWorkspaceSwagger = () => {
        AdminService.getWorkspaceSwagger()
            .then(response =>
                response.json()
            )
            .then(data => {
                this.setState({
                    workspaceSwaggerSpec: data
                })
            });
    }

    setTabState = (tabName) => {
        //console.log("TAB SELECTED: " + tabName);
        this.setState(({
            tab: tabName
        }))
    }

    onCollapse = collapsed => {
        this.setState({collapsed});
    };

    render() {
        const {
            students, teachers, linkTeacherStudent, surveyEvents, surveyOrders,
            pearIds, users, teacherProfile, userTeacherId,
            surveySwaggerSpec, applicationUserSwaggerSpec, workspaceSwaggerSpec, workspaces, userRole
        } = this.state;

        const {tab, username, isFetching} = this.state;

        const {myActiveSurveyOrders, myStudents, studentIdForProfile} = this.state;

        if (isFetching) {
            return (
                <AdminContentContainer>
                    <LoadingOutlined/>
                </AdminContentContainer>
            );
        }

        const DataComponent = () => {
            if (tab === 'students') {

                return (
                    <StudentView
                        data={students}
                        fetchData={this.fetchStudents}
                        showStudentProfileView={this.showStudentProfileView}
                        teacherPage={false}
                    />
                );

            } else if (tab === 'surveyOrders') {

                return <SurveyOrderView data={surveyOrders} fetchData={this.fetchSurveyOrders}/>

            } else if (tab === 'surveyEvents') {

                return <SurveyEventView data={surveyEvents} fetchData={this.fetchSurveyEvents}
                                        fetchSurveyOrders={this.fetchSurveyOrders} username={username}/>

            } else if (tab === 'teachers') {

                return <TeacherView data={teachers} fetchData={this.fetchTeachers}
                                    showTeacherProfileView={this.showTeacherProfileView}/>

            } else if (tab === 'pearIds') {

                return <PearIdView data={pearIds} fetchData={this.fetchPearIds} fetchStudents={this.fetchStudents}/>

            } else if (tab === 'users') {

                return <UserView data={users} fetchData={this.fetchUsers} teachers={teachers}/>

            } else if (tab === 'surveySwagger') {

                return <SwaggerSubcomponentTemplate swaggerSpec={surveySwaggerSpec}/>

            } else if (tab === 'applicationUserSwagger') {

                return <SwaggerSubcomponentTemplate swaggerSpec={applicationUserSwaggerSpec}/>

            } else if (tab === 'workspaceSwagger') {

                return <SwaggerSubcomponentTemplate swaggerSpec={workspaceSwaggerSpec}/>

            } else if (tab === 'surveyHealth') {

                return <SurveyHealthView/>

            } else if (tab === 'userHealth') {

                return <UserHealthView/>

            } else if (tab === 'studentProfile') {

                return <StudentProfileView studentIdForProfile={studentIdForProfile}/>

            } else if (tab === 'teacherProfile') {

                return <TeacherProfileView data={teacherProfile}/>

            } else if (tab === 'teacherLink') {

                return <LinkTeacherStudentView data={linkTeacherStudent} fetchData={this.fetchLinkTeacherStudent}/>

            }
            //TEACHER TABS
            else if (tab === 'mySurveys') {

                return <MySurveysView data={myActiveSurveyOrders} fetchData={this.fetchActiveSurveyOrdersByTeacherId}/>

            } else if (tab === 'myStudents') {

                return (
                    <StudentView
                        data={myStudents}
                        fetchData={this.fetchStudentsByTeacherId}
                        showStudentProfileView={this.showStudentProfileView}
                        teacherPage={true}
                    />
                );

            } else if (tab === 'graduationForm') {

                return <GraduationFormView fetchData={this.fetchStudents} students={students}/>;

            } else if (tab === 'substituteRequestForm') {

                return <SubstituteRequestFormView username={username} userTeacherId={userTeacherId}/>;

            } else if (tab === 'subRequestView') {

               return <SubstituteRequestView username={username}/>;

            } else if (tab === 'levelTestMaxScores') {

                return <LevelTestMaxScoresView/>

            } else if (tab === 'apGraduations') {

                return <ApExamView userRole={userRole}/>

            } else if (tab === 'oracleGraduations') {

                return <OracleExamView userRole={userRole}/>

            } else if (tab === 'javaLevelGraduations') {

                return <LevelGraduationView/>

            } else if (tab === 'workspaces') {

                return <WorkspaceView data={workspaces} userRole={userRole} username={username}/>

            } else if (tab === 'partialJavaLevelGraduations') {

                return <PartialLevelGraduationView/>

            } else if (tab === 'logout') {
                localStorage.removeItem('username');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userTeacherId');
                this.props.history.push({
                    pathname: `/`,
                });
                return null;
            } else if (tab === 'data') {

                return <DataView/>

            } else if (tab === 'assessmentTestForm') {
                return <AssessmentTestFormView username={username}/>
            } else if (tab === 'assessmentTestResults') {
                return <AssessmentTestResultsView userRole={userRole}/>
            } else if (tab === 'findClassesByLevelForm') {
                return <FindClassesByLevelFormView userRole={userRole}/>
            } else if (tab === 'graduationWarningView') {
                return <GraduationWarningView/>
            }
        }

        return (

            <Layout>
                <Sider
                    collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}
                    width={'16em'}
                    style={{
                        height: '100vh',
                        overflowY: 'scroll',
                        overflowX: 'hidden',
                        paddingBottom: '1em',
                        width: '20%',
                    }}
                >
                    <MenuLogo style={logoStyle}/>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['0']}>
                        {/*my students*/}
                        <Menu.Item key="1" style={teacherTabStyle} onClick={() => this.setTabState('myStudents')}>
                            <TeamOutlined style={{color: '#f26522'}}/>
                            <span className="nav-text">My Students</span>
                        </Menu.Item>
                        {/*my surveys*/}
                        {/*<Menu.Item key="2" style={teacherTabStyle} onClick={() => this.setTabState('mySurveys')}>*/}
                        {/*    <BookOutlined/>*/}
                        {/*    <span className="nav-text">My Surveys</span>*/}
                        {/*</Menu.Item>*/}
                        {/*students*/}
                        <Menu.Item
                            key="5"
                            style={adminMenuTabStyle}
                            onClick={() => this.setTabState('students')}
                        >
                            <TeamOutlined style={{color: '#f26522'}}/>
                            <span className="nav-text">Students</span>
                        </Menu.Item>
                        {/*teachers*/}
                        <Menu.Item key="6" style={adminMenuTabStyle} onClick={() => this.setTabState('teachers')}>
                            <CoffeeOutlined style={{color: '#f26522'}}/>
                            <span className="nav-text">
                                Teachers
                            </span>
                        </Menu.Item>
                        <Menu.Item key="36" style={sharedAdminAndTeacherMenuTabStyle}
                                   onClick={() => this.setTabState('workspaces')}>
                            <CloudServerOutlined style={{color: '#f26522'}}/>
                            <span className="nav-text">Workspaces</span>
                        </Menu.Item>
                        {/*exam records*/}
                        <SubMenu key="91" style={sharedAdminAndTeacherMenuTabStyle} title={
                            <span>
                                    <ToolOutlined style={{color: '#f26522'}}/>
                                    <span>Tools</span>
                                </span>
                        }
                        >

                            {/*graduation form*/}
                            <Menu.Item key="3" style={sharedAdminAndTeacherMenuTabStyle}
                                       onClick={() => this.setTabState('graduationForm')}>
                                <RiseOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">Graduation Form</span>
                            </Menu.Item>
                            <Menu.Item key="7" style={testTabStyle}
                                       onClick={() => this.setTabState('substituteRequestForm')}>
                                <UserSwitchOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">Sub Request Form</span>
                            </Menu.Item>
                            <Menu.Item key="84" style={sharedAdminAndTeacherMenuTabStyle}
                                       onClick={() => this.setTabState('assessmentTestForm')}>
                                <AimOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">
                                Assessment Test
                            </span>
                            </Menu.Item>
                            <Menu.Item key="87" style={sharedAdminAndTeacherMenuTabStyle}
                                       onClick={() => this.setTabState('findClassesByLevelForm')}>
                                <EnvironmentOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">Find Class by Level</span>
                            </Menu.Item>
                        </SubMenu>
                        <SubMenu key="89" style={sharedAdminAndTeacherMenuTabStyle} title={
                            <span>
                                    <FundOutlined style={{color: '#f26522'}}/>
                                    <span>Cool Data</span>
                                </span>
                        }
                        >
                            <Menu.Item key="8" style={testTabStyle}
                                       onClick={() => this.setTabState('subRequestView')}>
                                <UserSwitchOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">Sub Requests</span>
                            </Menu.Item>
                            <Menu.Item key="38" style={sharedAdminAndTeacherMenuTabStyle}
                                       onClick={() => this.setTabState('data')}>
                                <DashboardOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">Student Totals</span>
                            </Menu.Item>
                            <Menu.Item key="88" style={sharedAdminAndTeacherMenuTabStyle}
                                       onClick={() => this.setTabState('graduationWarningView')}>
                                <ExclamationCircleOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">Graduation Warnings</span>
                            </Menu.Item>
                            <SubMenu key="35" style={sharedAdminAndTeacherMenuTabStyle} title={
                                <span>
                                    <ReadOutlined style={{color: '#f26522'}}/>
                                    <span>Exam Records</span>
                                </span>
                            }
                            >
                                <Menu.Item key="86" style={testTabStyle}
                                           onClick={() => this.setTabState('assessmentTestResults')}>
                                    <DotChartOutlined style={{color: '#f26522'}}/>
                                    <span className="nav-text">Assessments</span>
                                </Menu.Item>
                                <SubMenu
                                    key="30"
                                    title={
                                        <span>
                                    <ReadOutlined style={{color: '#f26522'}}/>
                                    <span>Java</span>
                                </span>
                                    }
                                    style={sharedAdminAndTeacherMenuTabStyle}
                                >
                                    <Menu.Item key="31" style={sharedAdminAndTeacherMenuTabStyle}
                                               onClick={() => this.setTabState('javaLevelGraduations')}>
                                        <DotChartOutlined style={{color: '#f26522'}}/>
                                        <span className="nav-text">Levels</span>
                                    </Menu.Item>
                                    <Menu.Item key="32" style={sharedAdminAndTeacherMenuTabStyle}
                                               onClick={() => this.setTabState('partialJavaLevelGraduations')}>
                                        <DotChartOutlined style={{color: '#f26522'}}/>
                                        <span className="nav-text">Partial</span>
                                    </Menu.Item>
                                    <Menu.Item key="4" style={adminMenuTabStyle}
                                               onClick={() => this.setTabState('levelTestMaxScores')}>
                                        <CalculatorOutlined style={{color: '#f26522'}}/>
                                        <span className="nav-text">Test Points</span>
                                    </Menu.Item>
                                </SubMenu>

                                <Menu.Item key="33" style={sharedAdminAndTeacherMenuTabStyle}
                                           onClick={() => this.setTabState('apGraduations')}>
                                    <DotChartOutlined style={{color: '#f26522'}}/>
                                    <span className="nav-text">AP Exam</span>
                                </Menu.Item>
                                <Menu.Item key="34" style={sharedAdminAndTeacherMenuTabStyle}
                                           onClick={() => this.setTabState('oracleGraduations')}>
                                    <DotChartOutlined style={{color: '#f26522'}}/>
                                    <span className="nav-text">Oracle Exam</span>
                                </Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        {/*exam records*/}

                        {/*pear survey*/}
                        <SubMenu key="9" style={adminMenuTabStyle} title={
                            <span>
                                    <ContainerOutlined style={{color: '#f26522'}}/>
                                    <span>Pear Survey</span>
                                </span>
                        }
                        >
                            <Menu.Item key="10">
                                <CalendarOutlined style={{color: '#f26522'}}/>
                                <span
                                    className="nav-text"
                                    onClick={() => this.setTabState('surveyEvents')}
                                >
                                    survey events
                                </span>
                            </Menu.Item>
                            <Menu.Item key="11" onClick={() => this.setTabState('surveyOrders')}>
                                <BookOutlined style={{color: '#f26522'}}/>
                                <span className="nav-text">survey orders</span>
                            </Menu.Item>
                            <Menu.Item key="12">
                                <IdcardOutlined style={{color: '#f26522'}}/>
                                <span
                                    className="nav-text"
                                    onClick={() => this.setTabState('pearIds')}
                                >
                                    pear ids
                                </span>
                            </Menu.Item>
                        </SubMenu>
                        {/*superuser tabs */}
                        <SubMenu
                            key="13"
                            title={
                                <span>
                                    <CrownOutlined style={{color: '#f26522'}}/>
                                    <span>Superuser</span>
                                </span>
                            }
                            style={superuserMenuTabStyle}
                        >
                            <Menu.Item key="14" style={superuserMenuTabStyle}>
                                <CrownOutlined style={{color: '#f26522'}}/>
                                <span
                                    className="nav-text"
                                    onClick={() => this.setTabState('users')}
                                >
                                    users
                                </span>
                            </Menu.Item>
                            <SubMenu
                                key="15"
                                title={
                                    <span>
                                        <CrownOutlined style={{color: '#f26522'}}/>
                                        <span>API</span>
                                    </span>
                                }
                                style={superuserMenuTabStyle}
                            >
                                <Menu.Item key="16" style={superuserMenuTabStyle}>
                                    <CrownOutlined style={{color: '#f26522'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => this.setTabState('surveySwagger')}
                                    >
                                        Survey
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="17" style={superuserMenuTabStyle}>
                                    <CrownOutlined style={{color: '#f26522'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => this.setTabState('applicationUserSwagger')}
                                    >
                                        User
                                    </span>
                                </Menu.Item>
                            </SubMenu>
                            <SubMenu
                                key="19"
                                title={
                                    <span>
                                        <CrownOutlined style={{color: '#f26522'}}/>
                                        <span>health</span>
                                    </span>
                                }
                                style={superuserMenuTabStyle}
                            >
                                <Menu.Item key="20" style={superuserMenuTabStyle}>
                                    <CrownOutlined style={{color: '#f26522'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => this.setTabState('surveyHealth')}
                                    >
                                        Survey
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="21" style={superuserMenuTabStyle}>
                                    <CrownOutlined style={{color: '#f26522'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => this.setTabState('userHealth')}
                                    >
                                        User
                                    </span>
                                </Menu.Item>
                            </SubMenu>
                        </SubMenu>

                        {/*links*/}

                        <SubMenu key="90" style={sharedAdminAndTeacherMenuTabStyle} title={
                            <span>
                                    <ExperimentOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Resources</span>
                                </span>
                        }
                        >

                            {/*curriculum links*/}
                            <SubMenu
                                key="39"
                                title={
                                    <span>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Curriculum</span>
                                </span>
                                }
                                style={sharedAdminAndTeacherMenuTabStyle}
                            >
                                <Menu.Item key="49" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://workshop.jointheleague.org')}
                                    >
                                        Workshop
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="40" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://central.jointheleague.org/levels/Level0')}
                                    >
                                        Level 0
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="41" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://central.jointheleague.org/levels/Level1')}
                                    >
                                        Level 1
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="42" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://central.jointheleague.org/levels/Level2')}
                                    >
                                        Level 2
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="43" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://central.jointheleague.org/levels/Level3')}
                                    >
                                        Level 3
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="44" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://central.jointheleague.org/levels/Level4')}
                                    >
                                        Level 4
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="45" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://central.jointheleague.org/levels/Level5')}
                                    >
                                        Level 5
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="46" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://central.jointheleague.org/levels/Level6')}
                                    >
                                        Level 6
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="47" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://level7.jointheleague.org')}
                                    >
                                        Level 7
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="48" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <DesktopOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://level8.jointheleague.org')}
                                    >
                                        Level 8
                                    </span>
                                </Menu.Item>
                            </SubMenu>

                            {/*repository links*/}
                            <SubMenu
                                key="50"
                                title={
                                    <span>
                                    <CodeOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Repositories</span>
                                </span>
                                }
                                style={sharedAdminAndTeacherMenuTabStyle}
                            >
                                <Menu.Item key="51" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <GithubOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://github.com/league-central')}
                                    >
                                        League Central
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="52" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <GithubOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://github.com/jointheleague')}
                                    >
                                        Join the League
                                    </span>
                                </Menu.Item>

                                {/*level repository links*/}
                                <SubMenu
                                    key="53"
                                    title={
                                        <span>
                                    <CodeOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Levels</span>
                                </span>
                                    }
                                    style={sharedAdminAndTeacherMenuTabStyle}
                                >
                                    <Menu.Item key="54" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level0')}
                                        >
                                        Level 0
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="55" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level1')}
                                        >
                                        Level 1
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="56" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level2')}
                                        >
                                        Level 2
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="57" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level3')}
                                        >
                                        Level 3
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="58" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level4')}
                                        >
                                        Level 4
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="59" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level5')}
                                        >
                                        Level 5
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="60" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level6')}
                                        >
                                        Level 6
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="61" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level7')}
                                        >
                                        Level 7
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="62" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level8')}
                                        >
                                        Level 8
                                    </span>
                                    </Menu.Item>
                                </SubMenu>

                                {/*student level repository links*/}
                                <SubMenu
                                    key="63"
                                    title={
                                        <span>
                                    <CodeOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Students</span>
                                </span>
                                    }
                                    style={sharedAdminAndTeacherMenuTabStyle}
                                >
                                    <Menu.Item key="64" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level0-student')}
                                        >
                                        Level 0
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="65" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level1-student')}
                                        >
                                        Level 1
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="66" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level2-student')}
                                        >
                                        Level 2
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="67" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level3-student')}
                                        >
                                        Level 3
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="68" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level4-student')}
                                        >
                                        Level 4
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="69" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level5-student')}
                                        >
                                        Level 5
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="70" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level6/DiscordBot_v2')}
                                        >
                                        Level 6
                                    </span>
                                    </Menu.Item>
                                    <Menu.Item key="71" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <GithubOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://github.com/league-level7')}
                                        >
                                        Level 7
                                    </span>
                                    </Menu.Item>
                                </SubMenu>
                            </SubMenu>

                            {/*social media links*/}
                            <SubMenu
                                key="72"
                                title={
                                    <span>
                                    <CommentOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Social Media</span>
                                </span>
                                }
                                style={sharedAdminAndTeacherMenuTabStyle}
                            >
                                <Menu.Item key="73" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <MessageOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://discord.com/channels/692477183775604828/882759248830935070')}
                                    >
                                        Discord
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="74" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <MessageOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://jointheleague.slack.com/')}
                                    >
                                        Slack
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="75" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <FacebookOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://www.facebook.com/LeagueOfAmazingProgrammers')}
                                    >
                                        Facebook
                                    </span>
                                </Menu.Item>

                                <Menu.Item key="76" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <TwitterOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://twitter.com/LEAGUEofAmazing')}
                                    >
                                        Twitter
                                    </span>
                                </Menu.Item>

                                <SubMenu
                                    key="77"
                                    title={
                                        <span>
                                    <CommentOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Invites</span>
                                </span>
                                    }
                                    style={sharedAdminAndTeacherMenuTabStyle}
                                >
                                    <Menu.Item key="83" style={sharedAdminAndTeacherMenuTabStyle}>
                                        <MessageOutlined style={{color: '#4d9ae3'}}/>
                                        <span
                                            className="nav-text"
                                            onClick={() => window.open('https://discord.gg/C2bMsAKEXC')}
                                        >
                                        Discord
                                    </span>
                                    </Menu.Item>
                                </SubMenu>
                            </SubMenu>
                            {/*documents*/}
                            <SubMenu
                                key="79"
                                title={
                                    <span>
                                    <FileTextOutlined style={{color: '#4d9ae3'}}/>
                                    <span>Documents</span>
                                </span>
                                }
                                style={sharedAdminAndTeacherMenuTabStyle}
                            >
                                <Menu.Item key="80" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <FileTextOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://docs.google.com/document/d/1U2a78dBxWNupir38XaunDPjgBuvJDiZREkOLx_VaX8c')}
                                    >
                                        Volunteer Manual
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="85" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <FileTextOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfjtJWZVjd1tY65DBz0zv_6b27YRo8E0TErtORuiUbF7HrSRw/viewform')}
                                    >
                                        Expenses
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="81" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <FileTextOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://www.jotform.com/TheLeague/EnglishEnrollment')}
                                    >
                                        Enrollment (ENG)
                                    </span>
                                </Menu.Item>
                                <Menu.Item key="82" style={sharedAdminAndTeacherMenuTabStyle}>
                                    <FileTextOutlined style={{color: '#4d9ae3'}}/>
                                    <span
                                        className="nav-text"
                                        onClick={() => window.open('https://www.jotform.com/TheLeague/SpanishEnrollment')}
                                    >
                                        Enrollment (ESP)
                                    </span>
                                </Menu.Item>
                            </SubMenu>
                        </SubMenu>
                        <Menu.Item key="37"
                                   style={{backgroundColor: 'rgb(3,21,39)', ...sharedAdminAndTeacherMenuTabStyle}}>
                            <LinkOutlined style={{color: '#4d9ae3'}}/>
                            <span
                                className="nav-text"
                                onClick={() => window.open('https://us02web.zoom.us/j/2930261311?pwd=c2RpMW1MNHdMOGhEQkU5OFhHazhKdz09')}

                            >
                                        League Zoom
                                    </span>
                        </Menu.Item>
                        <Menu.Item key="78"
                                   style={{backgroundColor: 'rgb(3,21,39)', ...sharedAdminAndTeacherMenuTabStyle}}>
                            <LinkOutlined style={{color: '#4d9ae3'}}/>

                            <span
                                className="nav-text"
                                onClick={() => window.open('https://jtl.pike13.com/today#')}

                            >
                                        Attendance
                                    </span>
                        </Menu.Item>
                        <Menu.Item key="22" style={{...sharedAdminAndTeacherMenuTabStyle, paddingBottom: '7em'}}>
                            <CloseCircleOutlined style={{color: '#4d9ae3'}}/>
                            <span
                                className="nav-text"
                                style={{color: '#4d9ae3'}}
                                onClick={() => this.setTabState('logout')}
                            >
                                        logout
                                    </span>
                        </Menu.Item>

                    </Menu>
                </Sider>

                <Layout className="site-layout" style={{height: '100vh', marginLeft: '0em', overflow: 'scroll'}}>
                    <DataComponent/>
                </Layout>
            </Layout>
        );

    }
}

export default AdminView;
