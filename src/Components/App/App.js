import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Track from '../Track/Track';


class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
    searchResults:[
    { name: 'Psalm 69',
      artist: 'Ministry',
      album: 'Psalm 69',
      id: '666' },
    { name: 'Back In Black',
      artist: 'ACDC',
      album: 'Back In Black',
      id: '667' },
    { name: 'Inquisition',
      artist: 'Skinny Puppy',
      album: 'Last Rites',
      id: '668' },
    ],
    playlistTracks: [
      { name: 'Psalm 69',
        artist: 'Ministry',
        album: 'Psalm 69',
        id: '667'},
        { name: 'Back In Black',
          artist: 'ACDC',
          album: 'Back In Black',
          id: '667' },
    ],
    playlistName: [
      'Playlist'
    ]
}
this.addTrack = this.addTrack.bind(this);
this.removeTrack = this.removeTrack.bind(this);
this.updatePlaylistName = this.updatePlaylistName.bind(this);
this.savePlaylist = this.savePlaylist.bind(this);
};

// add the track if it is not already in the playlist
addTrack(track) {
  let tracks = this.state.playlistTracks;
  //let results = this.state.searchResults;
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) { // checks to see if the current song is in the playListsTracks state
    return;
  }
  tracks.push(track); // if the id is new, add sont to the end of the playlist
  this.setState({playlistTracks: tracks}); // sets the new state of the playlist
};

// removes a song from a custom playlist when the user selects the - sign inside of a rendered track
removeTrack(track) {
 let tracks = this.state.playlistTracks;
 tracks = tracks.filter(song => song.id !== track.id);
     this.setState({playlistTracks: tracks})
};

// allows user to update the name of their playlist
updatePlaylistName(name) {
 this.setState({
   playlistName: name
 })
};

// saves playlist to user's Spotify account
savePlaylist() {
  let playlistName = this.state.playlistName;
  const trackURIs = [];

}

render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
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
