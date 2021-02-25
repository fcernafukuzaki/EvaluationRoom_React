import React, {Component, Fragment} from 'react'
import ModalError from '../../../common/components/modal_error'
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {SoporteTecnicoNotificacionButtonRegistrar} from '../components/soportetecnico_notificacion_boton'
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
//import MenuItem from '@material-ui/core/MenuItem';
//import Select from '@material-ui/core/Select';
//import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
//import Formulario from '../../../common/components/formulario/formulario'

class SoporteTecnicoNotificacionModal extends Component {
	constructor(props){
        super(props);

        this.state = {
            listaObservaciones: [],
            tipoErrorSeleccionado: 3,
            correoElectronico: '',
            observacion: '',
            mensajeError: ''
        }

        this.onChangeDetalleError = this.onChangeDetalleError.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.limpiarModalForm !== this.props.limpiarModalForm){
            this.setState({
                tipoErrorSeleccionado: 3,
                correoElectronico: '',
                observacion: '',
                mensajeError: ''
            })
        }
        if(prevProps.listaObservaciones !== this.props.listaObservaciones){
            let rows = []
            this.props.listaObservaciones.map(e => {
                //rows.push(<MenuItem key={e.value} value={e.value}>{e.label}</MenuItem>)
                rows.push(<FormControlLabel key={e.value} 
                    value={e.value} 
                    control={<Radio color="default" />} 
                    label={e.label} />)
            })

            this.setState({
                listaObservaciones: rows,
                observacion: this.props.listaObservaciones.filter(e => e.value == this.state.tipoErrorSeleccionado)[0].label
            })
        }
        if(prevProps.correoElectronico !== this.props.correoElectronico){
            this.setState({
                correoElectronico: this.props.correoElectronico
            })
        }
    }

    onChangeDetalleError(e){
        this.setState({
            mensajeError: e.target.value
        });
    }

    textarea(detalle){
        const placeholder = 'Colocar aquí el detalle del error a notificar (opcional).'
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
        console.log(value)
        this.setState({
            tipoErrorSeleccionado: parseInt(value),
            observacion: this.props.listaObservaciones.filter(e => e.value == value)[0].label
        })
    }

    onChangeTextField(valor){
        this.setState({
            correoElectronico: valor
        })
    }

    render () {
        const {cerrado, onGuardar, guardado, onClose, errors} = this.props
        const {listaObservaciones, tipoErrorSeleccionado, correoElectronico, observacion, mensajeError} = this.state
        
        if(cerrado) {
            return null
        } else {
            return (
                <Fragment>
                    <ModalError onClose={onClose}>
                        <form className="form" autoComplete="off">
                            {guardado &&
                                (<Fragment>
                                    <div className='mt-5'></div>
                                    <MensajeGuardarExitoso 
                                        cargando={guardado} 
                                        classNameOcultarMensaje={guardado} 
                                        mensaje={"¡Se envió notificación exitosamente!"} />
                                </Fragment>)
                            }
                            {!guardado && (
                                <Fragment>
                                    <h5>Notificar error </h5>
                                    <div className='mt-4'>
                                        {/*
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
                                        </FormControl>*/}
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Tipo de error a notificar: </FormLabel>
                                            <RadioGroup aria-label="radio-tipo-error" 
                                                name="radio-tipo-error1" 
                                                value={tipoErrorSeleccionado} 
                                                onChange={(event) => {
                                                    this.onChange(event.target.value);
                                                }}>
                                                {listaObservaciones}
                                            </RadioGroup>
                                            <FormHelperText>{errors.observacion}</FormHelperText>
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
                                            <FormHelperText>{errors.correoElectronico}</FormHelperText>
                                        </FormControl>
                                    </div>
                                    <div className="mt-4 mb-2">
                                        {this.textarea(mensajeError)}
                                    </div>
                                    <div className="form-group">
                                        <div className="alert alert-secondary">
                                            <SoporteTecnicoNotificacionButtonRegistrar 
                                                onClick={onGuardar.bind(this, correoElectronico, 
                                                    observacion, 
                                                    mensajeError)}
                                            />
                                        </div>
                                    </div>
                                </Fragment>
                            )}
                        </form>
                    </ModalError>
                </Fragment>
            );
        }
    }
}

export default SoporteTecnicoNotificacionModal