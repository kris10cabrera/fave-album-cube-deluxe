import { getRecentlyPlayed } from '../../lib/spotify';

export default async (_, res) => {
  const response = await getRecentlyPlayed();
  const { items } = await response.json();

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
  
  return res.status(200).json({ uniqueAlbums });
};