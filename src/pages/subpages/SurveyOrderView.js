import React, { Component, Fragment } from 'react';
import {
    Button,
    Popconfirm
} from 'antd';
import '../../App.css'
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import SurveyService from '../../service/SurveyEventService'
import { successNotification, errorNotification } from "../../components/Notification";

class SurveyOrderView extends Component {

    fetchSurveyOrders = () => {
        this.props.fetchData()
    }

    resetSurveyOrderStatus = (surveyEventId, studentId) => {
        SurveyService.resetSurveyOrderStatus(surveyEventId, studentId).then(() => {
            successNotification(`Survey status reset`, '');
            this.fetchSurveyOrders();
        }).catch(err => {
            errorNotification(`OOPS...`, `${err.message}`);
        });

    }

    setSurveyOrderStatusToComplete = (studentPearId, studentLastName) => {
        SurveyService.completeSurveyOrder(studentPearId, studentLastName).then(() => {
            successNotification(`Survey status set to Complete`, '');
            this.fetchSurveyOrders();
        }).catch(err => {
            errorNotification(`OOPS...`, `${err.message}`);
        });

    }

    render() {

        const surveyOrders = this.props.data;

        const surveyOrdersComplete = surveyOrders.filter((so) => so.surveyOrderStatus === 'COMPLETE').length;
        const surveyOrdersIncomplete = surveyOrders.filter((so) => so.surveyOrderStatus === 'ACTIVE').length;
        const surveyOrdersCanceled = surveyOrders.filter((so) => so.surveyOrderStatus === 'CANCELED').length;

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
                title: 'Survey Event Id',
                dataIndex: 'surveyEventId',
                key: 'surveyEventId'
            },
            {
                title: 'Completed On',
                dataIndex: 'completedOn',
                key: 'completedOn'
            },
            {
                title: 'Survey Order Status',
                dataIndex: 'surveyOrderStatus',
                key: 'surveyOrderStatus'
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure you want mark ${record.studentFirstName + " " + record.studentLastName}'s survey as complete?`}
                            onConfirm={() => { this.setSurveyOrderStatusToComplete(record.studentPearId, record.studentLastName); }}
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='danger' onClick={(e) => e.stopPropagation()}>Mark as Complete</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure you want to reset this survey order for ${record.studentName}`}
                            onConfirm={() => { this.resetSurveyOrderStatus(record.surveyEventId, record.studentId); }}
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='danger' onClick={(e) => e.stopPropagation()}>Reset status to ACTIVE</Button>
                        </Popconfirm>
                    </Fragment>
                ),
            }
        ];

        //create infoCard
        const surveyOrderMaintenanceViewInfoCard = (
            <span>
                <h1>There are currently {surveyOrders.length} survey orders </h1>
                <br />
                <h3>Completed: {surveyOrdersComplete}</h3>
                <br />
                <h3>Outstanding: {surveyOrdersIncomplete}</h3>
                <br />
                <h3>Canceled: {surveyOrdersCanceled}</h3>
            </span>
        );

        const surveyOrderButtonsLeftSide = (
            <span>

            </span>
        );

        const surveyOrderButtonsRightSide = (
            <span>

            </span>
        );

        const surveyOrderMaintenanceView =
            <MaintenanceViewTemplate
                title={"Survey Orders"}
                infoCard={surveyOrderMaintenanceViewInfoCard}
                buttonsLeftSide={surveyOrderButtonsLeftSide}
                buttonsRightSide={surveyOrderButtonsRightSide}
                onSuccess={this.fetchSurveyOrders}
            />

        return <AdminSubcomponentTemplate
            tableStructure={surveyOrderColumns}
            tableRowKey={'studentId'}
            tableData={surveyOrders}
            emptyTableMessage={"No survey orders found"}
            subcomponentMaintenanceView={surveyOrderMaintenanceView}
        />
    }
}

export default SurveyOrderView;