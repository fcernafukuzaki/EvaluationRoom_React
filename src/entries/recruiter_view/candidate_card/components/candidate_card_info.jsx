import React, {Fragment} from 'react';
import classnames from 'classnames';
import {CandidateButtonUpdate} from './candidate_button'
import {encriptarAES} from '../../../common/components/encriptar_aes';
import {getAge} from '../../../common/components/date_util'

export default function CandidateCardInfo (props) {
    var hashIdCandidato = encriptarAES(props.id.toString());
    var actualizarCandidato = (
        <CandidateButtonUpdate 
            pathname={'/registrarCandidato'}
            hashId={`?idc=${hashIdCandidato}`}
        />
    );

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
                        <div>Edad: <strong>{getAge(props.birth_date)} años</strong></div>
                    </div>
                    <div className='button-right-absolute'>
                        {actualizarCandidato}
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
