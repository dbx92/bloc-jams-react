import React, {Component} from 'react';
import albumData from './../data/albums';
import PlayerBar from "./PlayerBar";

class Album extends Component {
  constructor(props) {
    super(props);
    //the Album component should be a button in library? instead of a link? or fill a blank
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });

    this.state = {
      album:album,
      currentSong:album.songs[0],
      currentTime:0,
      duration: album.songs[0].duration,
      isPlaying:false,
      currentVolume:4
    };

    this.audioElement = document.createElement('audio');
    this.audioElement.src = album.songs[0].audioSrc;
    this.audioElement.volume = .4;
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying:true});
  }

  pause(){
    this.audioElement.pause();
    this.setState({isPlaying:false});
  }

  componentDidMount(){
    this.eventListeners = {
        timeupdate: e => {
          this.setState({ currentTime: this.audioElement.currentTime });
        },
        durationchange: e => {
          this.setState({ duration: this.audioElement.duration });
        }
      };
      this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
      this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
   }

  setSong(song){
    this.audioElement.src = song.audioSrc;
    this.setState({currentSong:song});
  }

  handleSongClick(song){
    const isSameSong = this.state.currentSong === song;
    if(this.state.isPlaying && isSameSong){
      this.pause();
    }else{
      if(!isSameSong){this.setSong(song);}
      this.play();
    }
  }

  handlePrevClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong ===song);
    const newIndex = Math.max(0,currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play(newSong);
  }

  handleNextClick(){
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong ===song);
    const newIndex = Math.min(this.state.album.songs.length -1,currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    if(currentIndex===newIndex){
      this.pause();
    }else{
    this.setSong(newSong);
    this.play(newSong);
  }
}

  handleVolumeChange(e){

    const newVolume =  e.target.value;
    this.audioElement.volume = (newVolume/10);
    this.setState({currentVolume:newVolume});
      console.log(newVolume);
  }

  handleTimeChange(e) {
     const newTime = this.audioElement.duration * e.target.value;
     this.audioElement.currentTime = newTime;
     this.setState({ currentTime: newTime });
   }

   formatTime(time){
     const minutes = Math.floor(time/60);
     const seconds = Math.round(time - minutes * 60);
     const newTime = minutes+":"+seconds;
     return newTime;
   }
   onHover(e,song){
     console.log(e.target);
     const newIcon = <span className='ion-play'> </span>
     if(this.state.isPlaying=false){

     }
   }

   render() {
     return (
      <section className="album">
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="album-cover" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title}</h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
        </section>
        <table id="song-list">
          <colgroup>
            <col id="song-number-column" />
            <col id="song-title-column" />
            <col id="song-duration-column" />
          </colgroup>
          <tbody>
            {this.state.album.songs.map( (song, index) =>
<<<<<<< HEAD
             <tr className="song" key={index} onClick ={() => this.handleSongClick(song)} >
                <button>
=======
             <tr className="song" key={index} onClick ={() => this.handleSongClick(song)} onMouseOver={(e) => this.onHover(e,song)}>
>>>>>>> range-inputs
                <td className="song-number">{index+1}</td>
                <td className="song-title">{song.title}</td>
                <td className="song-duration">{song.duration}</td>
                </button>
              </tr>
            )}
          </tbody>
        </table>
        <PlayerBar
          isPlaying={this.state.isPlaying}
          currentSong={this.state.currentSong}
          currentTime={this.audioElement.currentTime}
          duration={this.audioElement.duration}
<<<<<<< HEAD
=======
          volume={this.state.currentVolume}
          handleVolumeChange={(e)=>this.handleVolumeChange(e)}
>>>>>>> range-inputs
          handleSongClick={() => this.handleSongClick(this.state.currentSong)}
          handlePrevClick={() => this.handlePrevClick()}
          handleNextClick={() => this.handleNextClick()}
          />
      </section>
  );
  }
}
export default Album;
