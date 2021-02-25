import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validateModalFormInput(correoElectronico, observacion, detalle) {
	var mensajeRequerido = 'Campo es requerido.';
	
	let errors = {};

	if (correoElectronico == null) {
		errors.correoElectronico = mensajeRequerido;
	} else {
		if (Validator.isEmpty(correoElectronico)) {
			errors.correoElectronico = mensajeRequerido;
		} else {
			if (!(Validator.isEmail(correoElectronico))) {
				errors.correoElectronico = 'Dirección de correo inválida.';
			}
		}
	}
	
	if (Validator.isEmpty(observacion)) {
		errors.observacion = mensajeRequerido;
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}