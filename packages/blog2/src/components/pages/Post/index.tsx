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
  content: Awaited<ReturnType<typeof serialize>>;
  post: StrictOmit<
    StrictOmit<
      MarkRequired<
        Partial<PostType>,
        | "created"
        | "description"
        | "keywords"
        | "labels"
        | "rawCreated"
        | "rawUpdated"
        | "slug"
        | "title"
        | "updated"
      >,
      "title"
    > & { title: SanitisedString },
    "image"
  >;
  image: ImageType;
}

export const Post = ({ content, image, post }: PostPropsType) => {
  const { title, bio, url: baseUrl } = BLOG_META_INFO;
  const { position, thankyou } = bio;

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

      <Header title={title} />

      <main className={styles.main}>
        <article>
          <header>
            <h1
              dangerouslySetInnerHTML={{
                __html: post.title,
              }}
            />
            <div className={styles.headerMetadata}>
              <small>{post.created}</small>
            </div>
          </header>
          <main>
            <PostBody content={content} />
            {post.labels.map(
              (label) => label && <Label key={label} title={label} />
            )}
          </main>
          <footer className={styles.articleFooter}>
            <Bio
              isTitleBig={false}
              title={title}
              subtitle={position}
              text={thankyou}
            />
            <Comments />
          </footer>
        </article>
      </main>

      <Footer />
    </Layout>
  );
};
