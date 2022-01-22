import {
    surveyBackendUrl
} from './_BackendUrls';

class SurveyEventService {
    addSurveyEvent(issuedBy) {
        const issuedByJSON = {
            issuedBy
        };

        return fetch(surveyBackendUrl + '/survey/event', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(issuedByJSON)
        })
    }

    addSurveyOrderToAllStudentsBySurveyEvent(surveyEventId) {
        const surveyEvent = {
            surveyEventId: surveyEventId
        };

        return fetch(surveyBackendUrl + '/survey/order/allStudents', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(surveyEvent)
        })
    }

    deleteSurveyEvent(surveyEventId) {
        const surveyEventIdJSON = {
            surveyEventId
        };

        return fetch(surveyBackendUrl + '/survey/event', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(surveyEventIdJSON)
        })
    }

    deleteAllSurveyOrdersBySurveyEvent(surveyEventId) {
        const surveyEvent = {
            surveyEventId: surveyEventId
        };

        return fetch(surveyBackendUrl + '/survey/order', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(surveyEvent)
        })
    }

    resetSurveyOrderStatus(surveyEventId, studentId) {
        const surveyOrderReset = {
            surveyEventId: surveyEventId,
            studentId: studentId
        };

        return fetch(surveyBackendUrl + '/survey/order/reset', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            mode: 'cors',
            body: JSON.stringify(surveyOrderReset)
        })
    }

    completeSurveyOrder(studentPearId, studentLastName) {
        const surveyOrderCompletion = {
            pearId: studentPearId,
            lastName: studentLastName
        };

        return fetch(surveyBackendUrl + '/survey/order/complete', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(surveyOrderCompletion)
        })
    }
}

export default new SurveyEventService();
