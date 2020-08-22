import React, {Component, Fragment} from 'react';
import classnames from 'classnames';

import {groupBy} from '../../../common/components/groupby'
import BarraBusqueda from '../../../components/common/BarraBusqueda'
import ClientsSelectionProcessTable from '../components/clients_selectionprocess_table'
import {ClientsSelectionProcessButtonUpdate} from './clients_selectionprocess_button'
import CandidateCard from '../../candidate_card/container/candidate_card'
import {getDate} from '../../../common/components/date_util'
import {encriptarAES} from '../../../common/components/encriptar_aes';;

class ClientsSelectionProcessList extends Component {
	constructor(props){
        super(props);
        
        var camposBusquedaFiltro = this.props.camposBusqueda
        var filtroNombreClienteList = []
        var filtroNombrePuestoLaboralList = []
        var filtroStatusProcesoSeleccionList = []
        if(Object.keys(camposBusquedaFiltro).length > 0) {
            var filtroNombreCliente = groupBy(camposBusquedaFiltro, 'client_name')
            Object.keys(filtroNombreCliente).map( (elemento, i) => {
                filtroNombreClienteList.push(elemento)
            })
            var filtroNombrePuestoLaboral = groupBy(camposBusquedaFiltro, 'jobposition_name')
            Object.keys(filtroNombrePuestoLaboral).map( (elemento, i) => {
                filtroNombrePuestoLaboralList.push(elemento)
            })
            var filtroStatusProcesoSeleccion = groupBy(camposBusquedaFiltro, 'process_active')
            Object.keys(filtroStatusProcesoSeleccion).map( (elemento, i) => {
                filtroStatusProcesoSeleccionList.push(elemento)
            })
            //console.log(filtroNombreCliente, filtroNombrePuestoLaboral, filtroStatusProcesoSeleccion)
        }

		this.state = {
            filtroNombreCliente: '',
            filtroPuestoLaboral: '',
            filtroStatusSelectionProcess: '',
            filtroNombreClienteList: filtroNombreClienteList,
            filtroNombrePuestoLaboralList: filtroNombrePuestoLaboralList,
            filtroStatusProcesoSeleccionList: filtroStatusProcesoSeleccionList,
            camposFiltrados: this.props.camposBusqueda,
            datos: this.props.datos
        }
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.filtroNombreCliente !== this.state.filtroNombreCliente){
            var lista = this.props.camposBusqueda.filter( c => 
                c.client_name.toLowerCase().indexOf(this.state.filtroNombreCliente.toLowerCase()) > -1 && 
                c.jobposition_name.toLowerCase().indexOf(this.state.filtroPuestoLaboral.toLowerCase()) > -1 
            )
            console.log(this.state.filtroNombreCliente, lista)
            this.setState({
                camposFiltrados: lista,
            })
        }
        if (prevState.filtroPuestoLaboral !== this.state.filtroPuestoLaboral){
            var lista = this.props.camposBusqueda.filter( c => 
                c.client_name.toLowerCase().indexOf(this.state.filtroNombreCliente.toLowerCase()) > -1 && 
                c.jobposition_name.toLowerCase().indexOf(this.state.filtroPuestoLaboral.toLowerCase()) > -1 
            )
            console.log(this.state.filtroPuestoLaboral, lista)
            this.setState({
                camposFiltrados: lista,
            })
        }
        if (prevState.filtroStatusSelectionProcess !== this.state.filtroStatusSelectionProcess){
            this.props.funcGetByStatus(this.state.filtroStatusSelectionProcess)
        }
        if (prevProps.datos !== this.props.datos){
            // Codigo utilizado en constructor - Inicio
            var camposBusquedaFiltro = this.props.camposBusqueda
            var filtroNombreClienteList = []
            var filtroNombrePuestoLaboralList = []
            var filtroStatusProcesoSeleccionList = []
            if(Object.keys(camposBusquedaFiltro).length > 0) {
                var filtroNombreCliente = groupBy(camposBusquedaFiltro, 'client_name')
                Object.keys(filtroNombreCliente).map( (elemento, i) => {
                    filtroNombreClienteList.push(elemento)
                })
                var filtroNombrePuestoLaboral = groupBy(camposBusquedaFiltro, 'jobposition_name')
                Object.keys(filtroNombrePuestoLaboral).map( (elemento, i) => {
                    filtroNombrePuestoLaboralList.push(elemento)
                })
                var filtroStatusProcesoSeleccion = groupBy(camposBusquedaFiltro, 'process_active')
                Object.keys(filtroStatusProcesoSeleccion).map( (elemento, i) => {
                    filtroStatusProcesoSeleccionList.push(elemento)
                })
                //console.log(filtroNombreCliente, filtroNombrePuestoLaboral, filtroStatusProcesoSeleccion)
            }
            // Codigo utilizado en constructor - Fin
            this.setState({
                isLoading: false,
                filtroNombreClienteList: filtroNombreClienteList,
                filtroNombrePuestoLaboralList: filtroNombrePuestoLaboralList,
                filtroStatusProcesoSeleccionList: filtroStatusProcesoSeleccionList,
                camposFiltrados: this.props.camposBusqueda,
                datos: this.props.datos
            })
        }
    }

    tableSelectionProcess(selectionProcess, candidatesPsychologicalTest){
        var tableHead = [{
                key: 'identificador',
                nombre: 'N°'
            },{
                key: 'nombre',
                nombre: 'Cliente'
            },{
                key: 'apellidoPaterno',
                nombre: 'Puesto Laboral'
            },{
                key: 'date_process_begin',
                nombre: 'date_process_begin'
            },{
                key: 'date_process_end',
                nombre: 'date_process_end'
            },{
                key: 'process_active',
                nombre: 'process_active'
            },{
                key: 'apellidoMaterno',
                nombre: 'Cant. Candidatos'
            },{
                key: 'accion',
                nombre: 'Acción'
        }]

        if(Object.keys(selectionProcess).length > 0) {
            var tableBody = Object.keys(selectionProcess).map((id_jobposition, index) => {
                var existsCandidates = null;
                var tableCandidates = selectionProcess[id_jobposition].map((candidate, i) => {
                    
                    if(candidate.idcandidato === null){
                        existsCandidates = 0;
                        return 'Aún no se han asignado candidatos.'
                    }
                    var candidatesPsychologicalTestList = []
                    if(Object.keys(candidatesPsychologicalTest).length > 0) {
                        Object.keys(candidatesPsychologicalTest).map((id_candidate, index) => {
                            //console.log('id_candidate', candidatesPsychologicalTest[id_candidate])
                            if(candidatesPsychologicalTest[id_candidate][0].idcandidato == candidate.idcandidato){
                                candidatesPsychologicalTestList = candidatesPsychologicalTest[id_candidate]
                            }
                        });
                    }
                    //console.log('id_candidate', candidatesPsychologicalTestList)
                    return (<Fragment key={candidate.idcandidato}>
                                <CandidateCard 
                                        id={candidate.idcandidato}
                                        name={candidate.nombre}
                                        paternal_surname={candidate.apellidopaterno}
                                        maternal_surname={candidate.apellidomaterno}
                                        birth_date={candidate.fechanacimiento}
                                        email_address={candidate.correoelectronico}
                                        telefono_fijo={candidate.telefono_fijo}
                                        telefono_movil={candidate.telefono_movil}
                                        psychologicaltests={candidatesPsychologicalTestList}
                                    />
                    </Fragment>)
                })
    
                var elemento_id_jobposition = selectionProcess[id_jobposition]
                var elemento = elemento_id_jobposition[0]
    
                var hashIdClientIdJobPosition = encriptarAES(elemento.idclient.toString() + '_' + elemento.idjobposition.toString());
                var asignarCandidatos = (
                                        <ClientsSelectionProcessButtonUpdate 
                                            pathname={'/selectionprocess'}
                                            hashId={`?id=${hashIdClientIdJobPosition}`}
                                        />
                );

                return (<Fragment key={elemento.idclient + ' - ' + elemento.idjobposition}>
                        <div className='div-table-row'>
                            <div className={classnames('selectionprocess-row-header', (index == 0 ? 'selectionprocess-row-header-primary' : ''))}>
                                <div className='div-table-col div-table-col-first'>{(index+1)}</div>
                                <div className='div-table-col'>Cliente: {elemento.client_name}</div>
                                <div className='div-table-col-190'>Puesto laboral: {elemento.jobposition_name}</div>
                                <div className='div-table-col'>Fec. Ini. proceso: {getDate(elemento.date_process_begin)}</div>
                                <div className='div-table-col'>Fec. Fin proceso: {getDate(elemento.date_process_end)}</div>
                                <div className='div-table-col-170'>Estado: {elemento.process_active ? 
                                    (<Fragment><i className="fas fa-exclamation iconoRojo"></i> ACTIVO</Fragment>) : 
                                    (<Fragment><i className="fas fa-check-circle iconoVerde"></i> FINALIZADO</Fragment>)}</div>
                                <div className='div-table-col'>Cant. de candidatos: {elemento_id_jobposition.length}</div>
                                <div className='div-table-col div-table-col-last'>{asignarCandidatos}
                                </div>
                            </div>
                        </div>
                        <div className='div-table-row'>
                            <div className='candidate-cards-row'>
                                <div className={classnames('candidate-cards', existsCandidates !== null ? 'not-candidate' : '')}>
                                {tableCandidates}
                                </div>
                            </div>
                        </div>
                    </Fragment>)
            });
            return (<ClientsSelectionProcessTable tableHead={tableHead} tableBody={tableBody} />)
        } else {
            return (<strong>No se ha encontrado resultados.</strong>)
        }
    }

    barraBusqueda(){
        var rowProcessActive = [{ label: "ACTIVO" , value: "True" },
                                { label: "FINALIZADO" , value: "False" },
                                { label: "TODOS" , value: "All" }]
        
        var camposBusqueda = [{
                key: 'idFiltroNombreCliente',
                label: "Filtrar por nombre de cliente",
                onChange: this.filtrarNombreCliente.bind(this),
                valor: this.state.filtroNombreCliente
            } , {
                key: 'idFiltroNombrePuestoLaboral',
                label: "Filtrar por nombre de proceso (Puesto laboral)",
                onChange: this.filtrarPuestoLaboral.bind(this),
                valor: this.state.filtroPuestoLaboral
            } , {
                key: 'idFiltroStatusSelectionProcess',
                label: "Estado",
                onChange: this.filtrarStatusSelectionProcess.bind(this),
                valor: rowProcessActive,
                type: "select",
                valueSelected: this.state.filtroStatusSelectionProcess
        }];
        return (<BarraBusqueda camposBusqueda={camposBusqueda} />)
    }

    filtrarNombreCliente(e){
        let filtro = e.target.value.toLowerCase();
        this.setState({
            filtroNombreCliente: filtro.toLowerCase(),
        })
    }
    filtrarPuestoLaboral(e){
        let filtro = e.target.value.toLowerCase();
        this.setState({
            filtroPuestoLaboral: filtro.toLowerCase(),
        })
    }
    filtrarStatusSelectionProcess(e){
        let filtro = e.target.value;
        this.setState({
            filtroStatusSelectionProcess: filtro,
        })
    }

    render () {
        return (
            <Fragment>
                {this.barraBusqueda()}
                {this.tableSelectionProcess(groupBy(this.state.camposFiltrados, 'idjobposition'), this.props.datosCandidatos)}
            </Fragment>
        )
    }
}

export default (ClientsSelectionProcessList);