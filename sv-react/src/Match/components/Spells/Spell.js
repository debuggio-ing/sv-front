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
const styles = {};

function Spell({cards, spell, id}) {
  let spellType2 = "Divination"
  useEffect(() => {
    spell(id)
    })
  const [open, setOpen] = useState(false);

  function handleClose() {
    setOpen(false);
    console.log("ESTO LLAMARIA AL POST")
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
            <DialogContentText align="center">TITULO</DialogContentText>
            <Button onClick={() => handleClose()}>HECHIZO BOTON</Button>
            <Divination cards={cards}/>
          </DialogContent>
        </React.Fragment>
      </Dialog>
    </MCard>
  );
}

export default Spell;
