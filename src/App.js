import React, { Component } from 'react';
import Header from './components/Header';
import Lectures from './components/Lectures';

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
      active1: 0,
      active2: 0,
      completed:[]
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
        let main = myActivities.lessonDetails;
        this.setState({
          loading:false, 
          activity: myActivities,
          url: myActivities.lessonDetails[this.state.id].objectiveDetails[0].objectiveVideosDetails[0].url // First lesson first video is getting assigned.
        });
        //console.log(this.state.activity);
        //Storing data in localStorage for state management. Clearable by exit session
        if(localStorage.getItem("reactSpa") === null){
          localStorage.setItem('reactSpa', JSON.stringify(this.state.activity));
        }
        const totalList = {lesson:''};
        let obj = {status: '', lessonCompleted: false};
        this.state.activity.lessonDetails.map((value) =>{
            //this.state.activities.push(obj);
            return this.state.completed.push(totalList);
        });
        main.map((el) =>{
          return (
            el.objectiveDetails.map((el2) => {
              return el2.activities.push(obj);
            })
          )
        });
        //console.log(this.state.activity);
        
    })
  }

  // On click exit session Clear localStorage data for this App.
  clearStoage(){
    localStorage.clear('reactSpa');
  }

  // Lesson menu (header) links click event.
  lessionEvent(index) {
    this.setState({ 
      id: index, 
      url: this.state.url,
      isPlaying:false,
      projectId: 0,
      active1:0,
      active2:0
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

  // To pause video
  playerOnPause(){
    this.setState({isPause: 'isPause', playing: false })
  }

  // lesson done button event
  // I know I am laoding all the API javaScript. But I wan't getting any better way to do it. 
  lessionDoneEvent(index, status, id){

    this.setState({
      active1: id, 
      active2: index
    });

    let stateCopy = Object.assign({}, this.state.activity);
    stateCopy.lessonDetails[id].objectiveDetails[index].activities[0].status = status;
    stateCopy.lessonDetails[id].objectiveDetails[index].activities[0].lessonCompleted = true;
    this.setState(stateCopy);

    //const totalLessons = this.state.activity.lessonDetails[id].objectiveDetails;
    /*let totalObj = false;
    let isTrue = '';
    totalObj = totalLessons.map((object) => {
        return object.activities[0].lessonCompleted;
    }).every((val, i, arr) => val === arr[0]);
    totalObj ? isTrue = 'completed' : isTrue = '';
    */

    //console.log(this.state.completed);
    //let stateComplete = Object.assign({}, this.state.completed);
    //stateComplete[id].lesson = isTrue;
    //console.log(stateComplete[id]);
    //this.setState({stateComplete});
    /*this.setState(prevState => ({
      stateComplete: [...prevState.stateComplete, {"lesson": isTrue}]
    }))*/
    


    /*//let obj = {status: '', lessonCompleted: ''};
    let myActivities = JSON.parse(JSON.stringify(this.state.activity));
    let main = myActivities.lessonDetails[id].objectiveDetails[index];
    
    //main.activities.push(obj);
    main.activities[0].status = status;
    let totalObj = false;

    //console.log(id);
    if(main.activities.length >= 1){
      const totalLessons = myActivities.lessonDetails[id].objectiveDetails;
      totalObj = totalLessons.map((object) => {
        return object.activities.length === 1;
      }).every((val, i, arr) => val === arr[0]);
    }
    main.activities[0].lessonCompleted = totalObj;

    console.log(myActivities);

    this.setState({
      activity: myActivities
    });
    */
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
