import React from 'react';

export function SoporteTecnicoNotificacionButtonAbrirModal(props) {
    return(
        <button type="button" 
            className="btn btn-outline-danger btn-sm" 
            onClick={props.onClick} 
            title="Notificar error">
            <i className="fas fa-exclamation-circle"></i> Notificar error
        </button>
    );
}

export function SoporteTecnicoNotificacionButtonRegistrar(props) {
    return(
        <button type="button" 
            className="btn btn-outline-danger btn-sm" 
            onClick={props.onClick} 
            title="Enviar">
            <i className="fas fa-paper-plane"></i> Enviar
        </button>
    );
}