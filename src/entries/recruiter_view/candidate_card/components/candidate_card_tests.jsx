import React, {Fragment} from 'react';
import classnames from 'classnames';
import {getDateTimeWithoutTimeZone, isDatetimeFinishedExam} from '../../../common/components/date_util'

export default function CandidateCardTests (props) {
    var status = (isDatetimeFinishedExam(props.psychologicaltest.fechaexamen)) ? 'alert-danger candidate-card-test-pendiente' : 'alert-success candidate-card-test-completo';
    var datetime_finished_exam = getDateTimeWithoutTimeZone(props.psychologicaltest.fechaexamen)
    return (
		<Fragment>
            <div key={props.psychologicaltest.idtestpsicologico} 
                className={classnames('candidate-card-test', status)}
                title={"Completado".concat(" ", datetime_finished_exam)} >
                <div>{props.psychologicaltest.nombre} {(isDatetimeFinishedExam(props.psychologicaltest.fechaexamen)) ? 
                    (<i className="fas fa-exclamation-circle iconoVino" title="Pendiente"></i>) : 
                    (<Fragment><i className="fas fa-check-circle iconoVerde"></i> {}</Fragment>)}
                </div>
                <div>
                    {props.psychologicaltest.cantidad_preguntas_respondidas}/{props.psychologicaltest.cantidad_preguntas_test}
                </div>
            </div>
		</Fragment>
	);
}
