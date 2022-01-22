import {surveyBackendUrl} from "./_BackendUrls";


class LevelTestMaxScoresService{

    fetchLevelTestMaxScores() {
        return fetch(surveyBackendUrl + '/levelTestMaxScores', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

}

export default new LevelTestMaxScoresService();