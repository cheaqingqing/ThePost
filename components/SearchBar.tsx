"use client";
import { useState } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  onSearch: (query: string, type: "title" | "author") => void;
  onClear: () => void;
}

export default function SearchBar({ onSearch, onClear }: Props) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<"title" | "author">("title");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) onSearch(query.trim(), type);
  }

  function handleClear() {
    setQuery("");
    onClear();
  }

  return (
    <form className={styles.bar} onSubmit={handleSubmit}>
      <select className={styles.select} value={type} onChange={(e) => setType(e.target.value as "title" | "author")}>
        <option value="title">By Title</option>
        <option value="author">By Author</option>
      </select>
      <input
        className={styles.input} value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={type === "title" ? "Search titles…" : "Search authors…"}
      />
      <button className={styles.btn} type="submit">Search</button>
      {query && <button className={styles.clear} type="button" onClick={handleClear}>✕</button>}
    </form>
  );
}