const development = false;

const getAuthenticationBackendUrl = () => {
    const authenticationProductionBackendUrl = 'https://authentication.api.jointheleague.org'
    const authenticationDevelopmentBackendUrl = 'http://localhost:8081'
    if (development) {
        return authenticationDevelopmentBackendUrl
    } else {
        return authenticationProductionBackendUrl
    }
}

const getWorkspaceBackendUrl = () => {
    const workspaceProductionBackendUrl = 'https://workspace.api.jointheleague.org'
    const workspaceDevelopmentBackendUrl = 'http://localhost:8082'
    if (development) {
        return workspaceDevelopmentBackendUrl
    } else {
        return workspaceProductionBackendUrl
    }
}

const getSurveyBackendUrl = () => {
    const surveyProductionBackendUrl = 'https://survey.api.jointheleague.org'
    const surveyDevelopmentBackendUrl = 'http://localhost:8080'
    if (development) {
        return surveyDevelopmentBackendUrl
    } else {
        return surveyProductionBackendUrl
    }
}

const authenticationBackendUrl = getAuthenticationBackendUrl()
const workspaceBackendUrl = getWorkspaceBackendUrl()
const surveyBackendUrl = getSurveyBackendUrl()

export { authenticationBackendUrl, workspaceBackendUrl, surveyBackendUrl }
