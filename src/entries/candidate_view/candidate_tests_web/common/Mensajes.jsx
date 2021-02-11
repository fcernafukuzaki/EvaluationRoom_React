import React from 'react';

export function obtenerTextoBienvenida(texto){
	var textBienvenida = "Cargando..."
	//if(Object.entries(nombreCandidato).length > 0){
	if (typeof texto != "undefined"){
		textBienvenida = texto
	}
	return textBienvenida;
}

export function splitParrafo(texto){
	if (typeof texto !== 'undefined'){
		return texto.split('\\n').map((parrafo, i) => <p key={i}>{parrafo}</p> );
	}
	return ''
}

export function obtenerTextoBienvenidaPorParrafos(nombre){
	return splitParrafo(obtenerTextoBienvenida(nombre));
}

export function obtenerTextoFinalizadoPorParrafos(mensaje){
	return splitParrafo(mensaje);
}