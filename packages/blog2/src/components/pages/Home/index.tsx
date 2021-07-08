import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import { getHomeStaticProps } from "../../../static/getHomeStaticProps";
import styles from "./index.module.css";

export const Home = ({
  posts,
}: InferGetStaticPropsType<typeof getHomeStaticProps>) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>beraliv</h1>

        <div className={styles.grid}>
          {posts.map(({ description, slug, title }) => (
            <a href={slug} key={slug} className={styles.card}>
              <h2>{title}</h2>
              <p>{description}</p>
            </a>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          © {new Date().getFullYear()}, Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};
