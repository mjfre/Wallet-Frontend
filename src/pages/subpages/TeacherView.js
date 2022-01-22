import React, { Component } from 'react';
import {
    Button
} from 'antd';
import {
    MailOutlined

} from '@ant-design/icons';


import '../../App.css'
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import TeacherService from '../../service/TeacherService'
import { successNotification, errorNotification } from "../../components/Notification";
import Pike13Service from '../../service/Pike13Service';



class TeacherView extends Component {

    state = {
        isPike13ImportButtonDisabled: false,
        searchText: '',
        searchedColumn: '',
    }

    fetchTeachers = () => {
        this.props.fetchData()
    }

    importTeachersFromPike13 = () => {
        this.disablePike13ImportButton();
        Pike13Service.importTeachersFromPike13()
            .then(response =>
                console.log(response)
            )
            .then(() => {
                this.fetchTeachers();
                this.enablePike13ImportButton();
            });
    }

    sendSurveyReminderEmailsToTeachers = () => {
        TeacherService.sendSurveyReminderEmailsToTeachers()
            .then(response =>
                console.log(response)
            )
            .then(() => {
                this.fetchTeachers();
                this.enablePike13ImportButton();
            });
    }

    importTeacherLinksFromPike13 = () => {
        this.disablePike13ImportButton();
        Pike13Service.importTeacherLinksFromPike13()
            .then(() =>{
                successNotification(`Teacher link importing started`, ``)
                this.enablePike13ImportButton()
            }
            )
            .catch(err => {
                console.log(err.error);
                errorNotification(`Error - (${err.httpStatus})`, `${err.message}`);
            });
    }

    //Teacher Maintenance View
    disablePike13ImportButton = () => this.setState({ isPike13ImportButtonDisabled: true })

    enablePike13ImportButton = () => this.setState({ isPike13ImportButtonDisabled: false })

    render() {

        const teachers = this.props.data;
        const { showTeacherProfileView } = this.props;

        //create tableStructure
        const teacherColumns = [
            // {
            //     title: 'Teacher Id',
            //     dataIndex: 'teacherId',
            //     key: 'teacherId'
            // },
            {
                title: '',
                dataIndex: ['firstName','lastName'],
                render: (text, record) => record.firstName + " " + record.lastName
            },
            {
                title: 'Teacher Email',
                dataIndex: 'teacherEmail',
                key: 'teacherEmail'
            },
            {
                title: '',
                key: 'profile',
                render: (text, record) => (
                    <Button ghost type='primary' size='medium' shape='round' onClick={() => showTeacherProfileView(record.teacherId)}>profile</Button>
                ),
            }
        ];

        //create infoCard
        const teacherMaintenanceViewInfoCard = (
            <span>
                <h1>There are {teachers.length} teachers </h1>
            </span>
        );

        const teacherButtonsLeftSide = (
            <span>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<MailOutlined />}
                        size={'medium'}
                        onClick={() => {
                            this.sendSurveyReminderEmailsToTeachers()
                        }}>
                        Send Survey Reminder Emails
            </Button>
                </div>
            </span>
        );

        const teacherButtonsRightSide = (
            <span>

            </span>
        );

        const teacherMaintenanceView =
            <MaintenanceViewTemplate
                title={"Teachers"}
                infoCard={teacherMaintenanceViewInfoCard}
                buttonsLeftSide={teacherButtonsLeftSide}
                buttonsRightSide={teacherButtonsRightSide}
                onSuccess={this.fetchTeachers}
            />

        return <AdminSubcomponentTemplate
            pageTitle={'Teachers'}
            tableStructure={teacherColumns}
            tableRowKey={'teacherId'}
            tableData={teachers}
            emptyTableMessage={"No teachers found"}
            subcomponentMaintenanceView={teacherMaintenanceView}
        />

    }

}

export default TeacherView;
