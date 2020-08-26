import React, {Component, Fragment} from 'react';
import classnames from 'classnames';
import {CandidateButtonUpdate, CandidateButtonDownloadInform} from './candidate_button'
import {encriptarAES} from '../../../common/components/encriptar_aes';
import {getAge} from '../../../common/components/date_util'

class CandidateCardInfo extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        const {props} = this;

        var hashIdCandidato = encriptarAES(props.id.toString());
        var actualizarCandidato = (
            <CandidateButtonUpdate 
                pathname={'/registrarCandidato'}
                hashId={`?idc=${hashIdCandidato}`}
            />
        );
        
        var tieneInforme = props.psychologicaltests.map(p => {
            return (p.fechaexamen == '1900-01-01T00:00:00') ? 0 : 1;
        })
        var descargarInforme = (tieneInforme.includes(1)) ? 
            (<CandidateButtonDownloadInform 
                onClick={props.descargar_informe}
            />)
            : ''

        var telefono_movil = (props.telefono_movil ? (' (Cel.) ').concat(props.telefono_movil) : '');
        var telefono_fijo = (props.telefono_fijo ? (' (Fijo) ').concat(props.telefono_fijo) : '');
        
        return (
            <Fragment>
                <div key={props.id}>
                    <div className='candidate-info'>
                        <div className='candidate-photo'>
                            <i className="fas fa-user icono6em"></i>
                        </div>
                        <div className='candidate-info-personal'>
                            <div>Nombre: <strong>{props.name}</strong></div>
                            <div>Ap. Pat: <strong>{props.paternal_surname}</strong></div>
                            <div>Ap. Mat: <strong>{props.maternal_surname}</strong></div>
                            <div>Edad: <strong>{getAge(props.birth_date)}</strong></div>
                        </div>
                        <div className='button-right-absolute flex-column'>
                            {actualizarCandidato}
                            {descargarInforme}
                        </div>
                    </div>
                    <div>Email: <strong>{props.email_address}</strong></div>
                    <div>Tel.: 
                        <strong>{(!telefono_movil && !telefono_fijo) ? (<i> No posee número de contacto.</i>) : telefono_movil.concat(telefono_fijo)}</strong>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default (CandidateCardInfo);
