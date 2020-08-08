import React from 'react';

import CryptoJS from 'crypto-js';

export function obtenerTextoBienvenida(nombre){
	var nombreCandidato = nombre;
	var textBienvenida = "Cargando...";
	//if(Object.entries(nombreCandidato).length > 0){
	if (typeof nombreCandidato != "undefined"){
		textBienvenida = "Bienvenido " + nombreCandidato + ". El día de hoy realizarás pruebas psicológicas. ¿Estás listo?" + 
			"\n\nRecuerda que te encuentras en un proceso de evaluación y una vez iniciado el test psicológico no podrás volverlo a dar. Por lo que se recomienda tener una disponibilidad de 1 hora y 30 minutos aproximadamente para realizarlo y utilizar Google Chrome o Firefox." + 
			" Se recomienda no realizar el test durante las 3am y 4am por mantenimiento del servidor." +
			"\n\nInstrucciones: " + 
			"\n1. Para iniciar debes presionar el botón INICIAR PRUEBA.\n2. Seguir las instrucciones de cada test y marcar la(s) alternativa(s) correcta(s) acorde a cada test.\n3. Para avanzar entre las preguntas debe presionar el botón SIGUIENTE."
	}
	return textBienvenida;
}

export function obtenerTextoFinalizado(nombre){
	var textFinalizado = "¡Felicidades " + nombre + "! \nAcabaste todas las pruebas."
	return textFinalizado;
}

export function obtenerValorParametro(name, url){
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	//return decodeURIComponent(results[2].replace(/\+/g, ' '));
	return decifrarAES(decodeURIComponent(results[2]));
}

export function decifrarAES(valorEncriptado){
	var decrypted = CryptoJS.AES.decrypt(valorEncriptado, "3v4lRoomUTPt3S1s");
	return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encriptarAES(valor){
	//console.log('encriptarAES', valor);
	var encrypted = CryptoJS.AES.encrypt(valor, "3v4lRoomUTPt3S1s");
	return encrypted.toString();
}

export function splitParrafo(texto){
	return texto.split('\n').map((parrafo, i) => <p key={i}>{parrafo}</p> );
}

export function obtenerTextoBienvenidaPorParrafos(nombre){
	return splitParrafo(obtenerTextoBienvenida(nombre));
}

export function obtenerTextoFinalizadoPorParrafos(nombre){
	return splitParrafo(obtenerTextoFinalizado(nombre));
}