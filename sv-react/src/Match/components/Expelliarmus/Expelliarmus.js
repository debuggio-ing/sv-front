import React, { useState, useEffect } from "react";
import {TextField,
         Button,
         Card as MCard,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle} from "@material-ui/core"
import {gameService} from './../../../_services/game.service.js'


function Expelliarmus({game_id}) {
  const [open, setOpen] = useState(false);
  function handleClose() {
    setOpen(false);
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function cast_expelliarmus(choice){
    gameService.postProcCards(game_id,1,choice).then( response=> {
      console.log("Expelliarmus no lanzado")
    }).catch(err => {
      console.log("No se pudo lanzar expelliarmus.")
    })
  }


  return (
    <MCard>
      <Dialog
        open={true}
        onClose={handleClose}
      >
        <React.Fragment>
          <DialogTitle id="form-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText align="center">EXPELLIARMUS
            </DialogContentText>
            <Button onClick={() => cast_expelliarmus(true)}>ACEPTAR</Button>
            <Button color="primary" onClick={() => cast_expelliarmus(false)}>
            RECHAZAR
            </Button>
          </DialogContent>
        </React.Fragment>
      </Dialog>
    </MCard>
  );
}

export default Expelliarmus;
