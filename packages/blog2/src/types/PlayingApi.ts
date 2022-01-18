export type PlayingApi =
  | {
      isPlaying: false;
    }
  | {
      album: string;
      albumImageUrl: string | undefined;
      artist: string;
      isPlaying: boolean;
      songUrl: string;
      title: string;
    };
