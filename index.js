/**
 * This example is using the Authorization Code flow.
 *
 * In root directory run
 *
 *     npm install express
 *
 * then run with the followinng command. If you don't have a client_id and client_secret yet,
 * create an application on Create an application here: https://developer.spotify.com/my-applications to get them.
 * Make sure you whitelist the correct redirectUri in line 26.
 *
 *     node access-token-server.js "<Client ID>" "<Client Secret>"
 *
 *  and visit <http://localhost:8888/login> in your Browser.
 */
const SpotifyWebApi = require('./');
const express = require('./node_modules/express');

const scopes = [
  'ugc-image-upload',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-currently-playing',
  'streaming',
  'app-remote-control',
  'user-read-email',
  'user-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-read-private',
  'playlist-modify-private',
  'user-library-modify',
  'user-library-read',
  'user-top-read',
  'user-read-playback-position',
  'user-read-recently-played',
  'user-follow-read',
  'user-follow-modify'
];

const spotifyApi = new SpotifyWebApi({
  redirectUri: 'https://supporting-fan.vercel.app/callback/',
  clientId: '0c1de2a0cc87495e848c68af37f8ea07',
  clientSecret: 'e7be1ae6f8c5458d8d8757e28922f427'
});

const app = express();

app.get('/login', (req, res) => {
  res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
  const error = req.query.error;
  const code = req.query.code;
  const state = req.query.state;

  if (error) {
    console.error('Callback Error:', error);
    res.send(`Callback Error: ${error}`);
    return;
  }

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      const access_token = data.body['access_token'];
      const refresh_token = data.body['refresh_token'];
      const expires_in = data.body['expires_in'];

      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      console.log('access_token:', access_token);
      console.log('refresh_token:', refresh_token);
    
      console.log(
        `Sucessfully retreived access token. Expires in ${expires_in} s.`
      );


      (async () => {
        const me = await spotifyApi.getMe();
        const music = await spotifyApi.getMyRecentlyPlayedTracks({
          limit : 20
        });
        musicJson = JSON.stringify(music.body.items);
        console.log(me);
        console.log(musicJson);
      })().catch(e => {
        console.error(e);
      });

      // (async () => {
      //   const music = await spotifyApi.getMyRecentlyPlayedTracks({
      //     limit : 20
      //   }).then(function(data) {
      //       // Output items
      //       console.log("Your 20 most recently played tracks are:");
      //       console.log(music);
      //       data.body.items.forEach(item => console.log(item.track));
      //     }, function(err) {
      //       console.log('Something went wrong!', err);
      //     });});

      // res.send('Success! You can now close the window.');
      //create timeout res.send 
      setTimeout(function() {
        res.send(musicJson);
        // res.sendFile('music.html', { root: __dirname });
      }, 1000);

     




      setInterval(async () => {
        const data = await spotifyApi.refreshAccessToken();
        const access_token = data.body['access_token'];

        console.log('The access token has been refreshed!');
        console.log('access_token:', access_token);
        spotifyApi.setAccessToken(access_token);
        //export access_token to be used in other files
        module.exports = access_token;
      }, expires_in / 2 * 1000);
    })
    .catch(error => {
      console.error('Error getting Tokens:', error);
      res.send(`Error getting Tokens: ${error}`);
    });
});

app.listen(8888, () =>
  // open new window in browser without having to click on link
  require('open')('http://localhost:8888/login')
  //   console.log(
  //   'HTTP Server up. Now go to http://localhost:8888/login in your browser.'
  // )
);


