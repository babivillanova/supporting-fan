const SpotifyWebApi = require('../../../');
const access_token = require('../00-get-access-token');

const spotifyApi = new SpotifyWebApi();
// spotifyApi.setAccessToken(process.env.SPOTIFY_ACCESS_TOKEN);
spotifyApi.setAccessToken(access_token);


(async () => {
  const me = await spotifyApi.getMe();
  console.log(me);
})().catch(e => {
  console.error(e);
});
