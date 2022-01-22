import React, { Component } from 'react';
import {
    Descriptions,
    Button
} from 'antd';
import {
  CopyOutlined
} from '@ant-design/icons';

class MostRecentModuleDescription extends Component {

    formatMostRecentStudentRepositoryDate(mostRecentStudentRepositoryDate) {
        let dateString = new Date(mostRecentStudentRepositoryDate).toLocaleString('en-US',{weekday: "short", month:"short", year:"numeric","dayPeriod":"short", "hour12":true,"hour":"2-digit", "minute":"2-digit", "day":"2-digit"});
        let parts = dateString.split(', ');
        parts[parts.length-2] = parts[parts.length-2] + ' @ '+parts[parts.length-1];
        parts.pop();
        return parts.join(' ');
    }


    render() {

        const { mostRecentRepositoryInformation, formattedMostRecentStudentRepositoryName } = this.props;

        return (
            <Descriptions
                layout="vertical"
                bordered
                column={{ xxl: 2, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Name" span={1}  style={{textAlign:'center', fontWeight:500}}>
                    <span style={{fontWeight:'normal'}}>{formattedMostRecentStudentRepositoryName}</span>
                </Descriptions.Item >
                <Descriptions.Item label="Updated At" span={1} style={{textAlign:'center', fontWeight:500}}>
                    <span style={{fontWeight:'normal'}}>{this.formatMostRecentStudentRepositoryDate(mostRecentRepositoryInformation.updatedAt)}</span>
                </Descriptions.Item>
                <Descriptions.Item label="Duration (days)" style={{textAlign:'center', fontWeight:500}}>
                    <span style={{fontWeight:'normal'}}>{mostRecentRepositoryInformation.durationDays}</span>
                </Descriptions.Item>
                <Descriptions.Item label="View Commit"  style={{textAlign:'center', fontWeight:500}}>
                    <Button
                        type="ghost"
                        size={'small'}
                        onClick={() => {
                            window.open(mostRecentRepositoryInformation.commitHttpUrl);
                        }}
                    >
                        view commit
                    </Button>
                </Descriptions.Item>
                <Descriptions.Item label="Clone URL"  style={{textAlign:'center', fontWeight:500}}>
                    {mostRecentRepositoryInformation.cloneUrl}
                    <Button
                        type="ghost"
                        size={'small'}
                        icon={<CopyOutlined />}
                        onClick={() => {
                            copyToClipboard(mostRecentRepositoryInformation.cloneUrl);
                        }}
                    >
                        copy
                    </Button>
                </Descriptions.Item>
                <Descriptions.Item label="Last Commit Message" style={{textAlign:'center', fontWeight:500}}>
                    <span style={{fontWeight:'normal'}}>{mostRecentRepositoryInformation.lastCommitMessage}</span>
                </Descriptions.Item>
            </Descriptions>
        );

    }
}

const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };



export default MostRecentModuleDescription;

