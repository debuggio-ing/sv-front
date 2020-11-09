import React, {useState} from 'react';
import {Button,
        withStyles,
        MenuItem,
        Menu} from '@material-ui/core'

const StyledMenu = withStyles({
    paper: {
      border: '1px solid #4e8c43',
    },
  })((props) => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ))

export default function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    props.logout()
  }

  const home = () => {
    props.home()
  }

  const profile = () => {
    props.profile()
  }

  return (
    <div>
      <Button 
        aria-controls="customized-menu" 
        aria-haspopup="true"
        variant="outlined"
        onClick={handleClick}
        color='inherit'
        >
        Opciones
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={home}>Inicio</MenuItem>
        <MenuItem onClick={profile}>Perfil</MenuItem>
        <MenuItem onClick={logout}>Cerrar Sesion</MenuItem>
        </StyledMenu>
    </div>
  );
}