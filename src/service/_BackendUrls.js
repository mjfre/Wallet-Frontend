const development = true;

const getWalletServiceUrl = () => {
    const surveyProductionBackendUrl = 'https://survey.api.jointheleague.org'
    const surveyDevelopmentBackendUrl = 'http://localhost:8080'
    if (development) {
        return surveyDevelopmentBackendUrl
    } else {
        return surveyProductionBackendUrl
    }
}

const walletServiceUrl = getWalletServiceUrl()

export { walletServiceUrl }
