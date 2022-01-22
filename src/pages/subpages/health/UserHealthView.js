import React, { Component } from 'react';

import HealthViewTemplate from '../../../components/adminViewComponents/HealthViewTemplate';
import HealthService from '../../../service/HealthService'


class SurveyHealthView extends Component {

    state = {
        healthData: {},
        httpTrace: {},
        logfile: "",
        flyway: {}
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.fetchHealth()
        this.fetchHttpTrace();
        this.fetchLogfile();
        this.fetchFlyway();
    }

    fetchHealth = () => {
        HealthService.fetchUserHealth()
            .then(response =>
                response.json()
            )
            .then(data => {
                this.setState({
                    healthData: data
                })
            });
    }

    fetchHttpTrace = () => {
        HealthService.fetchUserHttpTrace()
            .then(response =>
                response.json()
            )
            .then(data => {
                this.setState({
                    httpTrace: data
                })
            });
    }

    fetchLogfile = () => {
        HealthService.fetchUserLogfile()
            .then(response =>
                response.text()
            )
            .then(data => {
                this.setState({
                    logfile: data
                })
            });
    }

    fetchFlyway = () => {
        HealthService.fetchUserFlyway()
            .then(response =>
                response.json()
            )
            .then(data => {
                this.setState({
                    flyway: data
                })
            });
    }

    render() {

        const { healthData, httpTrace, logfile, flyway} = this.state;

        return <HealthViewTemplate
            healthData={healthData}
            httpTrace={httpTrace}
            logfile={logfile}
            flyway={flyway}
            title="Authentication Service Health"
            />
    }
}

export default SurveyHealthView;