import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { accountService } from '@/_services';
import PictureUpload from './Picture'

function Details({ match }) {
    const { path } = match
    const [inputVal, setInputVal] = useState('');
    var data = ""
    if (accountService.currentDataValue) {
        data = JSON.parse(JSON.stringify(accountService.currentDataValue))
    }
    const [lastVal, setLastVal] = useState([data.nickname]);

    const handleSubmit = (e) => {
        //this avoids page reloading
        e.preventDefault()
        //do not set an empty or too long alias.
        if (inputVal.length>0){
            if (inputVal.length<16){
                setLastVal([inputVal]);
                //catch the promise but do nothing with it
                accountService.update(inputVal, '','').then(e =>e)
            } else {
                alert('No puedes tener un alias de mas de 15 caracteres')
            }
        } else {
            alert('No puedes tener un alias vacío')
        }
    };

    return (
        <div>
            <h1>Mi Perfil</h1>
            < PictureUpload />
            <p>
                <strong>Alias: </strong> {lastVal}<br />
                <strong>Email: </strong> {data.email}
            </p>
            <div className="simple-input">
                <form onSubmit={handleSubmit}>
                    <input
                        value={inputVal}
                        onChange={event => setInputVal(event.target.value)}
                        placeholder="¿Nuevo Alias? "
                    />
                    <button type="submit" className="btn btn-primary mr-2">
                            Actualizar
                    </button>
                </form>
            </div>
            <p><Link to={`${path}/update`}>Actualizar mi perfil</Link></p>
        </div>
    );
}

export { Details };