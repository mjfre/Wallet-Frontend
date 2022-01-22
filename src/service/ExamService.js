import {
    surveyBackendUrl
} from './_BackendUrls';

class ExamService {

    fetchAssessmentTests() {
        return fetch(surveyBackendUrl + '/exam/assessment', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    fetchAssessmentTestContent() {
        return fetch(surveyBackendUrl + '/exam/assessment/content', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    createAssessmentTest(username) {
        return fetch(surveyBackendUrl + '/exam/assessment', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: username
        })
    }

    updateAssessmentTestInitialInfo(testToken, studentName, parentContactEmail, studentContactEmail) {

        const assessmentTestInitialInfoDO = {
            id: testToken,
            studentName: studentName,
            parentContactEmail: parentContactEmail,
            studentContactEmail:  studentContactEmail
        };

        return fetch(surveyBackendUrl + '/exam/assessment/'+testToken+'/initial-info', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(assessmentTestInitialInfoDO)
        })
    }

    checkAssessmentTestAnswers(testToken, selectedAnswers) {
        return fetch(surveyBackendUrl + '/exam/assessment/'+testToken+'/check', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(selectedAnswers)
        })
    }

    submitAssessmentTest(testToken, placementLevel, selectedAnswers) {
        const assessmentTestSubmissionDO = {
            id: testToken,
            placementLevel: placementLevel,
            selectedAnswerIndexes: selectedAnswers
        };

        return fetch(surveyBackendUrl + '/exam/assessment/'+testToken+'/submit', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(assessmentTestSubmissionDO)
        })
    }

    findClassesByStudentLevel(level){
        return fetch(surveyBackendUrl + '/teacherLink/class/level/'+level, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        })
    }

    updateAssessmentTestClasses(testToken, selectedClasses){
        return fetch(surveyBackendUrl + '/exam/assessment/'+testToken+'/class-times', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(selectedClasses)
        })
    }

    assessmentCompletedById(testToken){
        return fetch(surveyBackendUrl + '/exam/assessment/completed/'+testToken, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors',
        })
    }



}

export default new ExamService();
