import React, {Fragment} from 'react';
import classnames from 'classnames';
import CandidateButtonUpdate from './candidate_button_update'
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
                    {
                        (props.telephones.length > 0) ? (
                            props.telephones.map( e => { 
                            return (<strong key={e.idtelefono}>{(e.idtelefono == 1) ? (' (Cel.) ').concat(e.numero) : (' (Fijo) ').concat(e.numero)}</strong>)
                            })
                        ) : (<i> No posee número de contacto.</i>)
                    }
                </div>
            </div>
		</Fragment>
	);
}
