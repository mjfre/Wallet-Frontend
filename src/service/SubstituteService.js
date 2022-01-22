import {surveyBackendUrl} from './_BackendUrls';

class SubstituteService {

    submitSubstituteRequest(teacherId, submittedByUsername, startOn, endOn) {

        const substituteTeacherInitialRequestDO = {
            teacherId: teacherId,
            submittedByUsername: submittedByUsername,
            startOn:  startOn.toDate(),
            endOn: endOn.toDate()
        };

        return fetch(surveyBackendUrl + '/substitute-request', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(substituteTeacherInitialRequestDO)
        });
    }
     approveOrDenySubstituteRequest(requestStatus, updatedByUsername, substituteTeacherRequestId) {
            const substituteTeacherRequestStatusUpdateDO = {
                requestStatus: requestStatus,
                updatedByUsername: updatedByUsername,
            };
            return fetch(surveyBackendUrl + '/substitute-request/approve-or-deny/'+ substituteTeacherRequestId, {
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                method: 'PATCH',
                mode: 'cors',
                body: JSON.stringify(substituteTeacherRequestStatusUpdateDO)
            });
        }
        dateRecordToFormattedString(dateString) {
                    if (dateString !== null) {
                        let date = new Date(dateString);

                        let period = "a.m.";
                        let dateHours = 0;
                        if(date.getHours() === 0){
                            dateHours = 12;
                        }
                        else if (date.getHours() < 12) {
                            dateHours = date.getHours();
                        }
                        else if(date.getHours() === 12){
                            dateHours = date.getHours();
                            period = "p.m.";
                        }
                        else {
                            dateHours = date.getHours() - 12;
                            period = "p.m.";
                        }

                        return dateHours + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + " " + period + " on " +
                            (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substring(2);
                    }
                    return "";
                }
     updateSubstituteRequestStatusToClassesCovered(updatedByUsername, substituteTeacherRequestId) {
                    return fetch(surveyBackendUrl + '/substitute-request/classes-covered/'+ substituteTeacherRequestId, {
                        headers: {
                            Authorization: localStorage.getItem('accessToken'),
                            'Content-Type': 'application/json'
                        },
                        method: 'PATCH',
                        mode: 'cors',
                        body: JSON.stringify(updatedByUsername)
                    });
     }

     fetchSubstituteRequests() {
            return fetch(surveyBackendUrl + '/substitute-request', {
                headers: {
                    Authorization: localStorage.getItem('accessToken'),
                    'Content-Type': 'application/json'
                },
                method: 'GET',
                mode: 'cors'
            });
        }

    fetchSubstituteRequestsByTeacherId(teacherId) {
        return fetch(surveyBackendUrl + '/substitute-request/' + teacherId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    getSubstituteRequests() {
        return fetch(surveyBackendUrl + '/substitute-request', {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        })
    }

    //only allows users to delete their own substitute requests
    deleteSubstituteRequestByTeacherId(substituteRequestId) {
        return fetch(surveyBackendUrl + '/substitute-request/'  + substituteRequestId, {
            headers: {
                'Authorization': localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors'
        })
    }


}

export default new SubstituteService();
