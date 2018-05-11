import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';



class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
    searchResults:[],
    playlistTracks: [],
    playlistName: [
      'Edit Me'
    ]
}
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
this.search = this.search.bind(this);
};

// add the track if it is not already in the playlist
addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === this.state.playlistTracks.id)) {
      return;
    } else {
      let tracks = this.state.playlistTracks;
      tracks.push(track);
      this.setState({ playlistTracks: tracks });
      return;
    }
  }


// removes a song from a custom playlist when the user selects the - sign inside of a rendered track
removeTrack(track) {
 let tracks = this.state.playlistTracks;
 tracks = tracks.filter(song => song.id !== track.id);
     this.setState({playlistTracks: tracks})
}

// allows user to update the name of their playlist
updatePlaylistName(name) {
 this.setState({
   playlistName: name
 })
}

// saves playlist to user's Spotify account
savePlaylist() {
  let playlistName = this.state.playlistName;
  const trackURIs = [];
}

// searches Spotify
search(term) {
  Spotify.search(term).then(searchTracks => (this.setState({searchResults: searchTracks})
  ) )
}

render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} onNameChange={this.updatePlaylistName}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
