import React, { Component } from 'react';

import '../../App.css'
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import { errorNotification } from "../../components/Notification";
import { Button } from "antd";
import { DownloadOutlined } from '@ant-design/icons';
import Pike13Service from './../../service/Pike13Service';

class LinkTeacherStudentView extends Component {
  state = {
    isPike13ImportButtonDisabled: false
  }

  fetchLinkTeacherStudent = () => {
    this.props.fetchData()
  }

  importTeacherLinksFromPike13 = () => {
    this.disablePike13ImportButton();
    Pike13Service.importTeacherLinksFromPike13()
      .then(response =>
        response.json()
      )
      .then(data => {
        this.fetchLinkTeacherStudent();
        this.enablePike13ImportButton();
        errorNotification('', "Some teachers could not be linked, as they are not in the database." +
          "  Their Pike13 IDs are: " + data);
      })
      .catch(err => {
        console.log(err.error);
        errorNotification(`Error - (${err.httpStatus})`, `${err.message}`);
      });
  }

  disablePike13ImportButton = () => this.setState({ isPike13ImportButtonDisabled: true })

  enablePike13ImportButton = () => this.setState({ isPike13ImportButtonDisabled: false })

  render() {
    const { isPike13ImportButtonDisabled } = this.state;

    const linkTeacherStudent = this.props.data;

    //create tableStructure
    const linkTeacherStudentColumns = [
      {
        title: 'Teacher Name',
        dataIndex: 'teacherName',
        key: 'teacherName',
        defaultSortOrder: 'descend',
        sorter: (a, b) => (a.teacherName < b.teacherName)
      },
      {
        title: 'Student Name',
        dataIndex: 'studentName',
        key: 'studentName'
      },
      {
        title: 'Class Start',
        dataIndex: 'classStartAt',
        key: 'classStartAt'
      },
      {
        title: 'Class Time',
        dataIndex: 'className',
        key: 'className'
      }
      
    ];

    //create infoCard
    const linkTeacherStudentMaintenanceViewInfoCard = (
      <span>
        <h1>There are currently {linkTeacherStudent.length} teacher links </h1>
      </span>
    );

    const linkTeacherStudentButtonsLeftSide = (
      <span>
        <div className="actionButton">
          <Button
            ghost
            loading={isPike13ImportButtonDisabled}
            type="primary"
            shape="round"
            icon={<DownloadOutlined />}
            size={'medium'}
            onClick={() => {
              this.importTeacherLinksFromPike13()
            }}>
            Import Teacher-Student links from Pike13
           </Button>
        </div>
      </span>
    );

    const linkTeacherStudentButtonsRightSide = (
      <span>

      </span>
    );

    const linkTeacherStudentMaintenanceView =
      <MaintenanceViewTemplate
        infoCard={linkTeacherStudentMaintenanceViewInfoCard}
        buttonsLeftSide={linkTeacherStudentButtonsLeftSide}
        buttonsRightSide={linkTeacherStudentButtonsRightSide}
        onSuccess={this.fetchLinkTeacherStudent}
      />

    return <AdminSubcomponentTemplate
      pageTitle={'Teacher Link'}
      tableStructure={linkTeacherStudentColumns}
      tableRowKey={'studentId'}
      tableData={linkTeacherStudent}
      emptyTableMessage={"No teacher links found"}
      subcomponentMaintenanceView={linkTeacherStudentMaintenanceView}
    />
  }
}

export default LinkTeacherStudentView;