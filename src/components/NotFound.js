import React from 'react';
import {Link} from "react-router-dom";

function NotFound(props) {
        return (
            <Fragment>
                <p>Nothing here ...</p>
                <Link to="/" className="button">
                    Go back to expense list
                </Link>
            </Fragment>
        )
}

export default NotFound;