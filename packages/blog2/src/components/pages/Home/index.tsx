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
import styles from "./index.module.css";
import { SanitisedString } from "../../../types/SanitisedString";
import { PROMO_IMAGE } from "../../../constants/PROMO_IMAGE";
import { Layout } from "../../molecules/Layout";

const HOME_TITLE = "All posts" as SanitisedString;

export const Home = ({
  apiKey,
  formId,
  featuredPosts,
  mostRecent10Posts,
}: InferGetStaticPropsType<typeof getHomeStaticProps>) => {
  const { author, bio, keywords, title, url } = BLOG_META_INFO;
  const { topTitle, position, text: bioText } = bio;

  return (
    <Layout>
      <Seo
        description={`${author} blog`}
        image={PROMO_IMAGE}
        keywords={keywords}
        path={url}
        title={HOME_TITLE}
      />

      <Header title={title} />

      <main>
        <Bio
          isTitleBig
          title={topTitle}
          subtitle={`${title}, ${position}`}
          text={bioText}
        />

        <h2>⭐️ Featured</h2>
        <table className={styles.table}>
          <tbody>
            {featuredPosts.map((post) => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </tbody>
        </table>

        <h2>🕞 Most recent 10 posts</h2>
        <table className={styles.table}>
          <tbody>
            {mostRecent10Posts.map((post) => (
              <PostPreview key={post.slug} {...post} />
            ))}
          </tbody>
        </table>

        <div className={styles.goToSearch}>
          <NextLink href="/search">🔎 See all articles</NextLink>
        </div>
      </main>

      <Footer />
    </Layout>
  );
};
