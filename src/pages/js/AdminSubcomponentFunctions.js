import {
    openNotification,
    successNotification,
    infoNotification,
    warningNotification,
    errorNotification
} from './../../components/Notification'
import AdminDataService from './../../service/AdminDataService'


export const openAddStudentModal = () => this.setState({ isAddStudentModalVisible: true })

export const closeAddStudentModal = () => this.setState({ isAddStudentModalVisible: false })

export const openEditStudentModal = () => this.setState({ isEditStudentModalVisible: true })

export const closeEditStudentModal = () => this.setState({ isEditStudentModalVisible: false })

export const updateStudentFormSubmitter = student => {
    AdminDataService.updateStudent(student.studentId, student).then(() => {
        successNotification('Student updated', `${student.studentId} was updated`);
        this.closeEditStudentModal();
        this.props.onSuccess();
    }).catch(err => {
        console.log(err.error);
        errorNotification(`Error - (${err.error.httpStatus})`, `${err.error.message}`);
    });
}

export const endContainerSession = (containerUrl) => {
    AdminDataService.endSession(containerUrl).then(() => {
        //successNotification('Containers Pruned', ``);
        successNotification(`Workspace session ended (${containerUrl})`, '');

        this.props.onSuccess();
    }).catch(err => {
        console.log(err);
        errorNotification(`Error - (${err.error.httpStatus})`, `${err.error.message}`);
    });
}

export const deleteContainer = (containerUrl) => {
    AdminDataService.deleteContainer(containerUrl).then(() => {
        successNotification(`Workspace deleted (${containerUrl})`, '');
        this.props.onSuccess();
    });

}