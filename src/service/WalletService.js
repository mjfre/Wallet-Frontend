import {
    walletServiceUrl
} from './_BackendUrls';

class WalletService {

    fetchThorWalletRecords() {
        return fetch(walletServiceUrl + '/wallet-record', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    addThorWalletAddress(thorWalletAddress) {
        return fetch(walletServiceUrl + '/wallet-record', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            body: thorWalletAddress,
            method: 'POST',
            mode: 'cors'
        })
    }

    getUsers() {
        return fetch(walletServiceUrl + '/user', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    getWalletSwagger() {
        return fetch(walletServiceUrl + '/v2/api-docs', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }


}
export default new WalletService();
