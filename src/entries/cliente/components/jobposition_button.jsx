import React from 'react';
import Button from '../../common/components/button_link'

export function JobPositionButtonUpdate (props) {
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

export function JobPositionButtonAssignCandidates (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            state={props.state}
            buttonClass={'btn btn-dark btn-sm'}
            iconClass={'far fa-folder-open'}
            buttonTitle={'Asignar candidatos'}
            buttonLabel={'Asignar candidatos'}
        />
    );
}
