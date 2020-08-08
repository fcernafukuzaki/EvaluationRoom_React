import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {obtenerCandidatoTestPsicologicosRespuestas, obtenerCandidatoTestPsicologicosResultadoData} from '../../../actions/actionCandidato';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
import TabBar from '../../components/common/TabBar';
import {obtenerValorParametro} from '../../components/common-exam/Mensajes';

class CandidatoResultadoForm extends Component {
	constructor(props){
		super(props);
		this.state = {
			filter: null,
			errors: {},
			isLoading: true,
			errorMensaje: '',
			candidato: {}
		}
	}
	
	componentWillMount() {
		this.props.obtenerCandidatoTestPsicologicosRespuestas(obtenerValorParametro('id'));
		this.props.obtenerCandidatoTestPsicologicosResultadoData(obtenerValorParametro('id'));
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.candidato !== this.props.candidato) {
			this.setState({
				isLoading: Object.entries(this.props.candidato).length > 0 ? false : true
			});
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			if(409 == this.props.errorResponse.status){
				let error = {};
				if(this.props.errorResponse.mensaje.indexOf('Correo') > -1){
					error = {correoElectronico: this.props.errorResponse.mensaje}
				} else if(this.props.errorResponse.mensaje.indexOf('Número de documento') > -1){
					error = {numeroDocumentoIdentidad: this.props.errorResponse.mensaje}
				}
				this.setState({
					errors : error,
					isLoading: false
				})
			} else {
				this.setState({
					isLoading: false,
					errorMensaje: this.props.errorResponse
				})
			}
		}
	}
	
	render() {
		const { errors, isLoading, errorMensaje } = this.state;
		//console.log('props::', this.props);
		var fechaFormat = '';
		var domicilio = '';
		var lugarNacimiento = '';
		if(!isLoading){
			var fecha = new Date(this.props.candidato.fechaNacimiento);
			fechaFormat = (fecha.getDate() < 10 ? "0" + fecha.getDate() : fecha.getDate()) + "/" + (fecha.getMonth() < 10 ? "0" + (fecha.getMonth() + 1) : fecha.getMonth() + 1) + "/" + fecha.getFullYear();
			
			var paisDomicilio = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1)[0].pais.nombre : '';
			var departamentoDomicilio = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1)[0].departamento.nombre : '';
			var provinciaDomicilio = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1)[0].provincia.nombre : '';
			var distritoDomicilio = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1)[0].distrito.nombre : '';
			var direccionDomicilio = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 1)[0].direccion : '';
			domicilio = (direccionDomicilio).concat(', ',distritoDomicilio,', ',provinciaDomicilio,', ',departamentoDomicilio,' - ',paisDomicilio);
			
			var paisNacimiento = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2)[0].pais.nombre : '';
			var departamentoNacimiento = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2)[0].departamento.nombre : '';
			var provinciaNacimiento = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2)[0].provincia.nombre : '';
			var distritoNacimiento = this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2).length > 0 ? this.props.candidato.direcciones.filter( d => d.idTipoDireccion == 2)[0].distrito.nombre : '';
			lugarNacimiento = (distritoNacimiento).concat(', ',provinciaNacimiento,', ',departamentoNacimiento,' - ',paisNacimiento);
		}
		return (
			<div className="mt-3 mx-auto ancho1200">
				{isLoading && <CargandoImagen />}
				{!isLoading && 
				<Fragment>
					<form className="form mb-3">
						<h4>
						Resultados de candidato: <strong>{this.props.candidato.nombre} {this.props.candidato.apellidoPaterno} {this.props.candidato.apellidoMaterno}</strong>
						</h4>
						<div className="form-group row mb-0">
							<label className="col-sm-2 col-form-label-sm mb-0">Correo electrónico : </label>
							<label className="col-sm-4 col-form-label-sm mb-0">
								<strong>{this.props.candidato.correoElectronico}</strong>
							</label>
							<label className="col-sm-2 col-form-label-sm mb-0">Teléfonos : </label>
							<label className="col-sm-4 col-form-label-sm mb-0">
								<strong>{this.props.candidato.telefonos.map( e => { 
								return (e.idTelefono == 1) ? (' (Celular) ').concat(e.numero) : (' (Número fijo) ').concat(e.numero)
								})}</strong>
							</label>
						</div>
						<div className="form-group row mb-0">
							<label className="col-sm-2 col-form-label-sm mb-0">Sexo : </label>
							<label className="col-sm-2 col-form-label-sm mb-0">
								<strong>{this.props.candidato.sexo.nombre}</strong>
							</label>
							<label className="col-sm-2 col-form-label-sm mb-0">Documento de identidad : </label>
							<label className="col-sm-2 col-form-label-sm mb-0">
								<strong>{this.props.candidato.documentoIdentidad.nombre} {this.props.candidato.numeroDocumentoIdentidad}</strong>
							</label>
							<label className="col-sm-2 col-form-label-sm mb-0">Fecha nacimiento : </label>
							<label className="col-sm-2 col-form-label-sm mb-0">
								<strong>{fechaFormat}</strong>
							</label>
						</div>
						<div className="form-group row mb-0">
							<label className="col-sm-2 col-form-label-sm mb-0">Estado civil : </label>
							<label className="col-sm-2 col-form-label-sm mb-0">
								<strong>{this.props.candidato.estadoCivil.nombre}</strong>
							</label>
							<label className="col-sm-2 col-form-label-sm mb-0">Cantidad de hijos : </label>
							<label className="col-sm-2 col-form-label-sm mb-0">
								<strong>{this.props.candidato.cantidadHijos}</strong>
							</label>
						</div>
						<div className="form-group row mb-0">
							<label className="col-sm-2 col-form-label-sm mb-0">Domicilio : </label>
							<label className="col-sm-10 col-form-label-sm mb-0">
								<strong>{domicilio}</strong>
							</label>
						</div>
						<div className="form-group row mb-0">
							<label className="col-sm-2 col-form-label-sm mb-0">Lugar nacimiento : </label>
							<label className="col-sm-10 col-form-label-sm mb-0">
								<strong>{lugarNacimiento}</strong>
							</label>
						</div>
					</form>
					<div>
					<h5><strong>Test psicológicos:</strong></h5>
					</div>
					<TabBar
						elemento={this.props.candidato}
						data={this.props.candidatoResultadoData}
					/>
				</Fragment>
				}
				{errorMensaje != '' && <MensajeError error={errorMensaje} />}
			</div>
		);
	}
}

function mapStateToProps(state){
	return{
		candidato : state.reducerCandidato.obtenerCandidatoTestPsicologicosRespuestasResponse,
		candidatoResultadoData : state.reducerCandidato.obtenerCandidatoTestPsicologicosResultadoDataResponse
	}
}

export default connect(mapStateToProps, { obtenerCandidatoTestPsicologicosRespuestas, obtenerCandidatoTestPsicologicosResultadoData })(CandidatoResultadoForm);