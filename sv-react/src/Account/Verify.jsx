import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

class VerifyPage extends React.Component {
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
                            email: Yup.string()
                                .email('Email invalido')
                                .required('Este campo es obligatorio'),
                            code: Yup.string()
                                .min(6, 'El codigo debe tener 6 digitos.')
                                .required('Este campo es obligatorio')
                                .max(6, 'El codigo debe tener 6 digitos.'),
                            })}
                            onSubmit={({ email, code }, { setStatus, setSubmitting }) => {
                                setStatus();
                                authenticationService.verify(email, code)
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
                            <h3 className="row">Verificar Email</h3>
                                <div className="form-group">
                                    <label>Email</label>
                                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                    <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                </div>
                                <div className="form-row">
                                    <div className="form-group col">
                                        <label>Codigo</label>
                                        <Field name="code" type="text" className={'form-control' + (errors.code && touched.code ? ' is-invalid' : '')} />
                                        <ErrorMessage name="code" component="div" className="invalid-feedback" />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                        Verificar
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
export { VerifyPage };
