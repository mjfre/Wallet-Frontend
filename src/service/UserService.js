import {
    authenticationBackendUrl
} from './_BackendUrls';

class UserService {
    login(username, password) {
        const user = {
            username: username,
            password: password,
        };

        return fetch(authenticationBackendUrl + '/login', {
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
        return fetch(authenticationBackendUrl + '/user/role/' + username, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
        });
    }

    getUserByUsername(username) {
        return fetch(authenticationBackendUrl + '/user/' + username, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
        });
    }

    getUsers() {
        return fetch(authenticationBackendUrl + '/user', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'GET',
            mode: 'cors',
        });
    }

    addUser(user, userRole, userTeacherId) {
        const userJSON = {
            username: user.username,
            password: user.password,
            email: user.email,
            applicationUserRole: userRole.toString(),
            teacherId: userTeacherId,
            isAccountNonExpired: true,
            isAccountNonLocked: true,
            isCredentialsNonExpired: true,
            isEnabled: true,
        };

        return fetch(authenticationBackendUrl + '/user', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(userJSON),
        });
    }

    resetPassword(passwordResetToken, newPassword) {
        const passwordResetJSON = {
            token: passwordResetToken,
            password: newPassword,
        };

        return fetch(authenticationBackendUrl + '/user/password/reset', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(passwordResetJSON),
        });
    }

    //backend really only needs username
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

        return fetch(authenticationBackendUrl + '/user/' + username, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(userJSON),
        });
    }

    requestPasswordResetEmail(email) {
        return fetch(authenticationBackendUrl + '/user/passwordResetEmail/' + email, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
        });
    }

    requestStudentPasswordReset(studentId) {
        console.log(studentId);
        return fetch(authenticationBackendUrl + '/user/passwordReset/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json',
            },
            method: 'POST',
            mode: 'cors',
        });
    }
}

export default new UserService();
