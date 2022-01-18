export type PlayingApi =
  | {
      isPlaying: false;
    }
  | {
      albumImageUrl: string | undefined;
      albumName: string;
      artistName: string;
      isPlaying: boolean;
      songName: string;
      songUrl: string;
    };
