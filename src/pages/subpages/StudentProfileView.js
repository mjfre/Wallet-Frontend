import React, {Component} from 'react';
import {
    Table,
    notification,
    Empty,
    Button,
    Menu,
    Dropdown,
    Collapse,
    Popover, Modal, Spin
} from 'antd';

import {
    FilePptOutlined,
    GithubOutlined,
    DownOutlined,
    FormOutlined,
    CodeOutlined,
    ArrowUpOutlined
} from '@ant-design/icons';

import '../../App.css'

import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';

import AdminContentContainer from '../../components/adminViewComponents/AdminContentContainer';

import MostRecentModuleRepositoryInfo
    from '../../components/studentProfileViewComponents/ModuleRepositoryInfo/MostRecentModuleRepositoryInfo';

import AdminService from './../../service/AdminService';
import StudentAccountsInfo from "../../components/studentProfileViewComponents/StudentAccountsInfo/StudentAccountsInfo";
import NextClassInfo from "../../components/studentProfileViewComponents/NextClassInfo/NextClassInfo";
import ModuleRepositoryCharts
    from "../../components/studentProfileViewComponents/ModuleRepositoryInfo/subComponents/charts/ModuleRepositoryCharts";
import StudentProfileDatabaseTableContainer
    from "../../components/studentProfileViewComponents/containers/StudentProfileDatabaseTableContainer";
import StudentProfileEmptyDatabaseTableContainer
    from "../../components/studentProfileViewComponents/containers/StudentProfileEmptyDatabaseTableContainer";
import ModuleRepositoryLoadingContainer
    from "../../components/studentProfileViewComponents/ModuleRepositoryInfo/subComponents/containers/ModuleRepositoryLoadingContainer";
import {ExclamationCircleOutlined} from '@ant-design/icons';
import GraduationForm from "../../forms/GraduationForm";
import {successNotification} from "../../components/Notification";

const {Panel} = Collapse;

class StudentProfileView extends Component {

    openNotificationWithIcon = (type, message, description) => notification[type]({message, description});
    activeKey = '0';

    state = {
        studentProfile: null,
        moduleRepositoryInfo: null,
        graduationModalVisible: false,
    }

    setGraduationModalVisibility = (visible) => this.setState({graduationModalVisible: visible});

    componentDidMount() {
        //this.fetchStudentModuleRepositoryInfo(this.props.studentIdForProfile)
        this.fetchStudentModuleHistoryInfo = this.fetchStudentModuleHistoryInfo.bind(this);
        this.fetchStudentModuleHistoryInfo();
        this.fetchStudentProfile();
    }

    onCollapseChange = (key) => {
        this.activeKey = key;
    }

    fetchStudentProfile = () =>{
        AdminService.fetchStudentProfile(this.props.studentIdForProfile)
            .then(response =>
                response.json()
            )
            .then(data => {
                console.log("student profile:")
                console.log(data);
                this.setState({
                    studentProfile: data
                })
            });
    }

