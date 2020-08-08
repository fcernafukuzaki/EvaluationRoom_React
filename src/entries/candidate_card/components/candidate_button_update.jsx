import React from 'react';
import Button from '../../common/components/button_link'

export default function CandidateButtonUpdate (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={props.buttonClass}
            buttonTitle={props.buttonTitle}
            buttonLabel={props.buttonLabel}
        />
    );
}
