import React, {Fragment} from 'react'
import ReactDOM from 'react-dom'
import {CandidatoApreciacionButtonRegistrar} from './candidato_apreciacion_button'

function CandidatoApreciacionModal(props) {
    if(props.cerrado || Array.isArray(props.datos)) {
        return null
    }
    
    var nombreReclutador = props.datos.body.length > 0 ? props.datos.body[0].nombre : undefined
    var fechaRegistro = props.datos.body.length > 0 ? props.datos.body[0].fecha : undefined
    var apreciacion = props.datos.body.length > 0 ? props.datos.body[0].apreciacion : ''
    var idreclutador = props.idreclutador

    var telefono_movil = (props.datosCandidato.telefono_movil ? (' (Cel.) ').concat(props.datosCandidato.telefono_movil) : '');
    var telefono_fijo = (props.datosCandidato.telefono_fijo ? (' (Fijo) ').concat(props.datosCandidato.telefono_fijo) : '');
    
    return ReactDOM.createPortal(
        <Fragment>
            <div className='candidato_apreciacion_overlay'></div>
            <div className='candidato_apreciacion_modal'>
                <div className='candidato_apreciacion_modal_container'>
                    <button className='candidato_apreciacion_modal_close_button'
                        onClick={props.onClose}
                    >X</button>
                    <h5>Apreciación del candidato: {props.datosCandidato.nombre} {props.datosCandidato.apellidopaterno} {props.datosCandidato.apellidomaterno}</h5>
                    <div>Email: <strong>{props.datosCandidato.correoelectronico}</strong></div>
                    <div>Tel.: 
                        <strong>{(!telefono_movil && !telefono_fijo) ? (<i> No posee número de contacto.</i>) : telefono_movil.concat(telefono_fijo)}</strong>
                    </div>
                    <div>
                        <textarea id={props.datosCandidato.idcandidato} rows="10" cols="100" 
                                value={apreciacion} 
                                onChange={props.onChangeApreciacionCandidato.bind(this, apreciacion)} />
                    </div>
                    <div>
                        {typeof nombreReclutador != 'undefined' ? 'Última actualización: '.concat(nombreReclutador, '. Fecha: ', fechaRegistro) : ''}
                    </div>
                    <div>
                        <CandidatoApreciacionButtonRegistrar 
                            onClick={props.onGuardar.bind(this, props.datosCandidato.idcandidato, 
                                props.datosCandidato.idclient, 
                                props.datosCandidato.idjobposition, 
                                idreclutador, 
                                apreciacion)}
                        />
                    </div>
                </div>
            </div>
        </Fragment>,
        document.getElementById('home-modal')
    );
}

export default CandidatoApreciacionModal