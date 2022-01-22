import React from 'react';
import { Formik } from 'formik';
import { Input, Button, Tag } from 'antd';
import WorkspaceService from '../service/WorkspaceService'
import { errorNotification } from '../components/Notification'

const inputBottomMargin = { marginBottom: '10px' };
const tagStyle = { backgroundColor: '#f50', color: 'white', ...inputBottomMargin };


const AddWorkspaceForm = (props) =>


    <Formik
        initialValues={{ containerUrl: '' }}
        validate={values => {
            const errors = {};

            if (!values.containerUrl) {
                errors.firstName = 'Workspace URL is required'
            }

            return errors;

        }}
        onSubmit={(container, { setSubmitting }) => {
            WorkspaceService.addWorkspace(container.containerUrl)
                .then((response) => response.json())
                .then(data =>{
                    if (data.httpStatus === "BAD_REQUEST") {
                        throw new Error(data.message)
                    }
                    else{
                        props.onSuccess();
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
                    <Input
                        autoFocus
                        style={inputBottomMargin}
                        name='containerUrl'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.containerUrl}
                        placeholder='Workspace URL'
                    />
                    {errors.containerUrl && touched.containerUrl && <Tag style={tagStyle}>{errors.containerUrl}</Tag>}

                    <Button
                        onClick={() => submitForm()}
                        type="submit"
                        disabled={isSubmitting | (touched && !isValid)}>
                        Submit
            </Button>
                </form>
            )}
    </Formik>



export default AddWorkspaceForm;
