import React, {Fragment} from 'react';

import CargandoImagen from '../components/common/CargandoImagen';

import NavBar from '../components/common/NavBar';
import Footer from '../common/components/Footer';
import DashBoard from './dashboard/container/DashBoard';

export default function Home (props){
	console.log(props)
	return (
		<Fragment>
			{props.isLoading && <CargandoImagen />}
			{props.usuario != null &&
			props.usuario.idusuario == 0 &&
			<Fragment>
				<div>
				Usuario no está autorizado al sistema EvaluationRoom.
				Contactar con Francisco Cerna Fukuzaki al correo fcernaf@gmail.com para gestionar el acceso.
				</div>
			</Fragment>
			}
			{props.usuario != null &&
			props.usuario.idusuario > 0 &&
			Object.entries(props.usuario.perfiles).length == 0 &&
			<Fragment>
				<div>
				Usuario no posee perfiles asignados al sistema EvaluationRoom.
				Contactar con Francisco Cerna Fukuzaki al correo fcernaf@gmail.com para gestionar el acceso.
				</div>
			</Fragment>
			}
			{props.usuario != null &&
			props.usuario.idusuario > 0 &&
			Object.entries(props.usuario.perfiles).length > 0 &&
			<Fragment>
				<NavBar usuario={props.usuario} errorUsuario={props.errorUsuario} items={props.items} />
				<div className="mt-3 mx-auto ancho1200">
					<h4>Bienvenido {props.usuario.nombre} al sistema de evaluación psicológica.</h4>
					
					<DashBoard token={props.usuario.token} correoelectronico={props.usuario.correoelectronico} idusuario={props.usuario.idusuario} />
				</div>
				<Footer  />
			</Fragment>
			}
		</Fragment>
	);
}