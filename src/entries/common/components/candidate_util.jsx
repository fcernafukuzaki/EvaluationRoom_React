import {encriptarAES} from './encriptar_aes';

export function getURLTests(value){
    /**
     * Encripta el valor y se contactena para formar la URL de las pruebas.
     */
    var value_encrypted = encriptarAES(value.toString());
	return ('/pages/examen.html?id=').concat(value_encrypted);
}