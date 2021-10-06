import styles from "./index.module.css";

export interface MdxVideoPropsType {
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  children: {
    props: {
      src: string;
      type: string;
    };
  }[];
}

export const MdxVideo = (props: MdxVideoPropsType) => {
  const { autoplay, loop, muted, playsinline, children } = props;

  return (
    <video
      autoPlay={autoplay}
      className={styles.video}
      loop={loop}
      muted={muted}
      playsInline={playsinline}
    >
      {children.map(({ props }) => (
        <source key={props.type} src={props.src} type={props.type} />
      ))}
    </video>
  );
};
