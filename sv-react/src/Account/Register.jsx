import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <div>
                        <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                password: '',
                                acceptTerms: false
                            }}
                            validationSchema={Yup.object().shape({
                                username: Yup.string()
                                .required('Este campo es obligatorio'),
                            email: Yup.string()
                                .email('Email invalido')
                                .required('Este campo es obligatorio'),
                            password: Yup.string()
                                .min(8, 'La contraseña debe tener al menos 8 carateres')
                                .required('Este campo es obligatorio')
                                .max(30,'Por favor no mas de 30 caracteres'),
                            acceptTerms: Yup.bool()
                                .oneOf([true], 'Por favor lee y acepta los términos y condiciones')
                            })}
                            onSubmit={({username, email, password }, { setStatus, setSubmitting }) => {
                                setStatus();
                                authenticationService.register(username, email, password)
                                    .then(
                                        user => {
                                            const { from } = this.props.location.state || { from: { pathname: "/" } };
                                            this.props.history.push(from);
                                        },
                                        error => {
                                            setSubmitting(false);
                                            setStatus(error);
                                        }
                                    );
                            }}
                            render={({ errors, status, touched, isSubmitting }) => (
                            <Form>
                            <h3 className="row">Registrame</h3>
                            <div className="form-group">
                            <label>Nombre de Usuario</label>
                            <Field name="username" type="text" className={'form-control' + (errors.username && touched.username ? ' is-invalid' : '')} />
                            <ErrorMessage name="username" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label>Contraseña</label>
                                        <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group form-check">
                                    <Field type="checkbox" name="acceptTerms" id="acceptTerms" className={'form-check-input ' + (errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : '')} />
                                    <label htmlFor="acceptTerms" className="form-check-label">Acepto términos & Condiciones</label>
                                    <ErrorMessage name="acceptTerms" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-group">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Registrame
                                    </button>
                                    <Link to="login" className="btn btn-link">Cancelar</Link>
                                </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                                  }
                            </Form>
                            )}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
    export { RegisterPage };
