import React, {Component} from 'react';
import {Formik} from 'formik';
import {Input, Button, Tag, Checkbox, Select} from 'antd';
import UserService from '../service/UserService';
import {errorNotification, successNotification} from '../components/Notification';

const Option = Select.Option;

const inputBottomMargin = {marginBottom: '10px', width: '30%'};
const tagStyle = {backgroundColor: '#f50', color: 'white', ...inputBottomMargin};
var teacherNameSelectStyle = {display: 'inherit', width: '30%', ...inputBottomMargin};

class AddUserForm extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            userRole: 'ADMIN',
            checked: true,
        };
    }

    setUserRoleState = (userRole) => this.setState({userRole: userRole});

    render() {
        const {userRole, checked} = this.state;

        return (
            <Formik
                initialValues={{username: ''}}
                validate={(values) => {
                    const errors = {};

                    if (!values.username) {
                        errors.firstName = 'Username is required';
                    }
                    if (!values.password) {
                        errors.password = 'Password is required';
                    }
                    if (!values.email) {
                        errors.email = 'Email is required';
                    }

                    return errors;
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      submitForm,
                      isValid,
                      /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                        <div style={{width: '100%', alignContent: 'center', display: 'flex', flexDirection: 'column'}}>
                            <div style={{width: '100%'}}>
                                <Input
                                    autoFocus
                                    style={inputBottomMargin}
                                    name='username'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    placeholder='username'
                                />
                                {errors.username && touched.username && (
                                    <Tag style={tagStyle}>{errors.username}</Tag>
                                )}
                            </div>
                            <div style={{width: '100%'}}>
                                <Input.Password
                                    style={inputBottomMargin}
                                    name='password'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder='password'
                                />
                                {errors.password && touched.password && (
                                    <Tag style={tagStyle}>{errors.password}</Tag>
                                )}
                            </div>
                            <br/>

                            {errors.userRole && touched.userRole && (
                                <Tag style={tagStyle}>{errors.userRole}</Tag>
                            )}
                            <br/>
                            <Button
                                onClick={() => {
                                    console.log(values.username);
                                    UserService.addUser(values.username, values.password)
                                        .then((response) => {
                                            if (!response.ok) {
                                                errorNotification(`OOPS...`, 'User could not be added failed.');
                                            } else {
                                                this.props.onSuccess();
                                            }
                                        })
                                }}
                                type='submit'
                                disabled={false}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                )}
            </Formik>
        );
    }

    teacherJsonToSelectOptions(teachersJson) {
        return teachersJson.map((teacher) => ({
            value: teacher.teacherId,
            label: teacher.firstName + ' ' + teacher.lastName,
        }));
    }

    //for checkbox
    onChange = (e) => {
        if (this?.state?.checked === true) {
            this.setTeacherNameSelectInvisible();
        } else {
            this.setTeacherNameSelectVisible();
        }
        this.setState({
            checked: e.target.checked,
        });
    };
}

//for select
function filter(input, option) {
    return option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}

export default AddUserForm;
