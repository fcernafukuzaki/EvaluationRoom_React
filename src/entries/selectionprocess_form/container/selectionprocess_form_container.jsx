import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import {encriptarAES, obtenerValorParametro} from '../../components/common-exam/Mensajes';

import SelectionProcessForm from '../components/selectionprocess_form'

class SelectionProcessFormContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
			errorMensaje: '',
			errors: {},
			idclient: '',
			name: '',
			nameForm: '',
			prompt: false
        }
    }

    /*componentWillMount() {
		console.log(obtenerValorParametro('id'))
		if(obtenerValorParametro('id') != null){
			var ids = obtenerValorParametro('id');
			var id = ids.split('_');//idclient, idjobposition
			this.props.getSelectionProcess(id[0], id[1]);
		} else {
			this.setState({
				isLoading: false
			});
		}
    }*/
/*
    componentDidUpdate(prevProps, prevState) {
		if (prevProps.procesoSelecccion !== this.props.procesoSelecccion) {
			this.setState({
				idclient: this.props.procesoSelecccion.client.idcliente,
				name: this.props.procesoSelecccion.client.nombre,
				nameForm: this.props.procesoSelecccion.client.nombre + ' - ' + this.props.procesoSelecccion.jobposition.nombre,
				isLoading: false
			});
			console.log(this.props.procesoSelecccion)
		}
        if (prevProps.cliente !== this.props.cliente) {
			this.setState({
				idCliente: this.props.cliente.idCliente,
				nombre: this.props.cliente.nombre,
				nombreForm: this.props.cliente.nombre,
				isLoading: false
			});
		}
		if (prevProps.guardarClienteResponse !== this.props.guardarClienteResponse) {
			this.limpiar();
			this.setState({ 
				isLoading: false,
				guardado: true
			})
		}
		if (prevProps.errorResponse !== this.props.errorResponse) {
			this.setState({
				isLoading: false,
				errorMensaje: this.props.errorResponse
			})
		}
    }*/

    render() {
		
        return (
            <div className="mt-3 mx-auto ancho1200">
				<SelectionProcessForm 
				/>
			</div>
        );
    }
}

export default (SelectionProcessFormContainer);