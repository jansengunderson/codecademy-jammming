/* Gonna try an AJAX request */
async savePlaylist(playlistName, trackURIs) {
  this.getAccessToken();
  let userId = '';
  let playlistID = '';
  const headers = { Authorization: `Bearer ${accessToken}` };

  try {
    let response = await fetch('https://api.spotify.com/v1/me', {
     method: 'POST',
     headers: headers
   }).then(async (response) => {
     if (response.ok) {
       let jsonResponse = await response.json();
     }
     throw new Error('Request failed!');
   }, networkError => console.log(networkError.message)
 ).then(async (jsonResponse) => {
   userId = jsonResponse.id;
   console.log('this is your user ID: ' + userId);
   return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
     method: 'POST',
     headers: headers,
     body: JSON.stringify({name: playlistName})
   }).then(async (jsonResponse) => {
     playlistID = jsonResponse.id;
     console.console.log('The playlists: ' + playlistID);
     return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
       method: 'POST',
       headers: headers,
       body: JSON.stringify({uris: trackURIs})
     })
   })
 })
}
catch (error) {
    console.log(error);
}
}

/* here's my old request */
savePlaylist(playlistName, trackURIs) {
  this.getAccessToken();
  let userId = '';
  let playlistID = '';
  const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` }

  if (playlistName && trackURIs) {
    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request failed!');
    }, networkError => console.log(networkError.message)
  ).then(jsonResponse => {
    userId = jsonResponse.id;
    console.log('this is your user ID:' + userId);
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({name: playlistName})
    }).then(jsonResponse => {
        return playlistID = jsonResponse.id;
    }).then(jsonResponse => {
        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({uris: trackURIs})
      });
    });
  })

  } else {
    return;
  }
},
