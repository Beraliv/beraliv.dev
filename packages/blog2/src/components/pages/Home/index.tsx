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
import { ImageType } from "../../../types/ImageType";

const HOME_TITLE = "All posts" as SanitisedString;

const HOME_IMAGE: ImageType = {
  url: "/profile.jpg",
  width: 640,
  height: 640,
};

export const Home = ({
  apiKey,
  formId,
  featuredPosts,
  latestPosts,
  mostViewedPosts,
}: InferGetStaticPropsType<typeof getHomeStaticProps>) => {
  const { author, keywords, title, url } = BLOG_META_INFO;

  return (
    <div className={styles.container}>
      <Seo
        description={`${author} blog`}
        image={HOME_IMAGE}
        keywords={keywords}
        path={url}
        title={HOME_TITLE}
      />

      <Header title={title} path="home" />

      <main className={styles.main}>
        <div className={styles.bio}>
          <Bio />
        </div>

        <h1>Featured</h1>
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

        <h1>Most viewed</h1>
        <div className={styles.grid}>
          {mostViewedPosts.map(({ description, labels, slug, title }) => (
            <PostPreview
              key={slug}
              description={description}
              labels={labels}
              slug={slug}
              title={sanitiseHtml(title)}
            />
          ))}
        </div>

        <h1>Latest</h1>
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
