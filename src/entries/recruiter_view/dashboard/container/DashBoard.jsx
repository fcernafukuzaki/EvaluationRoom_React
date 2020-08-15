import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import CargandoImagen from '../../../components/common/CargandoImagen'
import MensajeError from '../../../components/common/MensajeError';
import {getSelectionProcess} from '../../../../actions/actionSelectionProcess';
import ClientsSelectionProcessList from '../components/clients_selectionprocess_list'
import ClientsSelectionProcessButtonNew from '../components/clients_selectionprocess_button_new'

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
		if (prevProps.selectionProcesses !== this.props.selectionProcesses) {
            this.setState({
				isLoading: Object.entries(this.props.selectionProcesses).length > 0 ? false : true,
            });
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
        return (<Fragment>
                    <ClientsSelectionProcessButtonNew 
                        pathname={'/selectionprocess'}
                        hashId={``}
                    />
                    <ClientsSelectionProcessList 
                        datos={this.props.selectionProcesses}
                    />
                </Fragment>)
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
        selectionProcesses : state.reducerSelectionProcess.getSelectionProcessResponse,
        errorResponse : state.reducerSelectionProcess.errorResponse
    }
}

export default connect(mapStateToProps, {getSelectionProcess})(DashBoard);