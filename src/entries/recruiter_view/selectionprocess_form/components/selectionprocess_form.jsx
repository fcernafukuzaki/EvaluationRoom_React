import React, {Component, Fragment} from 'react'
import { connect } from 'react-redux';
import Formulario from '../../../common/components/formulario/formulario'
import { Prompt } from 'react-router';
import { Link } from 'react-router-dom';

import {getNewDateTimeFormat, getDateFormat, getDateFormat_SeparadoPorGuion} from '../../../common/components/date_util'
import validateInput from './selectionprocess_form_validate'
import MensajeError from '../../../components/common/MensajeError';
import CargandoImagen from '../../../components/common/CargandoImagen';
import {encriptarAES, obtenerValorParametro} from '../../../common/components/encriptar_aes';
import MensajeGuardarExitoso from '../../../components/common/MensajeGuardarExitoso';
import {getSelectionProcess} from '../../../../actions/actionSelectionProcess';
import { obtenerCliente, addClient, updateClient, guardarPuestosLaborales, actualizarPuestosLaborales, addCandidateToJobPosition, deleteCandidateToJobPosition } from '../../../../actions/actionCliente';
import { getCandidates, generarInforme } from '../../../../actions/actionCandidato';
import {CandidateButtonUpdate, CandidateButtonResults, CandidateButtonDatos, CandidateButtonExam} from '../../candidate_card/components/candidate_button';

class SelectionProcessForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
			errorMensaje: '',
			guardado: false,
			errors: {},
            idclient: '',
            idjobposition: '',
            nameClient: '',
            nameJobPosition: '',
            nameForm: '',
            dateProcessBegin: getDateFormat(),
            dateProcessEnd: getDateFormat(),
            processActive: 'True',
            prompt: false,
            selectionProcess: {},
			filtroCandidatoNombre: '',
			filtroCandidatoApellidoPaterno: '',
			filtroCandidatoApellidoMaterno: '',
			candidatosFiltro:[],
			candidatosSeleccionados: [],
            candidatosNoSeleccionados: [],
            
			rutaRegistrarCandidato: '/registrarCandidato',
            rutaListaCandidatosResultados: '/listaCandidatos/resultados',
            
            listNameClients: [],
            inputValueNameClient: ''
        }

		this.onCheck = this.onCheck.bind(this);
		this.onUnCheck = this.onUnCheck.bind(this);
		this.descargarInforme = this.descargarInforme.bind(this);
    }

    componentWillMount() {
        this.props.getCandidates()
		if(obtenerValorParametro('id') != null){
			var ids = obtenerValorParametro('id');
			var id = ids.split('_');//idclient, idjobposition
			this.props.getSelectionProcess(id[0], id[1]);
		} else {
            this.props.obtenerCliente()
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
		if (prevProps.selectionProcess !== this.props.selectionProcess) {
			this.setState({
                idclient: this.props.selectionProcess.client.idcliente,
                idjobposition: this.props.selectionProcess.jobposition.idpuestolaboral,
                nameClient: this.props.selectionProcess.client.nombre,
                nameJobPosition: this.props.selectionProcess.jobposition.nombre,
                nameForm: this.props.selectionProcess.client.nombre + ' - ' + this.props.selectionProcess.jobposition.nombre,
                dateProcessBegin: getDateFormat_SeparadoPorGuion(this.props.selectionProcess.date_process_begin),
                dateProcessEnd: getDateFormat_SeparadoPorGuion(this.props.selectionProcess.date_process_end),
                processActive: this.props.selectionProcess.process_active ? 'True' : 'False',
                selectionProcess: this.props.selectionProcess,
				//isLoading: false
            });
            this.props.obtenerCliente()
        }
        if (prevProps.clientes !== this.props.clientes) {
            var listaNombreClientes = this.props.clientes.map((c) => {return c.nombre})
            //console.log('Lista de clientes', listaNombreClientes)
            this.setState({
                isLoading: false,
                listNameClients: listaNombreClientes,
                nameClient: (typeof this.props.selectionProcess.client !== 'undefined' && this.props.selectionProcess.client.idcliente !== '') ? this.props.selectionProcess.client.nombre : '',
            });
        }
        if (prevProps.candidatos !== this.props.candidatos) {
            //console.log('Cargó información de candidatos')
            this.setState({
				candidatosNoSeleccionados: this.props.candidatos
            });
        }
        if (prevState.selectionProcess !== this.state.selectionProcess){
            //console.log('El estado de selectionProcess ha cambiado.')
            //console.log(this.props.candidatos)
            //console.log(this.state.selectionProcess)
            //console.log(this.state.selectionProcess.selectionprocess_candidates)
            if(typeof this.state.selectionProcess.selectionprocess_candidates !== 'undefined'){
                if(Object.entries(this.state.selectionProcess.selectionprocess_candidates).length > 0){
                    if(Object.entries(this.props.candidatos).length > 0){
                        let candidatoSeleccionado = [];
                        let candidatos = this.props.candidatos;
                        this.state.selectionProcess.selectionprocess_candidates.map( candidate_sp => {
                            var lista_candidatos_encontrados = candidatos.filter( (c, index) => 
                                c.idcandidato == candidate_sp.idcandidate
                            );
                            if (lista_candidatos_encontrados.length > 0){
                                candidatoSeleccionado.push(lista_candidatos_encontrados[0]);
                                var i = candidatos.indexOf(lista_candidatos_encontrados[0]);
                                candidatos.splice(i,1);
                            }
                        });
                        this.setState({ candidatosSeleccionados: candidatoSeleccionado, candidatosNoSeleccionados: candidatos });
                    }
                }
            }
        }
        if (prevProps.guardarClienteResponse !== this.props.guardarClienteResponse) {
            this.setState({
				errors: {}, 
                isLoading: true,
                idclient: this.props.guardarClienteResponse.idcliente,
                puestolaboral: {
                        idclient: this.props.guardarClienteResponse.idcliente,
                        nombre: this.state.nameJobPosition,
                        date_process_begin: this.state.dateProcessBegin,
                        date_process_end: this.state.dateProcessEnd,
                        user_register: '',
                        process_active: this.state.processActive
                    }
			}, () => {
				if(this.state.idjobposition === ''){
					this.props.guardarPuestosLaborales(this.state.puestolaboral);
				}
			});
        }
        if (prevProps.actualizarClienteResponse !== this.props.actualizarClienteResponse) {
            this.setState({
				errors: {}, 
                isLoading: true,
                idclient: this.props.actualizarClienteResponse.idcliente,
                puestolaboral: {
                        idclient: this.props.actualizarClienteResponse.idcliente,
                        idjobposition: this.state.idjobposition,
                        nombre: this.state.nameJobPosition,
                        date_process_begin: this.state.dateProcessBegin,
                        date_process_end: this.state.dateProcessEnd,
                        user_register: '',
                        process_active: this.state.processActive
                    }
			}, () => {
                /** 
                 * Si se escoge un cliente ya existente, entonces se registrará un nuevo puesto laboral
                */
                if(this.state.idjobposition === ''){
					this.props.guardarPuestosLaborales(this.state.puestolaboral);
				} else {
                    this.props.actualizarPuestosLaborales(this.state.puestolaboral);
                }
			});
        }
        if (prevProps.guardarPuestosLaboralesResponse !== this.props.guardarPuestosLaboralesResponse) {
            this.setState({ 
                isLoading: false,
                idjobposition: this.props.guardarPuestosLaboralesResponse.idpuestolaboral,
                guardado: true
            })
        }
        if (prevProps.actualizarPuestosLaboralesResponse !== this.props.actualizarPuestosLaboralesResponse) {
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

    formSelectionProcess() {
        var tableHead = [{
                key: 'idCandidato',
                nombre: 'N°'
            },{
                key: 'nombre',
                nombre: 'Nombre'
            },{
                key: 'apellidoPaterno',
                nombre: 'Apellido Paterno'
            },{
                key: 'apellidoMaterno',
                nombre: 'Apellido Materno'
            },{
                key: 'testTomado',
                nombre: '¿Test tomado?'
            },{
                key: 'accion',
                nombre: 'Acción'
        }]
    
        var camposBusqueda = [{
                key: 'idFiltroCandidatoNombre',
                label: "Filtrar por nombre del candidato",
                onChange: this.filtrarListaCandidatosNombre.bind(this),
                valor: this.state.filtroCandidatoNombre
            } , {
                key: 'idFiltroCandidatoApellidoPaterno',
                label: "Filtrar por apellido paterno del candidato",
                onChange: this.filtrarListaCandidatosApePat.bind(this),
                valor: this.state.filtroCandidatoApellidoPaterno
            } , {
                key: 'idFiltroCandidatoApellidoMaterno',
                label: "Filtrar por apellido materno del candidato",
                onChange: this.filtrarListaCandidatosApeMat.bind(this),
                valor: this.state.filtroCandidatoApellidoMaterno
        }];

        var rowProcessActive = [{ label: "ACTIVO" , value: "True" },
                                { label: "FINALIZADO" , value: "False" }]
    
        var form = {
            titulo: (this.state.idclient == '' || this.state.idclient == 0 ? 'Registrar cliente' : ('Datos de cliente ').concat(this.state.nameForm)),
            campos: [
                [{
                    key: 'idCliente',
                    name: 'idCliente',
                    id: 'idCliente',
                    type: 'hidden',
                    value: this.state.idclient,
                    error: this.state.errors.idCliente,
                    onChange: this.onChange.bind(this),
                    required: 'false'
                }] , [{
                    key: 'nameClient',
                    name: 'nameClient',
                    id: 'nameClient',
                    label: 'Nombre empresa : ',
                    type: 'text-autocomplete-linea',
                    options: this.state.listNameClients,
                    inputValue: this.state.inputValueNameClient,
                    value: this.state.nameClient,
                    error: this.state.errors.nameClient,
                    onChange: this.setValueNameClient.bind(this),
                    onInputChange: this.setInputValueNameClient.bind(this),
                    labelClass: 'col-md-4 campo',
                    fieldClass: 'col-md-5 campo',
                    required: 'true'
                }] , [{
                    key: 'idjobposition',
                    name: 'idjobposition',
                    id: 'idjobposition',
                    type: 'hidden',
                    value: this.state.idjobposition,
                    error: this.state.errors.idjobposition,
                    onChange: this.onChange.bind(this),
                    required: 'false'
                }] , [{
                    key: 'nameJobPosition',
                    name: 'nameJobPosition',
                    id: 'nameJobPosition',
                    label: 'Nombre puesto laboral : ',
                    type: 'text-linea',
                    value: this.state.nameJobPosition,
                    error: this.state.errors.nameJobPosition,
                    onChange: this.onChangeTextField.bind(this),
                    labelClass: 'col-md-4 campo',
                    fieldClass: 'col-md-5 campo',
                    required: 'true'
                }] , [{
                    key: 'dateProcessBegin',
                    name: 'dateProcessBegin',
                    id: 'dateProcessBegin',
                    label: 'Fecha de inicio de proceso : ',
                    type: 'date',
                    value: this.state.dateProcessBegin,
                    error: this.state.errors.dateProcessBegin,
                    onChange: this.onChangeTextField.bind(this),
                    labelClass: 'col-md-3 campo',
                    fieldClass: 'col-md-3 campo',
                    required: 'true'
                } , {
                    key: 'dateProcessEnd',
                    name: 'dateProcessEnd',
                    id: 'dateProcessEnd',
                    label: 'Fecha de fin de proceso : ',
                    type: 'date',
                    value: this.state.dateProcessEnd,
                    error: this.state.errors.dateProcessEnd,
                    onChange: this.onChangeTextField.bind(this),
                    labelClass: 'col-md-3 campo',
                    fieldClass: 'col-md-3 campo',
                    required: 'true'
                } , {
                    key: 'processActive',
                    name: 'processActive',
                    id: 'processActive',
                    label: 'Estado del proceso : ',
                    type: 'select',
                    value: rowProcessActive,
                    valueSelected: this.state.processActive,
                    error: this.state.errors.processActive,
                    onChange: this.onChange.bind(this),
                    labelClass: 'col-md-3 campo',
                    fieldClass: 'col-md-3 campo',
                    required: 'true'
                }]
            ],
            tablaSelect: (this.state.idclient === '' && this.state.idjobposition) ? [] : (
                [ 
                    {
                        key: 1,
                        tituloTabla: 'Lista de candidatos seleccionados',
                        mensajeSinRegistros: 'Aún no se han seleccionado candidatos para este puesto laboral.',
                        tableHead: tableHead,
                        tablaEstilo: "width200",
                        tableBody: this.generarTablaBodyCandidatoSeleccionados.bind(this),
                        registrosPorPagina: 10, 
                        registros: this.state.candidatosSeleccionados,
                        camposBusqueda: []
                    } , {
                        key: 2,
                        tituloTabla: 'Lista de candidatos',
                        mensajeSinRegistros: 'Aún no se han registrado candidatos.',
                        tableHead: tableHead,
                        tablaEstilo: "width200",
                        tableBody: this.generarTablaBodyCandidato.bind(this),
                        registrosPorPagina: 15,
                        registros: this.state.filtroCandidatoNombre.length > 0 || 
                                    this.state.filtroCandidatoApellidoPaterno.length > 0 || 
                                    this.state.filtroCandidatoApellidoMaterno.length > 0 ? 
                                    (this.state.candidatosFiltro.length > 0 ? this.state.candidatosFiltro : []) : this.state.candidatosNoSeleccionados,
                        camposBusqueda: camposBusqueda
                    }
                ])
            ,
            botones: [
                {
                    key: 'guardar',
                    label: 'Guardar',
                    divClass: 'col-md-1',
                    botonClass: 'btn-primary btn-md',
                    tipo: 'button-submit',
                    isLoading: this.state.isLoading
                } , {
                    key: 'cancelar',
                    label: 'Cancelar',
                    divClass: 'col-md-1',
                    botonClass: 'btn-primary btn-md',
                    tipo: 'button',
                    onClick: this.onClickCancelar.bind(this, this.state.prompt),
                    isLoading: this.state.isLoading
                }],
                onSubmit: this.onSubmit.bind(this)
            }
        return form;
    }
    
    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) { this.setState({	errors : errors	}) }
        return isValid;
    }
    
    onSubmit(e) {
        e.preventDefault();
        if (this.isValid()) {
            this.setState({
                errors: {}, 
                isLoading: true,
                cliente: this.state.idclient === '' ? 
                    {
                        nombre: this.state.nameClient
                    } : {
                        idclient: this.state.idclient,
                        nombre: this.state.nameClient
                    }
            }, () => {
                if(this.state.idclient === ''){
                    this.props.addClient(this.state.cliente);
                } else {
                    this.props.updateClient(this.state.cliente);
                }
            });
        }
    }
    
    onChange(e) {
        console.log(e)
        console.log(e.target)
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value, prompt: !!(e.target.value.length) });
    }

    onChangeTextField(e, nombreCampo) {
        this.setState({ [nombreCampo]: e.target.value, prompt: !!(e.target.value.length) });
    }

    onCheck(e) {
		if(this.state.candidatosSeleccionados.length < 100){//Terna de candidatos
			var candidatosElegidos = this.state.candidatosSeleccionados;
			let candidatoElegido = this.props.candidatos.filter( c => c.idcandidato.toString() == e.target.value)[0];
			candidatosElegidos.push(candidatoElegido);
			this.setState({ candidatosSeleccionados: candidatosElegidos });
			
			this.setState({
				puestoLaboralCandidato: {
					idclient: this.state.idclient,
					idjobposition: this.state.idjobposition,
					idcandidate: parseInt(e.target.value),
                    //date_registered: '2020-10-02 22:56:00',
                    date_registered: getNewDateTimeFormat(),
					user_register: '',
					user_registered_byself: 'True'
				}
			}, () => {
                this.props.addCandidateToJobPosition(this.state.puestoLaboralCandidato);
				this.limpiar();
			});
			
			var i = -1;
			let candidatosNoSeleccionados = this.state.candidatosNoSeleccionados;
            let candidato = this.props.candidatos.filter( c => c.idcandidato.toString() == parseInt(e.target.value));
            //console.log('Candidato encontrado', candidato)
			if(candidato.length > 0){
                i = candidatosNoSeleccionados.indexOf(candidato[0]);
                //console.log('candidatosNoSeleccionados', i, candidatosNoSeleccionados)
				candidatosNoSeleccionados.splice(i,1);
			}
			this.setState({ candidatosNoSeleccionados: candidatosNoSeleccionados});
		} else {
			alert('Sólo se puede seleccionar hasta 3 candidatos.');
		}
	}
	
	onUnCheck(e) {
		this.setState({
			puestoLaboralCandidato: {
				idclient: this.state.idclient,
				idjobposition: this.state.idjobposition,
				idcandidate: parseInt(e.target.value)
			}
		}, () => {
            this.props.deleteCandidateToJobPosition(this.state.puestoLaboralCandidato);
		});
		
		var i = -1;
		let candidatosNoSeleccionados = this.state.candidatosNoSeleccionados;
		let candidatosSeleccionados = this.state.candidatosSeleccionados;
		let candidato = this.state.candidatosSeleccionados.filter( c => c.idcandidato == parseInt(e.target.value));
		if(candidato.length > 0){
			i = candidatosSeleccionados.indexOf(candidato[0]);
			candidatosSeleccionados.splice(i,1);
			candidatosNoSeleccionados.push(candidato[0]);
		}
		this.setState({ candidatosSeleccionados: candidatosSeleccionados, candidatosNoSeleccionados: candidatosNoSeleccionados});
	}
    
    onClickCancelar(prompt, e) {
        //console.log('onClickCancelar', e)
        //console.log('onClickCancelar', prompt)
        if(!prompt){
            limpiar();
        } else {
            if(window.confirm("¿Estás seguro de NO querer registrar el cliente?")){
                limpiar();
            }
        }
    }
    
    limpiar(){
        this.setState({
            //idclient: '',
            //name: '',
            //nameForm: '',
            //cliente: {},
            //puestolaboral: {},
            prompt: false
        })
    }
    
    filtrarListaCandidatosNombre(e){
        let filtroCandidatoNombre = e.target.value.toLowerCase();
        this.setState({
            filtroCandidatoNombre: filtroCandidatoNombre.toLowerCase(),
            candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(filtroCandidatoNombre) > -1 && c.apellidopaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoPaterno) > -1 && c.apellidomaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoMaterno) > -1)
        })
    }
    
    filtrarListaCandidatosApePat(e){
        let filtroCandidatoApePat = e.target.value.toLowerCase();
        this.setState({
            filtroCandidatoApellidoPaterno: filtroCandidatoApePat.toLowerCase(),
            candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(this.state.filtroCandidatoNombre) > -1 && c.apellidopaterno.toLowerCase().indexOf(filtroCandidatoApePat) > -1 && c.apellidomaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoMaterno) > -1)
        })
    }
    
    filtrarListaCandidatosApeMat(e){
        let filtroCandidatoApeMat = e.target.value.toLowerCase();
        this.setState({
            filtroCandidatoApellidoMaterno: filtroCandidatoApeMat.toLowerCase(),
            candidatosFiltro: this.props.candidatos.filter( c => c.nombre.toLowerCase().indexOf(this.state.filtroCandidatoNombre) > -1 && c.apellidopaterno.toLowerCase().indexOf(this.state.filtroCandidatoApellidoPaterno) > -1 && c.apellidomaterno.toLowerCase().indexOf(filtroCandidatoApeMat) > -1 )
        })
    }
    generarTablaBodyCandidatoSeleccionados(row){
        if(this.state.candidatosSeleccionados != null && row != null){
            var mensajeSinRespuestasTestPsicologico = '';
            var verResultados = '';
            var evaluationRoom = '';
            var descargarInforme = '';
            var hashIdCandidato = encriptarAES(row.idcandidato.toString());
            var actualizarCandidato = (
                <CandidateButtonUpdate 
                    pathname={this.state.rutaRegistrarCandidato}
                    hashId={`?idc=${hashIdCandidato}`}
                />
            );
            if(row.cant_examenes_asignados > 0){
                if(row.tiene_resultado > 0){
                    verResultados = (
                        <CandidateButtonResults 
                            pathname={this.state.rutaListaCandidatosResultados}
                            hashId={`?id=${hashIdCandidato}`}
                        />
                    );
                    
                    descargarInforme = (<button type="button" className="btn btn-outline-success btn-sm" onClick={this.descargarInforme.bind(this,row)} title="Descargar informe"><i className="fas fa-file-word"></i> Descargar informe</button>)
                } else {
                    verResultados = (
                        <CandidateButtonDatos 
                            pathname={this.state.rutaListaCandidatosResultados}
                            hashId={`?id=${hashIdCandidato}`}
                        />
                    );
                    mensajeSinRespuestasTestPsicologico = (
                        <button type="button" className="btn btn-outline-warning btn-sm" title="Aún no ha realizado los test psicologicos">
                            <i className="fas fa-exclamation-circle"></i> Respuestas pendientes
                        </button>
                    );
                }
                evaluationRoom = (
                    <CandidateButtonExam 
                        pathname={'/pages/examen.html'}
                        hashId={`?id=${hashIdCandidato}`}
                    />
                );
            } else {
                verResultados = 'Asignar test psicológico';
            }
            return (<tr key={row.idcandidato}>
                        <td>
                        <div className="form-check" key={row.idcandidato}>
                            <input className="form-check-input"
                                type="checkbox" id={row.idcandidato}
                                
                                onChange={this.onUnCheck}
                                name="candidatosSeleccionados"
                                value={row.idcandidato}
                            />
                        </div>
                        </td>
                        <td>{row.nombre}</td>
                        <td>{row.apellidopaterno}</td>
                        <td>{row.apellidomaterno}</td>
                        <td>{mensajeSinRespuestasTestPsicologico}
                            {descargarInforme}
                        </td>
                        <td>{actualizarCandidato}
                            {verResultados}
                            {evaluationRoom}
                        </td>
                    </tr>);
        } else {
            return (<tr><td>Cargando</td></tr>)
        }
    }
    generarTablaBodyCandidato(row){
        //console.log(row)
        if(this.props.candidatos != null && row != null){
            var mensajeSinRespuestasTestPsicologico = '';
            var verResultados = '';
            var hashIdCandidato = encriptarAES(row.idcandidato.toString());
            var actualizarCandidato = (
                <CandidateButtonUpdate 
                    pathname={'/er/registrarCandidato'}
                    hashId={`?idc=${hashIdCandidato}`}
                />
            );
            if(row.cant_examenes_asignados > 0){
                if(row.tiene_resultado > 0){
                    verResultados = (
                        <CandidateButtonResults 
                            pathname={this.state.rutaListaCandidatosResultados}
                            hashId={`?id=${hashIdCandidato}`}
                        />
                    );
                    
                } else {
                    verResultados = (
                        <CandidateButtonDatos 
                            pathname={this.state.rutaListaCandidatosResultados}
                            hashId={`?id=${hashIdCandidato}`}
                        />
                    );
                    mensajeSinRespuestasTestPsicologico = (
                        <button type="button" className="btn btn-outline-warning btn-sm" title="Aún no ha realizado los test psicologicos">
                            <i className="fas fa-exclamation-circle"></i> Respuestas pendientes
                        </button>
                    );
                }
            } else {
                verResultados = 'Asignar test psicológico';
            }
            return (<tr key={row.idcandidato}>
                        <td>
                        {this.state.candidatosSeleccionados.length < 100 ? // terna
                            <div className="form-check" key={row.idcandidato}>
                                <input className="form-check-input"
                                    type="checkbox" id={row.idcandidato}
                                    onChange={this.onCheck}
                                    name="candidatosSeleccionados"
                                    value={row.idcandidato}
                                />
                            </div>
                        :
                            <div className="form-check" key={row.idcandidato}>
                                <input className="form-check-input"
                                    type="checkbox" disabled
                                />
                            </div>
                        }
                        </td>
                        <td>{row.nombre}</td>
                        <td>{row.apellidopaterno}</td>
                        <td>{row.apellidomaterno}</td>
                        <td>{mensajeSinRespuestasTestPsicologico}</td>
                        <td>{actualizarCandidato}
                            {verResultados}
                        </td>
                    </tr>);
        } else {
            return (<tr><td>Cargando</td></tr>)
        }
    }

    descargarInforme(row) {
		//console.log(row);
		this.setState({
			informe: {
				idCandidato: row.idcandidato
			}
		}, () => {
			this.props.generarInforme(this.state.informe);
		});
	}

    obtenerIdCliente(nombreCliente) {
        if(nombreCliente == ''){
            return ''
        } else {
            var cliente = this.props.clientes.filter((c) => {return c.nombre == nombreCliente ? c.idcliente : ''})[0]
            return (typeof cliente !== 'undefined') ? cliente.idcliente : ''
        }
    }

    setValueNameClient(nameClient) {
        this.setState({
            nameClient: nameClient,// Reclutador puede ingresar un nombre que no esté en la lista
            idclient: this.obtenerIdCliente(nameClient)
        })
    }
    setInputValueNameClient(nameClient){
        this.setState({
            inputValueNameClient: nameClient,
            nameClient: nameClient,// Reclutador puede ingresar un nombre que no esté en la lista
            idclient: this.obtenerIdCliente(nameClient)
        })
    }

    render() {
        return (
            <Fragment>
                {!this.state.isLoading &&
                    (<Fragment>
                        <Prompt
                            when={this.state.prompt}
                            message="¿Estás seguro de NO querer registrar el cliente?"
                        />
                        <Formulario form={this.formSelectionProcess()} />
                        <MensajeGuardarExitoso cargando={this.state.guardado} mensaje={"Se guardó exitosamente!"} />
                    </Fragment>)
                }
                {this.state.isLoading && (<CargandoImagen />)}
                {this.state.errorMensaje != '' && <MensajeError error={this.state.errorMensaje} />}
            </Fragment>
        );
    }
}

