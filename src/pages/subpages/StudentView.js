import React, {Component} from 'react';
import {Button, Modal, Input, Space, notification, Popover} from 'antd';
import {SearchOutlined, ExclamationCircleOutlined} from '@ant-design/icons';
import './view.css';

import Highlighter from 'react-highlight-words';

import '../../App.css';
import {successNotification, errorNotification} from '../../components/Notification';
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import StudentService from '../../service/StudentService';
import Pike13Service from '../../service/Pike13Service';
import GraduationForm from '../../forms/GraduationForm';
import Level0Emblem from './../../img/level_emblems/level0Emblem.png'
import Level1Emblem from './../../img/level_emblems/level1Emblem.png'
import Level2Emblem from './../../img/level_emblems/level2Emblem.png'
import Level3Emblem from './../../img/level_emblems/level3Emblem.png'
import Level4Emblem from './../../img/level_emblems/level4Emblem.png'
import Level5Emblem from './../../img/level_emblems/level5Emblem.png'
import Level6Emblem from './../../img/level_emblems/level6Emblem.png'
import Level7Emblem from './../../img/level_emblems/level7Emblem.png'
import Level8Emblem from './../../img/level_emblems/level8Emblem.png'
import Level9Emblem from './../../img/level_emblems/level9Emblem.png'
import LevelUnknownEmblem from './../../img/level_emblems/levelUnknownEmblem.png'

class StudentView extends Component {
    state = {
        isAddStudentModalVisible: false,
        isEditStudentModalVisible: false,
        isPike13ImportButtonDisabled: false,
        graduationModalVisible: false,
        studentIdForForm: null,
        searchText: '',
    };

    setGraduationModalVisibility = (visible) => this.setState({graduationModalVisible: visible});

    setStudentIdForForm = (studentId) => this.setState({studentIdForForm: studentId});

    openAddStudentModal = () => this.setState({isAddStudentModalVisible: true});

    closeAddStudentModal = () => this.setState({isAddStudentModalVisible: false});

    openNotificationWithIcon = (type, message, description) => notification[type]({message, description});

    fetchStudents = () => {
        this.props.fetchData();
    };

    deleteStudent = (studentId) => {
        StudentService.deleteStudent(studentId)
            .then(() => {
                this.openNotificationWithIcon('success', 'Student deleted', `${studentId} was deleted`);
                this.fetchStudents();
            })
            .catch((err) => {
                console.log(err.error);
                this.openNotificationWithIcon('error', `Error - (${err.error.httpStatus})`, `${err.error.message}`);
            });
    };

    //Student Maintenance View

    disablePike13ImportButton = () => this.setState({isPike13ImportButtonDisabled: true});

    enablePike13ImportButton = () => this.setState({isPike13ImportButtonDisabled: false});

    importStudentsFromPike13 = () => {
        this.disablePike13ImportButton();
        Pike13Service.importStudentsFromPike13()
            .then((response) => response.json())
            .then(() => {
                this.fetchStudents();
                this.enablePike13ImportButton();
            });
    };

    dropAllStudents = () => {
        StudentService.dropAllStudents().then((response) => {
            console.log(response.status);
            if (response.status === 400) {
                errorNotification(`OOPS...`, `Can't delete all students because of appearance in other tables`);
            } else {
                this.fetchStudents();
                successNotification('All Students Dropped', ``);
            }
        });
    };

