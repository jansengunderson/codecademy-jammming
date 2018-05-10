import React from 'react';
import './Playlist.css';

import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {
  handleNameChange(e){
    const name = e.target.value;
    this.props.onNameChange(name);
  };

  render() {
    return (
      <div className="Playlist">
        <input defaultvalue={'New Playlist'} value={this.props.playlistName} onChange={this.handleNameChange}/>
          <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
