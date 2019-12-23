import React, { Component } from 'react';
import ActivityLists from './ActivityLists';

class Sidebar extends Component {
    render(props){
        const initial = this.props;
        //const sideData = initial.lectures.lessonDetails[initial.id]; 
        const updateActivity = initial.activity.lessonDetails[initial.id]; // Active state data.
        return(
            <aside className="sidebar">
                <h2 className="sidebar__title">Menu</h2>
                <div className="sidebar__inner">

                    {/* Sidebar video links and its event. */}
                    <div className="sidebar__btnSpace">
                        {updateActivity.objectiveDetails.map((vidObj, index) => {
                            return (
                                <span key={index}>
                                    {vidObj.objectiveVideosDetails.map((names) => {
                                        return(
                                            <button key={names.id} onClick={initial.sideVidLinks.bind(this, names.url, index)} type="button" className="sidebar__vidLink primary-btn" data-src={names.url}>Video Link {index+1}</button>
                                        )
                                    })}
                                </span>
                            )
                        })}
                    </div>
                    
                    {/* Lesson details and its progress */}
                    {updateActivity.objectiveDetails.map((vidObj, index) => {
                        return (
                            <div className={`sidebar__actions ${vidObj.activities.length >=1 ? vidObj.activities[0].status : ''}`} key={index}>
                                <h3>{vidObj.title} <span>({vidObj.durationInMinutes} <MinToMins value="vidObj.durationInMinutes" />)</span></h3>
                                <ul className="actions__btns flex jc-sa">
                                    <ActivityLists {...initial} actData={{id:initial.id, currentId: index, status:'done', title:'Done'}} />
                                    <ActivityLists {...initial} actData={{id:initial.id, currentId: index, status:'not-done', title:'Not Done'}} />
                                    <ActivityLists {...initial} actData={{id:initial.id, currentId: index, status:'next', title:'Next Lesson'}} />
                                </ul>
                            </div>
                        )
                    })}

                </div>
            </aside>
        )
    }
}

// if value is 1 or less than one then this function returns `min` else `mins`.
function MinToMins(props){
    return props.value < 2 ? 'Min' : 'Mins';
}

export default Sidebar;