import React from 'react';
import { Link } from 'react-router-dom';
import { accountService } from '@/_services';
import PictureUpload from './Picture'

function Details({ match }) {
    const { path } = match;
    var data = "Cargando..."
    if(accountService.currentDataValue){
        data = JSON.parse(JSON.stringify(accountService.currentDataValue))
    }
    
    return (
        <div>
            <h1>Mi Perfil</h1>
            < PictureUpload />
            <p>
                <strong>Nombre de usuario: </strong> {data.username}<br />
                <strong>Email: </strong> {data.email}
            </p>
            <p><Link to={`${path}/update`}>Actualizar mi perfil</Link></p>
        </div>
    );
}

export { Details };