import React, {Component, Fragment} from 'react'
import ModalError from '../../../common/components/modal_error'
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {SoporteTecnicoNotificacionButtonRegistrar} from '../components/soportetecnico_notificacion_boton'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

class SoporteTecnicoNotificacionModal extends Component {
	constructor(props){
        super(props);

        this.state = {
            apreciacionCandidatoTexto: '',
            listaObservaciones: [],
            tipoErrorSeleccionado: ''
        }

        this.onChangeDetalleError = this.onChangeDetalleError.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.listaObservaciones !== this.props.listaObservaciones){
            let rows = []
            this.props.listaObservaciones.map(e => {
                rows.push(<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)
            })

            this.setState({
                listaObservaciones: rows
            })
        }
    }

    actualizarMensajeDetalleError(mensajeError){
        console.log('actualizarMensajeDetalleError', mensajeError)
        this.setState({
            mensajeError: mensajeError
        });
    }

    onChangeDetalleError(e){
        this.actualizarMensajeDetalleError(e.target.value)
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

    onChange(valor){
        this.setState({
            tipoErrorSeleccionado: valor
        })
    }

    render () {
        const {cerrado, onGuardar, guardado, onClose, correoElectronico, observacion, detalle} = this.props
        const {listaObservaciones, tipoErrorSeleccionado} = this.state
        
        if(cerrado) {
            return null
        }
        console.log(this.props)
        //if (tipoConsulta == 'elemento' || tipoConsulta == 'sin_asignacion') {
        if(true){
            return (
                <Fragment>
                    <ModalError onClose={onClose}>
                        <form className="form" autoComplete="off">
                            <h5>Notificar error </h5>
                            <FormControl key='select-mensajes-error' className='col-md-8'>
                            <InputLabel id="demo-simple-select-helper-label">Tipo de error a notificar</InputLabel>
                            <Select
                                labelId="demo-simple-select-helper-label"
                                id="demo-simple-select-helper"
                                value={tipoErrorSeleccionado}
                                onChange={(event) => {
                                    this.onChange(event.target.value);
                                }}
                            >
                                {listaObservaciones}
                            </Select>
                            </FormControl>
                            <div>Email: <strong>{correoElectronico}</strong></div>
                            <div className="mt-4 mb-2">
                                {this.textarea(detalle)}
                            </div>
                            <div className="form-group">
                                <div className="alert alert-secondary">
                                    <SoporteTecnicoNotificacionButtonRegistrar 
                                        onClick={onGuardar.bind(this, correoElectronico, 
                                            observacion, 
                                            detalle)}
                                    />
                                </div>
                            </div>
                        </form>
                    </ModalError>
                    <MensajeGuardarExitoso cargando={guardado} mensaje={"¡Se envió error exitosamente!"} />
                </Fragment>
            );
        }
    }
}

export default SoporteTecnicoNotificacionModal