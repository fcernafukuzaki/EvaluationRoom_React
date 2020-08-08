import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

const TableroPreguntas = ({ enunciado, alternativas, mensajeAlerta, mensajeContador, estiloTablero }) => {
	return(
		<div id="tableroPreguntas" className={classnames('tablero', estiloTablero)} >
			{mensajeContador}
			{enunciado}
			{alternativas}
			{mensajeAlerta}
		</div>
	);
}

export default TableroPreguntas;