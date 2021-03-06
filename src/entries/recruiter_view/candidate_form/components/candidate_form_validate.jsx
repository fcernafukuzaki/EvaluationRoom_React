import Validator from 'validator';
import isEmpty from 'lodash/isEmpty';

export function validateInputCandidatoRegistrado(data) {
	var mensajeRequerido = 'Campo es requerido.';
	
	let errors = {};
	
	if (Validator.isEmpty(data.correoElectronico)) {
		errors.correoElectronico = mensajeRequerido;
	} else {
		if (!(Validator.isEmail(data.correoElectronico))) {
			errors.correoElectronico = 'Dirección de correo inválida.';
		}
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}

export function validateInput(data) {
	var mensajeRequerido = 'Campo es requerido.';
	
	let errors = {};

	if (Validator.isEmpty(data.nombre)) {
		errors.nombre = mensajeRequerido;
	}
	
	if (Validator.isEmpty(data.apellidoPaterno)) {
		errors.apellidoPaterno = mensajeRequerido;
	}
	
	if (Validator.isEmpty(data.apellidoMaterno)) {
		errors.apellidoMaterno = mensajeRequerido;
	}
	
	if (data.correoElectronico == null) {
		errors.correoElectronico = mensajeRequerido;
	} else {
		if (Validator.isEmpty(data.correoElectronico)) {
			errors.correoElectronico = mensajeRequerido;
		} else {
			if (!(Validator.isEmail(data.correoElectronico))) {
				errors.correoElectronico = 'Dirección de correo inválida.';
			}
		}
	}
	if (Validator.isEmpty(data.idSexo.toString())) {
		errors.idSexo = mensajeRequerido;
	} else {
		if(data.idSexo === ''){
			errors.idSexo = mensajeRequerido;
		} else if(data.idSexo === '0'){
			errors.idSexo = mensajeRequerido;
		}
	}
	if (Validator.isEmpty(data.idDocumentoIdentidad.toString())) {
		errors.idDocumentoIdentidad = mensajeRequerido;
	} else {
		if(data.idDocumentoIdentidad === ''){
			errors.idDocumentoIdentidad = mensajeRequerido;
		} else if(data.idDocumentoIdentidad === '0'){
			errors.idDocumentoIdentidad = mensajeRequerido;
		}
	}
	if (Validator.isEmpty(data.numeroDocumentoIdentidad)) {
		errors.numeroDocumentoIdentidad = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idEstadoCivil.toString())) {
		errors.idEstadoCivil = mensajeRequerido;
	} else {
		if(data.idEstadoCivil.toString() === '0'){
			errors.idEstadoCivil = mensajeRequerido;
		}
	}
	if (Validator.isEmpty(data.cantidadHijos.toString())) {
		errors.cantidadHijos = mensajeRequerido;
	} else if (!(Validator.isInt(data.cantidadHijos.toString()))) {
		errors.cantidadHijos = 'Campo debe ser numérico.';
	}
	if (Validator.isEmpty(data.numeroCelular) && Validator.isEmpty(data.numeroTelefono) ) {
		errors.numeroTelefono = mensajeRequerido.concat(' Debe ingresar al menos un número de contacto.');
		errors.numeroCelular = mensajeRequerido.concat(' Debe ingresar al menos un número de contacto.');
	} else {
		if (Validator.isEmpty(data.numeroCelular) && !(Validator.isEmpty(data.numeroTelefono)) ){
			if (!(Validator.isInt(data.numeroTelefono.toString()))) {
				errors.numeroTelefono = 'Campo debe ser numérico.';
			} else if (!(Validator.isLength(data.numeroTelefono,{min:7, max: 7}))) {
				errors.numeroTelefono = 'Campo debe tener 7 dígitos.';
			}
		} else if (Validator.isEmpty(data.numeroTelefono) && !(Validator.isEmpty(data.numeroCelular)) ){
			if (!(Validator.isInt(data.numeroCelular.toString()))) {
				errors.numeroCelular = 'Campo debe ser numérico.';
			} else if (!(Validator.isLength(data.numeroCelular,{min:9, max: 9}))) {
				errors.numeroCelular = 'Campo debe tener 9 dígitos.';
			}
		} else {
			if (!(Validator.isInt(data.numeroTelefono.toString()))) {
				errors.numeroTelefono = 'Campo debe ser numérico.';
			} else if (!(Validator.isLength(data.numeroTelefono,{min:7, max: 7}))) {
				errors.numeroTelefono = 'Campo debe tener 7 dígitos.';
			}
			if (!(Validator.isInt(data.numeroCelular.toString()))) {
				errors.numeroCelular = 'Campo debe ser numérico.';
			} else if (!(Validator.isLength(data.numeroCelular,{min:9, max: 9}))) {
				errors.numeroCelular = 'Campo debe tener 9 dígitos.';
			}
		}
	}
	
	if (Validator.isEmpty(data.fechaNacimiento)) {
		errors.fechaNacimiento = mensajeRequerido;
	} else {
		var fechaActual = new Date();
		var fechaNacimiento = new Date(data.fechaNacimiento);
		const mayorEdad = 567993600000;
		if((fechaActual - fechaNacimiento - (1000*60*60*24)) < mayorEdad){
			errors.fechaNacimiento = 'Debe ser mayor de edad.';
		}
	}
	
	if (Validator.isEmpty(data.lugarDomicilio)) {
		errors.lugarDomicilio = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idPaisDomicilio.toString()) || data.idPaisDomicilio === '0') {
		errors.idPaisDomicilio = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idDepartamentoDomicilio.toString()) || data.idDepartamentoDomicilio === '0') {
		errors.idDepartamentoDomicilio = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idProvinciaDomicilio.toString()) || data.idProvinciaDomicilio === '0') {
		errors.idProvinciaDomicilio = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idDistritoDomicilio.toString()) || data.idDistritoDomicilio === '0') {
		errors.idDistritoDomicilio = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idPaisNacimiento.toString()) || data.idPaisNacimiento === '0') {
		errors.idPaisNacimiento = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idDepartamentoNacimiento.toString()) || data.idDepartamentoNacimiento === '0') {
		errors.idDepartamentoNacimiento = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idProvinciaNacimiento.toString()) || data.idProvinciaNacimiento === '0') {
		errors.idProvinciaNacimiento = mensajeRequerido;
	}
	if (Validator.isEmpty(data.idDistritoNacimiento.toString()) || data.idDistritoNacimiento === '0') {
		errors.idDistritoNacimiento = mensajeRequerido;
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}


export function validateInputRecruiterRegistration(data) {
	/**
	 * El reclutador puede registrar un candidato con sólo colocar la dirección de correo electrónico.
	 * El resto de campos serán llenados por el candidato cuando ingrese a la URL de evaluación.
	*/
	var mensajeRequerido = 'Campo es requerido.';
	
	let errors = {};
	
	if (Validator.isEmpty(data.correoElectronico)) {
		errors.correoElectronico = mensajeRequerido;
	} else {
		if (!(Validator.isEmail(data.correoElectronico))) {
			errors.correoElectronico = 'Dirección de correo inválida.';
		}
	}
	
	return {
		errors,
		isValid: isEmpty(errors)
	};
}