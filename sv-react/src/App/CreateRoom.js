import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import {TextField,
         Button,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle} from "@material-ui/core"
import { Formik } from "formik";
import * as Yup from "yup";
import {lobbyService} from '@/_services'
const styles = {};

function CreateRoom(props) {
  const { classes } = props;
  const [open, setOpen] = useState(false);
  const [isSubmitionCompleted, setSubmitionCompleted] = useState(false);

  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setSubmitionCompleted(false)
    setOpen(true);
  }

  return (
    <React.Fragment>
      <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
          Nueva Partida
          </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        {!isSubmitionCompleted && (
          <React.Fragment>
            <DialogTitle id="form-dialog-title">Nueva Partida</DialogTitle>
            <DialogContent>
              <DialogContentText>Llena los campos para iniciar una crear una sala nueva</DialogContentText>
              <Formik
                initialValues={{
                    players: '',
                    lobbyName: ''

                }}
                validationSchema={Yup.object().shape({
                    players: Yup.number()
                    .required('Este campo es obligatorio')
                    .positive()
                    .integer('Este numero debe ser entero')
                    .max(10,'Este numero debe ser menor o igual a 10')
                    .min(5,'Este numero debe ser mayor o igual a 5')
                    .typeError("Esto no es un numero"),
                    lobbyName: Yup.string()
                    .required('Este campo es obligatorio')
                    .min(1,'El nombre no puede ser vacio')
                    .max(20,'El nombre excede los 20 caracteres')
                    .typeError("Esto no es un string")
                })}
                onSubmit={({ lobbyName, players }, { setStatus, setSubmitting }) => {
                    setSubmitting(true);
                    lobbyService.createLobby(lobbyName, players)
                        .then(
                            (response) => {
                                setSubmitionCompleted(true)
                                setOpen(false)
                            },
                            error => {
                                setSubmitting(false)
                                setStatus(error)
                            }
                        );
                }}
              >
                {(props) => {
                  const {
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  } = props
                  return (
                    <form onSubmit={handleSubmit}>
                      <TextField
                        label="Cantidad de jugadores"
                        name="players"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.players && touched.players}
                        margin="normal"
                      />
                      <TextField
                        label="Nombre"
                        name="lobbyName"
                        className={classes.textField}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.lobbyName && touched.lobbyName}
                        margin="normal"
                      />
                      <DialogActions>
                        <Button type="submit" disabled={isSubmitting} onClick={handleSubmit}>
                          Crear Sala
                        </Button>
                      </DialogActions>
                    </form>
                  );
                }}
              </Formik>
            </DialogContent>
          </React.Fragment>
        )}
      </Dialog>
    </React.Fragment>
  );
}

export default withStyles(styles)(CreateRoom)