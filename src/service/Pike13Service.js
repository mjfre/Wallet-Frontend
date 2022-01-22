import {
    surveyBackendUrl
} from './_BackendUrls';

class Pike13Service {
    importStudentsFromPike13() {
        return fetch(surveyBackendUrl + '/pike13/import/students', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
    }

    importTeachersFromPike13() {
        return fetch(surveyBackendUrl + '/pike13/import/teachers', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
    }

    importTeacherLinksFromPike13() {
        return fetch(surveyBackendUrl + '/pike13/import/teacherLink', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
    }

    exportPearIdsToPike13() {
        return fetch(surveyBackendUrl + '/pike13/export/pearId', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            mode: 'cors'
        })
    }
}
export default new Pike13Service();
