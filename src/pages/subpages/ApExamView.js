import React, {Component, Fragment} from 'react';
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import GraduationService from '../../service/GraduationService';
import {Button, Popconfirm} from "antd";

export default class ApExamView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            apExamScores: []
        };
    }

    componentDidMount() {
        this.fetchApExamScores();
    }

    fetchApExamScores() {
        GraduationService.fetchApExamInfo()
            .then((response) => response.json())
            .then((data) => {
                this.setState({apExamScores: data});
            });
    }

    render() {
        const {apExamScores} = this.state;

        //create tableStructure
        const columns = [
            {
                title: '',
                dataIndex: ['firstName', 'lastName'],
                render: (text, record) => record.firstName + " " + record.lastName
            },
            {
                title: 'Test Taken',
                dataIndex: 'examTaken',
            },
            {
                title: 'Test Score',
                dataIndex: 'examScore',
            },
            {
                title: 'Submitted On',
                dataIndex: 'completedOn',
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => {
                    if (this.props.userRole === 'ADMIN' || this.props.userRole === 'SUPERUSER') {
                        return <Fragment>
                            <Popconfirm
                                placement='topRight'
                                title={`Are you sure you want to delete this Ap exam score?`}
                                onConfirm={() => {
                                    GraduationService.deleteApExamScore(record.studentId, record.examTaken).then(r => {this.fetchApExamScores();});
                                }
                                }
                                okText='Yes' cancelText='No'
                                onCancel={e => e.stopPropagation()}>
                                <Button ghost type='danger' size='small'
                                        onClick={(e) => e.stopPropagation()}>Delete</Button>
                            </Popconfirm>
                        </Fragment>
                    }
                },
            }
        ];

        //create infoCard
        const studentMaintenanceViewInfoCard = (
            <span>
                <h1>There are currently {apExamScores.length} AP test records</h1>
            </span>
        );

        const buttonsLeftSide = <span></span>;

        const buttonsRightSide = <span></span>;

        const maintenanceView = (
            <MaintenanceViewTemplate
                title={"AP Exam Completions"}
                infoCard={studentMaintenanceViewInfoCard}
                buttonsLeftSide={buttonsLeftSide}
                buttonsRightSide={buttonsRightSide}
                onSuccess={() => {
                }} //{this.fetchWorkspaces}
            />
        );

        return (
            <AdminSubcomponentTemplate
                tableStructure={columns}
                tableRowKey={record => (record.firstName + " " + record.lastName + " " + record.examTaken)}
                tableData={apExamScores}
                emptyTableMessage={'No tests found'}
                subcomponentMaintenanceView={maintenanceView}
            />
        );
    }
}
