import styles from "./index.module.css";

type MdxYouTubeProps = {
  title: string;
  href: string;
};

export const MdxYouTube = ({ href, title }: MdxYouTubeProps) => {
  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.youtubeIframe}
        src={href}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
};
