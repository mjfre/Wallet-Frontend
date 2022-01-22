import React, { Component } from 'react';
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import GraduationService from '../../service/GraduationService';

export default class ApExamView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            levelGraduations: []
        };
    }

    componentDidMount() {
        this.fetchLevelGraduations();
    }

    fetchLevelGraduations() {
        GraduationService.fetchLevelGraduations()
            .then((response) => response.json())
            .then((data) => {
                this.setState({ levelGraduations: data });
            });
    }

    render() {
        const { levelGraduations } = this.state;

        //create tableStructure
        const columns = [
            {
               title: '',
               dataIndex: ['firstName','lastName'],
               render: (text, record) => record.firstName + " " + record.lastName
            },
            {
                title: 'Level Graduated',
                dataIndex: 'levelGraduated',
            },
            {
                title: 'Exam Score',
                dataIndex: 'examScore',
                render: (text, record) => {
                    if(record.examScore >= 0){
                        return record.examScore
                    }
                    else{
                        return <div>Promoted</div>
                    }
                },
            },
            {
                title: 'Completion Date',
                dataIndex: 'completedOn',
            }
        ];

        //create infoCard
        const studentMaintenanceViewInfoCard = (
            <span>
                <h1>There are currently {levelGraduations.length} level graduations</h1>
            </span>
        );

        const buttonsLeftSide = <span></span>;

        const buttonsRightSide = <span></span>;

        const maintenanceView = (
            <MaintenanceViewTemplate
                title={"Java Level Completions"}
                infoCard={studentMaintenanceViewInfoCard}
                buttonsLeftSide={buttonsLeftSide}
                buttonsRightSide={buttonsRightSide}
                onSuccess={() => {}}
            />
        );

        return (
            <AdminSubcomponentTemplate
                tableStructure={columns}
                tableRowKey={record => record.firstName + record.lastName + record.levelGraduated}
                tableData={levelGraduations}
                emptyTableMessage={'No Java Level Graduations Found'}
                subcomponentMaintenanceView={maintenanceView}
            />
        );
    }
}
