import React, { useState, useEffect } from "react";
import { Button,
         Card as MCard,
         Dialog,
         DialogActions,
         DialogContent,
         DialogContentText,
         DialogTitle} from "@material-ui/core"
import Divination from './Divination.js'
import AvadaKedavra from './AvadaKedavra.js'
import Imperio from './Imperio.js'
import {gameService} from './../../../_services/game.service.js'

const styles = {};

function Spell({cards, spell, currentGame, spellType}) {
  const [open, setOpen] = useState(false);
  const getSpell = spell(currentGame.id);
  function handleClose() {
    setOpen(false);
    gameService.postSpell(currentGame.id,-1).then( response=> {
      console.log("TERMINADO EL SPELL")
    }).catch(err => {
      console.log("No se pudo lanzar el hechizo.")
    })
  }
  console.log(spell)
  console.log("SPELL TYPE")
  console.log(spellType)

  return (
    <MCard>
      <Dialog
        open={true}
        onClose={handleClose}
      >
        <React.Fragment>
          <DialogTitle id="form-dialog-title"></DialogTitle>
          <DialogContent>
            <DialogContentText align="center">{spellType}</DialogContentText>
            {spellType=="Divination" ?
              <Divination cards={cards}/>
              : spellType=="AvadaKedavra" ?
              <AvadaKedavra currentGame={currentGame}/>
              : <Imperio currentGame={currentGame}/>
            }
            <Button onClick={() => handleClose()}>Proceder con hechizo</Button>
          </DialogContent>
        </React.Fragment>
      </Dialog>
    </MCard>
  );
}

export default Spell;
