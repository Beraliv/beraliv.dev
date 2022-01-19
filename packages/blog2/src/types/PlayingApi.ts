export type PlayingApi =
  | {
      albumImageUrl?: undefined;
      albumName?: undefined;
      artistName?: undefined;
      isPlaying: false;
      songName?: undefined;
      songUrl?: undefined;
    }
  | {
      albumImageUrl: string | undefined;
      albumName: string;
      artistName: string;
      isPlaying: true;
      songName: string;
      songUrl: string;
    };
