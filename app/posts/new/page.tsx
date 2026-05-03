"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { PostRequest } from "@/types";
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";
import styles from "./page.module.css";

export default function NewPostPage() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(data: PostRequest) {
    setLoading(true);
    try {
      const res = await api.addPost(data);
      router.push(`/posts/${res.payload.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>← All Posts</Link>
          <div className={styles.header}>
            <p className={styles.eyebrow}>✦ New Entry</p>
            <h1 className={styles.title}>Create a Post</h1>
            <p className={styles.sub}>Share your thoughts with the world.</p>
          </div>
          <div className={styles.card}>
            <PostForm onSubmit={handleSubmit} submitLabel="Publish Post" loading={loading} />
          </div>
        </div>
      </main>
    </>
  );
}