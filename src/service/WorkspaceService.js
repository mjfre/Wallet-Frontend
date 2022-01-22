import {
    walletServiceUrl
} from './_BackendUrls';

class WorkspaceService {

    fetchWorkspaces() {
        return fetch(walletServiceUrl + '/workspace', {
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

        return fetch(walletServiceUrl + '/workspace/reserve/available', {
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
        return fetch(walletServiceUrl + '/workspace/inoperative/' + workspaceId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
        })
    }

    cancelReservation(workspaceId) {
        return fetch(walletServiceUrl + '/workspace/cancel/' + workspaceId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
        })
    }

    updateWorkspacesTableFromAws() {
        return fetch(walletServiceUrl + '/workspace/update/aws', {
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
