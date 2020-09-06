import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {groupBy} from '../../../common/components/groupby'
import CargandoImagen from '../../../components/common/CargandoImagen'
import MensajeError from '../../../components/common/MensajeError';
import {getSelectionProcess} from '../../../../actions/actionSelectionProcess';
import {getCandidatoApreciacion, addCandidatoApreciacion} from '../../../../actions/actionCandidatoApreciacion';
import ClientsSelectionProcessList from '../components/clients_selectionprocess_list'
import {ClientsSelectionProcessButtonNew} from '../components/clients_selectionprocess_button'
import AlertBoxMessageForm from '../../../components/common/AlertBoxMessageForm';
import {formato_idcliente_idpuestolaboral} from '../../../common/components/formato_identificador'

class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            errorMensaje: '',
            selectionProcesses: {},
            candidatesPsychologicalTest: {},
            camposBusqueda: {},
            cantidadProcesosSeleccion: 0,
            mensajeInformativo: {
				heading: '',
				body: [<p key="" className="mb-0">Actualmente existen <strong>0</strong> procesos de selección <strong>Activos</strong>.</p>],
				footer: []
            },
            datosCandidato: {},
            idcandidato_apreciacion: ''
        }

        this.getSelectionProcessByStatus.bind(this);
        this.getCandidatoApreciacionPorIdCandidato.bind(this);
        this.addCandidatoApreciacion.bind(this);
    }

    mensajeInformativo(cantidadProcesosSeleccion){
        var mensaje = (cantidadProcesosSeleccion == 1) ? (<strong>existe {cantidadProcesosSeleccion} proceso</strong>) : (<strong>existen {cantidadProcesosSeleccion} procesos</strong>)
        this.setState({
            mensajeInformativo: {
				heading: '',
				body: [<p key="" className="mb-0">Actualmente {mensaje} de selección <strong>Activos</strong>.</p>],
				footer: []
			}
        })
    }

    componentWillMount() {
        this.props.getSelectionProcess(null, null, null, this.props.token);
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevProps.selectionProcesses !== this.props.selectionProcesses) {
            //console.log(this.props.selectionProcesses[0])
            //console.log(this.props.selectionProcesses[1])
            this.setState({
                selectionProcesses: groupBy(this.props.selectionProcesses[1], 'idjobposition'),
                candidatesPsychologicalTest: groupBy(this.props.selectionProcesses[2], 'id'),
                camposBusqueda: this.props.selectionProcesses[1]
            });
            this.mensajeInformativo(this.props.selectionProcesses[0][0].cant_procesos_activos)
        }
        if (prevState.selectionProcesses !== this.state.selectionProcesses){
            this.setState({
                isLoading: Object.entries(this.state.selectionProcesses).length > 0 ? false : true
            });
            this.tableSelectionProcess()
        }
        if (prevProps.addCandidatoApreciacionResponse !== this.props.addCandidatoApreciacionResponse){
            this.setState({
                isLoading: false
            });
            this.props.getCandidatoApreciacion(this.props.token, this.props.correoelectronico, this.state.idcandidato_apreciacion, undefined, undefined)
        }
        if (prevProps.errorResponse !== this.props.errorResponse) {
            console.log('E', this.props.errorResponse)
            if(409 == this.props.errorResponse.status){
                console.log('Error')
            } else {
				this.setState({
					isLoading: false,
					errorMensaje: {status: this.props.errorResponse.status, mensaje: this.props.errorResponse.message}
				})
			}
        }
    }

    getSelectionProcessByStatus(process_status){
        this.setState({
            isLoading: true,
            //errorMensaje: {status: this.props.errorResponse.status, mensaje: this.props.errorResponse.message}
        })
        this.props.getSelectionProcess(null, null, process_status, this.props.token);
    }

    getCandidatoApreciacionPorIdCandidato(idcandidato, candidato){
        this.setState({
            datosCandidato: candidato
        })
        this.props.getCandidatoApreciacion(this.props.token, this.props.correoelectronico, idcandidato, undefined, undefined)
    }

    addCandidatoApreciacion(idcandidato, idcliente, idpuestolaboral, idreclutador, apreciacion){
        this.setState({
            isLoading: true,
            idcandidato_apreciacion: idcandidato
        });
        var idcliente_idpuestolaboral = formato_idcliente_idpuestolaboral(idcliente, idpuestolaboral)
        this.props.addCandidatoApreciacion(this.props.token, this.props.correoelectronico, idcandidato, idcliente_idpuestolaboral, idcliente, idpuestolaboral, idreclutador, apreciacion)
    }

    tableSelectionProcess() {
        return (<Fragment>
                    <AlertBoxMessageForm 
                        alertMessageHeading={this.state.mensajeInformativo.heading} 
                        alertMessageBody={this.state.mensajeInformativo.body} 
                        alertMessageFooter={this.state.mensajeInformativo.footer} 
                    />
                    <div className="dashboard-button">
                        <ClientsSelectionProcessButtonNew 
                            pathname={'/selectionprocess'}
                            hashId={``}
                        />
                    </div>
                    <ClientsSelectionProcessList 
                        datos={this.state.selectionProcesses}
                        datosCandidatos={this.state.candidatesPsychologicalTest}
                        camposBusqueda={this.state.camposBusqueda}
                        funcGetByStatus={this.getSelectionProcessByStatus.bind(this)}
                        getCandidatoApreciacionPorIdCandidato={this.getCandidatoApreciacionPorIdCandidato.bind(this)}
                        addCandidatoApreciacion={this.addCandidatoApreciacion.bind(this)}
                        candidatoApreciacion={this.props.candidatoApreciacionResponse}
                        glosaModalDatosCandidato={this.state.datosCandidato}
                        idreclutador={this.props.idusuario}
                    />
                </Fragment>)
    }
    render() {
        const {isLoading, errorMensaje} = this.state
        return (
            <Fragment>
                {Object.entries(this.state.selectionProcesses).length > 0 ? this.tableSelectionProcess() : ''}
                {isLoading && (<CargandoImagen />)}
                {errorMensaje != '' && <MensajeError error={errorMensaje} />}
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return{
        selectionProcesses : state.reducerSelectionProcess.getSelectionProcessResponse,
        candidatoApreciacionResponse: state.reducerCandidatoApreciacion.getCandidatoApreciacionResponse,
        addCandidatoApreciacionResponse: state.reducerCandidatoApreciacion.addCandidatoApreciacionResponse,
        errorResponse : state.reducerSelectionProcess.errorResponse
    }
}

export default connect(mapStateToProps, {getSelectionProcess, getCandidatoApreciacion, addCandidatoApreciacion})(DashBoard);