import React, { Component, Fragment } from 'react';
import {
    Button,
    Popconfirm
} from 'antd';
import {
    PlusCircleOutlined
} from '@ant-design/icons';


import '../../App.css'
import { successNotification, errorNotification } from "../../components/Notification";
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import SurveyEventService from '../../service/SurveyEventService'

class SurveyEventView extends Component {

    fetchSurveyEvents = () => {
        this.props.fetchData()
    }

    fetchSurveyOrders = () => {
        this.props.fetchSurveyOrders();
    }

    addSurveyOrderToAllStudentsBySurveyEvent = (surveyEventId) => {
        SurveyEventService.addSurveyOrderToAllStudentsBySurveyEvent(surveyEventId).then(() => {
            successNotification('Survey Order created for every student with Pear ID', ``);
            this.fetchSurveyOrders();
        }).catch(err => {
            console.log(err.error);
            errorNotification(`Error - (${err.httpStatus})`, `${err.message}`);
        });
    }

    deleteAllSurveyOrdersBySurveyEvent = (surveyEventId) => {
        SurveyEventService.deleteAllSurveyOrdersBySurveyEvent(surveyEventId).then(() => {
            successNotification('All survey orders deleted', ``);
            this.fetchSurveyOrders();
        }).catch(err => {
            console.log(err.error);
            errorNotification(`Error - (${err.error.httpStatus})`, `${err.error.message}`);
        });
    }

    deleteSurveyEvent = (surveyEventId) => {
        SurveyEventService.deleteSurveyEvent(surveyEventId)
        .then(response => {
            if(response.status === 400) {
                errorNotification(`OOPS...`, `Can't delete this survey event because there are associated survey orders`);
            }
            else{
                this.fetchSurveyEvents();
                successNotification('Survey Event deleted', ``);
            }
            });
    }

    render() {

        const surveyEvents = this.props.data;

        //create tableStructure
        const surveyEventColumns = [
            {
                title: 'Survey Event Id',
                dataIndex: 'surveyEventId',
                key: 'surveyEventId'
            },
            {
                title: 'Created On',
                dataIndex: 'dateIssued',
                key: 'dateIssued'
            },
            {
                title: 'Issued by',
                dataIndex: 'issuedBy',
                key: 'issuedby'
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <Fragment>

                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure you want to add a survey order to all non-deactivated students with a Pear ID?`}
                            onConfirm={() => {
                                this.addSurveyOrderToAllStudentsBySurveyEvent(record.surveyEventId);
                            }
                            }
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='primary' onClick={(e) => e.stopPropagation()}>Add Survey Orders</Button>
                        </Popconfirm>

                        <Popconfirm
                            placement='topRight'
                            title={`This is a HIGHLY DESTRUCTIVE action, meant to only be used if a duplicate is accidentally issued.  Are you sure you want to remove all survey orders for this event?`}
                            onConfirm={() => {
                                this.deleteAllSurveyOrdersBySurveyEvent(record.surveyEventId);
                            }
                            }
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='danger' onClick={(e) => e.stopPropagation()}>Delete Survey Orders</Button>
                        </Popconfirm>


                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure you want to delete this survey event?`}
                            onConfirm={() => {
                                this.deleteSurveyEvent(record.surveyEventId);
                            }
                            }
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='danger' onClick={(e) => e.stopPropagation()}>Delete</Button>
                        </Popconfirm>

                    </Fragment>
                ),
            }
        ];

        //create infoCard
        const surveyEventMaintenanceViewInfoCard = (
            <span>
                <h1>There are {surveyEvents.length} survey events </h1>
            </span>
        );

        const surveyEventButtonsLeftSide = (
            <span>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<PlusCircleOutlined />}
                        size={'medium'}
                        onClick={() => {
                            SurveyEventService.addSurveyEvent(this.props.username).then(() => {
                                this.fetchSurveyEvents();
                            });
                        }}
                    >
                        Add Survey Event
                    </Button>
                </div>
            </span>
        );

        const surveyEventButtonsRightSide = (
            <span>
            </span>
        );

        const surveyEventMaintenanceView =
            <MaintenanceViewTemplate
                title={"Survey Events"}
                infoCard={surveyEventMaintenanceViewInfoCard}
                buttonsLeftSide={surveyEventButtonsLeftSide}
                buttonsRightSide={surveyEventButtonsRightSide}
                onSuccess={this.fetchSurveyEvents}
            />

        return <AdminSubcomponentTemplate
            tableStructure={surveyEventColumns}
            tableRowKey={'surveyEventId'}
            tableData={surveyEvents}
            emptyTableMessage={"No survey events found"}
            subcomponentMaintenanceView={surveyEventMaintenanceView}
        />

    }

}

export default SurveyEventView;