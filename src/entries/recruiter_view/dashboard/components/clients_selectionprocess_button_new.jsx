import React from 'react';
import Button from '../../../common/components/button_link'

export default function ClientsSelectionProcessButtonNew (props) {
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
