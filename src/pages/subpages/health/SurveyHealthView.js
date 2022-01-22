import React, { Component } from 'react';

import HealthViewTemplate from '../../../components/adminViewComponents/HealthViewTemplate';
import HealthService from '../../../service/HealthService'


class SurveyHealthView extends Component {

    state = {
        healthData: {},
        httpTrace: {},
        logfile: ""
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        this.fetchHealth()
        this.fetchHttpTrace();
        this.fetchLogfile();
    }

    fetchHealth = () => {
        HealthService.fetchSurveyHealth()
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
        HealthService.fetchSurveyHttpTrace()
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
        HealthService.fetchSurveyLogfile()
            .then(response =>
                response.text()
            )
            .then(data => {
                this.setState({
                    logfile: data
                })
            });
    }

    render() {

        const { healthData, httpTrace, logfile} = this.state;

        return <HealthViewTemplate
            healthData={healthData}
            httpTrace={httpTrace}
            logfile={logfile}
            flyway={null}
            title="Survey Service Health"
            />
    }
}

export default SurveyHealthView;