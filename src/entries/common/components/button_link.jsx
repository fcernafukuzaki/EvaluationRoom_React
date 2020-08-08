import React from 'react';

import { Link } from 'react-router-dom';

const Button = ({ pathname, hashId, buttonClass, buttonTitle, buttonLabel }) => {
	return (
		<Link to={{ pathname: pathname, search: hashId, state: { } }}>
            <button type="button" className="btn btn-outline-secondary btn-sm" title={buttonTitle}>
                <i className={buttonClass}></i> {buttonLabel}
            </button>
        </Link>
	);
}

export default Button;