import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	console.log(data);
	var mensajeRequerido = 'Campo es requerido.';
	
	let errors = {};

	if (Validator.isNull(data.nombre)) {
		errors.nombre = mensajeRequerido;
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}