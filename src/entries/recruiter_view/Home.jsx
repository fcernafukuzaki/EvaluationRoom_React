import React, {Fragment} from 'react';

import CargandoImagen from '../components/common/CargandoImagen';

import DashBoard from './dashboard/container/DashBoard';

export default function Home (props){
	return (
		<div className="mt-3 mx-auto ancho1200">
			{props.isLoading && <CargandoImagen />}
			{props.usuario != null &&
			props.usuario.idUsuario == 0 &&
			<Fragment>
				<div>
				Usuario no está autorizado al sistema EvaluationRoom.
				Contactar con Francisco Cerna Fukuzaki al correo fcernaf@gmail.com para gestionar el acceso.
				</div>
			</Fragment>
			}
			{props.usuario != null &&
			props.usuario.idUsuario > 0 &&
			Object.entries(props.usuario.perfiles).length == 0 &&
			<Fragment>
				<div>
				Usuario no posee perfiles asignados al sistema EvaluationRoom.
				Contactar con Francisco Cerna Fukuzaki al correo fcernaf@gmail.com para gestionar el acceso.
				</div>
			</Fragment>
			}
			{props.usuario != null &&
			props.usuario.idUsuario > 0 &&
			Object.entries(props.usuario.perfiles).length > 0 &&
			<Fragment>
				<h4>Bienvenido {props.usuario.nombre} al sistema de evaluación psicológica.</h4>
				
				<DashBoard token={props.usuario.token} correoelectronico={props.usuario.correoElectronico} idusuario={props.usuario.idUsuario} />
			</Fragment>
			}
		</div>
	);
}