function mapStateToProps(state){
	return{
        selectionProcess : state.reducerSelectionProcess.getSelectionProcessResponse,
        errorResponse : state.reducerSelectionProcess.errorResponse,
		candidatos: state.reducerCandidato.getCandidatesResponse,
		clientes : state.reducerCliente.obtenerClienteResponse,
        informePsicologicoResponse : state.reducerCandidato.generarInformeResponse,
        guardarClienteResponse: state.reducerCliente.guardarClienteResponse,
        actualizarClienteResponse: state.reducerCliente.actualizarClienteResponse,
        guardarPuestosLaboralesResponse: state.reducerCliente.guardarPuestosLaboralesResponse,
        actualizarPuestosLaboralesResponse: state.reducerCliente.actualizarPuestosLaboralesResponse,
        addCandidateToJobPosition: state.reducerCliente.addCandidateToJobPositionResponse,
        deleteCandidateToJobPosition: state.reducerCliente.deleteCandidateToJobPositionResponse,
	}
}

export default connect(mapStateToProps, {getSelectionProcess, getCandidates, addClient, updateClient, guardarPuestosLaborales, actualizarPuestosLaborales, addCandidateToJobPosition, deleteCandidateToJobPosition, obtenerCliente, generarInforme })(SelectionProcessForm);