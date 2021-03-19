import React from 'react';

export function CandidatoResetTestButtonSave(props) {
    return(
        <button type="button" 
            className="btn btn-outline-danger btn-sm" 
            onClick={props.onClick} 
            title="Resetear">
            <i className="fas fa-share"></i> Resetear
        </button>
    );
}