import { PostType } from "../../../types/PostType";
import { PostBody } from "../../atoms/PostBody";
import type { serialize } from "next-mdx-remote/serialize";
import { ImageType } from "../../../types/ImageType";
import { StrictOmit } from "../../../types/StrictOmit";
import { Label } from "../../atoms/Label";
import { Bio } from "../../molecules/Bio";
import { Footer } from "../../molecules/Footer";
import styles from "./index.module.css";
import { Header } from "../../molecules/Header";
import { Seo } from "../../molecules/Seo";
import { BLOG_META_INFO } from "../../../constants/BLOG_META_INFO";
import { ArticleMainProgress } from "../../atoms/ArticleMainProgress";
import { useEffect } from "react";
import type { MarkRequired } from "ts-essentials";
import { SanitisedString } from "../../../types/SanitisedString";
import { Comments } from "../../atoms/Comments";
import { Layout } from "../../molecules/Layout";

export interface PostPropsType {
  apiKey: string;
  content: Awaited<ReturnType<typeof serialize>>;
  formId: string;
  post: StrictOmit<
    StrictOmit<
      MarkRequired<
        Partial<PostType>,
        | "rawDate"
        | "date"
        | "description"
        | "keywords"
        | "labels"
        | "slug"
        | "title"
      >,
      "title"
    > & { title: SanitisedString },
    "image"
  >;
  image: ImageType;
}

export const Post = ({
  apiKey,
  content,
  formId,
  image,
  post,
}: PostPropsType) => {
  const { title, url: baseUrl } = BLOG_META_INFO;

  useEffect(() => {
    post.labels.forEach((label) => {
      plausible("Label", { props: { type: label } });
    });
  }, [post.labels]);

  return (
    <Layout>
      <Seo
        description={post.description}
        image={image}
        keywords={post.keywords}
        path={`${baseUrl}${post.slug}`}
        title={post.title}
      />

      <ArticleMainProgress />

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
            <Comments />
          </footer>
        </article>
      </main>

      <Footer />
    </Layout>
  );
};
