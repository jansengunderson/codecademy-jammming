let accessToken;
let expiresIn;
const client_id = '6dd8b965299942f9a95c080c5c4d8ee0';
const redirect_uri = 'http://localhost:3000/';

const Spotify = {
  getAccessToken() {
    let token = window.location.href.match(/access_token=([^&]*)/);
    let expires = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken) {
      return accessToken;
    } else if (token && expires) {
      accessToken = token[1];
      expiresIn = expires[1];
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}`;
    };
  },

  search(term) {
    Spotify.getAccessToken();

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
        headers: { Authorization: `Bearer ${accessToken}` }
      }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
          if (jsonResponse.tracks) {
            return jsonResponse.tracks.items.map(track => {
              return {
              id: track.id,
              Name: track.name,
              Artist: track.artists[0].name,
              Album: track.album.name,
              uri: track.uri
            }
          })
      } else return [];

  });
},

savePlaylist(playlistName, trackURIs) {
  const accessToken = Spotify.getAccessToken();
  let userID;
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }

  // Send to request to SPOTIFY
  return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => response.json()
  ).then(jsonResponse => {

  // send userID to Spotify
    userID = jsonResponse.id;
    console.log('this is your user ID:' + userID);
  })

  // send playlist name to Spotify
  .then(jsonResponse => {
    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({name: playlistName})
   })
  // response to JSON
   .then(response => {
       return response.json()
     })

  // Send tracks in playlist to Spotify
  .then(jsonResponse => {
      const playlistID = jsonResponse.id;
      return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({uris: trackURIs})
      })
    })
  })
}


}

export default Spotify;
