import { InferGetStaticPropsType } from "next";
import React from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { getHomeStaticProps } from "../../../static/getHomeStaticProps";
import { Footer } from "../../atoms/Footer";
import { PostPreview } from "../../atoms/PostPreview";
import { Bio } from "../../molecules/Bio";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import { SubscriptionForm } from "../../molecules/SubscriptionForm";
import styles from "./index.module.css";

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
      {/* @ts-expect-error add information about image */}
      <Seo
        description={`${author} blog`}
        // imageUrl={}
        // imageHeight={}
        // imageWidth={}
        keywords={keywords}
        path={url}
        title="All posts"
      />

      <Header title={title} path="home" />

      <main className={styles.main}>
        <div className={styles.bio}>
          <Bio />
        </div>

        <h1>Featured</h1>
        <div className={styles.grid}>
          {featuredPosts.map(({ description, slug, title }) => (
            <PostPreview
              key={slug}
              description={description}
              slug={slug}
              title={title}
            />
          ))}
        </div>

        <h1>Latest</h1>
        <div className={styles.grid}>
          {latestPosts.map(({ description, slug, title }) => (
            <PostPreview
              key={slug}
              description={description}
              slug={slug}
              title={title}
            />
          ))}
        </div>

        <h1>Most viewed</h1>
        <div className={styles.grid}>
          {mostViewedPosts.map(({ description, slug, title }) => (
            <PostPreview
              key={slug}
              description={description}
              slug={slug}
              title={title}
            />
          ))}
        </div>

        <aside className={styles.aside}>
          <SubscriptionForm apiKey={apiKey} formId={formId} />
        </aside>
      </main>

      <Footer />
    </div>
  );
};
