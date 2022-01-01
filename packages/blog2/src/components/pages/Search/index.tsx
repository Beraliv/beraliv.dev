import { InferGetStaticPropsType } from "next";
import React from "react";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { Footer } from "../../molecules/Footer";
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
import { useLabel } from "../../../hooks/useLabel";
import { useEffect } from "react";
import { KNOWN_LABELS } from "../../../constants/KNOWN_LABELS";
import { Label } from "../../atoms/Label";
import { PROMO_IMAGE } from "../../../constants/PROMO_IMAGE";

const SEARCH_TITLE = "Search for posts" as SanitisedString;

export const Search = ({
  apiKey,
  formId,
  posts,
}: InferGetStaticPropsType<typeof getSearchStaticProps>) => {
  const { author, keywords, title, url } = BLOG_META_INFO;
  const searchLabel = useLabel();

  const [filteredPosts, setFilteredPosts] = useState<typeof posts>([]);

  const startSearch = useCallback(
    (search: string) => {
      const foundPosts = posts.filter((post) => {
        const byLabel = (() => {
          if (searchLabel.state === "loading") {
            return true;
          }

          if (searchLabel.state === "loaded" && searchLabel.value) {
            return post.labels.includes(searchLabel.value);
          }

          return true;
        })();
        const byTitle = sanitiseHtml(post.title).toLowerCase().includes(search);
        const byDescription = post.description.toLowerCase().includes(search);

        return byLabel && (byTitle || byDescription);
      });

      setFilteredPosts(foundPosts);
    },
    [posts, searchLabel]
  );

  useEffect(() => {
    startSearch("");
  }, [searchLabel.state, startSearch]);

  const handleInputChange = useCallback<
    React.FormEventHandler<HTMLInputElement>
  >(
    (event) => {
      const search = (event.target as HTMLInputElement).value.toLowerCase();

      if (!search) {
        startSearch("");
        return;
      }

      startSearch(search);
    },
    [startSearch]
  );

  return (
    <div className={styles.container}>
      <Seo
        description={`${author} blog`}
        image={PROMO_IMAGE}
        keywords={keywords}
        path={url}
        title={SEARCH_TITLE}
      />

      <Header title={title} path="search" />

      <main className={styles.main}>
        <div className={styles.bio}>
          <Bio />
        </div>

        <div className={styles.grid}>
          {KNOWN_LABELS.map((label) => (
            <Label
              key={label}
              selected={
                searchLabel.state === "loaded" && searchLabel.value === label
              }
              title={label}
            />
          ))}
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
