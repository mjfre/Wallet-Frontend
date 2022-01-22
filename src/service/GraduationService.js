import { surveyBackendUrl } from './_BackendUrls';

const getCurDate = () => {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
};

class GraduationService {
    setTestMaxScore(level, newMaxWrittenScore, newMaxCodingScore) {
        const newTestMaxScore = {
            level:level,
            maxWrittenScore: newMaxWrittenScore,
            maxCodingScore: newMaxCodingScore,
        };
        return fetch(surveyBackendUrl + '/levelTestMaxScores/'  +  level, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(newTestMaxScore)
        });
    }

    fetchApExamInfoForStudent(studentId) {
        return fetch(surveyBackendUrl + '/graduation/ap/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    fetchOracleExamScores() {
        return fetch(surveyBackendUrl + '/graduation/oracle', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    deleteOracleExamScore(studentId) {
        return fetch(surveyBackendUrl + '/graduation/oracle/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
        });
    }

    fetchApExamInfo() {
        return fetch(surveyBackendUrl + '/graduation/ap/', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    deleteApExamScore(studentId, examTaken) {
        return fetch(surveyBackendUrl + '/graduation/ap/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(examTaken)
        });
    }

    fetchLevelGraduations() {
        return fetch(surveyBackendUrl + '/graduation', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    fetchPartialLevelGraduations() {
        return fetch(surveyBackendUrl + '/graduation/partial', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }

    sendOracleCompletion(studentId, score) {
        const TestInfo = {
            studentId: studentId,
            examScore: score,
            completedOn: getCurDate()
        };

        return fetch(surveyBackendUrl + '/graduation/oracle/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(TestInfo)
        });
    }

    sendApCompletion(studentId, examTaken, score) {
        console.log("ap " + score);
        const TestInfo = {
            studentId: studentId,
            examTaken: examTaken, //principles or a
            examScore: score,
            completedOn: getCurDate()
        };

        console.log(TestInfo);

        return fetch(surveyBackendUrl + '/graduation/ap/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(TestInfo)
        });
    }

    deletePartialLevelGraduation(studentId, level) {
        return fetch(surveyBackendUrl + '/graduation/partial/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
            body: level
        });
    }


    deleteGraduationAndUpdatePike13(studentId, level) {
        return fetch(surveyBackendUrl + '/graduation/' + studentId, {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'DELETE',
            mode: 'cors',
            body: level
        });
    }

    fetchJavaLevelData() {
        return fetch(surveyBackendUrl + '/graduation/data', {
            headers: {
                Authorization: localStorage.getItem('accessToken'),
                'Content-Type': 'application/json'
            },
            method: 'GET',
            mode: 'cors'
        });
    }
}

export default new GraduationService();
