import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import React from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { getHomeStaticProps } from "../../../static/getHomeStaticProps";
import { Footer } from "../../atoms/Footer";
import { Bio } from "../../molecules/Bio";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import styles from "./index.module.css";

export const Home = ({
  posts,
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

        <div className={styles.grid}>
          {posts.map(({ description, slug, title }) => (
            <a href={slug} key={slug} className={styles.card}>
              <h2>{title}</h2>
              <p>{description}</p>
            </a>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};
