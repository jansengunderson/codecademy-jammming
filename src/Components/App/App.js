import React from 'react';
import './App.css';

import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


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
};

addTrack(track) {
  if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
    return; //this return breaks out of the method... ?
  }
};

removeTrack(track) {
 if (this.state.playlistTracks.find(savedTrack => savedTrack.id !== track.id)) {
   return;
 }
};

updatePlaylistName(name) {
 this.state({
   playlistName: name
 })
};

render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.state.removeTrack}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
