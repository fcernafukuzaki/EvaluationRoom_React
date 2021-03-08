import React, {Fragment} from 'react';
import classnames from 'classnames';

export default function CandidateCardTests (props) {
    var status = (props.psychologicaltest.fechaexamen == '1900-01-01T00:00:00') ? 'alert-danger candidate-card-test-pendiente' : 'alert-success candidate-card-test-completo';
    return (
		<Fragment>
            <div key={props.psychologicaltest.idtestpsicologico} 
                className={classnames('candidate-card-test', status)} >
                <div>{props.psychologicaltest.nombre} {(props.psychologicaltest.fechaexamen == '1900-01-01T00:00:00') ? 
                    (<i className="fas fa-exclamation-circle iconoVino" title="Pendiente"></i>) : 
                    (<i className="fas fa-check-circle iconoVerde" title="Completo"></i>)}
                </div>
                <div>
                    {props.psychologicaltest.cantidad_preguntas_respondidas}/{props.psychologicaltest.cantidad_preguntas_test}
                </div>
            </div>
		</Fragment>
	);
}
