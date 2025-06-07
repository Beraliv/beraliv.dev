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
  const { author, keywords, title, url } = BLOG_META_INFO;

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

      <Header title={title} path="404" />

      <main className={styles.main}>
        <Bio />

        <div className={styles.notFound}>
          <h1>404: Cannot find what you look for 😢</h1>
        </div>
      </main>

      <Footer />
    </Layout>
  );
};
