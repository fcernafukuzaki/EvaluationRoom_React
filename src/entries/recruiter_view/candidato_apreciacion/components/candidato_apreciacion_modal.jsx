import React, {Component, Fragment} from 'react'
import ReactDOM from 'react-dom'
import Modal from '../../../common/components/modal'
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {CandidatoApreciacionButtonRegistrar} from './candidato_apreciacion_button'
import {formato_idcliente_idpuestolaboral} from '../../../common/components/formato_identificador'

class CandidatoApreciacionModal extends Component {
	constructor(props){
        super(props);

        this.state = {
            apreciacionCandidatoTexto: '',
            datosCandidatosApreciacion: []
        }

        this.onChangeApreciacionCandidato = this.onChangeApreciacionCandidato.bind(this)
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.datosCandidatosApreciacion !== this.props.datosCandidatosApreciacion){
            this.setState({
                datosCandidatosApreciacion: this.props.datosCandidatosApreciacion
            })
        }
    }

    actualizarApreciacion(apreciacion, idcandidato, idclient, idjobposition){
        let datosCandidatosApreciacionBody = this.state.datosCandidatosApreciacion.body
        
        // Se identifica si existe registro con los datos enviados
        let existe = datosCandidatosApreciacionBody.filter(c => 
            c.idcandidato == idcandidato && c.idcliente == idclient && c.idpuestolaboral == idjobposition
        )[0]
        //console.log(existe)
        if (typeof existe != 'undefined'){
            datosCandidatosApreciacionBody.map(c => {
                if(c.idcandidato == idcandidato && c.idcliente == idclient && c.idpuestolaboral == idjobposition){
                    c.apreciacion = apreciacion
                }
            })
        } else {
            datosCandidatosApreciacionBody.push({
                apreciacion: apreciacion,
                idcandidato: parseInt(idcandidato),
                idcliente: parseInt(idclient),
                idcliente_idpuestolaboral: formato_idcliente_idpuestolaboral(idclient, idjobposition),
                idpuestolaboral: parseInt(idjobposition),
                idreclutador: this.props.idreclutador
            })
        }
        //console.log('datosCandidatosApreciacionBody actualizado', datosCandidatosApreciacionBody)
        
        let stateDatosCandidatosApreciacion = this.state.datosCandidatosApreciacion
        stateDatosCandidatosApreciacion.body = datosCandidatosApreciacionBody
        
        this.setState({
            datosCandidatosApreciacion: stateDatosCandidatosApreciacion
        });
    }

    onChangeApreciacionCandidato(e){
        var array = e.target.name.split('_')
        this.actualizarApreciacion(e.target.value, array[0], array[1], array[2])

        this.setState({
            [e.target.name]: e.target.value
        });
    }

    textarea(datos_candidato, apreciacion){
        const placeholder = 'Colocar aquí la apreciación del candidato ' + datos_candidato.nombre + ' luego de la entrevista laboral'
        return (
            <textarea id={datos_candidato.idcandidato.toString().concat('_', datos_candidato.idclient, '_', datos_candidato.idjobposition)} 
                    name={datos_candidato.idcandidato.toString().concat('_', datos_candidato.idclient, '_', datos_candidato.idjobposition)} 
                    rows="10" cols="100" 
                    value={apreciacion} 
                    placeholder={placeholder}
                    onChange={this.onChangeApreciacionCandidato.bind(this)} />
        );
    }

    render () {
        const {props, state} = this
        const {tipoConsulta, idreclutador} = this.props
        
        if(props.cerrado || Array.isArray(state.datosCandidatosApreciacion)) {
            return null
        }
        
        if (tipoConsulta == 'elemento') {
            const {datosCandidatosApreciacion} = this.state
            const {datosCandidato} = this.props

            var nombreReclutador = datosCandidatosApreciacion.body.length > 0 ? datosCandidatosApreciacion.body[0].nombre : undefined
            var fechaRegistro = datosCandidatosApreciacion.body.length > 0 ? datosCandidatosApreciacion.body[0].fecha : undefined
            var apreciacion = datosCandidatosApreciacion.body.length > 0 ? datosCandidatosApreciacion.body[0].apreciacion : ''
            
            if(datosCandidatosApreciacion.body.length > 1){
                const datos_candidato_filtrado = datosCandidatosApreciacion.body.filter(c => 
                    c.idcliente == datosCandidato.idclient && 
                    c.idpuestolaboral == datosCandidato.idjobposition
                )[0]
                
                if(typeof datos_candidato_filtrado != 'undefined'){
                    nombreReclutador = datos_candidato_filtrado.nombre
                    fechaRegistro = datos_candidato_filtrado.fecha
                    apreciacion = datos_candidato_filtrado.apreciacion
                }
            }

            var telefono_movil = (datosCandidato.telefono_movil ? (' (Cel.) ').concat(datosCandidato.telefono_movil) : '');
            var telefono_fijo = (datosCandidato.telefono_fijo ? (' (Fijo) ').concat(datosCandidato.telefono_fijo) : '');
            
            return (
                <Fragment>
                    <Modal onClose={props.onClose}>
                        <h5>Apreciación del candidato: {datosCandidato.nombre} {datosCandidato.apellidopaterno} {datosCandidato.apellidomaterno}</h5>
                        <div>Email: <strong>{datosCandidato.correoelectronico}</strong></div>
                        <div>Tel.: 
                            <strong>{(!telefono_movil && !telefono_fijo) ? (<i> No posee número de contacto.</i>) : telefono_movil.concat(telefono_fijo)}</strong>
                        </div>
                        <div className="mt-4 mb-2">
                            {this.textarea(datosCandidato, apreciacion)}
                        </div>
                        <div className="mt-1 mb-3">
                            {typeof nombreReclutador != 'undefined' ? 'Última actualización: '.concat(nombreReclutador, '. Fecha: ', fechaRegistro) : ''}
                        </div>
                        <div className="form-group">
                            <div className="alert alert-secondary">
                                <CandidatoApreciacionButtonRegistrar 
                                    onClick={props.onGuardar.bind(this, 'elemento', props.datosCandidato.idcandidato, 
                                        props.datosCandidato.idclient, 
                                        props.datosCandidato.idjobposition, 
                                        idreclutador, 
                                        apreciacion)}
                                />
                            </div>
                        </div>
                    </Modal>
                    <MensajeGuardarExitoso cargando={props.guardado} mensaje={"Se guardó exitosamente!"} />
                </Fragment>
            );
        } else {
            var contenido = (
                props.datosCandidato.map((datos_candidato, index) => {
                    //console.log('lista datos_candidato', datos_candidato.idcandidato)
                    const datosCandidatoApreciacion = state.datosCandidatosApreciacion.body.filter(c => 
                        c.idcandidato == datos_candidato.idcandidato &&
                        c.idcliente == datos_candidato.idclient &&
                        c.idpuestolaboral == datos_candidato.idjobposition
                    )[0]
                    //console.log(datosCandidatoApreciacion)
                    var nombreReclutador = typeof datosCandidatoApreciacion != 'undefined' ? datosCandidatoApreciacion.nombre : undefined
                    var fechaRegistro = typeof datosCandidatoApreciacion != 'undefined' ? datosCandidatoApreciacion.fecha : undefined
                    var apreciacion = typeof datosCandidatoApreciacion != 'undefined' ? datosCandidatoApreciacion.apreciacion : ''
                    
                    var telefono_movil = (datos_candidato.telefono_movil ? (' (Cel.) ').concat(datos_candidato.telefono_movil) : '');
                    var telefono_fijo = (datos_candidato.telefono_fijo ? (' (Fijo) ').concat(datos_candidato.telefono_fijo) : '');
                    
                    return (
                        <Fragment key={index}>
                            <div className='candidatos_apreciacion_modal_contenido_lista'>
                                <div className="mr-3 candidatos_apreciacion_modal_contenido_lista_datos">
                                    <h6>{datos_candidato.nombre} {datos_candidato.apellidopaterno} {datos_candidato.apellidomaterno}</h6>
                                    <div>Email: <strong>{datos_candidato.correoelectronico}</strong></div>
                                    <div>Tel.: 
                                        <strong>{(!telefono_movil && !telefono_fijo) ? (<i> No posee número de contacto.</i>) : telefono_movil.concat(telefono_fijo)}</strong>
                                    </div>
                                </div>
                                <div className="mr-2">
                                    <div className="mt-0 mb-0">
                                        {this.textarea(datos_candidato, apreciacion)}
                                    </div>
                                    <div className="mt-0 mb-3">
                                        {typeof nombreReclutador != 'undefined' ? 'Última actualización: '.concat(nombreReclutador, '. Fecha: ', fechaRegistro) : ''}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="alert alert-secondary">
                                        <CandidatoApreciacionButtonRegistrar 
                                            onClick={props.onGuardar.bind(this, 'lista', datos_candidato.idcandidato, 
                                                datos_candidato.idclient, 
                                                datos_candidato.idjobposition, 
                                                idreclutador, 
                                                apreciacion)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Fragment>
                    );
                })
            )
            return (
                <Fragment>
                    <Modal onClose={props.onClose}>
                        <h5>{props.datosCandidato[0].client_name} | {props.datosCandidato[0].jobposition_name}</h5>
                        <h6>Apreciación de candidatos:</h6>
                        {contenido}
                    </Modal>
                    <MensajeGuardarExitoso cargando={props.guardado} mensaje={"Se guardó exitosamente!"} />
                </Fragment>
            )
        }
    }
    
}

export default CandidatoApreciacionModal