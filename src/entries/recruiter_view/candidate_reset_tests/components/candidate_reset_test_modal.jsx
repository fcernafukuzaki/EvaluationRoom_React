import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import Modal from '../../../common/components/modal'
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {CandidatoResetTestButtonSave} from './candidate_reset_test_button'
import {isDatetimeFinishedExam, getDateTimeWithoutTimeZone} from '../../../common/components/date_util'
import Table from '../../../components/common/Table'

class CandidatoResetTestsModal extends Component {
	constructor(props){
        super(props);
    }

    onClickResetExam(idCandidate, idPsychologicalTest){
        console.log('onClickResetExam', idCandidate, idPsychologicalTest)
    }

    generarTabla(candidatePsychologicalTestList){
        let rows = []
        if(candidatePsychologicalTestList != null){
            candidatePsychologicalTestList.map((row) => {
                rows.push(
                    <tr key={('').concat(row.nombre)}>
                        <td>{row.nombre}</td>
                        <td className="status-psychologicaltest-td">{isDatetimeFinishedExam(row.fechaexamen) ? 
                                (<span className="badge badge-danger status-psychologicaltest-text">{"Pendiente"}</span>) : 
                                (<span className="badge badge-success status-psychologicaltest-text">
                                    {"Completado".concat(" ", getDateTimeWithoutTimeZone(row.fechaexamen))}
                                    </span>)
                            }
                        </td>
                        <td className="text-center">{row.cantidad_preguntas_respondidas}/{row.cantidad_preguntas_test}</td>
                        <td>{!isDatetimeFinishedExam(row.fechaexamen) || row.cantidad_preguntas_respondidas > 0 ? 
                            (<CandidatoResetTestButtonSave 
                                onClick={this.onClickResetExam.bind(this, row.idcandidato, row.idtestpsicologico)}
                            />) : ''}
                        </td>
                    </tr>
                )
            })
        } else {
            rows.push(<tr><td>Cargando</td></tr>)
        }
        return (rows)
    }

    render () {
        const {closed, onClose, candidatePsychologicalTestList, onGuardar, guardado} = this.props
        if(closed) {
            return null
        }
        
        var htmlHeaderListCandidatePsychologicalTestList = [{
                key: 'Prueba',
                nombre: 'Prueba'
            },{
                key: 'Estado',
                nombre: 'Estado'
            },{
                key: 'Preguntas',
                nombre: 'Preguntas'
            },{
                key: 'Accion',
                nombre: 'Acción'
        }]

        var htmlBodyListCandidatePsychologicalTestList = this.generarTabla(candidatePsychologicalTestList)
        
        return (
            <Fragment>
                <Modal onClose={onClose}>
                    <h5>Resetear pruebas del candidato: </h5>
                    <div className="mt-4 mb-2">
                        <Table tableHead={htmlHeaderListCandidatePsychologicalTestList} 
                            tableBody={htmlBodyListCandidatePsychologicalTestList} />
                    </div>
                </Modal>
                <MensajeGuardarExitoso cargando={guardado} mensaje={"Se reseteó el test exitosamente!"} />
            </Fragment>
        );
    }
}

export default CandidatoResetTestsModal