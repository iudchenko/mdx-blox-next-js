import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";

import COMPONENT_MAP from "@/helpers/mdx-components";

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);

  const title = `${frontmatter.title} • ${BLOG_TITLE}`;
  const description = frontmatter.abstract;

  return { title, description };
}

async function BlogPost({ params }) {
  const { frontmatter, content } = await loadBlogPost(params.postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter?.title}
        publishedOn={frontmatter?.publishedOn}
      />

      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