    getNameColumnProps = () => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: '2em', backgroundColor: '#0f2852'}}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search Student Name`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{width: '188px', marginBottom: '8px', display: 'block'}}
                />
                <Space>
                    <Button
                        type='primary'
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon={<SearchOutlined/>}
                        size='small'
                        style={{width: '90px'}}
                    >
                        Search
                    </Button>
                    <Button onClick={() => this.handleReset(clearFilters)} size='small' style={{width: '90px'}}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>,
        onFilter: (value, record) =>
            record['firstName'] + record['lastName']
                ? (record['firstName'] + record['lastName']).toString().toLowerCase().includes(value.toLowerCase())
                : '',
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select(), 100);
            }
        },
        render: (text, record) => {
            let nText = record.firstName + ' ' + record.lastName;
            let hoverMessage = (
                <div>
                    <span>
                        This student has made commits to {record.mostRecentModuleRepository} but is recorded as level{' '}
                        {record.level}
                    </span>
                </div>
            );
            const Warning = () => {
                return (
                    <Popover placement='topLeft' title='Level Discrepancy' content={hoverMessage}>
                        <span> </span>
                        <ExclamationCircleOutlined style={{color: '#e06031'}}/>
                        <span> </span>
                    </Popover>
                );
            };
            const StudentBadge = () => {
                switch (record.level) {
                    case 0:
                        return <img src={Level0Emblem} alt="League Level 0 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 1:
                        return <img src={Level1Emblem} alt="League Level 1 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 2:
                        return <img src={Level2Emblem} alt="League Level 2 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 3:
                        return <img src={Level3Emblem} alt="League Level 3 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 4:
                        return <img src={Level4Emblem} alt="League Level 4 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 5:
                        return <img src={Level5Emblem} alt="League Level 5 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 6:
                        return <img src={Level6Emblem} alt="League Level 6 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 7:
                        return <img src={Level7Emblem} alt="League Level 7 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 8:
                        return <img src={Level8Emblem} alt="League Level 8 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 9:
                        return <img src={Level9Emblem} alt="League Level 8 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    default:
                        return <img src={LevelUnknownEmblem} alt="League Level Unknown Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                }

            };
            return (
                <div>
                    <StudentBadge/>
                    <Highlighter
                        highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                        searchWords={[this.state.searchText]}
                        autoEscape
                        textToHighlight={nText ? nText.toString() : ''}
                    />
                    {record.graduationWarning ? <Warning/> : <span></span>}
                </div>
            );
        },
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ''});
    };

    render() {

        let filteredStudents = this.props.data.filter((dataPoint) => {
            let curDataPoint = dataPoint['firstName'] + ' ' + dataPoint['lastName'];
            return (
                curDataPoint === undefined ||
                curDataPoint === null ||
                curDataPoint.toLowerCase().includes(this.state.searchText.toLowerCase())
            );
        });
        //make sure they can still see something
        const students = filteredStudents.length > 0 ? filteredStudents : this.props.data;
        const {showStudentProfileView, teacherPage} = this.props;
        //const { isPike13ImportButtonDisabled } = this.state;
        const numStudentsWithoutPearIds = students.filter((w) => w.pearId == null).length;
        const numActiveStudents = students.filter((s) => s.studentStatus !== 'DEACTIVATED').length;

        //create tableStructure
        const studentColumns = [
            {
                title: '',
                key: 'studentName',
                ...this.getNameColumnProps(),
            },
            {
                title: 'GitHub Username',
                dataIndex: 'githubAccount',
                key: 'githubAccount',
            },
            {
                title: '',
                key: 'actions',
                render: (text, record) => (
                    <div>
                        <Button
                            ghost
                            type='primary'
                            size='medium'
                            shape='round'
                            style={{marginRight: '1%'}}
                            onClick={() => showStudentProfileView(record.studentId)}
                        >
                            profile
                        </Button>
                        <Button
                            ghost
                            type='primary'
                            size='medium'
                            shape='round'
                            onClick={() => {
                                this.setStudentIdForForm(record.studentId);
                                this.setGraduationModalVisibility(true);
                            }}
                        >
                            graduate
                        </Button>
                    </div>
                ),
            },
        ];

        //create infoCards
        const studentMaintenanceViewInfoCard = (
            <span>
                <h1>There are currently {numActiveStudents} active students </h1>
                <br/>
                <h1>Without Pear IDs: {numStudentsWithoutPearIds} </h1>
            </span>
        );
        const myStudentsMaintenanceViewInfoCard = (
            <span>
                <h1>You have {numActiveStudents} active students </h1>
            </span>
        );
        //gets info card to show depending on whether this
        //is the 'my students' page (for teacher) or the 'students' page (for admin)
        const curMaintenanceViewInfoCard = teacherPage
            ? myStudentsMaintenanceViewInfoCard
            : studentMaintenanceViewInfoCard;

        const studentButtonsLeftSide = <span></span>;

        const studentButtonsRightSide = <span></span>;

        const studentMaintenanceView = (
            <MaintenanceViewTemplate
                title={teacherPage ? 'My Students' : 'Students'}
                infoCard={curMaintenanceViewInfoCard}
                buttonsLeftSide={studentButtonsLeftSide}
                buttonsRightSide={studentButtonsRightSide}
                onSuccess={this.fetchStudents}
            ></MaintenanceViewTemplate>
        );

        return (
            <div>
                <AdminSubcomponentTemplate
                    pageTitle={teacherPage ? 'My Students' : 'Students'}
                    tableStructure={studentColumns}
                    tableRowKey={record => (record.firstName + " " + record.lastName + " " + record.githubAccount)}
                    tableData={students}
                    emptyTableMessage={'No students found'}
                    subcomponentMaintenanceView={studentMaintenanceView}
                />
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
                        students={this.props.data}
                        studentId={this.state.studentIdForForm}
                        inModal={true}
                        onSuccess={() => {
                            this.setGraduationModalVisibility(false);
                            successNotification('Student graduated', '');
                        }}
                    />
                </Modal>
            </div>
        );
    }
}

export default StudentView;
