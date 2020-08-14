import React from 'react';

import { Link } from 'react-router-dom';

const Button = ({ pathname, hashId, state, buttonClass, iconClass, buttonTitle, buttonLabel }) => {
    var stateValues = (typeof state !== 'undefined' ? state : {})
    return (
		<Link to={{ pathname: pathname, search: hashId, state: stateValues }}>
            <button type="button" className={buttonClass} title={buttonTitle}>
                {typeof iconClass !== 'undefined' ? <i className={iconClass}></i>: ''} {buttonLabel}
            </button>
        </Link>
	);
}

export default Button;