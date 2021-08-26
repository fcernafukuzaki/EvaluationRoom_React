export const barmenu_items = [{
    key: 'item1',
    label: 'Inicio',
    divClass: 'nav-link',
    botonClass: 'btn-primary btn-sm',
    tipo: 'nav-item',
    exact: true,
    link: '/',
    perfil: [1,2,3]
} , {
    key: 'itemClientes',
    label: 'Clientes',
    divClass: 'nav-link',
    botonClass: 'btn-primary btn-sm',
    tipo: 'nav-item dropdown',
    item: [{
        key: 'itemClientessubitem1',
        label: 'Lista de clientes',
        divClass: 'nav-link',
        botonClass: 'btn-primary btn-sm',
        tipo: 'dropdown-item',
        exact: false,
        link: '/listarClientes',
        perfil: [1,2,3]
    } , {
        key: 'itemClientessubitem2',
        label: 'Registrar cliente',
        divClass: 'nav-link',
        botonClass: 'btn-primary btn-sm',
        tipo: 'dropdown-item',
        exact: false,
        link: '/listarClientes',//'/registrarCliente',
        perfil: [1,2,3]
    }]
} , {
    key: 'item2',
    label: 'Candidato',
    divClass: 'nav-link',
    botonClass: 'btn-primary btn-sm',
    tipo: 'nav-item dropdown',
    item: [{
        key: 'item2subitem2',
        label: 'Lista de candidatos',
        divClass: 'col-sm-2',
        botonClass: 'btn-primary btn-sm',
        tipo: 'nav-item',
        exact: false,
        link: '/listaCandidatos',
        perfil: [1,2,3]
    } , {
        key: 'item2subitem1',
        label: 'Registrar candidato',
        divClass: 'nav-link',
        botonClass: 'btn-primary btn-sm',
        tipo: 'dropdown-item',
        exact: false,
        link: '/registrarCandidato',
        perfil: [1,2,3]
    }]
} , {
    key: 'item3',
    label: 'Lista de test',
    divClass: 'nav-link',
    botonClass: 'btn-primary btn-sm',
    tipo: 'nav-item',
    exact: false,
    link: '/listaTestPsicologicos',
    perfil: [1,2,3]
} , {
    key: 'item0',
    label: 'Accesos de aplicación',
    divClass: 'nav-link',
    botonClass: 'btn-primary btn-sm',
    tipo: 'nav-item dropdown',
    item: [{
        key: 'item0subitem3',
        label: 'Lista de usuarios',
        divClass: 'nav-link',
        botonClass: 'btn-primary btn-sm',
        tipo: 'dropdown-item',
        exact: false,
        link: '/listaUsuarios',
        perfil: [1,2]
    } , {
        key: 'item0subitem4',
        label: 'Lista de perfiles',
        divClass: 'nav-link',
        botonClass: 'btn-primary btn-sm',
        tipo: 'dropdown-item',
        exact: false,
        link: '/listaPerfiles',
        perfil: [1]
    } , {
        key: 'item0subitem1',
        label: 'Registrar usuario',
        divClass: 'nav-link',
        botonClass: 'btn-primary btn-sm',
        tipo: 'dropdown-item',
        exact: false,
        link: '/registrarUsuario',
        perfil: [1,2]
    } , {
        key: 'item0subitem2',
        label: 'Registrar perfil',
        divClass: 'nav-link',
        botonClass: 'btn-primary btn-sm',
        tipo: 'dropdown-item',
        exact: false,
        link: '/registrarPerfil',
        perfil: [1]
    }]
}]