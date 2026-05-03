"use client";
import Link from "next/link";
import { Post } from "@/types";
import styles from "./PostCard.module.css";

function formatDate(ts: string) {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });
}

export default function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  const excerpt = post.content.length > 160
    ? post.content.slice(0, 160) + "…"
    : post.content;

  return (
    <Link href={`/posts/${post.id}`} className={styles.card} style={{ animationDelay: `${index * 60}ms` }}>
      <div className={styles.meta}>
        <span className={styles.author}>{post.author}</span>
        <span className={styles.dot}>·</span>
        <span className={styles.date}>{formatDate(post.creationDate)}</span>
      </div>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.excerpt}>{excerpt}</p>
      {post.tags?.length > 0 && (
        <div className={styles.tags}>
          {post.tags.map((tag) => <span key={tag} className={styles.tag}>#{tag}</span>)}
        </div>
      )}
      <div className={styles.footer}>
        <span className={styles.readMore}>Read more →</span>
      </div>
    </Link>
  );
}