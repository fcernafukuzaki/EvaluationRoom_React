import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'

import {encriptarAES, obtenerValorParametro} from '../../components/common-exam/Mensajes';

import {getSelectionProcess} from '../../../actions/actionSelectionProcess';
import MensajeError from '../../components/common/MensajeError';
import CargandoImagen from '../../components/common/CargandoImagen';
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

    componentWillMount() {
        if(obtenerValorParametro('id') != null){
			var ids = obtenerValorParametro('id');
			var id = ids.split('_');//idclient, idjobposition
			this.props.getSelectionProcess(id[0], id[1]);
		} else {
			this.setState({
				isLoading: false
			});
		}
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevProps.selectionProcess !== this.props.selectionProcess) {
			this.setState({
				idclient: this.props.selectionProcess.client.idcliente,
				name: this.props.selectionProcess.client.nombre,
				nameForm: this.props.selectionProcess.client.nombre,
				isLoading: false
			});
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
    }

    render() {
        const {isLoading, errorMensaje, errors, nameForm, prompt} = this.state;
        return (
            <div className="mt-3 mx-auto ancho800">
				{!isLoading ? 
				(<SelectionProcessForm 
					datos={this.props.selectionProcess} 
					nameForm={nameForm}
					errors={errors}
					isLoading={isLoading}
					prompt={prompt}
				/>) : 
				(<CargandoImagen />)}
                {errorMensaje != '' && <MensajeError error={errorMensaje} />}
			</div>
        );
    }
}

function mapStateToProps(state){
    return{
        selectionProcess : state.reducerSelectionProcess.getSelectionProcessResponse,
        errorResponse : state.reducerSelectionProcess.errorResponse
    }
}

export default connect(mapStateToProps, {getSelectionProcess})(SelectionProcessFormContainer)