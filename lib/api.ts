import { ApiResponse, Post, PostRequest } from "@/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:9090/api/v1/posts";

async function apiFetch<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const error = await res.text();
    throw new Error(error || "API error");
  }
  return res.json();
}

export const api = {
  getAllPosts:    ()                         => apiFetch<Post[]>("/all"),
  getPostByTitle:(title: string)             => apiFetch<Post[]>(`/title/${encodeURIComponent(title)}`),
  getPostByAuthor:(author: string)           => apiFetch<Post[]>(`/author/${encodeURIComponent(author)}`),
  addPost:       (data: PostRequest)         => apiFetch<Post>("/add", { method: "POST", body: JSON.stringify(data) }),
  updatePost:    (id: number, data: PostRequest) => apiFetch<Post>(`/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deletePost:    (id: number)                => apiFetch<Post>(`/${id}`, { method: "DELETE" }),
};