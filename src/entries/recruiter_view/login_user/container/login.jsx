import React, {Fragment} from 'react';
import GoogleLogin from 'react-google-login';
import Footer from '../../../common/components/Footer';

export default function Login (props){
    
	return (
		<div className="contenidoCentrado">
            <div className="contenidoLogin">
                <div className="textoBienvenida">
                    <h4 className="lineaSubrayado">Bienvenido a Evaluation Room</h4>
                    <p className="text-justify mb-0"><small>Inicia sesión con tu cuenta de Google. Nunca publicaremos nada en su nombre.</small></p>
                </div>
                <GoogleLogin
                    clientId="56017019162-bb4cfpv4dtpdl6ssmg0dbs4ik8hr6g9k.apps.googleusercontent.com"
                    render={renderProps => (
                        <div className="btn-group btn-group-lg">
                            <a className="btn btn-danger disabled"><i className="fab fa-google" style={{width:"16px", height:"20px", color: "#fff"}}></i></a>
                            <button onClick={renderProps.onClick} disabled={renderProps.disabled} className="btn btn-outline-danger ancho12em">Google</button>
                        </div>
                        
                    )}
                    onSuccess={props.responseGoogle}
                    onFailure={props.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div className="textoContacto">
                    <p className="text-justify mb-0"><small>¿No posee una cuenta? Contactar con Francisco Cerna Fukuzaki al correo fcernaf@gmail.com para gestionar el acceso.</small></p>
                </div>
            </div>
            <Footer isLogin="true" />
		</div>
	);
}