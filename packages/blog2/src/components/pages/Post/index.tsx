import React, { FC } from "react";
import { PostType } from "../../../types/PostType";
import { PostBody } from "../../atoms/PostBody";
import type { serialize } from "next-mdx-remote/serialize";
import { Awaited } from "../../../types/Awaited";
import { ViewCounter } from "../../molecules/ViewCounter";
import { PickRequired } from "../../../types/PickRequired";
import { Label } from "../../atoms/Label";
import { Bio } from "../../molecules/Bio";
import { Footer } from "../../atoms/Footer";
import styles from "./index.module.css";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { imageLoader } from "../../../functions/imageLoader";
import { SubscriptionForm } from "../../molecules/SubscriptionForm";

export interface PostPropsType {
  apiKey: string;
  content: Awaited<ReturnType<typeof serialize>>;
  formId: string;
  post: PickRequired<
    Partial<PostType>,
    "date" | "description" | "image" | "keywords" | "labels" | "slug" | "title"
  >;
}

export const Post: FC<PostPropsType> = ({ apiKey, content, formId, post }) => {
  const { title, url } = BLOG_META_INFO;

  const imageWidth = 1280;
  const imageUrl = imageLoader({ src: post.image, width: imageWidth });

  return (
    <div className={styles.container}>
      {/* @ts-expect-error add imageHeight */}
      <Seo
        description={post.description}
        imageUrl={imageUrl}
        // imageHeight={0}
        imageWidth={imageWidth}
        keywords={post.keywords}
        path={`${url}${post.slug}`}
        title={post.title}
      />

      <Header title={title} path="post" />

      <main className={styles.main}>
        <article>
          <header>
            <h1>{post.title}</h1>
            <div className={styles.headerMetadata}>
              <small>{post.date}</small>
              <small>
                <ViewCounter slug={post.slug} />
              </small>
            </div>
          </header>
          <main>
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
