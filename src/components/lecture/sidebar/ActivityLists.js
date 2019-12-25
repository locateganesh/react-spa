import React, { Component } from 'react';

class ActivityLists extends Component{
    render(props){
        const initial = this.props;
        const iconImage = {backgroundImage: 'url(./img/actions.png)'};
        const data = initial.actData;
        return (
            <li onClick={initial.lessionDoneEvents.bind(this, data.currentId, data.status, data.id)} style={iconImage} title={data.title}></li> 
        )
    }
}
export default ActivityLists;