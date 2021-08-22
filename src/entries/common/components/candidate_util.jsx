import {encriptarAES} from './encriptar_aes';
import {getDateTimeWithoutTimeZone} from './date_util'

export function getURLTests(value){
    /**
     * Encripta el valor y se contactena para formar la URL de las pruebas.
     */
    var value_encrypted = encriptarAES(value.toString());
	return ('/pages/examen.html?id=').concat(value_encrypted);
}

export function getMessageCandidateInfo(self_registration, registered_date){
    /**
     * Mostrar mensaje si el candidato fue registrado o lo registraron.
     * Se complementa mensaje con la fecha de registro en caso de encontrarse en base de
     */
    var information_registered_date = registered_date != null ? 
                    getDateTimeWithoutTimeZone(registered_date)
                    : null
    
    var information_message = null
    if(self_registration != null){
        if(information_registered_date != null){
            information_message = self_registration ? 
                "Se registró el ".concat(information_registered_date)
                : "Fue registrado el ".concat(information_registered_date)
        } else {
            information_message = self_registration ? 
                "Se registró."
                : "Fue registrado."
        }
    }
    return information_message
}