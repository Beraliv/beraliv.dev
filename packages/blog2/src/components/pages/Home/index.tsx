import { InferGetStaticPropsType } from "next";
import NextLink from "next/link";
import React from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { getHomeStaticProps } from "../../../static/getHomeStaticProps";
import { Footer } from "../../molecules/Footer";
import { PostPreview } from "../../molecules/PostPreview";
import { Bio } from "../../molecules/Bio";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import { SubscriptionForm } from "../../molecules/SubscriptionForm";
import styles from "./index.module.css";
import { sanitiseHtml } from "../../../functions/sanitiseHtml";
import { SanitisedString } from "../../../types/SanitisedString";
import { PROMO_IMAGE } from "../../../constants/PROMO_IMAGE";

const HOME_TITLE = "All posts" as SanitisedString;

export const Home = ({
  apiKey,
  formId,
  featuredPosts,
  latestPosts,
}: InferGetStaticPropsType<typeof getHomeStaticProps>) => {
  const { author, keywords, title, url } = BLOG_META_INFO;

  return (
    <div className={styles.container}>
      <Seo
        description={`${author} blog`}
        image={PROMO_IMAGE}
        keywords={keywords}
        path={url}
        title={HOME_TITLE}
      />

      <Header title={title} path="home" />

      <main className={styles.main}>
        <div className={styles.bio}>
          <Bio />
        </div>

        <h3>Featured</h3>
        <div className={styles.grid}>
          {featuredPosts.map(({ description, labels, slug, title }) => (
            <PostPreview
              key={slug}
              description={description}
              labels={labels}
              slug={slug}
              title={sanitiseHtml(title)}
            />
          ))}
        </div>

        <h3>Latest</h3>
        <div className={styles.grid}>
          {latestPosts.map(({ description, labels, slug, title }) => (
            <PostPreview
              key={slug}
              description={description}
              labels={labels}
              slug={slug}
              title={sanitiseHtml(title)}
            />
          ))}
        </div>

        <div className={styles.goToSearch}>
          <NextLink href="/search">🔎 See all articles</NextLink>
        </div>

        <aside className={styles.aside}>
          <SubscriptionForm apiKey={apiKey} formId={formId} />
        </aside>
      </main>

      <Footer />
    </div>
  );
};
