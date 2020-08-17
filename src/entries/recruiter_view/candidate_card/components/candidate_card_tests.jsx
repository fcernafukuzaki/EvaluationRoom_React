import React, {Fragment} from 'react';
import classnames from 'classnames';

export default function CandidateCardTests (props) {
    var status = (props.psychologicaltest.fechaexamen == '1900-01-01T00:00:00') ? 'alert-danger candidate-card-test-pendiente' : 'alert-success candidate-card-test-completo';
    return (
		<Fragment>
            <div key={props.psychologicaltest.idtestpsicologico} 
                className={classnames('candidate-card-test', status)} >
                <div>{props.psychologicaltest.nombre}</div>
                <div>
                    {(props.psychologicaltest.fechaexamen == '1900-01-01T00:00:00') ? '(Pendiente)' : '(Completo)'}
                </div>
            </div>
		</Fragment>
	);
}
