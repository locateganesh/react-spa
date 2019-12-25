import React, { Component } from 'react';
import Header from './components/header/Header';
import Lectures from './components/lecture/Lectures';

class App extends Component {
  constructor(props) {
    super(props);
    // All used states.
    this.state = {
      loading:true,
      activity:[],
      id: 0,
      projectId: 0,
      url:null,
      isPlaying:false, // Player is not playing by default.
      isPause:'isPause', // A class adding and removing depending on video play and pause.
      openModel: false,
      completed:[],
      active:[]
    }
  }  

  /*load = url => {
    this.setState({
      url: this.props.url,
      playing: this.props.isPlay,
      played: 0,
      loaded: 0
    })
  }*/
  
  // Fatching API data and storing it state.
  componentDidMount = () => {
    fetch("https://api.myjson.com/bins/qubzl")
    .then(response => response.json())
    .then(data => {
        //let myActivities = JSON.parse(localStorage.getItem('reactSpa')) || JSON.parse(JSON.stringify(data));
        let myActivities = data;
        this.setState({
          loading:false, 
          activity: myActivities,
          url: myActivities.lessonDetails[this.state.id].objectiveDetails[0].objectiveVideosDetails[0].url // First lesson first video is getting assigned.
        });

        // Looping though lesson and objective length and creating a default state for lesson status.
        const projectLength = this.state.activity.lessonDetails.length;
        let lessons = [...this.state.active];
        let isCompleted = [...this.state.completed];
        for(let i = 0; i < projectLength; i++){
          lessons.push({ lesson: [] }); 
          isCompleted.push({isFinished: ''});
          const objLength = this.state.activity.lessonDetails[i].objectiveDetails;
          for(let j=0; j < objLength.length; j++){
            lessons[i].lesson.push({isStatus: ''}); //storing empty objects depending on data.
          }
        }
        this.setState({ active: lessons, completed: isCompleted });

        //Storing data in localStorage for state management. Clearable by exit session
        if(localStorage.getItem("reactSpa") === null){
          localStorage.setItem('reactSpa', JSON.stringify(this.state.activity));
        }

    });
  }

  // On click exit session Clear localStorage data for this App.
  clearStoage(){
    localStorage.clear('reactSpa');

    let clearProgress = [...this.state.completed]; // clear lesson complete data.
    let clearLesson = [...this.state.active];
    

    for(var i = 0; i < clearProgress.length; i++){
      clearProgress[i].isFinished = '';
      const objLength = this.state.activity.lessonDetails[i].objectiveDetails;
      for(let j=0; j < objLength.length; j++){
        clearLesson[i].lesson[j].isStatus = ''; // clear lessons data.
      }
    }

    this.setState({
      id: 0,
      url: this.state.activity.lessonDetails[this.state.id].objectiveDetails[0].objectiveVideosDetails[0].url,
      projectId: 0,
      active: clearLesson, 
      completed: clearProgress,
      playing: false,
      isPause: 'isPause'
    })
  }

  // Lesson menu (header) links click event.
  lessionEvent(index) {
    this.setState({ 
      id: index, 
      url: this.state.url,
      isPlaying:false,
      projectId: 0
    });
  }

  // Video center play button event.
  mainPlayBtn(){
    this.setState({isPause: 'isPlay', playing: true });
  }

  // Thmbnail od video (At bottom of videos) click events
  videoThumbnail(vidLink, index) {
    this.setState({isPause: 'isPlay', url: vidLink, playing: true, projectId: index});
  }

  // sidebar video links events
  updateVideo(names, index){
    this.setState({isPause: 'isPlay', url: names, playing: true, projectId: index});
  }

  // To play video
  playerOnPlay(){
    this.setState({isPause: 'isPlay', playing: true });
  }

  // on video end state becomes completed
  playerOnEnd(id, index){
    let onEndState = [...this.state.active];
    let onEndComplete = [...this.state.completed];
    onEndState[id].lesson[index].isStatus = 'done';

    const allSelected = onEndState[id].lesson.map((el) => {
      return el.isStatus !== '';
    }).every((i) => { return i; });
    allSelected ? onEndComplete[id].isFinished = 'completed' : onEndComplete[id].isFinished = '';
    this.setState({ active: onEndState, completed: onEndComplete }); 
  }

  // To pause video
  playerOnPause(){
    this.setState({isPause: 'isPause', playing: false })
  }

  // lesson done button event 
  lessionDoneEvent(index, status, id){
    
    const progress = [...this.state.active];
    const isAllSelected = [...this.state.completed];
    progress[id].lesson[index].isStatus = status;

    const allSelected = progress[id].lesson.map((el) => {
        return el.isStatus !== '';
    }).every((i) => { return i; });
    allSelected ? isAllSelected[id].isFinished = 'completed' : isAllSelected[id].isFinished = '';
    this.setState({ active: progress, completed: isAllSelected });
  }

  // class flow open popup
  openModal(){
    this.setState({openModel: true});
  }
  // class flow close popup
  closeModal(){
    this.setState({openModel: false});
  }

  // video Player reference
  ref = player => {
    this.player = player
  }

  render() {
    return (
      <section className="App">

        {/* Loader while API and content are loading */}
        {this.state.loading ? (
          <div className="loader">
            <div>
              <div className="loader__animation"></div>
              App is loading. Please wait...
            </div>
          </div>

        ) : (

          <div className="container">

            {/* Header and its properties */}
            <Header 
              {...this.state}
              lectures={this.state.activity} 
              id={this.state.id} 
              lessionEvents={ this.lessionEvent.bind(this) }
              clearStoages={this.clearStoage.bind(this)}
              />

            {/* Video section and Sidebar */}
            <Lectures 
              {...this.state} 
              sideVidLinks={this.updateVideo.bind(this)} 
              centerPlayBtn={this.mainPlayBtn.bind(this)} 
              videoThumbnails={this.videoThumbnail.bind(this)} 
              handlePlay={this.playerOnPlay.bind(this)}
              handlePause={this.playerOnPause.bind(this)}
              handleEnd={this.playerOnEnd.bind(this)}
              lessionDoneEvents={this.lessionDoneEvent.bind(this)}
              openModals={ this.openModal.bind(this) }
              closeModals={ this.closeModal.bind(this) }
            />

          </div>
        )}
        
      </section>
    );
  }
}

export default App;
