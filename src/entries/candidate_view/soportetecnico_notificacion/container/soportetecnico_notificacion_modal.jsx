import React, {Component, Fragment} from 'react'
import ModalError from '../../../common/components/modal_error'
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {SoporteTecnicoNotificacionButtonRegistrar} from '../components/soportetecnico_notificacion_boton'
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
//import Formulario from '../../../common/components/formulario/formulario'

class SoporteTecnicoNotificacionModal extends Component {
	constructor(props){
        super(props);

        this.state = {
            apreciacionCandidatoTexto: '',
            listaObservaciones: [],
            tipoErrorSeleccionado: '',
            correoElectronico: null,
            observacion: null,
            detalle: null
        }

        this.onChangeDetalleError = this.onChangeDetalleError.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.listaObservaciones !== this.props.listaObservaciones){
            let rows = []
            this.props.listaObservaciones.map(e => {
                rows.push(<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)
            })

            this.setState({
                listaObservaciones: rows
            })
        }
        if(prevProps.correoElectronico !== this.props.correoElectronico){
            this.setState({
                correoElectronico: this.props.correoElectronico
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
        console.log(e)
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

    onChange(value){
        this.setState({
            tipoErrorSeleccionado: value,
            observacion: this.props.listaObservaciones.filter(e => e.value == value)[0].label
        })
    }

    onChangeTextField(valor){
        this.setState({
            correoElectronico: valor
        })
    }

    render () {
        const {cerrado, onGuardar, guardado, onClose, correoElectronico} = this.props
        const {listaObservaciones, tipoErrorSeleccionado, observacion, detalle} = this.state
        
        if(cerrado) {
            return null
        } else {
            return (
                <Fragment>
                    <ModalError onClose={onClose}>
                        
                        <form className="form" autoComplete="off">
                            <h5>Notificar error </h5>
                            <FormControl key='select-mensajes-error' className='col-md-8'>
                                <InputLabel id="demo-simple-select-helper-label">Seleccione tipo de error a notificar</InputLabel>
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

                            
                            <FormControl key={'correoElectronico'} 
                                className={'col-md-8'} 
                                error={true}>
                                <TextField 
                                    //error={typeof c.error !== 'undefined' ? true : false}
                                    //id={typeof c.error !== 'undefined' ? 'standard-error' : "filled-basic"}
                                    label={'Email: '}
                                    type={'text-linea'}
                                    defaultValue={this.state.correoElectronico}
                                    style={{ width: 450 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={(event) => {
                                        this.onChangeTextField(event.target.value);
                                    }}
                                />
                                
                            </FormControl>

                            <div className="mt-4 mb-2">
                                {this.textarea(this.state.mensajeError)}
                            </div>
                            <div className="form-group">
                                <div className="alert alert-secondary">
                                    <SoporteTecnicoNotificacionButtonRegistrar 
                                        onClick={onGuardar.bind(this, this.state.correoElectronico, 
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