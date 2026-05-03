export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  creationDate: string;
  tags: string[];
}

export interface ApiResponse<T> {
  message: string;
  payload: T;
  status: number;
  timestamp: string;
}

export interface PostRequest {
  title: string;
  content: string;
  author: string;
  tags: string[];
}