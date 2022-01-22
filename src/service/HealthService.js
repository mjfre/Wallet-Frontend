import {
    authenticationBackendUrl,
    surveyBackendUrl,
    workspaceBackendUrl
} from './_BackendUrls';

class HealthService {
    fetchSurveyHealth() {
        return this.fetchHealth(surveyBackendUrl);
    }

    fetchSurveyHttpTrace() {
        return this.fetchHttpTrace(surveyBackendUrl);
    }

    fetchSurveyLogfile() {
        return this.fetchLogfile(surveyBackendUrl);
    }

    fetchUserHealth() {
        return this.fetchHealth(authenticationBackendUrl);
    }

    fetchUserHttpTrace() {
        return this.fetchHttpTrace(authenticationBackendUrl);
    }

    fetchUserLogfile() {
        return this.fetchLogfile(authenticationBackendUrl);
    }

    fetchWorkspaceHealth() {
        return this.fetchHealth(workspaceBackendUrl);
    }

    fetchWorkspaceHttpTrace() {
        return this.fetchHttpTrace(workspaceBackendUrl);
    }

    fetchWorkspaceLogfile() {
        return this.fetchLogfile(workspaceBackendUrl);
    }

    fetchHealth(url) {
        return fetch(url + '/actuator/health', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchHttpTrace(url) {
        return fetch(url + '/actuator/httptrace', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchLogfile(url) {
        return fetch(url + '/actuator/logfile', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchUserFlyway() {
        return fetch(authenticationBackendUrl + '/actuator/flyway', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }
}

export default new HealthService();
