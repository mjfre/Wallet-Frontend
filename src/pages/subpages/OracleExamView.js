import React, {Component, Fragment} from 'react';
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import GraduationService from '../../service/GraduationService';
import {Button, Popconfirm} from "antd";

export default class OracleExamView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            oracleExamScores: []
        };
    }

    componentDidMount() {
        this.fetchOracleExamScores();
    }

    fetchOracleExamScores() {
        GraduationService.fetchOracleExamScores()
            .then((response) => response.json())
            .then((data) => {
                this.setState({ oracleExamScores: data });
            });
    }

    render() {
        const { oracleExamScores } = this.state;

        //create tableStructure
        const columns = [
            {
               title: '',
               dataIndex: ['firstName','lastName'],
               render: (text, record) => record.firstName + " " + record.lastName
            },
            {
                title: 'Exam Score',
                dataIndex: 'examScore',
            },
            {
                title: 'Completion Date',
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
                                title={`Are you sure you want to delete this Oracle exam score?`}
                                onConfirm={() => {
                                    GraduationService.deleteOracleExamScore(record.studentId).then(r => {this.fetchOracleExamScores();});
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
        const oracleMaintenanceViewInfoCard = (
            <span>
                <h1>There are currently {oracleExamScores.length} Oracle exam records</h1>
            </span>
        );

        const buttonsLeftSide = <span></span>;

        const buttonsRightSide = <span></span>;

        const maintenanceView = (
            <MaintenanceViewTemplate
                title={"Oracle Exam Completions"}
                infoCard={oracleMaintenanceViewInfoCard}
                buttonsLeftSide={buttonsLeftSide}
                buttonsRightSide={buttonsRightSide}
                onSuccess={() => {}}
            />
        );

        return (
            <AdminSubcomponentTemplate
                tableStructure={columns}
                tableRowKey={record => (record.firstName + " " + record.lastName + " " + record.completionDate)}
                tableData={oracleExamScores}
                emptyTableMessage={'No tests found'}
                subcomponentMaintenanceView={maintenanceView}
            />
        );
    }
}
