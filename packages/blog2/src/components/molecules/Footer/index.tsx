import { VercelIcon } from "../../atoms/VercelIcon";
import styles from "./index.module.css";

export const Footer = () => (
  <footer className={styles.footer}>
    <a
      href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
      target="_blank"
      rel="noopener noreferrer"
    >
      © {new Date().getFullYear()}, Powered by{" "}
      <div className={styles.logo}>
        <VercelIcon />
      </div>
    </a>
  </footer>
);
