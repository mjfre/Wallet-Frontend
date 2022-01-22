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

import SurveyHealthView from './subpages/health/SurveyHealthView';
import SwaggerSubcomponentTemplate from "../components/adminViewComponents/SwaggerSubcomponentTemplate";
import {errorNotification} from "../components/Notification";
import WorkspaceView from "./subpages/WorkspaceView";

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
        username: '',
        userRole: '',
        tab: 'wallet-records',
        workspaces: [],

        isFetching: false,
        collapsed: false,
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

        if (userRole === 'ADMIN') {

            const fetchData = [
                this.fetchStudents(),
                this.fetchSurveyEvents(),
                this.fetchSurveyOrders(),
                this.fetchTeachers(),
                this.fetchLinkTeacherStudent(),
                this.fetchPearIds(),
                this.fetchUsers(),
                this.fetchSurveySwagger(),
                this.fetchApplicationUserSwagger(),
            ]

            Promise.all(fetchData).then(() => {
            });

            adminMenuTabStyle = {display: 'inherit'};
            superuserMenuTabStyle = {display: 'inherit'};

        }

        this.setState({
            isFetching: false
        })

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
            surveySwaggerSpec, workspaces, userRole
        } = this.state;

        const {tab, username, isFetching} = this.state;

        if (isFetching) {
            return (
                <AdminContentContainer>
                    <LoadingOutlined/>
                </AdminContentContainer>
            );
        }

        const DataComponent = () => {

            if (tab === 'surveySwagger') {

                return <SwaggerSubcomponentTemplate swaggerSpec={surveySwaggerSpec}/>

            } else if (tab === 'surveyHealth') {

                return <SurveyHealthView/>

            } else if (tab === 'wallet-records') {

                return <WorkspaceView data={workspaces} userRole={userRole} username={username}/>

            } else if (tab === 'logout') {
                localStorage.removeItem('username');
                localStorage.removeItem('userRole');
                localStorage.removeItem('userTeacherId');
                this.props.history.push({
                    pathname: `/`,
                });
                return null;
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
                        <Menu.Item key="36" style={sharedAdminAndTeacherMenuTabStyle}
                                   onClick={() => this.setTabState('workspaces')}>
                            <CloudServerOutlined style={{color: '#f26522'}}/>
                            <span className="nav-text">Workspaces</span>
                        </Menu.Item>
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
                            </SubMenu>
                        </SubMenu>

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
