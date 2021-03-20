import React, {Component, Fragment} from 'react'
import Modal from '../../../common/components/modal'
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {CandidatoResetTestButtonSave} from './candidate_reset_test_button'
import {isDatetimeFinishedExam, getDateTimeWithoutTimeZone} from '../../../common/components/date_util'
import Table from '../../../components/common/Table'
import ConfirmationModal from '../../../components/common/ConfirmationModal'

class CandidatoResetTestsModal extends Component {
	constructor(props){
        super(props);

        this.state = {
            isOpenConfirmationModal: false,
            idCandidate: null,
            candidateName: null,
            idPsychologicalTest: null,
            psychologicalTestName: null
        }

        this.handleCloseConfirmationModal = this.handleCloseConfirmationModal.bind(this)
    }

    handleOpenConfirmationModal(idCandidate, candidateName, idPsychologicalTest, psychologicalTestName){
        this.setState({
            isOpenConfirmationModal: true,
            idCandidate: idCandidate,
            candidateName: candidateName,
            idPsychologicalTest: idPsychologicalTest,
            psychologicalTestName: psychologicalTestName
        })
    }

    onClickResetExam(idCandidate, idPsychologicalTest){
        this.props.handleResetCandidateTest(idCandidate, idPsychologicalTest)
        //this.cleanValuesConfirmationModal()
    }

    cleanValuesConfirmationModal(){
        this.setState({
            idCandidate: null,
            candidateName: null,
            idPsychologicalTest: null,
            psychologicalTestName: null
        })
    }

    handleCloseConfirmationModal(){
        this.setState({
            isOpenConfirmationModal: false
        })
        this.cleanValuesConfirmationModal()
        this.props.handleCloseConfirmationModal()
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
                                onClick={this.handleOpenConfirmationModal.bind(this, row.idcandidato, this.props.candidate.nombre_completo, row.idtestpsicologico, row.nombre)}
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
        const {closed, onClose, candidate, candidatePsychologicalTestList, saved, savedError} = this.props
        const {isOpenConfirmationModal, idCandidate, candidateName, idPsychologicalTest, psychologicalTestName} = this.state

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
                {isOpenConfirmationModal && 
                    <ConfirmationModal 
                        onClose={this.handleCloseConfirmationModal.bind(this)}
                        classNameOverlay={'confirmationmodal-overlay'}
                        classNameModal={'confirmationmodal-modal'}
                        classNameContainer={'confirmationmodal-container'}
                    >
                        <Fragment>
                            <div className="confirmationmodal-modal-content">
                            {saved && !savedError ? 
                                <MensajeGuardarExitoso 
                                    cargando={saved} 
                                    classNameOcultarMensaje={saved} 
                                    mensaje={"¡Se reseteó el test exitosamente!"} />
                                :
                                <Fragment>
                                    <div>
                                        <strong>¿Está seguro de resetear el test <u><i>{psychologicalTestName}</i></u> del candidato <u><i>{candidateName}</i></u>?</strong>
                                    </div>
                                    <div className="mt-3">
                                        <CandidatoResetTestButtonSave 
                                            onClick={this.onClickResetExam.bind(this, idCandidate, idPsychologicalTest)}
                                        />
                                    </div>
                                </Fragment>
                            }
                            </div>
                        </Fragment>
                    </ConfirmationModal>
                }
            </Fragment>
        );
    }
}

export default CandidatoResetTestsModal