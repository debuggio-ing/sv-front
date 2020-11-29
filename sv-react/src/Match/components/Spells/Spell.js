import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core"
import Divination from './Divination.js'
import AvadaKedavra from './AvadaKedavra.js'
import Imperio from './Imperio.js'
import Crucio from './Crucio.js'
import { gameService } from './../../../_services/game.service.js'


function Spell({ cards, role, spell, currentGame, spellType }) {
  const [open, setOpen] = useState(false);
  const getSpell = spell(currentGame.id);
  function handleClose() {
    setOpen(false);
    gameService.postSpell(currentGame.id, -1).then(response => {
      console.log("TERMINADO EL SPELL")
    }).catch(err => {
      console.log("No se pudo lanzar el hechizo.")
    })
  }

  return (
    <Dialog
      open={true}
      onClose={handleClose}
    >
      <Grid container
        alignText='center' alignSelf='stretch' xs={12}
        justify='center' alignItems='center'>
        <DialogTitle>{spellType}</DialogTitle>
        <Grid container
          alignText='center' alignSelf='stretch' xs={12}
          justify='center' alignItems='center'>
          <Grid container xs={6} justify='center' alignItems='center'>
            {spellType == "Divination" ?
              <Divination cards={cards} />
              : spellType == "AvadaKedavra" ?
                <AvadaKedavra currentGame={currentGame} />
                : spellType == "Crucio" ?
                  <Crucio currentGame={currentGame} role={role} />
                  : <Imperio currentGame={currentGame} />
            }
            {spellType == 'Divination' || (spellType == 'Crucio' && currentGame.in_crucio) ?
              <Button  onClick={() => handleClose()}>Continuar</Button>
              : <Button onClick={()=>{}}/>
            }
          </Grid>

        </Grid>
      </Grid>
    </Dialog>
  );
}

export default Spell;