    fetchStudentModuleHistoryInfo = () => {
        if(this.state.moduleRepositoryInfo == null) {
            let studentId = this.props.studentIdForProfile;
            AdminService.fetchModuleRepositoryInfo(studentId)
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log("Module Repository Info:")
                //console.log(data);
                this.setState({
                    moduleRepositoryInfo: data
                })
            });
        }
    }

    formatMostRecentStudentRepositoryName(mostRecentStudentRepositoryName) {
        //format mostRecentStudentRepositoryName for humans
        //find the index of the / after  the organization name
        const slashIndex = mostRecentStudentRepositoryName.indexOf('/');
        //get the substring starting at the slash
        mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.substring(slashIndex + 1);
        //since level 0 organization follows a different naming convention, they must be handled separately

        //find index of 'level'
        const levelIndex = mostRecentStudentRepositoryName.indexOf('level');
        //capitalize the L in 'level'
        mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.slice(0, levelIndex) + mostRecentStudentRepositoryName.charAt(levelIndex).toUpperCase() + mostRecentStudentRepositoryName.slice(levelIndex + 1);
        //find index of 'module'
        var moduleIndex = mostRecentStudentRepositoryName.indexOf('module');
        //capitalize the M in 'module'
        mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.slice(0, moduleIndex) + mostRecentStudentRepositoryName.charAt(moduleIndex).toUpperCase() + mostRecentStudentRepositoryName.slice(moduleIndex + 1);
        //find the last index of '-' and remove everything after it (i.e. the gitub username)
        const lastHyphenIndex = mostRecentStudentRepositoryName.lastIndexOf('-');
        mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.slice(0, lastHyphenIndex);
        //replace all other hyphens
        mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.replaceAll('-', ' ');

        if (mostRecentStudentRepositoryName.startsWith('Level5')) {
            //add spaces after 'level'
            mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.slice(0, levelIndex + 'level'.length) + " " + mostRecentStudentRepositoryName.slice(levelIndex + 'level'.length);
            //find the index of the 0 in the module name
            var zeroIndex = mostRecentStudentRepositoryName.indexOf('0');
            //get the module number that comes after the 0
            var moduleNumber = mostRecentStudentRepositoryName.charAt(zeroIndex + 1);
            //format the name with the level number and module number
            mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.substring(0, zeroIndex) + "Module " + moduleNumber;
        } else if (!mostRecentStudentRepositoryName.startsWith('level-0')) {
            //add spaces after 'level'
            mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.slice(0, levelIndex + 'level'.length) + " " + mostRecentStudentRepositoryName.slice(levelIndex + 'level'.length);
            //add space after 'module', accounting for the new space after level
            moduleIndex++;
            mostRecentStudentRepositoryName = mostRecentStudentRepositoryName.slice(0, moduleIndex + 'module'.length) + " " + mostRecentStudentRepositoryName.slice(moduleIndex + 'module'.length);
        }

        return mostRecentStudentRepositoryName;
    }


    render() {
        if (this.state.studentProfile !== null) {
            const {studentProfile} = this.state;
            const {levelGraduations, mostRecentRepository} = studentProfile;

            const {
                moduleRepositoryInfo
            } = this.state;

            const formattedMostRecentStudentRepositoryName = mostRecentRepository == null ? null : this.formatMostRecentStudentRepositoryName(mostRecentRepository.repositoryFullName);
            const mostRecentRepositoryText = studentProfile.nextClass !== null ?
                <span>Most Recent Repository: {formattedMostRecentStudentRepositoryName}</span> : <span/>

            //create tableStructure
            const teacherColumns = [
                {
                    title: 'First Name',
                    dataIndex: 'firstName',
                    key: 'firstName'
                },
                {
                    title: 'Last Name',
                    dataIndex: 'lastName',
                    key: 'lastName'
                },
                {
                    title: 'Teacher Email',
                    dataIndex: 'teacherEmail',
                    key: 'teacherEmail'
                }
            ];

            //create tableStructure
            const surveyOrderColumns = [
                {
                    title: 'Survey Order Status',
                    dataIndex: 'surveyOrderStatus',
                    key: 'surveyOrderStatus'
                },
                {
                    title: 'Completed On',
                    dataIndex: 'completedOn',
                    key: 'completedOn'
                },
                {
                    title: 'Survey Event Id',
                    dataIndex: 'surveyEventId',
                    key: 'surveyEventId'
                }

            ];

            const studentDeactivatedText = studentProfile.studentStatus === "DEACTIVATED" ? "DEACTIVATED" : " "
            //create infoCard
            const studentMaintenanceViewInfoCard = (
                <span>
                <strong> <span
                    style={{fontSize: 'large'}}>{studentProfile.firstName + ' ' + studentProfile.lastName}</span></strong>
                <br/>
               - Level {studentProfile.level} -
                <br/>
                <br/>
                    {studentDeactivatedText}{mostRecentRepositoryText}
                    <br/>
            </span>
            );

            const githubDropDownOnClick = ({key}) => {
                window.open(`${key}` + studentProfile.githubAccount);
            };

            const githubDropdownMenu = (
                <Menu onClick={githubDropDownOnClick}>
                    <Menu.Item key="https://github.com/League-level0-student?q=">Level 0</Menu.Item>
                    <Menu.Item key="https://github.com/League-level1-student?q=">Level 1</Menu.Item>
                    <Menu.Item key="https://github.com/League-level2-student?q=">Level 2</Menu.Item>
                    <Menu.Item key="https://github.com/League-level3-student?q=">Level 3</Menu.Item>
                    <Menu.Item key="https://github.com/League-level4-student?q=">Level 4</Menu.Item>
                    <Menu.Item key="https://github.com/League-level5-student?q=">Level 5</Menu.Item>
                </Menu>
            );

            const studentButtonsLeftSide = (
                <span>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<FilePptOutlined/>}
                        size={'medium'}
                        onClick={() => {
                            window.open('https://jtl.pike13.com/people/' + studentProfile.pike13Id);
                        }}>
                        View on Pike13
            </Button>
                </div>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<GithubOutlined/>}
                        size={'medium'}
                        onClick={() => {
                            window.open('https://www.github.com/' + studentProfile.githubAccount);
                        }}>
                        View on GitHub
            </Button>
                </div>
                <Dropdown overlay={githubDropdownMenu}>
                    {/* eslint-disable-next-line  */}
                    <a className="ant-dropdown-link">
                        Search for repositories <DownOutlined/>
                    </a>
                </Dropdown>


            </span>
            );

            const studentButtonsRightSide = (
                <span>

            </span>
            );


            const studentProfileMaintenanceView =
                <MaintenanceViewTemplate
                    infoCard={studentMaintenanceViewInfoCard}
                    buttonsLeftSide={studentButtonsLeftSide}
                    buttonsRightSide={studentButtonsRightSide}
                    onSuccess={this.fetchStudents}
                >
                </MaintenanceViewTemplate>

            const graduationTableColumns = [
                {
                    title: 'Level',
                    dataIndex: 'levelGraduated',
                    key: 'levelGraduated'
                },
                {
                    title: 'Score',
                    dataIndex: 'testScorePercent',
                    key: 'testScorePercent',
                    render: (text) => <div>{text}%</div>
                },
                {
                    title: 'Completion Date',
                    dataIndex: 'completedOn',
                    key: 'completedOn'
                },
                {
                    title: 'Section',
                    dataIndex: 'testSection',
                    key: 'testSection',
                    render: (text, record) => {
                        if (text === 'WRITTEN') {
                            return (
                                <div>
                                    <span>Written </span>
                                    <FormOutlined/>
                                </div>
                            );
                        } else if (text === 'CODING') {
                            return (
                                <div>
                                    <span>Coding </span>
                                    <CodeOutlined/>
                                </div>
                            );
                        } else if (text === 'PROMOTED') {
                            return (
                                <div>
                                    <span>Promoted </span>
                                    <ArrowUpOutlined/>
                                </div>
                            );
                        } else {
                            return (
                                <div>
                                    <span>Both </span>
                                    <FormOutlined/>
                                    <span> </span>
                                    <CodeOutlined/>
                                </div>
                            );
                        }
                    }
                }
            ];

            let nextClassTitleStyle = {fontSize: 14, color: 'black', fontWeight: 'normal', display: 'inline-block'};
            let nextClassTitleNode = React.createElement('div', {style: nextClassTitleStyle}, "Next Class")
            const BodyComponent = () => {

                const NextClassInfoComponent = () => {
                    if (studentProfile.nextClass !== null) {

                        if (studentProfile.nextClass.inProgress) {
                            let inProgressStyle = {fontSize: 14, color: 'green', fontWeight: 'bold'};
                            let inProgressNode = React.createElement('div', {style: inProgressStyle}, "In Progress")
                            nextClassTitleStyle = {fontSize: 14, color: '#595959', fontWeight: 'normal', float: 'left'};
                            nextClassTitleNode = React.createElement('div', {style: nextClassTitleStyle}, ["Next Class", inProgressNode])
                        }
                        return <NextClassInfo
                            nextClass={studentProfile.nextClass}
                        />
                    } else {
                        return <StudentProfileEmptyDatabaseTableContainer>
                            <Empty description={<span>{'No next class found'}</span>}/>
                        </StudentProfileEmptyDatabaseTableContainer>
                    }

                }

                const TeacherTable = () => {
                    return studentProfile.teachers?.length ? (
                        <StudentProfileDatabaseTableContainer>
                            <Table
                                id="teacherTable"
                                style={{width: '100%'}}
                                dataSource={studentProfile.teachers}
                                columns={teacherColumns}
                                pagination={false}
                                rowKey={(teacher) => teacher.teacherId}
                            />
                        </StudentProfileDatabaseTableContainer>
                    ) : (
                        <StudentProfileEmptyDatabaseTableContainer>
                            <Empty description={<span>{'No teachers found'}</span>}/>
                        </StudentProfileEmptyDatabaseTableContainer>
                    );
                };

                const GraduationTable = () => {
                    return levelGraduations?.length ? (
                        <StudentProfileDatabaseTableContainer>
                            <Table
                                title={() => 'Graduations'}
                                id="graduationTable"
                                style={{width: '100%'}}
                                dataSource={levelGraduations}
                                columns={graduationTableColumns}
                                pagination={false}
                                rowKey={(levelGraduation) => levelGraduation.levelGraduated}
                            />
                        </StudentProfileDatabaseTableContainer>
                    ) : (
                        <StudentProfileEmptyDatabaseTableContainer>
                            <Empty description={<span>{'No graduations found'}</span>}/>
                        </StudentProfileEmptyDatabaseTableContainer>
                    );
                };

                const GraduationWarning = () => {
                    return studentProfile.graduationWarning ? (
                        <div style={{backgroundColor: '#fae8c5', width: '100%', padding: '2.5%', textAlign: 'center'}}>
                            <p>{studentProfile.firstName} has accepted {formattedMostRecentStudentRepositoryName}, but
                                has not been graduated from Level {studentProfile.level}. Do you want to submit a
                                graduation?</p>
                            <Button
                                ghost
                                type='primary'
                                size='small'
                                onClick={() => {
                                    this.setGraduationModalVisibility(true);
                                }}
                            >
                                graduate
                            </Button>
                        </div>) : (null);
                };

                const Warning = () => {
                    return (
                        <Popover placement='topLeft' title='Level Discrepancy'
                                 content={"This student made commits to " + formattedMostRecentStudentRepositoryName + " but is recorded as Level " + studentProfile.level}>
                            <span> </span>
                            <ExclamationCircleOutlined style={{color: '#e06031'}}/>
                            <span> </span>
                        </Popover>
                    );
                };

                const SurveyOrderTable = () => {
                    return studentProfile.surveyOrders?.length ? (
                        <StudentProfileDatabaseTableContainer>
                            <Table
                                title={() => 'Survey Order History'}
                                id="surveyOrderTable"
                                style={{width: '100%'}}
                                dataSource={studentProfile.surveyOrders}
                                columns={surveyOrderColumns}
                                pagination={false}
                                rowKey='surveyEventId'
                            />
                        </StudentProfileDatabaseTableContainer>
                    ) : (
                        <StudentProfileEmptyDatabaseTableContainer>
                            <Empty description={<span>{'No survey orders found'}</span>}/>
                        </StudentProfileEmptyDatabaseTableContainer>
                    );
                };

                const MostRecentModuleRepositoryInfoComponent = () => {
                    if (studentProfile.mostRecentRepository != null) {
                        return (
                            <MostRecentModuleRepositoryInfo
                                moduleRepositoryInfo={mostRecentRepository}
                                formattedMostRecentStudentRepositoryName={
                                    formattedMostRecentStudentRepositoryName
                                }
                            />
                        );
                    } else {
                        return (
                            <StudentProfileEmptyDatabaseTableContainer>
                                <Empty description={<span>{'No recent activity found'}</span>}/>
                            </StudentProfileEmptyDatabaseTableContainer>
                        );
                    }
                };

                const StudentModuleRepositoryHistory = () => {
                    if (this.state.moduleRepositoryInfo == null) {
                        return <ModuleRepositoryLoadingContainer/>
                    } else {
                        return <ModuleRepositoryCharts moduleRepositoryInfo={moduleRepositoryInfo}/>
                    }

                }

                const GraduationPanelHeader = () => {
                    if(studentProfile.graduationWarning === true){
                        return <span>
                            <span>Graduations</span>
                            <Warning/>
                        </span>
                    }
                    else{
                        return <span>Graduations</span>
                    }
                }
                return (
                    <div>
                        <br/>
                        <br/>
                        <Collapse bordered={true} style={{backgroundColor: '#dde4eb', textAlign: 'left'}}
                                  accordion={true}
                                  onChange={this.onCollapseChange}
                                  defaultActiveKey={this.activeKey}
                            //    activeKey={this.state.activeKey}
                        >
                            <Panel header={nextClassTitleNode} key="1">
                                <NextClassInfoComponent/>
                            </Panel>
                            <Panel header="Most Recent Module Repository" key="2">
                                <MostRecentModuleRepositoryInfoComponent/>
                            </Panel>
                            <Panel header="Module Repository History" key="7">
                                <StudentModuleRepositoryHistory/>
                            </Panel>
                            <Panel header={<GraduationPanelHeader/>} key="3">
                                <GraduationWarning/>
                                <GraduationTable/>
                            </Panel>
                            <Panel header="Teachers" key="4">
                                <TeacherTable/>
                            </Panel>
                            <Panel header="Survey Orders" key="5">
                                <SurveyOrderTable/>
                            </Panel>
                            <Panel header="Student Accounts" key="6">
                                <StudentAccountsInfo
                                    pearId={studentProfile.pearId}
                                    pike13Id={studentProfile.pike13Id}
                                    githubAccount={studentProfile.githubAccount}
                                />
                            </Panel>
                        </Collapse>
                    </div>
                );
            }

            return (
                <div key={'loaded'}>
                    <Modal
                        title='Graduate Student'
                        visible={this.state.graduationModalVisible}
                        okButtonProps={{style: {display: 'none'}}}
                        onCancel={() => this.setGraduationModalVisibility(false)}
                        width={1000}
                        bodyStyle={{
                            color:'white',
                            paddingTop: '5em',
                            paddingBottom: '5em',
                            backgroundColor: '#031527'
                        }}
                    >
                        <GraduationForm
                            students={[studentProfile]}
                            studentId={studentProfile.studentId}
                            inModal={true}
                            onSuccess={() => {
                                this.setGraduationModalVisibility(false);
                                successNotification('Student graduated', '');
                            }}
                        />
                    </Modal>
                    <AdminContentContainer>
                        <div style={{fontWeight: 'bold', fontSize: '1.5em'}}></div>
                        {studentProfileMaintenanceView}
                        <BodyComponent/>
                    </AdminContentContainer>

                </div>
            );
        }
        else{
            return <div style={{height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
                <div>
                    <Spin/>
                    <span style={{paddingLeft: '1em'}}>Loading student profile</span>
                </div>
            </div>
        }
    }
}

export default StudentProfileView;
