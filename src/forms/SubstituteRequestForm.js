import React, {useState} from 'react';
import '../App.css';

import {UserSwitchOutlined} from '@ant-design/icons';
import {Button, DatePicker, Spin} from 'antd';
import moment from 'moment';
import SubstituteService from "../service/SubstituteService";
import {errorNotification, successNotification} from "../components/Notification";

const {RangePicker} = DatePicker;

const formStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'};

export const SubstituteRequestForm = (props) => {

    let [startOn, setStartOn] = useState(() => null);
    let [endOn, setEndOn] = useState(() => null);
    let [submittingForm, setSubmittingForm] = useState(() => false)

    const submitSubstituteRequest = () => {
        SubstituteService.submitSubstituteRequest(props.userTeacherId, props.username, startOn, endOn)
            .then((response) => {
                if (response.status === 200) {
                    props.fetchSubstituteRequestsByTeacherId();
                    setStartOn(null);
                    setEndOn(null);
                    successNotification(`Success`, `Your substitute teacher request has been submitted`);
                } else {
                    errorNotification('Uh oh', `There was an error submitted your substitute teacher request.  Please try again later`);
                }
                setSubmittingForm(false);
            });
    };
    return (
        <div style={formStyle}>
            <RangePicker
                format="MMMM D, YYYY @ HH:mm"
                showTime={{
                    format: "HH:mm",
                    defaultValue: [moment('00:00:00', 'HH:mm:ss')]
                }}
                style={{width: '80%'}}
                value={[startOn, endOn]}
                onChange={dates => {
                    setStartOn(dates[0]);
                    setEndOn(dates[1]);
                }}
            />
            <br/>
            <div className='actionButton' style={{display: 'flex', justifyContent: 'center'}}>

                <Button
                    ghost
                    type='primary'
                    shape='round'
                    icon={submittingForm === false ? <UserSwitchOutlined/> : <Spin/>}
                    size={'large'}
                    style={submittingForm === false ? {} : {border: 'none'}}
                    disabled={(startOn === null && endOn === null) || submittingForm === true}
                    onClick={() => {
                        setSubmittingForm(true);
                        submitSubstituteRequest()
                    }}
                >
                    {submittingForm === false ? 'Submit' : null}
                </Button>
            </div>
        </div>

    );

}
