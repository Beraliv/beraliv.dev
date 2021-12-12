import React, { FC, useRef } from "react";
import { PostType } from "../../../types/PostType";
import { PostBody } from "../../atoms/PostBody";
import type { serialize } from "next-mdx-remote/serialize";
import { Awaited } from "../../../types/Awaited";
import { ImageType } from "../../../types/ImageType";
import { StrictOmit } from "../../../types/StrictOmit";
import { ViewCounter } from "../../molecules/ViewCounter";
import { PickRequired } from "../../../types/PickRequired";
import { Label } from "../../atoms/Label";
import { Bio } from "../../molecules/Bio";
import { Footer } from "../../molecules/Footer";
import styles from "./index.module.css";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { SubscriptionForm } from "../../molecules/SubscriptionForm";
import { sanitiseHtml } from "../../../functions/sanitiseHtml";
import { ArticleMainProgress } from "../../atoms/ArticleMainProgress";

export interface PostPropsType {
  apiKey: string;
  content: Awaited<ReturnType<typeof serialize>>;
  formId: string;
  post: StrictOmit<
    PickRequired<
      Partial<PostType>,
      "date" | "description" | "keywords" | "labels" | "slug" | "title"
    >,
    "image"
  >;
  image: ImageType;
}

export const Post: FC<PostPropsType> = ({
  apiKey,
  content,
  formId,
  image,
  post,
}) => {
  const { title, url: baseUrl } = BLOG_META_INFO;
  const articleMainRef = useRef<HTMLElement>(null);

  return (
    <div className={styles.container}>
      <ArticleMainProgress articleMainRef={articleMainRef} />

      <Seo
        description={post.description}
        image={image}
        keywords={post.keywords}
        path={`${baseUrl}${post.slug}`}
        title={sanitiseHtml(post.title)}
      />

      <Header title={title} path="post" />

      <main className={styles.main}>
        <article>
          <header>
            <h1
              dangerouslySetInnerHTML={{
                __html: post.title,
              }}
            />
            <div className={styles.headerMetadata}>
              <small>{post.date}</small>
              <small>
                <ViewCounter slug={post.slug} />
              </small>
            </div>
          </header>
          <main ref={articleMainRef}>
            <PostBody content={content} />
            {post.labels.map(
              (label) => label && <Label key={label} title={label} />
            )}
          </main>
          <footer className={styles.articleFooter}>
            <Bio />
          </footer>
        </article>
        <aside>
          <SubscriptionForm apiKey={apiKey} formId={formId} />
        </aside>
      </main>

      <Footer />
    </div>
  );
};
