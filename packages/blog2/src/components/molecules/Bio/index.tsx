import NextImage from "next/legacy/image";
import styles from "./index.module.css";

interface BioPropsType {
  title: string;
  isTitleBig: boolean;
  subtitle: string;
  text: string;
}

export const Bio = ({ isTitleBig, title, subtitle, text }: BioPropsType) => {
  return (
    <div className={styles.bio}>
      <div className={styles.head}>
        <div className={styles.headText}>
          {isTitleBig ? <h1>{title}</h1> : <h2>{title}</h2>}
          <h3>{subtitle}</h3>
        </div>
        <div className={styles.avatarContainer}>
          <NextImage
            src="/profile_v2.png"
            width={96}
            height={96}
            alt="The portrait photo of me"
          />
        </div>
      </div>
      <p className={styles.summary}>{text}</p>
    </div>
  );
};
