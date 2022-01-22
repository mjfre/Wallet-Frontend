import {
    surveyBackendUrl
} from './_BackendUrls';

class WorkspaceService {

    fetchWorkspaces() {
        return fetch(surveyBackendUrl + '/workspace', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    reserveAvailableWorkspace(sessionStartedOn, sessionEndsOn) {
        const availableWorkspaceReservation = {
            sessionStartedOn: sessionStartedOn,
            sessionEndsOn: sessionEndsOn
        };

        return fetch(surveyBackendUrl + '/workspace/reserve/available', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(availableWorkspaceReservation)
        })
    }

    setInoperative(workspaceId) {
        return fetch(surveyBackendUrl + '/workspace/inoperative/' + workspaceId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
        })
    }

    cancelReservation(workspaceId) {
        return fetch(surveyBackendUrl + '/workspace/cancel/' + workspaceId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
        })
    }

    updateWorkspacesTableFromAws() {
        return fetch(surveyBackendUrl + '/workspace/update/aws', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
        })
    }


}

export default new WorkspaceService();
