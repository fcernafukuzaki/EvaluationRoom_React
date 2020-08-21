import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export default function validateInput(data) {
	
	var mensajeRequerido = 'Campo es requerido.';
	
	let errors = {};

	if (Validator.isEmpty(data.nameClient)) {
		errors.nameClient = mensajeRequerido;
	}
    
    if (Validator.isEmpty(data.nameJobPosition)) {
		errors.nameJobPosition = mensajeRequerido;
	}

	if (Validator.isEmpty(data.dateProcessBegin)) {
		errors.dateProcessBegin = mensajeRequerido;
	}
    
	return {
		errors,
		isValid: isEmpty(errors)
	};
}