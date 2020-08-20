import React from 'react';
import Button from '../../../common/components/button_link'

export function CandidateButtonUpdate (props) {
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

export function CandidateButtonResults (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={'btn btn-info btn-sm'}
            iconClass={'fas fa-chart-pie'}
            buttonTitle={'Ver resultados'}
            buttonLabel={'Resultados'}
        />
    );
}

export function CandidateButtonDatos (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={'btn btn-info btn-sm'}
            iconClass={'fas fa-chart-pie'}
            buttonTitle={'Ver datos'}
            buttonLabel={'Ver datos'}
        />
    );
}

export function CandidateButtonExam (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={'btn btn-dark btn-sm'}
            iconClass={'fas fa-door-closed'}
            buttonTitle={'Sala de evaluación'}
            buttonLabel={'Evaluación'}
        />
    );
}

export function CandidateButtonDownloadInform(props) {
    return (
        <button type="button" 
            className="btn btn-outline-success btn-sm" 
            onClick={props.onClick} 
            title="Descargar informe">
            <i className="fas fa-file-word"></i> Informe
        </button>)
}
