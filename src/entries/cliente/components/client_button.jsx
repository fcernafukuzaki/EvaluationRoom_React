import React from 'react';
import Button from '../../common/components/button_link'

export function ClientButtonAdd (props) {
    return(
        <Button 
            pathname={props.pathname}
            buttonClass={'btn btn-primary'}
            buttonTitle={'Nuevo cliente'}
            buttonLabel={'Nuevo cliente'}
        />
    );
}

export function ClientButtonUpdate (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={'btn btn-outline-secondary btn-sm'}
            iconClass={'far fa-edit'}
            buttonTitle={'Actualizar datos'}
            buttonLabel={'Actualizar'}
        />
    );
}

export function ClientButtonAssignJobPosition (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            state={props.state}
            buttonClass={'btn btn-dark btn-sm'}
            iconClass={'far fa-folder-open'}
            buttonTitle={'Asignar puestos laborales'}
            buttonLabel={'Asignar puestos laborales'}
        />
    );
}

export function ClientButtonAssignMoreJobPosition (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            state={props.state}
            buttonClass={'btn btn-dark btn-sm'}
            iconClass={'far fa-folder-open'}
            buttonTitle={'Asignar más puestos laborales'}
            buttonLabel={'Asignar más puestos laborales'}
        />
    );
}