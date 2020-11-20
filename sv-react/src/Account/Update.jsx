import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { history } from '@/_helpers';
import { accountService } from '@/_services';
import { authenticationService } from '../_services/authentication.service';


function Update() {
    const user = accountService.currentDataValue
    const initialValues = {
        nickname: user.nickname,
        oldpassword: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object().shape({
        oldpassword: Yup.string()
            .min(8, 'La longitud minima es de 8 caracteres'),
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
        console.log(fields)
        accountService.update(user.nickname,fields.password,fields.oldpassword)
            .then(() => {
                if (fields.password) {
                    history.push('/');
                    authenticationService.logout()
                }
                else
                    history.push('/');
            })
    }

    return (
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            {({ errors, touched, isSubmitting }) => (
                <Form>
                    <h3 className="pt-3">Contraseña actual</h3>
                    <div className="form-row">
                        <div className="form-group col">
                            <label>Verifica que eres tú ingresando tu  contraseña actual</label>
                            <Field name="oldpassword" type="password" className={'form-control' + (errors.oldpassword && touched.oldpassword ? ' is-invalid' : '')} />
                            <ErrorMessage name="oldpassword" component="div" className="invalid-feedback" />
                        </div>
                    </div>
                    <h3 className="pt-3">Cambiar contraseña</h3>
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