import React, { Component, Fragment } from 'react';
import classnames from 'classnames';
import CandidateCardInfo from '../components/candidate_card_info'
import CandidateCardTests from '../components/candidate_card_tests'

class CandidateCard extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
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
                        email_address={this.props.email_address}
                        telefono_fijo={this.props.telefono_fijo}
                        telefono_movil={this.props.telefono_movil}
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

export default CandidateCard;