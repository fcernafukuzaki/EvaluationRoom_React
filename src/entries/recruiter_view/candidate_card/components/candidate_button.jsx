import React from 'react';
import Button from '../../../common/components/button_link'
import {getDateTimeWithoutTimeZone} from '../../../common/components/date_util'

export function CandidateButtonUpdate (props) {
    return(
        <Button 
            pathname={props.pathname}
            hashId={props.hashId}
            buttonClass={'btn btn-outline-secondary btn-sm button-candidate-width'}
            iconClass={'far fa-edit'}
            buttonTitle={'Actualizar datos'}
            buttonLabel={''}
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
        <div>
            <button type="button" 
                className="btn btn-outline-success btn-sm button-candidate-width" 
                onClick={props.onClick} 
                title="Descargar informe">
                <i className="fas fa-file-word"></i>
            </button>
        </div>)
}

export function CandidateButtonInformation(props) {
    var informacion = props.fechaRegistro != null ? 
                    "Se registró el".concat(getDateTimeWithoutTimeZone(props.fechaRegistro))
                    : ""
    return (
        <div>
            <button type="button" 
                className="btn btn-info btn-sm button-candidate-width" 
                title={informacion}>
                <i class="fas fa-info-circle"></i>
            </button>
        </div>)
}