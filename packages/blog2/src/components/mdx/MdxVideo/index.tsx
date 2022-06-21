import {
  Children,
  DetailedHTMLProps,
  ReactNode,
  VideoHTMLAttributes,
} from "react";
import styles from "./index.module.css";

export type MdxVideoPropsType = DetailedHTMLProps<
  VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>;

const getAttributes = <S extends string>(node: ReactNode, _: S[]) =>
  node as unknown as { [K in S]: string };

export const MdxVideo = (props: MdxVideoPropsType) => {
  const { autoPlay, loop, muted, playsInline, children } = props;

  return (
    <video
      autoPlay={autoPlay}
      className={styles.video}
      loop={loop}
      muted={muted}
      playsInline={playsInline}
    >
      {Children.map(children, (child) => {
        const { src, type } = getAttributes(child, ["src", "type"]);

        return <source key={type} src={src} type={type} />;
      })}
    </video>
  );
};
