import React, { useState, useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import {TextField,
         Button,
         Card as MCard,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle} from "@material-ui/core"
import Divination from './Divination.js'
import {gameService} from './../../../_services/game.service.js'

const styles = {};

function Spell({cards, spell, id}) {
  const [open, setOpen] = useState(false);
  const getSpell = spell(id,1)
  function handleClose() {
    setOpen(false);
    gameService.postSpell(id,1).then( response=> {
      console.log("TERMINADO EL SPELL")
    }).catch(err => {
      console.log("No se pudo lanzar el hechizo.")
    })
  }

  function handleClickOpen() {
    setOpen(true);
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
            <DialogContentText align="center">HECHIZO</DialogContentText>
            <Divination cards={cards}/>
            <Button onClick={() => handleClose()}>Proceder con hechizo</Button>
          </DialogContent>
        </React.Fragment>
      </Dialog>
    </MCard>
  );
}

export default Spell;
