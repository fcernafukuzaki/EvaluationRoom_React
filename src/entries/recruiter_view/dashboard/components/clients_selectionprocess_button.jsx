import React from 'react';
import Button from '../../../common/components/button_link'

export function ClientsSelectionProcessButtonNew (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={'btn btn-outline-secondary btn-sm'}
            iconClass={'far fa-edit'}
            buttonTitle={'Registrar datos de nuevo proceso de selección'}
            buttonLabel={'Nuevo proceso de selección'}
        />
    );
}

export function ClientsSelectionProcessButtonUpdate (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={'btn btn-outline-secondary btn-sm'}
            iconClass={'far fa-edit'}
            buttonTitle={'Actualizar datos de proceso de selección'}
            buttonLabel={'Actualizar'}
        />
    );
}

export function ClientsSelectionProcessApreciacionCandidatosButtonUpdate (props) {
    return(
        <button type="button" 
            className="btn btn-outline-danger btn-sm" 
            onClick={props.onClick} 
            title="Apreciación de los candidatos">
            <i className="fas fa-file-word"></i> Apreciación
        </button>
    );
}