const development = true;

const getAuthenticationBackendUrl = () => {
    const authenticationProductionBackendUrl = 'https://authentication.api.jointheleague.org'
    const authenticationDevelopmentBackendUrl = 'http://localhost:8080'
    if (development) {
        return authenticationDevelopmentBackendUrl
    } else {
        return authenticationProductionBackendUrl
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
const surveyBackendUrl = getSurveyBackendUrl()

export { authenticationBackendUrl, surveyBackendUrl }
