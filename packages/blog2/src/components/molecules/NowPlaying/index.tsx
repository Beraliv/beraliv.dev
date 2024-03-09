import NextImage from "next/legacy/image";
import useSwr from "swr";
import { fetchJson } from "../../../functions/fetchJson";
import { PlayingApi } from "../../../types/PlayingApi";
import { SpotifyIcon } from "../../atoms/SpotifyIcon";
import styles from "./index.module.css";

export const NowPlaying = () => {
  const { data } = useSwr<PlayingApi>(`/api/playing`, fetchJson);

  return (
    <div className={styles.nowPlaying}>
      {data?.albumImageUrl ? (
        <div className={styles.albumImage}>
          <NextImage
            width={50}
            height={50}
            alt="cover of album"
            src={data.albumImageUrl}
          />
        </div>
      ) : (
        <div className={styles.spotifyIcon}>
          <SpotifyIcon />
        </div>
      )}
      {data?.songUrl ? (
        <>
          <div className={styles.equaliser}>
            <NextImage
              width={25}
              height={25}
              alt="equaliser"
              src="/equaliser-animated.gif"
            />
          </div>
          <a href={data.songUrl} target="_blank" rel="noopener noreferrer">
            {data.songName} • {data.artistName}
          </a>
        </>
      ) : (
        <span>Not Playing</span>
      )}
    </div>
  );
};
