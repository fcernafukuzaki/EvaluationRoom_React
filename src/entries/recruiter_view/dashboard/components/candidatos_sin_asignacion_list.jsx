import React, {Component, Fragment} from 'react';
import CandidateCard from '../../candidate_card/container/candidate_card'
import CandidatoApreciacionModal from '../../candidato_apreciacion/components/candidato_apreciacion_modal'
import {formato_idcliente_idpuestolaboral} from '../../../common/components/formato_identificador'

class CandidatosSinAsignacionList extends Component {
	constructor(props){
        super(props);

        this.state = {
            datos: this.props.candidatosSinPuestoLaboral,
            modalCerrado: true,
            tipoConsulta: '',
            
        }

        this.handleCloseCandidatoApreciacionModal = this.handleCloseCandidatoApreciacionModal.bind(this);
        this.handleOpenCandidatoApreciacionModal = this.handleOpenCandidatoApreciacionModal.bind(this);
        this.guardarCandidatoApreciacion = this.guardarCandidatoApreciacion.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if (prevProps.candidatosSinPuestoLaboral !== this.props.candidatosSinPuestoLaboral){
            this.setState({
                datos: this.props.datos
            })
        }
    }

    handleCloseCandidatoApreciacionModal(event){
        this.setState({
            modalCerrado: !this.state.modalCerrado
        })
    }

    handleOpenCandidatoApreciacionModal(idcandidato, candidato){
        //console.log('handleOpenCandidatoApreciacionModal', idcandidato, candidato)
        this.props.getCandidatoApreciacionPorIdCandidato(idcandidato, candidato)
        this.setState({
            modalCerrado: !this.state.modalCerrado,
            tipoConsulta: 'sin_asignacion',
            datosCandidato: candidato
        })
    }

    guardarCandidatoApreciacion(tipoConsulta, idcandidato, idcliente, idpuestolaboral, idreclutador, apreciacion){
        var idcliente_idpuestolaboral = formato_idcliente_idpuestolaboral(idcliente, idpuestolaboral)
        this.props.addCandidatoApreciacion(tipoConsulta, idcandidato, idcliente_idpuestolaboral, idcliente, idpuestolaboral, idreclutador, apreciacion)
    }

    contenido(candidatosSinPuestoLaboral, candidatosTestPsicologicosSinPuestoLaboral){
        //console.log('contenido', candidatosSinPuestoLaboral, candidatosTestPsicologicosSinPuestoLaboral)
        if(Object.keys(candidatosSinPuestoLaboral).length > 0) {
            var existsCandidates = null;
            var tableCandidates = candidatosSinPuestoLaboral.map((candidate, i) => {
                
                if(candidate.idcandidato === null){
                    existsCandidates = 0;
                    return 'Todos los candidatos han sido asignados a un puesto laboral.'
                }
                var candidatosTestPsicologicosSinPuestoLaboralList = []
                if(Object.keys(candidatosTestPsicologicosSinPuestoLaboral).length > 0) {
                    Object.keys(candidatosTestPsicologicosSinPuestoLaboral).map((id_candidate, index) => {
                        //console.log('id_candidate', candidatosTestPsicologicosSinPuestoLaboral[id_candidate])
                        if(candidatosTestPsicologicosSinPuestoLaboral[id_candidate][0].idcandidato == candidate.idcandidato){
                            candidatosTestPsicologicosSinPuestoLaboralList = candidatosTestPsicologicosSinPuestoLaboral[id_candidate]
                        }
                    });
                }
                //console.log('candidatos sin asignación', candidatosTestPsicologicosSinPuestoLaboralList)
                return (<Fragment key={candidate.idcandidato}>
                            <CandidateCard 
                                    id={candidate.idcandidato}
                                    name={candidate.nombre}
                                    paternal_surname={candidate.apellidopaterno}
                                    maternal_surname={candidate.apellidomaterno}
                                    full_name={candidate.nombre_completo}
                                    birth_date={candidate.fechanacimiento}
                                    registered_date={candidate.fecha_registro}
                                    email_address={candidate.correoelectronico}
                                    telefono_fijo={candidate.telefono_fijo}
                                    telefono_movil={candidate.telefono_movil}
                                    psychologicaltests={candidatosTestPsicologicosSinPuestoLaboralList}
                                    onOpenModal={this.handleOpenCandidatoApreciacionModal.bind(this, candidate.idcandidato, candidate)}
                                />
                </Fragment>)
            })

            return (
                <Fragment>
                    {tableCandidates}
                </Fragment>
            )
        } else {
            return ''
        }
    }
    
    render () {
        const {candidatosSinPuestoLaboral, candidatosTestPsicologicosSinPuestoLaboral} = this.props
        //console.log(candidatosSinPuestoLaboral)
        return (
            <Fragment>
                <div className='candidatos_sin_asignacion_container mb-3'>
                    <div className='candidatos_sin_asignacion_container_header mb-2'>
                        Candidatos pendientes de asignar a un proceso de selección:
                    </div>
                    <div className='mb-2 pl-1 pr-1'>
                        <div className='candidatos_sin_asignacion_lista'>
                            {this.contenido(candidatosSinPuestoLaboral, candidatosTestPsicologicosSinPuestoLaboral)}
                        </div>
                    </div>
                </div>
                <CandidatoApreciacionModal cerrado={this.state.modalCerrado} 
                    onClose={this.handleCloseCandidatoApreciacionModal.bind(this)} 
                    onGuardar={this.guardarCandidatoApreciacion.bind(this)}
                    datosCandidatosApreciacion={this.props.candidatosApreciacion}
                    datosCandidato={this.state.datosCandidato}
                    idreclutador={this.props.idreclutador}
                    guardado={this.props.guardado}
                    tipoConsulta={this.state.tipoConsulta}
                />
            </Fragment>
        )
    }
}

export default (CandidatosSinAsignacionList);