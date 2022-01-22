import React, {Component} from 'react';
import {
    Layout,
    Menu,
} from 'antd';

import {
    //menu
    DatabaseOutlined,
    PlusCircleOutlined,
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


import AdminService from '../service/WalletService';
import {LoadingOutlined} from '@ant-design/icons';
import AdminContentContainer from '../components/adminViewComponents/AdminContentContainer';
import MenuLogo from './../components/adminViewComponents/MenuLogo';

import './../App.css';

import SurveyHealthView from './subpages/health/SurveyHealthView';
import SwaggerSubcomponentTemplate from "../components/adminViewComponents/SwaggerSubcomponentTemplate";
import {errorNotification} from "../components/Notification";
import ThorWalletRecordView from "./subpages/ThorWalletRecordView";
import AddThorWalletAddressFormView from "./subpages/AddThorWalletAddressFormView";
import WalletService from "../service/WalletService";

const {SubMenu} = Menu;
const {Sider} = Layout;
const logoStyle = {height: '32px', background: 'red', margin: '16px'};

class AdminView extends Component {

    state = {
        username: '',
        userRole: '',
        tab: 'wallet-records',
        workspaces: [],

        isFetching: false,
        collapsed: false,
        walletSwaggerSpec: null
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


        const fetchData = [
            this.fetchUsers(),
            this.fetchWalletSwagger(),
        ]

        Promise.all(fetchData).then(() => {
        });


        this.setState({
            isFetching: false
        })

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

    fetchWalletSwagger = () => {
        WalletService.getWalletSwagger()
            .then(response =>
                response.json()
            )
            .then(data => {
                console.log(data)
                this.setState({
                    walletSwaggerSpec: data
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
            walletSwaggerSpec, workspaces, userRole
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

            if (tab === 'wallet-swagger') {

                return <SwaggerSubcomponentTemplate swaggerSpec={walletSwaggerSpec}/>

            } else if (tab === 'add-wallets') {

                return <AddThorWalletAddressFormView/>

            } else if (tab === 'wallet-records') {

                return <ThorWalletRecordView data={workspaces} userRole={userRole} username={username}/>

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
                        <Menu.Item key="36"
                                   onClick={() => this.setTabState('wallet-records')}>
                            <DatabaseOutlined style={{color: '#fc3ae6'}}/>
                            <span className="nav-text">Wallet Records</span>
                        </Menu.Item>

                        <Menu.Item key="37"
                                   onClick={() => this.setTabState('add-wallets')}>
                            <PlusCircleOutlined style={{color: '#fc3ae6'}}/>
                            <span className="nav-text">Add Wallets</span>
                        </Menu.Item>

                        <Menu.Item key="16">
                            <CrownOutlined style={{color: '#fc3ae6'}}/>
                            <span
                                className="nav-text"
                                onClick={() => this.setTabState('wallet-swagger')}
                            >
                                        Wallet API
                                    </span>
                        </Menu.Item>

                        <Menu.Item key="14">
                            <CrownOutlined style={{color: '#fc3ae6'}}/>
                            <span
                                className="nav-text"
                                onClick={() => this.setTabState('users')}
                            >
                                    Users
                                </span>
                        </Menu.Item>

                        <Menu.Item key="22">
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
