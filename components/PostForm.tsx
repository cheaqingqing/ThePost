"use client";
import { useState } from "react";
import { PostRequest } from "@/types";
import styles from "./PostForm.module.css";

interface Props {
  initial?: Partial<PostRequest>;
  onSubmit: (data: PostRequest) => Promise<void>;
  submitLabel?: string;
  loading?: boolean;
}

export default function PostForm({ initial, onSubmit, submitLabel = "Publish", loading }: Props) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [content, setContent] = useState(initial?.content ?? "");
  const [author, setAuthor] = useState(initial?.author ?? "");
  const [tagInput, setTagInput] = useState((initial?.tags ?? []).join(", "));
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
    try {
      await onSubmit({ title, content, author, tags });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.group}>
        <label className={styles.label}>Title</label>
        <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="An enticing headline…" required />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Author</label>
        <input className={styles.input} value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Your name" required />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Content</label>
        <textarea className={styles.textarea} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write something worth reading…" rows={10} required />
      </div>
      <div className={styles.group}>
        <label className={styles.label}>Tags <span className={styles.hint}>(comma-separated)</span></label>
        <input className={styles.input} value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="e.g. tech, design, culture" />
      </div>
      <button className={styles.btn} type="submit" disabled={loading}>
        {loading ? <span className="spinner" /> : submitLabel}
      </button>
    </form>
  );
}