import React, {Component, Fragment} from 'react'

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

    render() {
		
        return (
            <div className="mt-3 mx-auto ancho1200">
				<SelectionProcessForm />
			</div>
        );
    }
}

export default (SelectionProcessFormContainer);