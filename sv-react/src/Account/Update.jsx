import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService } from '@/_services';
import { authenticationService } from '../_services/authentication.service';


function Update({ history }) {
    const { path } = history;
    const user = accountService.currentDataValue
    const initialValues = {
        nickname: user.nickname,
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        nickname: Yup.string()
            .max(20, 'No mas de 20 caracteres estan permitidos'),
        password: Yup.string()
            .min(8, 'La longitud minima es de 8 caracteres'),
        confirmPassword: Yup.string()
            .when('password', (password, schema) => {
                if (password) return schema.required('La contraseña es obligatoria');
            })
            .oneOf([Yup.ref('password')], 'Las contraseñas deben coincidir')
    });

    function onSubmit(fields, { setStatus, setSubmitting }) {
        setStatus();
        accountService.update(fields.nickname, fields.password)
            .then(() => {
                accountService.userInfo()
                if (fields.password) {
                    authenticationService.logout()
                    history.push('/');
                }
                else
                    history.push('/');
            })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Actualizar Perfil</h1>
                    <div className="form-group">
                        <label>Alias:</label>
                        <Field name="nickname" type="text" className={'form-control' + (errors.nickname && touched.nickname ? ' is-invalid' : '')} />
                        <ErrorMessage name="nickname" component="div" className="invalid-feedback" />
                    </div>
                    <h3 className="pt-3">Cambiar contraseña</h3>
                    <p>Deja los siguientes campos vacíos si solo quieres modificar tu Alias</p>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Contraseña Nueva</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Confirma tu contraseña nueva</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Actualizar
                        </button>
                        <Link to="." className="btn btn-link">Cancelar</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Update };