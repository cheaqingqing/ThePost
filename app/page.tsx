"use client";
import { useEffect, useState, useCallback } from "react";
import { Post } from "@/types";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import SearchBar from "@/components/SearchBar";
import styles from "./page.module.css";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchLabel, setSearchLabel] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setSearchLabel(null);
    try {
      const res = await api.getAllPosts();
      setPosts(res.payload);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  async function handleSearch(query: string, type: "title" | "author") {
    setLoading(true);
    try {
      const res = type === "title"
        ? await api.getPostByTitle(query)
        : await api.getPostByAuthor(query);
      setPosts(res.payload);
      setSearchLabel(`${type === "title" ? "Title" : "Author"}: "${query}" — ${res.payload.length} result${res.payload.length !== 1 ? "s" : ""}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <p className={styles.heroEyebrow}>✦ The Journal</p>
            <h1 className={styles.heroTitle}>Stories worth<br /><em>reading</em></h1>
            <p className={styles.heroSub}>A curated collection of posts, ideas, and perspectives.</p>
          </div>
        </section>

        <div className={styles.container}>
          <div className={styles.toolbar}>
            <SearchBar onSearch={handleSearch} onClear={loadAll} />
            {searchLabel && <p className={styles.searchLabel}>{searchLabel}</p>}
          </div>

          {loading ? (
            <div className={styles.loading}><div className="spinner" /></div>
          ) : posts.length === 0 ? (
            <div className={styles.empty}><span>No posts found.</span></div>
          ) : (
            <div className={styles.grid}>
              {posts.map((post, i) => <PostCard key={post.id} post={post} index={i} />)}
            </div>
          )}
        </div>
      </main>
    </>
  );
}