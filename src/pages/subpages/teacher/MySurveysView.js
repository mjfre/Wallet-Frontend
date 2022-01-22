import React, { Component } from 'react';
import AdminSubcomponentTemplate from '../../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';

class MySurveysView extends Component {
    fetchMySurveys = () => {
        this.props.fetchData();
    };

    getCurrentDayAbbreviation = () => {
        const dayAbbreviations = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        return dayAbbreviations[new Date().getDay()];
    };

    render() {
        const mySurveys = this.props.data;
        const mySurveysComplete = mySurveys.filter((so) => so.surveyOrderStatus === 'COMPLETE')
            .length;
        const mySurveysActive = mySurveys.filter((so) => so.surveyOrderStatus === 'ACTIVE').length;
        const mySurveysCanceled = mySurveys.filter((so) => so.surveyOrderStatus === 'CANCELED')
            .length;

        //create tableStructure
        const mySurveysColumns = [
            {
                title: 'Student Name',
                dataIndex: 'studentName',
                key: 'studentName'
            },
            {
                title: 'Class Start',
                dataIndex: 'classStartAt',
                key: 'classStartAt',
                filters: [
                    {
                        text: 'Sunday',
                        value: 'Sun'
                    },
                    {
                        text: 'Monday',
                        value: 'Mon'
                    },
                    {
                        text: 'Tuesday',
                        value: 'Tue'
                    },
                    {
                        text: 'Wednesday',
                        value: 'Wed'
                    },
                    {
                        text: 'Thursday',
                        value: 'Thu'
                    },
                    {
                        text: 'Friday',
                        value: 'Fri'
                    },
                    {
                        text: 'Saturday',
                        value: 'Sat'
                    }
                ],
                defaultSortOrder: 'descend',
                sorter: (a, b) => {
                    if (a.classStartAt.indexOf('AM') > 0 && b.classStartAt.indexOf('PM') > 0) {
                        return true;
                    } else if (
                        a.classStartAt.indexOf('PM') > 0 &&
                        b.classStartAt.indexOf('AM') > 0
                    ) {
                        return false;
                    } else {
                        return a.classStartAt < b.classStartAt;
                    }
                },
                defaultFilteredValue: [this.getCurrentDayAbbreviation()],
                onFilter: (value, record) => record.classStartAt.indexOf(value) === 0
            },
            {
                title: 'Class Name',
                dataIndex: 'className',
                key: 'className'
            },
            {
                title: 'Survey Order Status',
                dataIndex: 'surveyOrderStatus',
                key: 'surveyOrderStatus',
                filters: [
                    {
                        text: 'Active',
                        value: 'ACTIVE'
                    },
                    {
                        text: 'Complete',
                        value: 'COMPLETE'
                    },
                    {
                        text: 'Canceled',
                        value: 'CANCELED'
                    }
                ],
                defaultFilteredValue: ['ACTIVE'],
                onFilter: (value, record) => record.surveyOrderStatus.indexOf(value) === 0
            },
            {
                title: 'Completed On',
                dataIndex: 'completedOn',
                key: 'completedOn'
            }
        ];

        //create infoCard
        const mySurveysMaintenanceViewInfoCard = (
            <span>
                <h1>You have {mySurveys.length} surveys </h1>
                <br />
                <h3>Outstanding: {mySurveysActive}</h3>
                <h3>Completed: {mySurveysComplete}</h3>
                <h3>Canceled: {mySurveysCanceled}</h3>
            </span>
        );

        const mySurveysButtonsLeftSide = <span></span>;

        const mySurveysButtonsRightSide = <span></span>;

        const mySurveysMaintenanceView = (
            <MaintenanceViewTemplate
                title={"My Surveys"}
                infoCard={mySurveysMaintenanceViewInfoCard}
                buttonsLeftSide={mySurveysButtonsLeftSide}
                buttonsRightSide={mySurveysButtonsRightSide}
                onSuccess={this.fetchMySurveys}
            />
        );

        return (
            <AdminSubcomponentTemplate
                pageTitle={'My Surveys'}
                tableStructure={mySurveysColumns}
                tableRowKey={'studentId'}
                tableData={mySurveys}
                emptyTableMessage={'No surveys found'}
                subcomponentMaintenanceView={mySurveysMaintenanceView}
            />
        );
    }
}

export default MySurveysView;