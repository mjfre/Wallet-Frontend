import React, { Component } from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag, Checkbox, Select } from 'antd';
import UserService from '../service/UserService';
import { errorNotification } from '../components/Notification';
const Option = Select.Option;

const inputBottomMargin = { marginBottom: '10px', width: '30%' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin };
var teacherNameSelectStyle = { display: 'inherit', width: '30%', ...inputBottomMargin };

const userRoleOptions = [
    {
        value: 'ADMIN',
        label: 'ADMIN',
    },
    {
        value: 'TEACHER',
        label: 'TEACHER',
    },
    {
        value: 'SUPERUSER',
        label: 'SUPERUSER - can edit users',
    },
];

class AddUserForm extends Component {
    constructor(props) {
        super(props);
        // Don't call this.setState() here!
        this.state = {
            userRole: userRoleOptions[0].value,
            userTeacherId: null,
            checked: true,
            showTeacherNameSelect: true,
            userEmail: null
        };
    }

    setUserRoleState = (userRole) => this.setState({ userRole: userRole });

    setUserTeacherId = (userTeacherId) => this.setState({ userTeacherId: userTeacherId });

    setTeacherNameSelectVisible = () => {
        teacherNameSelectStyle = { display: 'inherit', width: '30%', ...inputBottomMargin };
    };

    setTeacherNameSelectInvisible = () => {
        teacherNameSelectStyle = { display: 'none', width: '30%', ...inputBottomMargin };
    };

    render() {
        const { userRole, userTeacherId, checked} = this.state;
        const { teachers } = this.props;
        const teacherNameOptions = this.teacherJsonToSelectOptions(teachers);

        const IsUserTeacherCheckbox = () => {
            if (userRole !== userRoleOptions[1].value) {
                //they are a teacher
                this.setTeacherNameSelectVisible();
                return (
                    <div>
                        <Checkbox onChange={this.onChange} checked={checked}>
                            This user is a teacher
                        </Checkbox>
                        <br />
                    </div>
                );
            } else {
                //they might be a teacher
                this.setTeacherNameSelectVisible();
                if (!checked) {
                    this.setState({ checked: true });
                }
                return <span></span>;
            }
        };

        return (
            <Formik
                initialValues={{ username: '' }}
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
                onSubmit={(user, { setSubmitting }) => {
                    UserService.addUser(user, userRole, userTeacherId)
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.httpStatus === 'BAD_REQUEST') {
                                throw new Error(data.message);
                            } else {
                                this.props.onSuccess();
                            }
                        })
                        .catch((err) => {
                            errorNotification('OOPS...', err.message);
                        })
                        .finally(() => {
                            setSubmitting(false);
                        });
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
                        <div style={{width:'100%'}}>
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
                        <div style={{width:'100%'}}>
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
                        <div style={{width:'100%'}}>
                            <Input
                                style={inputBottomMargin}
                                name='email'
                                onChange={handleChange}
                                value={values.userEmail}
                                onBlur={handleBlur}
                                placeholder='email'
                            />
                            {errors.email && touched.email && (
                                <Tag style={tagStyle}>{errors.email}</Tag>
                            )}
                        </div>
                        <Select
                            name='userRole'
                            style={{ width: '30%', ...inputBottomMargin }}
                            placeholder='User Role'
                            onChange={this.setUserRoleState}
                            defaultValue={userRoleOptions[0].value}
                        >
                            {userRoleOptions.map((option) => {
                                return <Option value={option.value}>{option.label}</Option>;
                            })}
                        </Select>
                        <br />
                        <IsUserTeacherCheckbox />
                        <Select
                            name='teacherName'
                            style={teacherNameSelectStyle}
                            options={teacherNameOptions}
                            placeholder='Teacher Name'
                            onChange={this.setUserTeacherId}
                            showSearch
                            filterOption={filter}
                        >
                            {teacherNameOptions.map((option) => {
                                return <Option value={option.value}>{option.label}</Option>;
                            })}
                        </Select>

                        {errors.userRole && touched.userRole && (
                            <Tag style={tagStyle}>{errors.userRole}</Tag>
                        )}
                        <br />
                        <Button
                            onClick={() => {
                                console.log(this.state);
                                submitForm();
                            }}
                            type='submit'
                            disabled={isSubmitting | (touched && !isValid)}
                        >
                            Submit
                        </Button>
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
