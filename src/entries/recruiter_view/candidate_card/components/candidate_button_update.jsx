import React from 'react';
import Button from '../../../common/components/button_link'

export default function CandidateButtonUpdate (props) {
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
