import React, { Component } from 'react';
import {
    Table,
    notification,
    Empty,
    Button
} from 'antd';
import {
    FilePptOutlined,
    MailOutlined
} from '@ant-design/icons';


import '../../App.css'

import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';

import DatabaseTableContainer from '../../components/adminViewComponents/subComponents/DatabaseTableContainer';
import DatabaseTableContainerEmpty from '../../components/adminViewComponents/subComponents/DatabaseTableContainerEmpty';

import AdminContentContainer from '../../components/adminViewComponents/AdminContentContainer';


class teacherProfileView extends Component {

    openNotificationWithIcon = (type, message, description) => notification[type]({ message, description });

    

    render() {

        const teacherProfile = this.props.data;

        //create tableStructure
        const linkTeacherStudentColumns = [
            {
                title: 'Student Name',
                dataIndex: 'studentName',
                key: 'studentName'
            },
            {
                title: 'Class Name',
                dataIndex: 'className',
                key: 'className'
            },
            {
                title: 'Class Start',
                dataIndex: 'classStartAt',
                key: 'classStartAt'
            },
        ];

        //create tableStructure
        const surveyOrderColumns = [

            {
                title: 'Student Name',
                key: 'studentName',
                render: (text, record) => (
                    <span>{record.studentFirstName + " " + record.studentLastName}</span>
                )
            },
            {
                title: 'Student Pear ID',
                dataIndex: 'studentPearId',
                key: 'studentPearId'
            },
            {
                title: 'Survey Event Id',
                dataIndex: 'surveyEventId',
                key: 'surveyEventId'
            }
        ];

        //create infoCard
        const studentMaintenanceViewInfoCard = (
            <span>
                <h1>{teacherProfile.firstName + ' ' + teacherProfile.lastName}</h1>
                <br />
                Pike13 ID: {teacherProfile.pike13TeacherId}
                <br />
                 Email: {teacherProfile.teacherEmail}
                <br />
            </span>
        );

        const teacherButtonsLeftSide = (
            <span>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<FilePptOutlined />}
                        size={'medium'}
                        onClick={() => {
                            window.open('https://jtl.pike13.com/staff_members/' + teacherProfile.pike13TeacherId);
                        }}>
                        View on Pike13
            </Button>
                </div>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<MailOutlined />}
                        size={'medium'}
                        onClick={() => {
                            window.location = "mailto:"+teacherProfile.teacherEmail
                        }}>
                        Write an Email
            </Button>
                </div>
               


            </span>
        );

        const teacherButtonsRightSide = (
            <span>

            </span>
        );


        const teacherProfileMaintenanceView =
            <MaintenanceViewTemplate
                infoCard={studentMaintenanceViewInfoCard}
                buttonsLeftSide={teacherButtonsLeftSide}
                buttonsRightSide={teacherButtonsRightSide}
            >
            </MaintenanceViewTemplate>


        const BodyComponent = () => {
            //if there is teacher and survey order data
            if ((teacherProfile.teacherLinks && teacherProfile.teacherLinks.length)
                && (teacherProfile.surveyOrders && teacherProfile.surveyOrders.length)) {
                return (
                    <div>
                        <DatabaseTableContainer>
                            <Table
                                title={() => 'Students'}
                                id='teacherTable'
                                style={{ width: '100%' }}
                                dataSource={teacherProfile.teacherLinks}
                                columns={linkTeacherStudentColumns}
                                pagination={false}
                                rowKey={teacherProfile.teacherLinks.studentId} />
                        </DatabaseTableContainer>
                        <DatabaseTableContainer>
                            <Table
                                title={() => 'Active Survey Orders'}
                                id='surveyOrderTable'
                                style={{ width: '100%' }}
                                dataSource={teacherProfile.surveyOrders}
                                columns={surveyOrderColumns}
                                pagination={false}
                                rowKey={teacherProfile.surveyOrders.surveyOrderId} />
                        </DatabaseTableContainer>
                    </div>
                )

            }
            //if there is only teacher data
            else if (teacherProfile.teacherLinks && teacherProfile.teacherLinks.length) {
                return (
                    <div>
                        <DatabaseTableContainer>
                            <Table
                                title={() => 'Students'}
                                id='teacherTable'
                                style={{ width: '100%' }}
                                dataSource={teacherProfile.teacherLinks}
                                columns={linkTeacherStudentColumns}
                                pagination={false}
                                rowKey={teacherProfile.teacherLinks.studentId} />
                        </DatabaseTableContainer>
                        <DatabaseTableContainerEmpty>
                            <Empty description={<span>{'No survey orders found'}</span>} />
                        </DatabaseTableContainerEmpty>
                    </div>
                )
            }
            //if there is only survey order data
            else if (teacherProfile.surveyOrders && teacherProfile.surveyOrders.length) {
                return (
                    <div>
                        <DatabaseTableContainerEmpty>
                            <Empty description={<span>{'No teachers found'}</span>} />
                        </DatabaseTableContainerEmpty>
                        <DatabaseTableContainer>
                            <Table
                                title={() => 'Active Survey Orders'}
                                id='surveyOrderTable'
                                style={{ width: '100%' }}
                                dataSource={teacherProfile.surveyOrders}
                                columns={surveyOrderColumns}
                                pagination={false}
                                rowKey={teacherProfile.surveyOrderId} />
                        </DatabaseTableContainer>
                    </div>
                )
            }
            //if there is neither
            else {
                return (
                    <div>
                        <DatabaseTableContainerEmpty>
                            <Empty description={<span>{'No students found'}</span>} />
                        </DatabaseTableContainerEmpty>
                        <DatabaseTableContainerEmpty>
                            <Empty description={<span>{'No survey orders found'}</span>} />
                        </DatabaseTableContainerEmpty>
                    </div>
                )
            }


        }

        return (
            <div key={'loaded'}>
                <AdminContentContainer>
                    <div style={{ fontWeight: 'bold', fontSize: '1.5em' }} ></div>
                    {teacherProfileMaintenanceView}
                    <BodyComponent />
                </AdminContentContainer>
            </div>
        );


    }

}

export default teacherProfileView;