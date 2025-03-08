export const getLyrics = async (track_isrc: string) => {
  return fetch(
    `https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?${process.env.MUSIXMATCH_API_KEY}?${track_isrc}`
  );
};
