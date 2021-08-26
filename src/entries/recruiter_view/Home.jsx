import React, {Fragment} from 'react';
import CargandoImagen from '../components/common/CargandoImagen';
import NavBar from '../components/common/NavBar';
import Footer from '../common/components/Footer';

export default function Home (props){
	const {children, clientId, responseGoogle, isLoading, usuario, errorUsuario, items} = props;
	const mensaje_usuario_no_autorizado = (
		<div>
		Usuario no está autorizado al sistema EvaluationRoom.
		Contactar con Francisco Cerna Fukuzaki al correo fcernaf@gmail.com para gestionar el acceso.
		</div>
		)
	const contenido_html = (errorUsuario == null ? children : mensaje_usuario_no_autorizado)

	return (
		<Fragment>
			{isLoading && <CargandoImagen />}
			<Fragment>
				<NavBar clientId={clientId} responseGoogle={responseGoogle} usuario={usuario} items={items} />
				<div className="mt-3 mx-auto ancho1200">
					{contenido_html}
				</div>
				<Footer />
			</Fragment>
		</Fragment>
	);
}