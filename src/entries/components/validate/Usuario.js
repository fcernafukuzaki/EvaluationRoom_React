import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	var mensajeRequerido = 'Campo es requerido.';
	
	let errors = {};

	if (Validator.isEmpty(data.nombreUsuario)) {
		errors.nombreUsuario = mensajeRequerido;
	}
	
	if (Validator.isEmpty(data.correoElectronicoUsuario)) {
		errors.correoElectronicoUsuario = mensajeRequerido;
	} else {
		if (!(Validator.isEmail(data.correoElectronicoUsuario))) {
			errors.correoElectronicoUsuario = 'Dirección de correo inválida.';
		}
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}