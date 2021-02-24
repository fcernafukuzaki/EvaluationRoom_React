import React, {Component, Fragment} from 'react'
import ModalError from '../../../common/components/modal'
//import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {SoporteTecnicoNotificacionButtonRegistrar} from '../components/soportetecnico_notificacion_boton'

class SoporteTecnicoNotificacionModal extends Component {
	constructor(props){
        super(props);

        this.state = {
            apreciacionCandidatoTexto: '',
            datosCandidatosApreciacion: []
        }

        this.onChangeDetalleError = this.onChangeDetalleError.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.datosCandidatosApreciacion !== this.props.datosCandidatosApreciacion){
            this.setState({
                datosCandidatosApreciacion: this.props.datosCandidatosApreciacion
            })
        }
    }

    actualizarApreciacion(mensajeError){
        this.setState({
            mensajeError: mensajeError
        });
    }

    onChangeDetalleError(e){
        this.actualizarApreciacion(e.target.value)
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    textarea(detalle){
        const placeholder = 'Colocar aquí el error a notificar.'
        return (
            <textarea id='text-area-error' 
                    name='text-area-error'
                    rows="10" cols="100" 
                    value={detalle} 
                    placeholder={placeholder}
                    onChange={this.onChangeDetalleError.bind(this)} />
        );
    }

    render () {
        const {props, state} = this
        const {tipoConsulta, idreclutador} = this.props
        
        if(!props.cerrado) {
            return null
        }
        
        //if (tipoConsulta == 'elemento' || tipoConsulta == 'sin_asignacion') {
        if(true){
            const {onGuardar, guardado} = this.props
            return (
                <Fragment>
                    <ModalError onClose={props.onClose}>
                        <h5>Notificar error: </h5>
                        <div>Email: <strong>{datosCandidato.correoelectronico}</strong></div>
                        <div className="mt-4 mb-2">
                            {this.textarea(detalle)}
                        </div>
                        <div className="form-group">
                            <div className="alert alert-secondary">
                                <SoporteTecnicoNotificacionButtonRegistrar 
                                    onClick={onGuardar.bind(this, 'elemento', datosCandidato.correoelectronico, 
                                        observacion, 
                                        detalle)}
                                />
                            </div>
                        </div>
                    </ModalError>
                    <MensajeGuardarExitoso cargando={guardado} mensaje={"¡Se envió error exitosamente!"} />
                </Fragment>
            );
        }
    }
    
}

export default SoporteTecnicoNotificacionModal