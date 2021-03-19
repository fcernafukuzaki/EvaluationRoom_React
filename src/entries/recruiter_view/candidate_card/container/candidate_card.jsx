import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import CandidateCardInfo from '../components/candidate_card_info'
import CandidateCardTests from '../components/candidate_card_tests'
import {generarInforme} from '../../../../actions/actionCandidato';

class CandidateCard extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
        
		this.descargarInforme = this.descargarInforme.bind(this);
    }

    descargarInforme(idcandidato, nombreCompleto) {
        console.log(idcandidato);
        this.setState({
            informe: {
                idCandidato: idcandidato,
                nombreCompleto: nombreCompleto
            }
        }, () => {
            this.props.generarInforme(this.state.informe);
        });
    }
    
    render(){
        return (
            <Fragment>
                <div className={classnames('candidate-card')}>
                    <CandidateCardInfo
                        id={this.props.id}
                        name={this.props.name}
                        paternal_surname={this.props.paternal_surname}
                        maternal_surname={this.props.maternal_surname}
                        birth_date={this.props.birth_date}
                        registered_date={this.props.registered_date}
                        self_registration={this.props.selfregistration}
                        email_address={this.props.email_address}
                        telefono_fijo={this.props.telefono_fijo}
                        telefono_movil={this.props.telefono_movil}
                        psychologicaltests={this.props.psychologicaltests}
                        descargar_informe={this.descargarInforme.bind(this, this.props.id, this.props.full_name)}
                        onOpen={this.props.onOpenModal}
                        onOpenModalResetTests={this.props.onOpenModalResetTests}
                    />
                    <div className={classnames('candidate-card-tests')} >
                    {
                        this.props.psychologicaltests.map(e => {
                            return (
                                <CandidateCardTests
                                    key={e.idtestpsicologico}
                                    psychologicaltest={e}
                                />
                            )
                        })
                    }
                    </div>
                </div>
            </Fragment>
        );
    }
}

function mapStateToProps(state){
	return{
		informePsicologicoResponse : state.reducerCandidato.generarInformeResponse
	}
}

export default connect(mapStateToProps, {generarInforme})(CandidateCard);