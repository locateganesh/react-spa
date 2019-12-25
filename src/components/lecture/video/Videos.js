import React, { Component }  from 'react';
import ReactPlayer from 'react-player';
import Activity from './Activity';
import Modal from './Modal';

class Videos extends Component {

    // I did stating of videos in this page but when I realised other componenets event has to do the same the I inherited to parent component. 
    /*constructor(props){
        super(props)
        this.state = {
            url: this.props.firstVid,
            playing: this.props.isPlay,
            isPause: this.props.isPause,
            //ifVidPlaying: this.props.isPlaying
            //data:[]
        }
    }*/

    render(props){
        const initial = this.props;
        const { url, playing } = this.props; // Getting videos default properties from app conmponets. 
        const thumbnails = this.props.activity.lessonDetails[initial.id].objectiveDetails; // Getting the lession data from its state and state id.
        const vidData = thumbnails[initial.projectId];
        
        return (
            <div className={`playerHolder flex-1 ${initial.isPause}`}>
                {/* Common image cover for videos. */}
                <div className="video-cover" style={{backgroundImage:'url(./img/video-cover.jpg)'}}></div> 

                {/* A transapent button just over play icon to play video. */}
                <button onClick={initial.centerPlayBtn.bind(this)} type="button" className="video-player"></button>

                {/* Thumbnail iteration with with events. */}
                <ul className="video-thumbnail" style={{display: thumbnails.length >= 1 ? '' : 'none'}}>
                    {thumbnails.map((allVideos, index) => {
                        const currentVid = allVideos.objectiveVideosDetails[0].url;
                        return(
                            <li key={allVideos.id} onClick={initial.videoThumbnails.bind(this, currentVid, index)}><img className={initial.projectId === index ? 'activeVideo' : ''} src="./img/image-thumbnail.jpg" alt={allVideos.title} /></li> 
                        )
                    })}
                </ul>

                {/* Activties and classFlow. Visibility depends of data. */}    
                <div className="activity">
                    <div style={{display: vidData.activitiesDetails < 1 ? 'none': ''}}>
                        <Activity {...initial} data={{image: './img/activity.png', alt: 'View Activity'}} />
                    </div>
                    <div style={{display: vidData.reference==='' && (vidData.classFlow==='' || vidData.classFlow==='-') ? 'none' : ''}}>
                        <Activity {...initial} data={{image: './img/classFlow.png', alt: 'View Classflow'}} />
                    </div>
                </div>

                {/* React player of playing vimeo videos. All the values are assigning by state */}
                <ReactPlayer 
                    ref={initial.ref}
                    url={url} controls className="video-iframe" allowFullScreen
                    playing={playing}
                    onPlay={initial.handlePlay.bind(this)} 
                    onPause={initial.handlePause.bind(this)}
                    onEnded={initial.handleEnd.bind(this, initial.id, initial.projectId)}
                    width="100%"
                    height="100%"
                />

                 {/* Custom Modal */}   
                 <Modal {...initial} activeState={thumbnails} />   
            </div>
        )
    }
}

export default Videos;