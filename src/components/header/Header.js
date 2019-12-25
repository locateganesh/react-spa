import React, { Component } from 'react';
import './header.css'; // Header css from scss for header component style.

class Header extends Component {
    render(props){
        const initial = this.props;
        const data = initial.activity;
        //console.log(initial.projectId);

        return(
            <header className="header flex aic">

                {/* A static profile image */}
                <div>
                    <img src="./img/user-dp.jpg" alt="user-profile" />
                </div>

                {/* Header dynamic title and lessons. */}
                <div className="header__mid">
                    <div>
                        <h1 className="header__title font--nunito">{data.recitalTitle}</h1>
                    </div>
                    <div className="flex aic jcc">
                        <p className="header__menu-hint">Lessons</p>
                        <ul className="header__menu">
                            {data.lessonDetails.map((counter, index) => {
                                return (
                                    <li key={counter.id}>
                                        <button 
                                            onClick={initial.lessionEvents.bind(this, index)} 
                                            className={`menu__link ${initial.id === index ? 'active' : ''} ${initial.completed.length >= 1 ? initial.completed[index].isFinished : ''}`} 
                                            type="button">
                                            {index+1}
                                        </button> 
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

                {/* Dynamic exercise name and static exit button */}
                <div className="flex flex-col">
                    <h3 className="header__title header--h3 font--nunito flex-1">{data.instrumentTitle}</h3>
                    <button onClick={initial.clearStoages.bind(this)} className="primary-btn" type="button">Exit Session</button>
                </div>
            </header>
        )
    }
}



export default Header;