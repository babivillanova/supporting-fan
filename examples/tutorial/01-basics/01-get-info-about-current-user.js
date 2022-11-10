const SpotifyWebApi = require('../../../');
const token = 'BQCSOjVcG_36YX5Z5REV7Wb9nvgqNtrj7dArqFHJ5aGvjyoogK7ZUf172Qyq4gCB0oAUgmVvL8ly_lBz1Mxs5F9HbtexU2N33dr8LYcjrHxucepHBtayAZRomT7ZiZ3t1VGAO7Xeik0CuoEA87zvUuKrHg75kTbPj_u8g7Wwan7Ijj7DM2uHxJnjpPsZlsvWGgcuuZd7TNQZA8EZC9LRiMZUchx2WNkMIsFbBYmuwPJ4rOldZqi6BfIiGX8PFjPOIWc-fhLtjSqsKoZQ4TnAfsbTLfi-aIQZkupjwwd27puOH2S0lhhu9tCa6hNIAWVqE5B-3J-SF75FsQHd1QxZ'
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

(async () => {
  const me = await spotifyApi.getMe();
  console.log(me);
})().catch(e => {
  console.error(e);
});
