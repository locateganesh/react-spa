import React, { Component } from 'react';

class Modal extends Component{
    render(props){
        const initial = this.props;
        const data = initial.activeState[initial.projectId];
        return (
            <div className={`overlay ${this.props.openModel ? 'showPopup': ''}`}>
                <div className="overlay__inner flex aic jcc">
                    <dialog className="dialog">
                        <button className="close_btn" onClick={initial.closeModals.bind(this)}></button> 
                        <p style={{display: data.classFlow==='' || data.classFlow==='-'?'none':''}}>{data.classFlow}</p>
                        <p style={{display: data.reference===''?'none':''}}>{data.reference}</p> 
                        <p style={{display: data.reference==='' && (data.classFlow==='' || data.classFlow==='-')?'block':'none'}}>No Data Available</p> 
                    </dialog>
                </div>
            </div>
        )
    }
}

export default Modal;