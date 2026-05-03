"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Post, PostRequest } from "@/types";
import { api } from "@/lib/api";
import Navbar from "@/components/Navbar";
import PostForm from "@/components/PostForm";
import styles from "./page.module.css";

function formatDate(ts: string) {
  if (!ts) return "";
  return new Date(ts).toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
}

export default function PostPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    api.getAllPosts().then((res) => {
      const found = res.payload.find((p) => p.id === Number(id));
      setPost(found ?? null);
    }).finally(() => setLoading(false));
  }, [id]);

  async function handleUpdate(data: PostRequest) {
    setSaving(true);
    try {
      const res = await api.updatePost(Number(id), data);
      setPost(res.payload);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await api.deletePost(Number(id));
      router.push("/");
    } finally {
      setDeleting(false);
    }
  }

  if (loading) return (
    <>
      <Navbar />
      <div className={styles.centered}><div className="spinner" /></div>
    </>
  );

  if (!post) return (
    <>
      <Navbar />
      <div className={styles.centered}>
        <p>Post not found.</p>
        <Link href="/" className={styles.back}>← Back to all posts</Link>
      </div>
    </>
  );

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.container}>
          <Link href="/" className={styles.back}>← All Posts</Link>

          {editing ? (
            <div className={styles.editWrap}>
              <h2 className={styles.editTitle}>Edit Post</h2>
              <PostForm
                initial={{ title: post.title, content: post.content, author: post.author, tags: post.tags }}
                onSubmit={handleUpdate}
                submitLabel="Save Changes"
                loading={saving}
              />
              <button className={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
            </div>
          ) : (
            <article className={styles.article}>
              <div className={styles.meta}>
                <span className={styles.author}>{post.author}</span>
                <span className={styles.dot}>·</span>
                <time className={styles.date}>{formatDate(post.creationDate)}</time>
              </div>

              <h1 className={styles.title}>{post.title}</h1>

              {post.tags?.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>#{tag}</span>
                  ))}
                </div>
              )}

              <hr className={styles.rule} />

              <div className={styles.content}>
                {post.content.split("\n").map((para, i) =>
                  para ? <p key={i}>{para}</p> : <br key={i} />
                )}
              </div>

              <div className={styles.actions}>
                <button className={styles.editBtn} onClick={() => setEditing(true)}>Edit Post</button>

                {confirmDelete ? (
                  <div className={styles.confirmRow}>
                    <span className={styles.confirmText}>Are you sure?</span>
                    <button className={styles.deleteConfirm} onClick={handleDelete} disabled={deleting}>
                      {deleting ? <span className="spinner" /> : "Yes, delete"}
                    </button>
                    <button className={styles.cancelBtn} onClick={() => setConfirmDelete(false)}>Cancel</button>
                  </div>
                ) : (
                  <button className={styles.deleteBtn} onClick={() => setConfirmDelete(true)}>Delete</button>
                )}
              </div>
            </article>
          )}
        </div>
      </main>
    </>
  );
}