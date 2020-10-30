import React from 'react';
import { Link } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '@/_services';

class LoginPage extends React.Component {
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
                      <h2>Iniciar Sesión</h2>
                      <Formik
                          initialValues={{
                              email: '',
                              password: ''
                          }}
                          validationSchema={Yup.object().shape({
                              email: Yup.string()
                              .required('Este campo es obligatorio')
                              .max(255)
                              .email('Email invalido'),
                              password: Yup.string()
                              .required('Este campo es obligatorio')
                          })}
                          onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                              setStatus();
                              authenticationService.login(email, password)
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
                                  <div className="form-group">
                                      <label htmlFor="email">Email</label>
                                      <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                                  </div>
                                  <div className="form-group">
                                      <label htmlFor="password">Contraseña</label>
                                      <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />
                                      <ErrorMessage name="password" component="div" className="invalid-feedback" />
                                  </div>
                                  <div className="form-row">
                                        <div className="form-group col">
                                            <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                                                {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                                Iniciar Sesión
                                            </button>
                                            <Link to="register" className="btn btn-link">Registrarme</Link>
                                        </div>
                                  </div>
                              </Form>
                          )}
                      />
                  </div>
              </div>
          </div>
        )
    }
}

export { LoginPage };
