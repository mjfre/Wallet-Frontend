import {
    surveyBackendUrl
} from './_BackendUrls';

class PearIdService {
    generatePearIds(numberOfPearIdsToGenerate) {
        return fetch(
            surveyBackendUrl + '/pearId/generate/' + numberOfPearIdsToGenerate,
            {
                headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                mode: 'cors'
            }
        );
    }

    assignAvailablePearIds() {
        return fetch(surveyBackendUrl + '/pearId/assign', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors'
        })
    }
}

export default new PearIdService();
