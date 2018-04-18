import React, {Component} from 'react';

class PlayerBar extends Component {
  render() {
    return(
      <section className = 'player-bar'>
        <section id='buttons'>
          <button id='previous' onClick={this.props.handlePrevClick}>
            <span className='ion-skip-backward'> </span>
          </button>
          <button id='play-pause' onClick={this.props.handleSongClick}>
            <span className={this.props.isPlaying ? 'ion-pause' : 'ion-play'}></span>
          </button>
          <button id='next' onClick={this.props.handleNextClick}>
            <span className='ion-skip-forward'> </span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">{this.props.currentTime}</div>
          <input
            type="range"
            className="mdl-slider mdl-js-slider"
            value={(this.props.currentTime / this.props.duration) || 0}
            max='1'
            min='0'
            step='0.01'
            onChange={this.props.handleTimeChange}
             />
          <div className="total-time">{this.props.duration || 0}</div>
        </section>
        <section id="volume-control">
          <div className="material-icons" onClick = {this.props.handleVolumeDown}>volume_down</div>
          <input
              type="range"
              className="mdl-slider mdl-js-slider"
              value={this.props.volume}
              max="10"
              min="1"
              step="1"
              onChange={this.props.handleVolumeChange}
               />
          <div className="material-icons" onClick = {this.props.handleVolumeUp}>volume_up</div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
