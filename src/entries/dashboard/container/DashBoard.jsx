import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {Prompt} from 'react-router';
import CargandoImagen from '../../components/common/CargandoImagen'
import MensajeError from '../../components/common/MensajeError';
import {getSelectionProcess} from '../../../actions/actionSelectionProcess';
import ClientsSelectionProcessList from '../components/clients_selectionprocess_list'

class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            errorMensaje: ''
        }
    }

    componentWillMount() {
        this.props.getSelectionProcess();
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevProps.selectionProcess !== this.props.selectionProcess) {
            this.setState({
				isLoading: Object.entries(this.props.selectionProcess).length > 0 ? false : true,
            });
            console.log(this.props.selectionProcess.status)
        }
        if (prevProps.errorResponse !== this.props.errorResponse) {
            if(409 == this.props.errorResponse.status){
                console.log('Error')
            } else {
				this.setState({
					isLoading: false,
					errorMensaje: this.props.errorResponse
				})
			}
        }
    }

    tableSelectionProcess(isLoading) {
        return (<ClientsSelectionProcessList 
                    datos={this.props.selectionProcess}
                />)
    }
    render() {
        const {isLoading, errorMensaje} = this.state
        var tableSelectionProcess = this.tableSelectionProcess(isLoading)
        return (
            <Fragment>
                {!isLoading ? tableSelectionProcess : (<CargandoImagen />)}
                {errorMensaje != '' && <MensajeError error={errorMensaje} />}
            </Fragment>
        );
    }
}

function mapStateToProps(state){
    return{
        selectionProcess : state.reducerSelectionProcess.getSelectionProcessResponse,
        errorResponse : state.reducerSelectionProcess.errorResponse
    }
}

export default connect(mapStateToProps, {getSelectionProcess})(DashBoard);