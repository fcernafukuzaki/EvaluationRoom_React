import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';

import {groupBy} from '../../../common/components/groupby'
import CargandoImagen from '../../../components/common/CargandoImagen'
import MensajeError from '../../../components/common/MensajeError';
import {getSelectionProcess} from '../../../../actions/actionSelectionProcess';
import ClientsSelectionProcessList from '../components/clients_selectionprocess_list'
import {ClientsSelectionProcessButtonNew} from '../components/clients_selectionprocess_button'

class DashBoard extends Component {
    constructor(props){
        super(props);
        this.state = {
            isLoading: true,
            errorMensaje: '',
            selectionProcesses: {},
            candidatesPsychologicalTest: {},
            camposBusqueda: {}
        }

        this.getSelectionProcessByStatus.bind(this);
    }

    componentWillMount() {
        this.props.getSelectionProcess();
    }

    componentDidUpdate(prevProps, prevState) {
		if (prevProps.selectionProcesses !== this.props.selectionProcesses) {
            //console.log(this.props.selectionProcesses[0])
            //console.log(this.props.selectionProcesses[1])
            this.setState({
                //isLoading: Object.entries(this.props.selectionProcesses).length > 0 ? false : true,
                selectionProcesses: groupBy(this.props.selectionProcesses[0], 'idjobposition'),
                candidatesPsychologicalTest: groupBy(this.props.selectionProcesses[1], 'id'),
                camposBusqueda: this.props.selectionProcesses[0]
            });
        }
        if (prevState.selectionProcesses !== this.state.selectionProcesses){
            this.setState({
                isLoading: Object.entries(this.state.selectionProcesses).length > 0 ? false : true
            });
            this.tableSelectionProcess()
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

    getSelectionProcessByStatus(process_status){
        this.setState({
            isLoading: true,
            errorMensaje: this.props.errorResponse
        })
        this.props.getSelectionProcess(null, null, process_status);
    }

    tableSelectionProcess() {
        return (<Fragment>
                    <ClientsSelectionProcessButtonNew 
                        pathname={'/selectionprocess'}
                        hashId={``}
                    />
                    <ClientsSelectionProcessList 
                        datos={this.state.selectionProcesses}
                        datosCandidatos={this.state.candidatesPsychologicalTest}
                        camposBusqueda={this.state.camposBusqueda}
                        funcGetByStatus={this.getSelectionProcessByStatus.bind(this)}
                    />
                </Fragment>)
    }
    render() {
        const {isLoading, errorMensaje} = this.state
        return (
            <Fragment>
                {Object.entries(this.state.selectionProcesses).length > 0 ? this.tableSelectionProcess() : ''}
                {isLoading && (<CargandoImagen />)}
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