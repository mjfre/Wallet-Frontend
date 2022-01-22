import React, { Component } from 'react';
import { Formik } from 'formik';
import { Button, Tag, InputNumber } from 'antd';
import PearIdService from '../service/PearIdService'
import { errorNotification } from '../components/Notification'

const inputBottomMargin = { marginBottom: '10px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin };


class AddUserForm extends Component {

    constructor(props) {
        super(props);
        this.state = { numberOfPearIdsToGenerate: 100};
    }

    setNumberOfPearIdsToGenerate = (numberOfPearIdsToGenerate) => this.setState({ numberOfPearIdsToGenerate: numberOfPearIdsToGenerate })

    render() {

        const { numberOfPearIdsToGenerate } = this.state;

        return <Formik
            initialValues={{ username: '' }}
            validate={values => {
                const errors = {};

                return errors;

            }}
            onSubmit={(user, { setSubmitting }) => {
                PearIdService.generatePearIds(numberOfPearIdsToGenerate)
                    .then((response) => response.json())
                    .then(data => {
                        if (data.httpStatus === "BAD_REQUEST") {
                            throw new Error(data.message)
                        }
                        else {
                            this.props.onSuccess();
                        }
                    })
                    .catch(err => {
                        console.log("error: " + err)
                        errorNotification("OOPS...", err.message);
                    })
                    .finally(() => {
                        setSubmitting(false);
                    })

            }}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                submitForm,
                isValid
                /* and other goodies */
            }) => (
                    <form onSubmit={handleSubmit}>
                        Number of IDs to Generate:
                        <br/>
                        <InputNumber
                            min={1}
                            max={1000} 
                            defaultValue={100} 
                            onChange={this.setNumberOfPearIdsToGenerate} 
                        />

                        {errors.userRole && touched.userRole && <Tag style={tagStyle}>{errors.userRole}</Tag>}
                        <br/>
                        <br/>
                        <Button
                            onClick={() => submitForm()}
                            type="submit"
                            disabled={isSubmitting | (touched && !isValid)}>
                            Submit
            </Button>
                    </form>
                )}
        </Formik>
    }

}
export default AddUserForm;