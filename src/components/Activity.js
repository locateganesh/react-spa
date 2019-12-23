import React, { Component } from 'react';

class Activity extends Component{
    render(props){
        const initial = this.props;
        return (
            <div>
                <button className="activity__btn" onClick={initial.openModals.bind(this)}>
                    <img src={initial.data.image} alt={initial.data.alt} />
                    <span className="activity__name">{initial.data.alt}</span>
                </button>
            </div>
        )
    }
}

export default Activity;