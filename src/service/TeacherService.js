import {
    surveyBackendUrl
} from './_BackendUrls';

class TeacherService {
    importTeachersFromPike13() {
        return fetch(surveyBackendUrl + '/teacher/import/pike13', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
    }

    sendSurveyReminderEmailsToTeachers() {
        return fetch(surveyBackendUrl + '/teacher/surveyEmails', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
    }

    importTeacherLinksFromPike13() {
        return fetch(surveyBackendUrl + '/teacherLink/import/pike13', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors'
        })
    }
}

export default new TeacherService();
