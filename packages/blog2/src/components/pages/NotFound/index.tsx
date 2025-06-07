import { InferGetStaticPropsType } from "next";
import NextLink from "next/link";
import { useEffect } from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { PROMO_IMAGE } from "../../../constants/PROMO_IMAGE";
import { getNotFoundStaticProps } from "../../../static/getNotFoundStaticProps";
import { SanitisedString } from "../../../types/SanitisedString";
import { Bio } from "../../molecules/Bio";
import { Footer } from "../../molecules/Footer";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import styles from "./index.module.css";
import { Layout } from "../../molecules/Layout";

const NOT_FOUND_TITLE = "Not Found" as SanitisedString;

export const NotFound = ({
  apiKey,
  formId,
}: InferGetStaticPropsType<typeof getNotFoundStaticProps>) => {
  const { author, bio, keywords, title, url } = BLOG_META_INFO;
  const { topTitle, position, text: bioText } = bio;

  useEffect(() => {
    plausible("404", { props: { path: document.location.pathname } });
  }, []);

  return (
    <Layout>
      <Seo
        description={`${author} blog`}
        image={PROMO_IMAGE}
        keywords={keywords}
        path={url}
        title={NOT_FOUND_TITLE}
      />

      <Header title={title} />

      <main className={styles.main}>
        <Bio
          isTitleBig
          title={topTitle}
          subtitle={`${title}, ${position}`}
          text={bioText}
        />

        <div>
          <h2>404: The content cannot be found</h2>
          <p>
            The page, that you are looking for, did not exist, or the content
            has been removed. I suggest you to visit{" "}
            <NextLink href="/search">Search</NextLink> in case the content has
            been moved or renamed.
          </p>
        </div>
      </main>

      <Footer />
    </Layout>
  );
};
