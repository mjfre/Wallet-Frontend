import React, {Component, Fragment} from 'react';
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import GraduationService from '../../service/GraduationService';
import {Button, Popconfirm} from "antd";
import {errorNotification, successNotification} from "../../components/Notification";

export default class PartialLevelGraduationView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            partialLevelGraduations: []
        };
    }

    componentDidMount() {
        this.fetchPartialLevelGraduations();
    }

    fetchPartialLevelGraduations() {
        GraduationService.fetchPartialLevelGraduations()
            .then((response) => response.json())
            .then((data) => {
                this.setState({ partialLevelGraduations: data });
            });
    }

    deletePartialGraduation = (studentId, level) => {
        GraduationService.deletePartialLevelGraduation(studentId, level).then(() => {
            successNotification('Success', `Partial level graduation removed`);
            this.fetchPartialLevelGraduations();
        }).catch(err => {
            console.log(err.error);
            errorNotification(`Error - (${err.httpStatus})`, `${err.message}`);
        });
    }

    render() {
        const { partialLevelGraduations } = this.state;

        //create tableStructure
        const columns = [
            {
                title: 'Student Name',
                dataIndex: ['firstName','lastName'],
                render: (text, record) => record.firstName + " " + record.lastName
            },
            {
                title: 'Level',
                dataIndex: 'levelGraduated',
            },
            {
                title: 'Section Completed',
                dataIndex: 'testSection',
            },
            {
                title: 'Exam Score',
                dataIndex: 'testScorePercent',
            },
            {
                title: 'Completion Date',
                dataIndex: 'completedOn',
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure you want to delete this partial level graduation?`}
                            onConfirm={() => {
                                this.deletePartialGraduation(record.studentId, record.levelGraduated);
                            }
                            }
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='danger' size='small' onClick={(e) => e.stopPropagation()}>Delete</Button>
                        </Popconfirm>
                    </Fragment>
                ),
            }
        ];

        //create infoCard
        const partialLevelGraduationMaintenanceViewInfoCard = (
            <span>
                <h1>There are currently {partialLevelGraduations.length} partial level graduations</h1>
            </span>
        );

        const buttonsLeftSide = <span></span>;

        const buttonsRightSide = <span></span>;

        const maintenanceView = (
            <MaintenanceViewTemplate
                title={"Partial Java Level Completions"}
                infoCard={partialLevelGraduationMaintenanceViewInfoCard}
                buttonsLeftSide={buttonsLeftSide}
                buttonsRightSide={buttonsRightSide}
                onSuccess={() => {}} //{this.fetchWorkspaces}
            />
        );

        return (
            <AdminSubcomponentTemplate
                tableStructure={columns}
                tableRowKey={record => (record.firstName + " " + record.lastName + " " + record.levelGraduated)}
                tableData={partialLevelGraduations}
                emptyTableMessage={'No Partial Java Level Graduations Found'}
                subcomponentMaintenanceView={maintenanceView}
            />
        );
    }
}
