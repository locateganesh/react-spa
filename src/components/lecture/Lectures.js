import React, { Component } from 'react';
import Sidebar from './sidebar/Sidebar';
import Videos from './video/Videos';
import './lectures.css'; // video player and container common styling

class Lectures extends Component {
    render(props){
        return (
            <div className="lectures flex">
                {/* Sidebar and video container components and its properties being inherited from app component using ES6 spread operator. */}
                <Sidebar {...this.props}  />
                <Videos {...this.props} />
            </div>
        )
    }
};

export default Lectures;