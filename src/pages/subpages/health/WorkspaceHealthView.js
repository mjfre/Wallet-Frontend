import React, { Component } from 'react';

import HealthViewTemplate from '../../../components/adminViewComponents/HealthViewTemplate';
import HealthService from '../../../service/HealthService'


class WorkspaceHealthView extends Component {

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
    }

    fetchHealth = () => {
        HealthService.fetchWorkspaceHealth()
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
        HealthService.fetchWorkspaceHttpTrace()
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
        HealthService.fetchWorkspaceLogfile()
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

        const { healthData, httpTrace, logfile, flyway} = this.state;

        return <HealthViewTemplate
            healthData={healthData}
            httpTrace={httpTrace}
            logfile={logfile}
            flyway={flyway}
            title="Workspace Service Health"
            />
    }
}

export default WorkspaceHealthView;