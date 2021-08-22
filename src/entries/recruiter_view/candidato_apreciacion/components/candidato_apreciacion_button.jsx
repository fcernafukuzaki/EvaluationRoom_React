import React from 'react';

export function CandidatoApreciacionButtonObtener (props) {
    return(
        <div>
            <button type="button" 
                className="btn btn-outline-danger btn-sm" 
                onClick={props.onClick} 
                title="Actualizar apreciación del candidato">
                <i className="fas fa-file-word"></i> Apreciación
            </button>
        </div>
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