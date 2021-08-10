import { InferGetStaticPropsType } from "next";
import React from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { Footer } from "../../atoms/Footer";
import { PostPreview } from "../../molecules/PostPreview";
import { Bio } from "../../molecules/Bio";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import { SubscriptionForm } from "../../molecules/SubscriptionForm";
import styles from "./index.module.css";
import { sanitiseHtml } from "../../../functions/sanitiseHtml";
import { SanitisedString } from "../../../types/SanitisedString";
import { getSearchStaticProps } from "../../../static/getSearchStaticProps";
import { useState } from "react";
import { useCallback } from "react";

const SEARCH_TITLE = "Search for posts" as SanitisedString;

export const Search = ({
  apiKey,
  formId,
  posts,
}: InferGetStaticPropsType<typeof getSearchStaticProps>) => {
  const { author, keywords, title, url } = BLOG_META_INFO;

  const [filteredPosts, setFilteredPosts] = useState(posts);

  const handleInputChange = useCallback<
    React.FormEventHandler<HTMLInputElement>
  >(
    (event) => {
      const search = (event.target as HTMLInputElement).value.toLowerCase();
      console.log(`>>> handleInputChange`, search);

      if (!search) {
        setFilteredPosts(posts);
        return;
      }

      const foundPosts = posts.filter((post) => {
        const byTitle = sanitiseHtml(post.title).toLowerCase().includes(search);
        const byDescription = post.description.toLowerCase().includes(search);

        return byTitle || byDescription;
      });

      setFilteredPosts(foundPosts);
    },
    [posts]
  );

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
        title={SEARCH_TITLE}
      />

      <Header title={title} path="search" />

      <main className={styles.main}>
        <div className={styles.bio}>
          <Bio />
        </div>

        <div className={styles.search}>
          <input
            aria-label="search"
            className={styles.searchBar}
            type="text"
            placeholder="What article are you looking for?"
            onInput={handleInputChange}
          />
          <div className={styles.searchElements}>{filteredPosts.length}</div>
        </div>

        <div className={styles.grid}>
          {filteredPosts.map(({ description, labels, slug, title }) => (
            <PostPreview
              key={slug}
              description={description}
              labels={labels}
              slug={slug}
              title={sanitiseHtml(title)}
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
