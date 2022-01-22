import {
    surveyBackendUrl
} from './_BackendUrls';

class StudentService {

    dropAllStudents() {
        return fetch(surveyBackendUrl + '/student/all', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors'
        });
    }

    submitStudentGraduation(studentId, currentLevel, testSection, testScorePercent) {
        const graduationInformation = {
            studentId: studentId,
            levelGraduated: currentLevel,
            testSection: testSection,
            testScorePercent: testScorePercent
        };

        return fetch(surveyBackendUrl + '/graduation/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(graduationInformation)
        });
    }

    fetchStudentTotalData() {
        return fetch(surveyBackendUrl + '/student/totals', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    fetchStudentGraduationWarningData() {
        return fetch(surveyBackendUrl + '/student/graduation-warnings', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }
}

export default new StudentService();
