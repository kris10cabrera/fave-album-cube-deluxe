import { useEffect, useState } from "react";


export default function Button({ fetchUser }) {
  const [button, showButton] = useState(true);
  const client_id = `ad145c69010649da928b415e62ba0343`;
  const redirect_uri = `https://fave-album-cube-deluxe.vercel.app/`;
  const scopes = `user-top-read`;
  const AUTHORIZATION_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&redirect_uri=${redirect_uri}&scope=${scopes}&show_dialog=true`
  const login = () => {
    let popup = window.open(
      AUTHORIZATION_URL,
      'Login with Spotify',
      'width=800,height=600'
    )
    window.spotifyCallback = (payload) => {
      console.log("there")
      popup.close()
      fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term', {
        headers: {
          'Authorization': `Bearer ${payload}`
        }
      }).then(response => {
        return response.json()
      }).then(data => {
        const {items} = data;
        showButton(false);
        const allAlbums = items.map((item) => ({
          album: item.album.name,
          images: item.album.images,
          artist: item.album.artists.map((_artist) => _artist.name).join(' + ')
        }));
        const uniqueAlbums = [];
        const map = new Map();
        for (const item of allAlbums) {
          if (uniqueAlbums.length < 6) {
            if (!map.has(item.album)) {
              map.set(item.album, true);    // set any value to Map
              uniqueAlbums.push({
                album: item.album,
                images: item.images,
                artist: item.artist
              });
            }
          }
        }
        console.log(items);
        console.log('hi');
        fetchUser(uniqueAlbums);
      })
    }
  }

  useEffect(() => {
    const token = window.location.hash.substr(1).split('&')[0].split("=")[1];
    if (token) {
      window.opener.spotifyCallback(token)
    }
  }, []);

  return (<button onClick={login} style={{ display: button ? 'block' : 'none' }}>
    <img src="/button.svg" />
  </button>)
};