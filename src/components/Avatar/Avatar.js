import React from 'react';
import "./Avatar.css"

class Avatar extends React.Component {
    render() {
        return (
            <div className="col-sm-12 avatar-container text-center">
                <img className="img-avatar" src="/images/default.png" />
            </div>
        )
    }
}

export { Avatar }
