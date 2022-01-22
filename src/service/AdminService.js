import {
    authenticationBackendUrl,
    surveyBackendUrl,
} from './_BackendUrls';

class AdminService {

    isUserLoggedIn() {
        let user = localStorage.getItem('accessToken');
        return user !== null;
    }

    getUsers() {
        return fetch(authenticationBackendUrl + '/user', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    getSurveySwagger() {
        return fetch(surveyBackendUrl + '/v2/api-docs', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    getAuthenticationSwagger() {
        return fetch(authenticationBackendUrl + '/v2/api-docs', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }


    getPearSurveyApi(endpoint) {
        return fetch(surveyBackendUrl + endpoint, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchStudentProfile(studentId) {
        return fetch(surveyBackendUrl + '/student/' + studentId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchTeacherProfile(teacherId) {
        return fetch(surveyBackendUrl + '/teacher/' + teacherId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchActiveSurveyOrdersByTeacherId(teacherId) {
        return fetch(surveyBackendUrl + '/survey/order/active/' + teacherId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchStudentsByTeacherId(teacherId) {
        return fetch(surveyBackendUrl + "/student/by/teacher/" + teacherId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    fetchModuleRepositoryInfo(studentId) {
        return fetch(
            surveyBackendUrl +
                '/versionControl/modules/all/' +
                studentId +
                '/withMostRecent',
            {
                headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors'
            }
        );
    }

    fetchMostRecentModuleRepositoryInfo(studentId) {
        return fetch(
            surveyBackendUrl+'/versionControl/modules/mostRecent/info/'+studentId,
            {
                headers: {
                    'Authorization': localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors'
            });
    }

    fetchLevelTestMaxScores() {
        return fetch(surveyBackendUrl + '/levelTestMaxScores', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }
}
export default new AdminService();
