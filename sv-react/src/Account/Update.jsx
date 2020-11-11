import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { accountService } from '@/_services';

function Update({ history }) {
    const { path } = history;
    const user = accountService.currentDataValue
    const initialValues = {
        username: user.username,
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
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
        accountService.update(fields.username,fields.password)
            .then(() => {
                accountService.userInfo()
                history.push('.');
            })
            .catch(error => {
                alert('El nombre de Usuario esta en uso')
                setSubmitting(false);
            });
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h1>Actualizar Perfil</h1>
                    <div className="form-group">
                        <label>Nombre de Usuario</label>
                        <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                        <ErrorMessage name="username" component="div" className="invalid-feedback" />
                    </div>
                    <div className="form-group">
                        <button type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                            {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Actualizar
                        </button>
                    <h3 className="pt-3">Cambiar contraseña</h3>
                    <p>Deja los siguientes campos vacíos si solo quieres modificar tu nombre de usuario</p>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Contraseña</label>
                            <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                            <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </div>
                        <div className="form-group col">
                            <label>Confirma tu contraseña</label>
                            <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                        <Link to="." className="btn btn-link">Cancelar</Link>
                    </div>
                </Form>
            )}
        </Formik>
    )
}

export { Update };