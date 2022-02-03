import { useEffect } from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { PROMO_IMAGE } from "../../../constants/PROMO_IMAGE";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { SanitisedString } from "../../../types/SanitisedString";
import { Seo } from "../../molecules/Seo";
import styles from "./index.module.css";

const NOT_FOUND_TITLE = "Not Found" as SanitisedString;

export const NotFound = () => {
  const { author, keywords, url } = BLOG_META_INFO;

  const { darkMode } = useDarkMode();

  useEffect(() => {
    plausible("404", { props: { path: document.location.pathname } });
  }, []);

  return (
    <div className={styles.container}>
      <Seo
        description={`${author} blog`}
        image={PROMO_IMAGE}
        keywords={keywords}
        path={url}
        title={NOT_FOUND_TITLE}
      />

      <h1 className={styles.notFound}>{darkMode ? "🤷" : "🤷🏿"}</h1>
    </div>
  );
};
