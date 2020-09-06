import React from 'react';

export function CandidatoApreciacionButtonObtener (props) {
    return(
        <button type="button" 
            className="btn btn-outline-danger btn-sm" 
            onClick={props.onClick} 
            title="Actualizar apreciación del candidato">
            <i className="fas fa-file-word"></i> Apreciación
        </button>
    );
}

export function CandidatoApreciacionButtonRegistrar (props) {
    return(
        <button type="button" 
            className="btn btn-outline-danger btn-sm" 
            onClick={props.onClick} 
            title="Guardar">
            <i className="fas fa-file-word"></i> Guardar
        </button>
    );
}