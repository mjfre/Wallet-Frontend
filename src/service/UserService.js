import {
    walletServiceUrl
} from './_BackendUrls';

class UserService {
    login(username, password) {
        const user = {
            username: username,
            password: password,
        };

        return fetch(walletServiceUrl + '/login', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(user),
        });
    }

    isUserLoggedIn() {
        let user = localStorage.getItem('accessToken');
        return user !== null;
    }

    getUserRole(username) {
        return fetch(walletServiceUrl + '/user/role/' + username, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
        });
    }

    getUserByUsername(username) {
        return fetch(walletServiceUrl + '/user/' + username, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
        });
    }

    getUsers() {
        return fetch(walletServiceUrl + '/user', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
        });
    }

    addUser(username, password) {
        const userJSON = {
            username: username,
            password: password,
            applicationUserRole: 'ADMIN',
            isAccountNonExpired: true,
            isAccountNonLocked: true,
            isCredentialsNonExpired: true,
            isEnabled: true,
        };

        return fetch(walletServiceUrl + '/user', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(userJSON),
        });
    }

    deleteUser(username) {
        const userJSON = {
            username: username,
            password: '',
            applicationUserRole: 'ADMIN',
            isAccountNonExpired: true,
            isAccountNonLocked: true,
            isCredentialsNonExpired: true,
            isEnabled: true,
        };

        return fetch(walletServiceUrl + '/user/' + username, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(userJSON),
        });
    }

}

export default new UserService();
